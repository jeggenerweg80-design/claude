import { useEffect, useRef, useState } from "react";
import {
  sendChatMessage,
  getStoredConversationId,
  clearConversation,
} from "../lib/chat-api";
import type { ChatMessage } from "../lib/chat-api";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const isMobileRef = useRef(false);

  // Detect mobile on mount
  useEffect(() => {
    isMobileRef.current = window.innerWidth < 768;
    const handleResize = () => {
      isMobileRef.current = window.innerWidth < 768;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setError(null);

    // Add user message to display
    const userMsg: ChatMessage = {
      role: "user",
      content: userMessage,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMsg]);

    setIsLoading(true);
    setIsStreaming(true);

    // Collect streamed content
    let assistantContent = "";

    try {
      abortControllerRef.current = new AbortController();
      const conversationId = getStoredConversationId() || undefined;

      const response = await sendChatMessage(
        userMessage,
        conversationId,
        (chunk) => {
          assistantContent += chunk;
          // Update assistant message in real-time
          setMessages((prev) => {
            const updated = [...prev];
            if (updated[updated.length - 1]?.role === "assistant") {
              updated[updated.length - 1].content = assistantContent;
            } else {
              updated.push({
                role: "assistant",
                content: assistantContent,
                timestamp: Date.now(),
              });
            }
            return updated;
          });
        },
        abortControllerRef.current.signal
      );

      // Ensure final message is set (in case streaming didn't complete)
      if (assistantContent) {
        setMessages((prev) => {
          const updated = [...prev];
          if (updated[updated.length - 1]?.role === "assistant") {
            updated[updated.length - 1].content = assistantContent;
          } else {
            updated.push({
              role: "assistant",
              content: assistantContent,
              timestamp: Date.now(),
            });
          }
          return updated;
        });
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Ein Fehler ist aufgetreten.";
      setError(errorMessage);

      // Add error message to chat
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `⚠️ ${errorMessage}`,
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  };

  const handleStopStreaming = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setIsLoading(false);
    setIsStreaming(false);
  };

  const handleNewChat = () => {
    clearConversation();
    setMessages([]);
    setError(null);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e as any);
    }
    // Shift+Enter adds newline (default browser behavior)
  };

  return (
    <>
      {/* Chat Button (Bottom Right) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-electric to-electric/80 text-frost shadow-lg hover:shadow-xl hover:shadow-electric/50 transition-all active:scale-95 md:bottom-8 md:right-8"
        aria-label="Chat öffnen"
        title="HeidSec AI Chat"
      >
        <svg
          className="h-6 w-6"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <ChatPanel
          messages={messages}
          input={input}
          isLoading={isLoading}
          isStreaming={isStreaming}
          error={error}
          onInput={setInput}
          onSend={handleSendMessage}
          onStop={handleStopStreaming}
          onNewChat={handleNewChat}
          onClose={() => setIsOpen(false)}
          onKeyDown={handleKeyDown}
          messagesEndRef={messagesEndRef}
          isMobile={isMobileRef.current}
        />
      )}
    </>
  );
}

interface ChatPanelProps {
  messages: ChatMessage[];
  input: string;
  isLoading: boolean;
  isStreaming: boolean;
  error: string | null;
  onInput: (value: string) => void;
  onSend: (e: React.FormEvent) => void;
  onStop: () => void;
  onNewChat: () => void;
  onClose: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  isMobile: boolean;
}

function ChatPanel({
  messages,
  input,
  isLoading,
  isStreaming,
  error,
  onInput,
  onSend,
  onStop,
  onNewChat,
  onClose,
  onKeyDown,
  messagesEndRef,
  isMobile,
}: ChatPanelProps) {
  const panelClasses = isMobile
    ? "fixed inset-0 bottom-0 z-40 flex flex-col bg-ink md:hidden"
    : "fixed bottom-24 right-6 z-40 w-96 h-[600px] flex flex-col bg-ink rounded-lg border border-electric/20 shadow-2xl hidden md:flex";

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobile && (
        <div
          className="fixed inset-0 z-35 bg-ink/50 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Chat Panel */}
      <div className={panelClasses}>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-electric/10 bg-gradient-to-r from-ink to-ink/95 px-4 py-4">
          <h2 className="font-display text-lg font-bold text-frost">
            HeidSec AI
          </h2>
          <div className="flex gap-2">
            {messages.length > 0 && (
              <button
                onClick={onNewChat}
                className="text-xs text-mist hover:text-frost transition-colors"
                title="Neuer Chat"
              >
                ✕ Neu
              </button>
            )}
            <button
              onClick={onClose}
              className="text-2xl leading-none text-mist hover:text-frost transition-colors"
              aria-label="Schließen"
            >
              ×
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto space-y-4 p-4">
          {messages.length === 0 ? (
            <div className="flex h-full items-center justify-center text-center">
              <div className="space-y-3">
                <p className="text-sm font-medium text-frost">
                  Willkommen bei HeidSec AI
                </p>
                <p className="text-xs text-mist leading-relaxed">
                  Stelle Fragen zu Sicherheit, Datenschutz oder HeidSec Produkten.
                </p>
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg, idx) => (
                <ChatMessage key={idx} message={msg} />
              ))}
              {isLoading && !isStreaming && (
                <div className="flex gap-2">
                  <div className="h-8 w-8 rounded-full bg-electric/10 animate-pulse" />
                  <div className="space-y-1 flex-1">
                    <div className="h-2 w-20 rounded bg-electric/20 animate-pulse" />
                    <div className="h-2 w-32 rounded bg-electric/20 animate-pulse" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className="mx-4 mb-3 p-3 rounded bg-red-900/20 border border-red-500/30 text-red-300 text-sm">
            {error}
          </div>
        )}

        {/* Input Area */}
        <form onSubmit={onSend} className="border-t border-electric/10 bg-ink/50 p-4 space-y-3">
          <div className="flex gap-2">
            <textarea
              value={input}
              onChange={(e) => onInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Nachricht eingeben... (Shift+Enter = Zeilenumbruch)"
              rows={2}
              disabled={isLoading}
              className="flex-1 bg-ink/50 border border-electric/20 rounded px-3 py-2 text-sm text-frost placeholder:text-mist/50 focus:outline-none focus:border-electric/50 transition-colors disabled:opacity-50 resize-none"
            />
            <div className="flex flex-col gap-2">
              {isStreaming ? (
                <button
                  type="button"
                  onClick={onStop}
                  className="h-10 w-10 flex items-center justify-center rounded bg-red-900/20 border border-red-500/30 text-red-300 hover:bg-red-900/30 transition-colors text-sm font-medium"
                  title="Stoppen"
                >
                  ⏹
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="h-10 w-10 flex items-center justify-center rounded bg-electric/20 text-electric hover:bg-electric/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm"
                  title="Senden"
                >
                  →
                </button>
              )}
            </div>
          </div>
          <p className="text-xs text-mist/50">
            {isStreaming ? "⏳ Antwortet..." : "Bereit"}
          </p>
        </form>
      </div>
    </>
  );
}

interface MessageProps {
  message: ChatMessage;
}

function ChatMessage({ message }: MessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs rounded-lg px-4 py-2 text-sm ${
          isUser
            ? "bg-electric/20 text-frost"
            : "bg-ink/50 border border-electric/10 text-mist"
        }`}
      >
        <p className="whitespace-pre-wrap break-words">{message.content}</p>
      </div>
    </div>
  );
}
