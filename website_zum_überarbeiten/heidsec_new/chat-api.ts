// Chat API client for WEB-13 contract
// Supports both JSON and SSE streaming responses
// No sensitive data or hardcoded secrets

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp?: number;
}

export interface ChatRequest {
  conversationId?: string; // Optional, creates new if omitted
  message: string;
  stream?: boolean; // Default true for streaming
}

export interface ChatResponse {
  conversationId: string;
  content: string;
  done: boolean;
}

const CHAT_API_ENDPOINT = "/api/chat";
const CHAT_TIMEOUT = 60000; // 60 seconds for chat
const CONVERSATION_ID_KEY = "heidsec_chat_conversation_id";

// Get stored conversation ID
export function getStoredConversationId(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(CONVERSATION_ID_KEY);
}

// Save conversation ID
export function saveConversationId(id: string | undefined): void {
  if (typeof window === "undefined" || !id) return;
  localStorage.setItem(CONVERSATION_ID_KEY, id);
}

// Clear conversation (start new chat)
export function clearConversation(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CONVERSATION_ID_KEY);
}

// Send chat message with streaming support
export async function sendChatMessage(
  message: string,
  conversationId?: string,
  onChunk?: (chunk: string) => void,
  signal?: AbortSignal
): Promise<ChatResponse> {
  if (!message.trim()) {
    throw new Error("Message cannot be empty");
  }

  const actualConversationId = conversationId || getStoredConversationId();

  const request: ChatRequest = {
    message: message.trim(),
    stream: !!onChunk, // Enable streaming if callback provided
  };

  if (actualConversationId) {
    request.conversationId = actualConversationId;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), CHAT_TIMEOUT);
    const mergedSignal = signal || controller.signal;

    const response = await fetch(CHAT_API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
      signal: mergedSignal,
    });

    clearTimeout(timeoutId);

    // Handle rate limit
    if (response.status === 429) {
      throw new Error("Zu viele Anfragen. Bitte warten Sie einen Moment.");
    }

    // Handle unauthorized (conversation not found, start new)
    if (response.status === 404) {
      clearConversation();
      throw new Error("Unterhaltung nicht gefunden. Starten Sie einen neuen Chat.");
    }

    // Handle forbidden
    if (response.status === 403) {
      throw new Error("Zugriff verweigert. Bitte versuchen Sie es später erneut.");
    }

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    // Check if streaming (SSE)
    const contentType = response.headers.get("content-type");
    if (contentType?.includes("text/event-stream") && onChunk) {
      return await handleSSEStream(response, onChunk, actualConversationId || undefined);
    }

    // Fall back to JSON response
    const data = (await response.json()) as ChatResponse;

    if (data.conversationId && !actualConversationId) {
      saveConversationId(data.conversationId);
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      // Don't rethrow abort errors during component unmount
      if (error.name === "AbortError") {
        throw new Error("Request cancelled");
      }
    }
    throw error;
  }
}

// Handle SSE streaming response
async function handleSSEStream(
  response: Response,
  onChunk: (chunk: string) => void,
  conversationId?: string
): Promise<ChatResponse> {
  const reader = response.body?.getReader();
  if (!reader) {
    throw new Error("No response body for streaming");
  }

  const decoder = new TextDecoder();
  let buffer = "";
  let finalResponse: ChatResponse | null = null;

  try {
    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");

      // Process complete lines
      for (let i = 0; i < lines.length - 1; i++) {
        const line = lines[i];

        if (!line || line.startsWith(":")) continue; // Skip empty/comment lines

        if (line.startsWith("data: ")) {
          const data = line.slice(6);

          // Check for stream end marker
          if (data === "[DONE]") {
            continue;
          }

          try {
            const parsed = JSON.parse(data);

            // Accumulate conversation ID from first chunk
            if (parsed.conversationId && !conversationId) {
              conversationId = parsed.conversationId;
              saveConversationId(parsed.conversationId);
            }

            // Stream text content
            if (parsed.content && typeof parsed.content === "string") {
              onChunk(parsed.content);
            }

            // Check if done
            if (parsed.done) {
              finalResponse = parsed;
            }
          } catch (e) {
            // Malformed JSON in stream, skip
            console.debug("Malformed SSE data:", data);
          }
        }
      }

      // Keep incomplete line in buffer
      buffer = lines[lines.length - 1];
    }

    // Final buffer content
    if (buffer && buffer.startsWith("data: ")) {
      const data = buffer.slice(6);
      try {
        const parsed = JSON.parse(data);
        if (parsed.content && typeof parsed.content === "string") {
          onChunk(parsed.content);
        }
        if (parsed.done) {
          finalResponse = parsed;
        }
      } catch (e) {
        console.debug("Malformed final SSE data:", data);
      }
    }
  } finally {
    reader.releaseLock();
  }

  if (!finalResponse) {
    throw new Error("No response received from streaming");
  }

  return finalResponse;
}
