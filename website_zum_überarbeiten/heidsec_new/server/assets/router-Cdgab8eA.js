import { c as createSieveCache, l as last, i as invariant, t as trimPathRight, f as functionalUpdate$1, a as arraysEqual, b as trimPath, r as rewriteBasepath, d as createNull, p as protocolRelativePrefixRegex, g as getUrlScheme, e as loadRouteChunk, h as preloadClientRoute, j as resolvePath, k as deepEqual, m as compileDecodeCharMap, D as DEFAULT_PROTOCOL_ALLOWLIST, n as interpolatePath, o as isNotFound, q as isRedirect, s as nullReplaceEqualDeep, u as replaceEqualDeep$1, v as decodePath, w as executeRewriteInput, x as normalizeProtocolRelative, y as parseHref, z as hasKeys, A as executeRewriteOutput, B as encodePathLikeUrl, C as rootRouteId, E as hasOwn$1, F as redirect, G as waitForReason, _ as _getAssetMatches, H as trimPathLeft, I as cleanPath, J as useRouter, K as reactExports, L as dummyMatchContext, M as matchContext, N as isDangerousProtocol, O as removeTrailingSlash, R as React, P as jsxRuntimeExports, Q as isModuleNotFoundError, S as reactUse, T as useHydrated, U as escapeHtml, V as getAssetCrossOrigin, W as getScriptPreloadAttrs, X as appendUniqueUserTags, Y as resolveManifestCssLink, Z as Outlet } from "./server-CLVLWOFx.js";
const SEGMENT_TYPE_INDEX = 4;
const SEGMENT_TYPE_PATHLESS = 5;
function getParamNames(data) {
  const cached = data.names;
  if (cached) return cached;
  const keys = [];
  for (const segment of data) if (typeof segment !== "string") keys.push(segment[1]);
  return data.names = keys;
}
function parseSegment(path, start, end) {
  const part = path.substring(start, end);
  if (part.charCodeAt(0) === 36) return part.length === 1 ? [
    2,
    "_splat",
    "",
    void 0
  ] : [
    1,
    part.substring(1),
    "",
    ""
  ];
  const open = part.indexOf("{");
  if (open >= 0) {
    const close = part.indexOf("}", open);
    const optional = part.charCodeAt(open + 1) === 45;
    const nameStart = open + (optional ? 3 : 2);
    if (close >= 0 && part.charCodeAt(nameStart - 1) === 36 && (!optional || nameStart < close)) {
      const key = part.substring(nameStart, close);
      return [
        optional ? 3 : key ? 1 : 2,
        key || "_splat",
        part.substring(0, open),
        path.substring(start + close + 1, key ? end : path.length)
      ];
    }
  }
  return part;
}
function parseSegments(defaultCaseSensitive, route, start, node, dynamicListsToSort, parentInterpolation) {
  let cursor = start;
  const path = route.fullPath ?? route.from;
  const options = route.options;
  const length = path.length;
  const literalEnd = path.endsWith("/") ? length - 1 : length;
  const caseSensitive = options?.caseSensitive ?? defaultCaseSensitive;
  const parseParams = options?.params?.parse ?? options?.parseParams;
  let interpolation;
  let literalStart = parentInterpolation ? start - 1 : 0;
  if (!node || path.includes("$")) {
    interpolation = parentInterpolation?.slice() ?? [];
    const tail = last(interpolation);
    if (tail && typeof tail !== "string" && tail[0] === 2) {
      interpolation[interpolation.length - 1] = [
        tail[0],
        tail[1],
        tail[2],
        tail[3] === void 0 ? void 0 : tail[3] + path.substring(start - (path[start - 2] === "/" ? 2 : 1), literalEnd)
      ];
      literalStart = length;
    }
  }
  while (cursor < length) {
    const start2 = cursor;
    const next = path.indexOf("/", start2);
    let end = next === -1 ? length : next;
    const segment = parseSegment(path, start2, end);
    cursor = end + 1;
    let nextNode;
    if (typeof segment === "string") {
      if (!node) continue;
      let name = segment;
      let staticChildren;
      if (caseSensitive) staticChildren = node.static ??= /* @__PURE__ */ new Map();
      else {
        name = segment.toLowerCase();
        staticChildren = node.staticInsensitive ??= /* @__PURE__ */ new Map();
      }
      const existingNode = staticChildren.get(name);
      if (existingNode) nextNode = existingNode;
      else {
        const next2 = createSegmentNode(node);
        nextNode = next2;
        staticChildren.set(name, next2);
      }
    } else {
      const kind = segment[0];
      let prefix = segment[2];
      let suffix = segment[3] ?? "";
      if (kind === 2) {
        end = length;
        cursor = end + 1;
      }
      if (interpolation && literalStart < end) {
        if (literalStart < start2 - 1) interpolation.push(path.substring(literalStart, start2 - 1));
        segment[2] = "/" + prefix;
        if (kind === 2 && segment[3] !== void 0 && literalEnd < length) segment[3] = suffix.slice(0, -1);
        interpolation.push(segment);
        literalStart = end;
      }
      if (!node) continue;
      const actuallyCaseSensitive = caseSensitive && !!(prefix || suffix);
      if (!caseSensitive) {
        prefix = prefix.toLowerCase();
        suffix = suffix.toLowerCase();
      }
      const siblings = kind === 1 ? node.dynamic ??= [] : kind === 3 ? node.optional ??= [] : node.wildcard ??= [];
      const existingNode = kind !== 2 && !parseParams && siblings.find((s) => !s.parse && s.caseSensitive === actuallyCaseSensitive && s.prefix === prefix && s.suffix === suffix);
      if (existingNode) nextNode = existingNode;
      else {
        const next2 = createSegmentNode(node, kind, actuallyCaseSensitive, prefix, suffix);
        nextNode = next2;
        siblings.push(next2);
        if (siblings.length === 2) dynamicListsToSort?.push(siblings);
      }
    }
    node = nextNode;
  }
  if (interpolation && literalStart < literalEnd) interpolation.push(path.substring(literalStart, literalEnd));
  const segmentData = interpolation?.slice();
  if (!node) return segmentData;
  if (parseParams && route.children && !route.isRoot && route.id && route.id.charCodeAt(route.id.lastIndexOf("/") + 1) === 95) {
    const pathlessNode = createSegmentNode(node, SEGMENT_TYPE_PATHLESS);
    (node.pathless ??= []).push(pathlessNode);
    node = pathlessNode;
  }
  const isLeaf = (route.path || !route.children) && !route.isRoot;
  if (isLeaf && literalEnd < length) {
    const indexNode = createSegmentNode(node, SEGMENT_TYPE_INDEX);
    node.index = indexNode;
    node = indexNode;
  }
  node.parse = parseParams ?? null;
  node.priority = options?.params?.priority ?? 0;
  if (!node.route) {
    node.data = segmentData;
    if (isLeaf) node.route = route;
  }
  return [
    node,
    cursor,
    segmentData
  ];
}
function sortDynamic(a, b) {
  if (a.parse && !b.parse) return -1;
  if (!a.parse && b.parse) return 1;
  if (a.parse && b.parse && (a.priority || b.priority)) return b.priority - a.priority;
  if (a.prefix && b.prefix && a.prefix !== b.prefix) {
    if (a.prefix.startsWith(b.prefix)) return -1;
    if (b.prefix.startsWith(a.prefix)) return 1;
  }
  if (a.suffix && b.suffix && a.suffix !== b.suffix) {
    if (a.suffix.endsWith(b.suffix)) return -1;
    if (b.suffix.endsWith(a.suffix)) return 1;
  }
  if (a.prefix && !b.prefix) return -1;
  if (!a.prefix && b.prefix) return 1;
  if (a.suffix && !b.suffix) return -1;
  if (!a.suffix && b.suffix) return 1;
  if (a.caseSensitive && !b.caseSensitive) return -1;
  if (!a.caseSensitive && b.caseSensitive) return 1;
  return 0;
}
function createSegmentNode(parent, kind = 0, caseSensitive, prefix, suffix) {
  return {
    kind,
    depth: parent ? parent.depth + 1 : 0,
    pathless: null,
    index: null,
    static: null,
    staticInsensitive: null,
    dynamic: null,
    optional: null,
    wildcard: null,
    route: null,
    data: void 0,
    parent,
    parse: null,
    priority: 0,
    caseSensitive,
    prefix,
    suffix
  };
}
function processRouteMasks(routeList, processedTree) {
  const segmentTree = createSegmentNode();
  const dynamicListsToSort = [];
  function visit(route, start, parentNode, parentInterpolation) {
    const [node, cursor, segments] = parseSegments(false, route, start, parentNode, dynamicListsToSort, parentInterpolation);
    if (route.children) for (const child of route.children) visit(child, cursor, node, segments);
  }
  for (const route of routeList) visit(route, 1, segmentTree);
  for (const nodes of dynamicListsToSort) nodes.sort(sortDynamic);
  processedTree.masksTree = segmentTree;
  processedTree.flatCache = createSieveCache(1e3);
}
function findFlatMatch(path, processedTree) {
  path ||= "/";
  const cached = processedTree.flatCache.get(path);
  if (cached !== void 0) return cached;
  const result = findMatch(path, processedTree.masksTree);
  processedTree.flatCache.set(path, result);
  return result;
}
function findSingleMatch(from, caseSensitive, fuzzy, path, processedTree) {
  from ||= "/";
  path ||= "/";
  const key = caseSensitive ? `case\0${from}` : from;
  let tree = processedTree.singleCache.get(key);
  if (!tree) {
    tree = createSegmentNode();
    parseSegments(caseSensitive, { from }, 1, tree);
    processedTree.singleCache.set(key, tree);
  }
  return findMatch(path, tree, fuzzy);
}
function findRouteMatch(path, processedTree, fuzzy = false) {
  const key = fuzzy ? path : `nofuzz\0${path}`;
  const cached = processedTree.matchCache.get(key);
  if (cached !== void 0) return cached;
  path ||= "/";
  let result;
  try {
    result = findMatch(path, processedTree.segmentTree, fuzzy);
  } catch (err) {
    if (err instanceof URIError) result = null;
    else throw err;
  }
  if (result) result.branch = buildRouteBranch(result.route);
  processedTree.matchCache.set(key, result);
  return result;
}
function processRouteTree(routeTree2, caseSensitive = false) {
  const segmentTree = createSegmentNode();
  const dynamicListsToSort = [];
  const routesById = {};
  const routesByPath = {};
  let index = 0;
  function visit(route, start, parentNode, parentInterpolation) {
    route.init(index);
    if (route.id in routesById) {
      invariant();
    }
    routesById[route.id] = route;
    if (index !== 0 && route.path) {
      const trimmedFullPath = trimPathRight(route.fullPath);
      if (!routesByPath[trimmedFullPath] || route.fullPath.endsWith("/")) routesByPath[trimmedFullPath] = route;
    }
    index++;
    const [node, cursor, segments] = parseSegments(caseSensitive, route, start, parentNode, dynamicListsToSort, parentInterpolation);
    route._interpolation = segments;
    if (route.children) for (const child of route.children) visit(child, cursor, node, segments);
  }
  visit(routeTree2, 1, segmentTree);
  for (const nodes of dynamicListsToSort) nodes.sort(sortDynamic);
  return {
    processedTree: {
      segmentTree,
      singleCache: createSieveCache(1e3),
      matchCache: createSieveCache(1e3),
      flatCache: null,
      masksTree: null
    },
    routesById,
    routesByPath
  };
}
function findMatch(path, segmentTree, fuzzy = false) {
  const parts = path.split("/");
  const leaf = getNodeMatch(path, parts, segmentTree, fuzzy);
  if (!leaf) return null;
  const [rawParams] = extractParams(path, parts, leaf);
  return {
    route: leaf.node.route,
    rawParams
  };
}
function extractParams(path, parts, leaf) {
  const list = buildBranch(leaf.node);
  const names = leaf.node.data && getParamNames(leaf.node.data);
  const rawParams = /* @__PURE__ */ Object.create(null);
  let partIndex = leaf.extract?.part ?? 0;
  let nodeIndex = leaf.extract?.node ?? 0;
  let pathIndex = leaf.extract?.path ?? 0;
  let paramIndex = leaf.extract?.param ?? 0;
  for (; nodeIndex < list.length; partIndex++, nodeIndex++, pathIndex++) {
    const node = list[nodeIndex];
    if (node.kind === SEGMENT_TYPE_INDEX) break;
    if (node.kind === SEGMENT_TYPE_PATHLESS) {
      partIndex--;
      pathIndex--;
      continue;
    }
    const part = parts[partIndex];
    const currentPathIndex = pathIndex;
    if (part) pathIndex += part.length;
    if (node.kind === 1 || node.kind === 3) {
      const name = names[paramIndex++];
      if (node.kind === 3 && leaf.skipped & 1 << nodeIndex) {
        partIndex--;
        pathIndex = currentPathIndex - 1;
        continue;
      }
      const value = node.suffix || node.prefix ? part.substring(node.prefix.length, part.length - node.suffix.length) : part;
      if (value || node.kind === 1) rawParams[name] = decodeURIComponent(value);
    } else if (node.kind === 2) {
      const n = node;
      const value = path.substring(currentPathIndex + n.prefix.length, path.length - n.suffix.length);
      const splat = decodeURIComponent(value);
      rawParams["*"] = splat;
      rawParams._splat = splat;
      break;
    }
  }
  if (leaf.rawParams) Object.assign(rawParams, leaf.rawParams);
  return [rawParams, {
    part: partIndex,
    node: nodeIndex,
    path: pathIndex,
    param: paramIndex
  }];
}
function buildRouteBranch(route) {
  const list = [route];
  while (route.parentRoute) {
    route = route.parentRoute;
    list.push(route);
  }
  list.reverse();
  return list;
}
function buildBranch(node) {
  const list = Array(node.depth + 1);
  do {
    list[node.depth] = node;
    node = node.parent;
  } while (node);
  return list;
}
function getNodeMatch(path, parts, segmentTree, fuzzy) {
  if (path === "/" && segmentTree.index) return {
    node: segmentTree.index,
    skipped: 0
  };
  const trailingSlash = !last(parts);
  const pathIsIndex = trailingSlash && path !== "/";
  const partsLength = parts.length - (trailingSlash ? 1 : 0);
  const stack = [{
    node: segmentTree,
    index: 1,
    skipped: 0,
    statics: 0,
    dynamics: 0,
    optionals: 0
  }];
  let bestFuzzy = null;
  let bestMatch = null;
  while (stack.length) {
    const frame = stack.pop();
    const { node, index, skipped, statics, dynamics, optionals } = frame;
    let { extract, rawParams } = frame;
    if (node.kind === 2 && node.route && !isFrameMoreSpecific(bestMatch, frame)) continue;
    if (node.parse) {
      if (!validateParseParams(path, parts, frame)) continue;
      rawParams = frame.rawParams;
      extract = frame.extract;
    }
    if (fuzzy && node.route && node.kind !== SEGMENT_TYPE_INDEX && isFrameMoreSpecific(bestFuzzy, frame)) bestFuzzy = frame;
    const isBeyondPath = index === partsLength;
    if (isBeyondPath) {
      if (node.route && (!pathIsIndex || node.kind === SEGMENT_TYPE_INDEX || node.kind === 2) && isFrameMoreSpecific(bestMatch, frame)) bestMatch = frame;
      if (!node.optional && !node.wildcard && !node.index && !node.pathless) continue;
    }
    const part = isBeyondPath ? void 0 : parts[index];
    let lowerPart;
    if (isBeyondPath && node.index) {
      const indexFrame = {
        node: node.index,
        index,
        skipped,
        statics,
        dynamics,
        optionals,
        extract,
        rawParams
      };
      let indexValid = true;
      if (node.index.parse) {
        if (!validateParseParams(path, parts, indexFrame)) indexValid = false;
      }
      if (indexValid) {
        if (!dynamics && !optionals && !skipped && isPerfectStaticMatch(statics, partsLength)) return indexFrame;
        if (isFrameMoreSpecific(bestMatch, indexFrame)) bestMatch = indexFrame;
      }
    }
    if (node.wildcard) for (let i = node.wildcard.length - 1; i >= 0; i--) {
      const segment = node.wildcard[i];
      const { prefix, suffix } = segment;
      if (prefix) {
        if (isBeyondPath) continue;
        if (!(segment.caseSensitive ? part : lowerPart ??= part.toLowerCase()).startsWith(prefix)) continue;
      }
      if (suffix) {
        if (isBeyondPath) continue;
        const end = parts.slice(index).join("/");
        const suffixPart = end.slice(-suffix.length);
        if ((segment.caseSensitive ? suffixPart : suffixPart.toLowerCase()) !== suffix || end.length - suffix.length < prefix.length) continue;
      }
      stack.push({
        node: segment,
        index: partsLength,
        skipped,
        statics,
        dynamics,
        optionals,
        extract,
        rawParams
      });
    }
    if (node.optional) {
      const nextSkipped = skipped | 1 << node.depth + 1;
      for (let i = node.optional.length - 1; i >= 0; i--) {
        const segment = node.optional[i];
        stack.push({
          node: segment,
          index,
          skipped: nextSkipped,
          statics,
          dynamics,
          optionals,
          extract,
          rawParams
        });
      }
      if (!isBeyondPath) for (let i = node.optional.length - 1; i >= 0; i--) {
        const segment = node.optional[i];
        const { prefix, suffix } = segment;
        if (prefix || suffix) {
          const casePart = segment.caseSensitive ? part : lowerPart ??= part.toLowerCase();
          if (prefix && !casePart.startsWith(prefix)) continue;
          if (suffix && casePart.indexOf(suffix, casePart.length - suffix.length) < prefix.length) continue;
        }
        stack.push({
          node: segment,
          index: index + 1,
          skipped,
          statics,
          dynamics,
          optionals: optionals + segmentScore(partsLength, index),
          extract,
          rawParams
        });
      }
    }
    if (!isBeyondPath && node.dynamic && part) for (let i = node.dynamic.length - 1; i >= 0; i--) {
      const segment = node.dynamic[i];
      const { prefix, suffix } = segment;
      if (prefix || suffix) {
        const casePart = segment.caseSensitive ? part : lowerPart ??= part.toLowerCase();
        if (prefix && !casePart.startsWith(prefix)) continue;
        if (suffix && casePart.indexOf(suffix, casePart.length - suffix.length) < prefix.length) continue;
      }
      stack.push({
        node: segment,
        index: index + 1,
        skipped,
        statics,
        dynamics: dynamics + segmentScore(partsLength, index),
        optionals,
        extract,
        rawParams
      });
    }
    if (!isBeyondPath && node.staticInsensitive) {
      const match = node.staticInsensitive.get(lowerPart ??= part.toLowerCase());
      if (match) stack.push({
        node: match,
        index: index + 1,
        skipped,
        statics: statics + segmentScore(partsLength, index),
        dynamics,
        optionals,
        extract,
        rawParams
      });
    }
    if (!isBeyondPath && node.static) {
      const match = node.static.get(part);
      if (match) stack.push({
        node: match,
        index: index + 1,
        skipped,
        statics: statics + segmentScore(partsLength, index),
        dynamics,
        optionals,
        extract,
        rawParams
      });
    }
    if (node.pathless) for (let i = node.pathless.length - 1; i >= 0; i--) {
      const segment = node.pathless[i];
      stack.push({
        node: segment,
        index,
        skipped,
        statics,
        dynamics,
        optionals,
        extract,
        rawParams
      });
    }
  }
  if (bestMatch) return bestMatch;
  if (fuzzy && bestFuzzy) {
    let sliceIndex = bestFuzzy.index;
    for (let i = 0; i < bestFuzzy.index; i++) sliceIndex += parts[i].length;
    const splat = sliceIndex === path.length ? "/" : path.slice(sliceIndex);
    bestFuzzy.rawParams ??= /* @__PURE__ */ Object.create(null);
    bestFuzzy.rawParams["**"] = decodeURIComponent(splat);
    return bestFuzzy;
  }
  return null;
}
function segmentScore(partsLength, index) {
  return 2 ** (partsLength - index - 1);
}
function isPerfectStaticMatch(statics, partsLength) {
  return statics === 2 ** (partsLength - 1) - 1;
}
function validateParseParams(path, parts, frame) {
  let rawParams;
  let state;
  try {
    [rawParams, state] = extractParams(path, parts, frame);
  } catch {
    return null;
  }
  frame.rawParams = rawParams;
  frame.extract = state;
  if (!frame.node.parse) return true;
  try {
    if (frame.node.parse(rawParams) === false) return null;
  } catch {
  }
  return true;
}
function isFrameMoreSpecific(prev, next) {
  if (!prev) return true;
  return next.statics > prev.statics || next.statics === prev.statics && (next.dynamics > prev.dynamics || next.dynamics === prev.dynamics && (next.optionals > prev.optionals || next.optionals === prev.optionals && ((next.node.kind === SEGMENT_TYPE_INDEX) > (prev.node.kind === SEGMENT_TYPE_INDEX) || next.node.kind === SEGMENT_TYPE_INDEX === (prev.node.kind === SEGMENT_TYPE_INDEX) && next.node.depth > prev.node.depth)));
}
function encode(obj, stringify = String) {
  let result;
  for (const key in obj) {
    const val = obj[key];
    if (val !== void 0) (result ||= new URLSearchParams()).set(key, stringify(val));
  }
  return result ? result.toString() : "";
}
function toValue(str) {
  if (!str) return "";
  if (str === "false") return false;
  if (str === "true") return true;
  return +str * 0 === 0 && +str + "" === str ? +str : str;
}
function decode(str) {
  const searchParams = new URLSearchParams(str);
  const result = /* @__PURE__ */ Object.create(null);
  for (const [key, value] of searchParams.entries()) {
    const previousValue = result[key];
    if (previousValue == null) result[key] = toValue(value);
    else if (Array.isArray(previousValue)) previousValue.push(toValue(value));
    else result[key] = [previousValue, toValue(value)];
  }
  return result;
}
const jsonStart = /^(?:\s|["[{\d-]|fa|nu|tr)/;
const defaultParseSearch = parseSearchWith(JSON.parse);
const defaultStringifySearch = stringifySearchWith(JSON.stringify, JSON.parse);
function parseSearchWith(parser) {
  const isJsonParser = parser === JSON.parse;
  return (searchStr) => {
    if (searchStr[0] === "?") searchStr = searchStr.substring(1);
    const query = decode(searchStr);
    for (const key in query) {
      const value = query[key];
      if (typeof value === "string") {
        if (isJsonParser && !jsonStart.test(value)) continue;
        try {
          query[key] = parser(value);
        } catch (_err) {
        }
      }
    }
    return query;
  };
}
function stringifySearchWith(stringify, parser) {
  const isJsonParser = parser === JSON.parse;
  function stringifyValue(val) {
    if (val && typeof val === "object") try {
      return stringify(val);
    } catch (_err) {
    }
    else if (parser && typeof val === "string") {
      if (isJsonParser && !jsonStart.test(val)) return val;
      try {
        parser(val);
        return stringify(val);
      } catch (_err) {
      }
    }
    return val;
  }
  return (search) => {
    const searchStr = encode(search, stringifyValue);
    return searchStr ? `?${searchStr}` : "";
  };
}
function createNonReactiveMutableStore(initialValue) {
  let value = initialValue;
  return {
    get() {
      return value;
    },
    set(nextOrUpdater) {
      value = functionalUpdate$1(nextOrUpdater, value);
    }
  };
}
function createNonReactiveReadonlyStore(read) {
  return { get() {
    return read();
  } };
}
function createRouterStores(initialLocation, config) {
  const { createMutableStore, createReadonlyStore, batch } = config;
  const byRoute = /* @__PURE__ */ new Map();
  const status = createMutableStore("idle");
  const location = createMutableStore(initialLocation);
  const resolvedLocation = createMutableStore(void 0);
  const ids = createMutableStore([]);
  const matches = createReadonlyStore(() => ids.get().map((id) => byRoute.get(id).get()));
  const __store = createReadonlyStore(() => ({
    status: status.get(),
    isLoading: status.get() === "pending",
    matches: matches.get(),
    location: location.get(),
    resolvedLocation: resolvedLocation.get()
  }));
  function getMatchStore(routeId) {
    let matchStore = byRoute.get(routeId);
    if (!matchStore) {
      matchStore = createMutableStore(void 0);
      byRoute.set(routeId, matchStore);
    }
    return matchStore;
  }
  const store = {
    status,
    location,
    resolvedLocation,
    ids,
    matches,
    byRoute,
    __store,
    getMatchStore,
    setMatches
  };
  function setMatches(nextMatches) {
    const previousIds = ids.get();
    const nextIds = nextMatches.map((match) => match.routeId);
    batch(() => {
      if (!arraysEqual(previousIds, nextIds)) ids.set(nextIds);
      for (const id of previousIds) if (!nextIds.includes(id)) byRoute.get(id).set(() => void 0);
      for (const nextMatch of nextMatches) {
        const matchStore = getMatchStore(nextMatch.routeId);
        if (matchStore.get() !== nextMatch) matchStore.set(nextMatch);
      }
    });
  }
  return store;
}
function isExternalUrl(url, origin) {
  return url.protocol !== "http:" && url.protocol !== "https:" || url.origin !== origin || !!url.username || !!url.password;
}
function getUrlPath(url) {
  return url.pathname + url.search + url.hash;
}
function routeNeedsLoad(route) {
  return route.options.loader || route.options.beforeLoad || route.lazyFn || route.options.component?.preload || route.options.pendingComponent?.preload;
}
function getLocationChangeInfo(location, resolvedLocation) {
  return {
    fromLocation: resolvedLocation,
    toLocation: location,
    pathChanged: resolvedLocation?.pathname !== location.pathname,
    hrefChanged: resolvedLocation?.href !== location.href,
    hashChanged: resolvedLocation?.hash !== location.hash
  };
}
function lifecycleEnd(matches) {
  return matches.findIndex((match) => match.status === "error" || match.status === "notFound" || match._notFound) + 1;
}
function runRouteLifecycle(router2, previous, matches, previousEnd, nextEnd, owner) {
  if (previousEnd) previous = previous.slice(0, previousEnd);
  if (nextEnd) matches = matches.slice(0, nextEnd);
  for (const match of previous) {
    if (!matches.some((candidate) => candidate.routeId === match.routeId)) router2.routesById[match.routeId].options.onLeave?.(match);
  }
  for (const match of matches) {
    router2.routesById[match.routeId].options[previous.some((candidate) => candidate.routeId === match.routeId) ? "onStay" : "onEnter"]?.(match);
  }
}
var RouterCore = class {
  /**
  * @deprecated Use the `createRouter` function instead
  */
  constructor(options, getStoreConfig) {
    this.tempLocationKey = `${Math.round(Math.random() * 1e7)}`;
    this._scroll = { next: true };
    this.subscribers = /* @__PURE__ */ new Set();
    this._cache = /* @__PURE__ */ new Map();
    this._committed = [];
    this.startTransition = async (fn) => {
      fn();
      return false;
    };
    this.update = (newOptions) => {
      const prevOptions = this.options;
      this.options = {
        ...prevOptions,
        ...newOptions
      };
      this.isServer = this.options.isServer ?? isServer$2 ?? typeof document === "undefined";
      this.protocolAllowlist = new Set(this.options.protocolAllowlist);
      if (!this.history || this.options.history && this.options.history !== this.history) if (!this.options.history) ;
      else this.history = this.options.history;
      this.origin = this.options.origin;
      if (!this.origin) this.origin = "http://localhost";
      const nextBasepath = this.options.basepath ?? "/";
      const nextRewriteOption = this.options.rewrite;
      const rewriteChanged = this.basepath !== nextBasepath || prevOptions?.rewrite !== nextRewriteOption || prevOptions?.caseSensitive !== this.options.caseSensitive;
      if (rewriteChanged) {
        this.basepath = nextBasepath;
        this.rewrite = nextBasepath !== "/" && trimPath(nextBasepath) ? rewriteBasepath(nextBasepath, this.options.caseSensitive, nextRewriteOption) : nextRewriteOption;
      }
      if (this.history) this.updateLatestLocation();
      if (this.options.routeTree !== this.routeTree || prevOptions?.caseSensitive !== this.options.caseSensitive) {
        this.routeTree = this.options.routeTree;
        let processRouteTreeResult;
        if (globalThis.__TSR_CACHE__ && globalThis.__TSR_CACHE__.routeTree === this.routeTree && globalThis.__TSR_CACHE__.caseSensitive === this.options.caseSensitive) processRouteTreeResult = globalThis.__TSR_CACHE__.processRouteTreeResult;
        else {
          processRouteTreeResult = this.buildRouteTree();
          if (globalThis.__TSR_CACHE__ === void 0) globalThis.__TSR_CACHE__ = {
            routeTree: this.routeTree,
            caseSensitive: this.options.caseSensitive,
            processRouteTreeResult
          };
        }
        this.setRoutes(processRouteTreeResult);
      }
      if (!this.stores) {
        if (this.latestLocation) {
          const config = this.getStoreConfig(this);
          this.batch = config.batch;
          this.stores = createRouterStores(this.latestLocation, config);
        }
      } else if (rewriteChanged) this.stores.location.set(this.latestLocation);
    };
    this.updateLatestLocation = () => {
      this.latestLocation = this.parseLocation(this.history.location, this.latestLocation);
    };
    this.buildRouteTree = () => {
      const result = processRouteTree(this.routeTree, this.options.caseSensitive);
      if (this.options.routeMasks) processRouteMasks(this.options.routeMasks, result.processedTree);
      return {
        ...result,
        resolvePathCache: createSieveCache(1e3)
      };
    };
    this.subscribe = (eventType, fn) => {
      const listener = {
        eventType,
        fn
      };
      this.subscribers.add(listener);
      return () => {
        this.subscribers.delete(listener);
      };
    };
    this.emit = (routerEvent) => {
      for (const listener of this.subscribers) if (listener.eventType === routerEvent.type) try {
        listener.fn(routerEvent);
      } catch (e) {
        console.error(e);
      }
    };
    this.parseLocation = (locationToParse, previousLocation) => {
      const parse = ({ pathname, search, hash, href }, state) => {
        if (!this.rewrite && !/[ \x00-\x1f\x7f\u0080-\uffff]/.test(pathname)) {
          const parsedSearch2 = this.options.parseSearch(search);
          const searchStr2 = this.options.stringifySearch(parsedSearch2);
          return {
            href: pathname + searchStr2 + hash,
            publicHref: pathname + searchStr2 + hash,
            pathname: decodePath(pathname),
            external: false,
            searchStr: searchStr2,
            search: nullReplaceEqualDeep(previousLocation?.search, parsedSearch2),
            hash: decodePath(hash.slice(1)),
            state: replaceEqualDeep$1(previousLocation?.state, state)
          };
        }
        const url = executeRewriteInput(this.rewrite, new URL(href, this.origin));
        const parsedSearch = this.options.parseSearch(url.search);
        const searchStr = this.options.stringifySearch(parsedSearch);
        url.search = searchStr;
        return {
          href: url.href.replace(url.origin, ""),
          publicHref: href,
          pathname: decodePath(normalizeProtocolRelative(url.pathname)),
          external: !!this.rewrite && isExternalUrl(url, this.origin),
          searchStr,
          search: nullReplaceEqualDeep(previousLocation?.search, parsedSearch),
          hash: decodePath(url.hash.slice(1)),
          state: replaceEqualDeep$1(previousLocation?.state, state)
        };
      };
      const location = parse(locationToParse, locationToParse.state);
      const { __tempLocation, __tempKey } = location.state;
      if (__tempLocation && (!__tempKey || __tempKey === this.tempLocationKey)) {
        const parsedTempLocation = parse(__tempLocation, {
          ...__tempLocation.state,
          __tempLocation: void 0,
          key: location.state.key,
          __TSR_key: location.state.__TSR_key
        });
        parsedTempLocation.maskedLocation = location;
        return parsedTempLocation;
      }
      return location;
    };
    this.matchRoutes = (pathnameOrNext, locationSearchOrOpts, opts) => {
      if (typeof pathnameOrNext === "string") return this.matchRoutesInternal({
        pathname: pathnameOrNext,
        search: locationSearchOrOpts
      }, opts);
      return this.matchRoutesInternal(pathnameOrNext, locationSearchOrOpts);
    };
    this.getMatchedRoutes = (pathname) => {
      const rawParams = /* @__PURE__ */ Object.create(null);
      const match = findRouteMatch(trimPathRight(pathname), this.processedTree, true);
      if (match) Object.assign(rawParams, match.rawParams);
      return [
        match?.branch || [this.routesById["__root__"]],
        rawParams,
        match?.route
      ];
    };
    this.buildLocation = (opts) => {
      const build = (dest = {}) => {
        if (dest.href) {
          const parsed = parseHref(dest.href, {});
          dest = {
            ...dest,
            to: executeRewriteInput(this.rewrite, new URL(parsed.pathname, this.origin)).pathname,
            search: this.options.parseSearch(parsed.search),
            hash: parsed.hash.slice(1)
          };
        }
        const currentLocation = dest._fromLocation || this._pendingLocation || this.latestLocation;
        let lightweight;
        const current = () => {
          return currentLocation;
        };
        const currentMatch = () => {
          return lightweight ??= this.matchRoutesLightweight(currentLocation);
        };
        const to = dest.to ? `${dest.to}` : ".";
        const nextTo = resolvePath(to[0] === "/" ? "" : dest.unsafeRelative === "path" ? current().pathname : dest.from ?? currentMatch()[1], to, this.options.trailingSlash, this.resolvePathCache);
        const destRoute = this.routesByPath[trimPathRight(nextTo)];
        const isTemplate = nextTo.includes("$");
        let destRoutes;
        if (destRoute) destRoutes = destRoute._branch ??= buildRouteBranch(destRoute);
        else if (isTemplate) destRoutes = [];
        else {
          const [matchedRoutes, rawParams, foundRoute] = this.getMatchedRoutes(nextTo);
          destRoutes = matchedRoutes;
          if (this.options.notFoundRoute && (!foundRoute || foundRoute.path !== "/" && rawParams["**"])) destRoutes = [...destRoutes, this.options.notFoundRoute];
        }
        const interpolation = isTemplate ? destRoute?._interpolation ?? parseSegments(false, { fullPath: nextTo }, 0) : void 0;
        let nextParams;
        for (const route of destRoutes) {
          const fn = route.options.params?.stringify ?? route.options.stringifyParams;
          if (fn) {
            const fromParams = currentMatch()[3];
            nextParams ??= resolveNextParams(dest.params, fromParams);
            if (!hasKeys(nextParams)) break;
            if (nextParams === fromParams) nextParams = Object.assign(createNull(), nextParams);
            try {
              Object.assign(nextParams, fn(nextParams));
            } catch {
            }
          }
        }
        nextParams ??= resolveNextParams(dest.params, needsInheritedParams(dest.params, interpolation) ? currentMatch()[3] : EMPTY_RECORD);
        const nextPathname = opts.leaveParams ? nextTo : normalizeProtocolRelative(decodePath(interpolation ? interpolatePath(nextTo, interpolation, nextParams, this.pathParamsDecoder) : nextTo));
        const middlewares = getSearchMiddlewares(destRoutes, opts._includeValidateSearch);
        const fromSearch = () => {
          let search = currentMatch()[2];
          if (opts._includeValidateSearch && this.options.search?.strict) {
            const validatedSearch = {};
            destRoutes.forEach((route) => {
              if (route.options.validateSearch) try {
                Object.assign(validatedSearch, validateSearch(route.options.validateSearch, {
                  ...validatedSearch,
                  ...search
                }));
              } catch {
              }
            });
            search = validatedSearch;
          }
          return search;
        };
        const nextSearch = middlewares.length ? applySearchMiddleware(middlewares, fromSearch(), dest) : dest.search === true ? fromSearch() : typeof dest.search === "function" ? dest.search(fromSearch()) : dest.search || EMPTY_RECORD;
        const searchStr = this.options.stringifySearch(nextSearch);
        const hash = dest.hash === true ? current().hash : typeof dest.hash === "function" ? dest.hash(current().hash) : dest.hash || void 0;
        const hashStr = hash ? `#${hash}` : "";
        const nextState = !dest.state ? EMPTY_RECORD : dest.state === true ? current().state : typeof dest.state === "function" ? dest.state(current().state) : dest.state;
        const fullPath = `${nextPathname}${searchStr}${hashStr}`;
        let href;
        let publicHref;
        let external = false;
        if (this.rewrite) {
          const url = new URL(fullPath, this.origin);
          const origin = url.origin;
          const rewrittenUrl = executeRewriteOutput(this.rewrite, url);
          href = getUrlPath(url);
          if (isExternalUrl(rewrittenUrl, origin)) {
            publicHref = rewrittenUrl.href;
            external = true;
          } else publicHref = normalizeProtocolRelative(getUrlPath(rewrittenUrl));
        } else {
          href = encodePathLikeUrl(fullPath);
          publicHref = href;
        }
        return {
          publicHref,
          href,
          pathname: nextPathname,
          search: nextSearch,
          searchStr,
          state: nextState,
          hash: hash ?? "",
          external,
          unmaskOnReload: dest.unmaskOnReload
        };
      };
      const next = build(opts);
      if (opts.mask) next.maskedLocation = build({
        from: opts.from,
        ...opts.mask
      });
      else if (this.options.routeMasks) {
        const match = findFlatMatch(next.pathname, this.processedTree);
        if (match) {
          const params = Object.assign(createNull(), match.rawParams);
          const { from: _from, params: maskParams, ...maskProps } = match.route;
          const nextParams = resolveNextParams(maskParams, params);
          next.maskedLocation = build({
            from: opts.from,
            ...maskProps,
            params: nextParams
          });
        }
      }
      return next;
    };
    this.commitLocation = async ({ viewTransition, ignoreBlocker, ...next }) => {
      return;
    };
    this.buildAndCommitLocation = ({ replace, resetScroll, hashScrollIntoView, viewTransition, ignoreBlocker, ...rest } = {}) => {
      return Promise.resolve();
    };
    this.navigate = async ({ to, reloadDocument, href, publicHref, ...rest }) => {
      return;
    };
    this.load = async (opts) => {
      return loadServerRoute(this, opts);
    };
    this.startViewTransition = (fn) => {
      this.shouldViewTransition ?? this.options.defaultViewTransition;
      this.shouldViewTransition = void 0;
      return fn();
    };
    this.invalidate = (opts) => {
      const committedMatches = this._committed;
      const filter = opts?.filter;
      const preloads = this._preloads;
      const invalidIds = /* @__PURE__ */ new Set();
      const consider = (match) => {
        if (!filter || filter(match)) invalidIds.add(match.id);
      };
      committedMatches.forEach(consider);
      this._cache.forEach(consider);
      preloads?.forEach((matches) => matches.forEach(consider));
      this._tx?.[3].forEach(consider);
      const discardedPreloads = [];
      for (const [controller, matches] of preloads ?? []) if (matches.some((match) => invalidIds.has(match.id))) {
        preloads.delete(controller);
        discardedPreloads.push(controller);
      }
      const invalidate = (d) => {
        if (invalidIds.has(d.id)) {
          const route = this.routesById[d.routeId];
          const next = {
            ...d,
            invalid: true,
            ...(opts?.forcePending || d.status === "error" || d.status === "notFound") && routeNeedsLoad(route) ? {
              status: "pending",
              error: void 0
            } : void 0
          };
          d._flight = void 0;
          return next;
        }
        return d;
      };
      this._committed = committedMatches.map(invalidate);
      for (const [id, match] of this._cache) if (invalidIds.has(id)) {
        match.invalid = true;
        if (opts?.forcePending) match.status = "pending";
      }
      for (const id of invalidIds) this._flights?.delete(id);
      for (const controller of discardedPreloads) controller.abort();
      this.shouldViewTransition = false;
      return this.load({ sync: opts?.sync });
    };
    this.resolveRedirect = (redirect2) => {
      const options2 = redirect2.options;
      let href = redirect2.headers.get("Location") || options2.href;
      if (!href) {
        const location = this.buildLocation(options2);
        href = (location.maskedLocation ?? location).publicHref || "/";
      }
      let scheme;
      if (protocolRelativePrefixRegex.test(href) || (scheme = getUrlScheme(href)) && !this.protocolAllowlist.has(scheme)) throw new Error("Redirect blocked: unsafe protocol");
      if (scheme === "http:" || scheme === "https:") {
        const url = new URL(href);
        if (url.pathname.startsWith("//")) href = url.href;
        else if (!isExternalUrl(url, this.origin)) {
          href = getUrlPath(url);
          scheme = void 0;
        }
      }
      if (scheme) options2.reloadDocument = true;
      options2.href = href;
      redirect2.headers.set("Location", href);
      return redirect2;
    };
    this.clearCache = (opts) => {
      const cached = this._cache;
      const preloads = this._preloads;
      const filter = opts?.filter;
      const discarded = [];
      const discardedIds = [];
      for (const [id, match] of cached) if (!filter || filter(match)) {
        discardedIds.push(id);
        discarded.push(match);
      }
      const abort = [];
      for (const [controller, matches] of preloads ?? []) if (!filter || matches.some(filter)) {
        abort.push(controller);
        discarded.push(...matches);
      }
      for (const id of discardedIds) cached.delete(id);
      for (const controller of abort) preloads.delete(controller);
      for (const match of discarded) {
        const flight = match._flight;
        match._flight = void 0;
        if (flight && !--flight[2]) {
          if (this._flights?.get(match.id) === flight) this._flights.delete(match.id);
          abort.push(flight[1]);
        }
      }
      for (const controller of abort) controller.abort();
    };
    this.loadRouteChunk = loadRouteChunk;
    this.preloadRoute = (opts) => preloadClientRoute(this, opts);
    this.matchRoute = (location, opts) => {
      const matchLocation = {
        ...location,
        to: location.to ? resolvePath(location.from || "", location.to, this.options.trailingSlash, this.resolvePathCache) : void 0,
        params: location.params || {},
        leaveParams: true
      };
      const next = this.buildLocation(matchLocation);
      const isPending = this.stores.status.get() === "pending";
      if (opts?.pending && !isPending) return false;
      const baseLocation = opts?.pending ?? !isPending ? this.latestLocation : this.stores.resolvedLocation.get() || this.stores.location.get();
      const match = findSingleMatch(next.pathname, opts?.caseSensitive ?? false, opts?.fuzzy ?? false, baseLocation.pathname, this.processedTree);
      if (!match) return false;
      if (location.params) {
        if (!deepEqual(match.rawParams, location.params, true)) return false;
      }
      if (opts?.includeSearch ?? true) return deepEqual(baseLocation.search, next.search, true) ? match.rawParams : false;
      return match.rawParams;
    };
    this.getStoreConfig = getStoreConfig;
    if (options.pathParamsAllowedCharacters?.length) this.pathParamsDecoder = compileDecodeCharMap(options.pathParamsAllowedCharacters);
    this.update({
      defaultPreloadDelay: 50,
      defaultPendingMs: 1e3,
      defaultPendingMinMs: 500,
      context: void 0,
      ...options,
      caseSensitive: options.caseSensitive ?? false,
      notFoundMode: options.notFoundMode ?? "fuzzy",
      stringifySearch: options.stringifySearch ?? defaultStringifySearch,
      parseSearch: options.parseSearch ?? defaultParseSearch,
      protocolAllowlist: options.protocolAllowlist ?? DEFAULT_PROTOCOL_ALLOWLIST
    });
  }
  isShell() {
    return !!this.options.isShell;
  }
  get state() {
    return this.stores.__store.get();
  }
  setRoutes(caches) {
    Object.assign(this, caches);
    this.lightweightCache = /* @__PURE__ */ new WeakMap();
    const notFoundRoute = this.options.notFoundRoute;
    if (notFoundRoute) {
      notFoundRoute.init(99999999999);
      if (this.routesById[notFoundRoute.id] !== notFoundRoute) notFoundRoute._interpolation = parseSegments(false, notFoundRoute, 0);
      this.routesById[notFoundRoute.id] = notFoundRoute;
    }
  }
  matchRoutesInternal(next, opts) {
    const [initialMatchedRoutes, rawParams, foundRoute] = this.getMatchedRoutes(next.pathname);
    let matchedRoutes = initialMatchedRoutes;
    let isGlobalNotFound = false;
    if (foundRoute ? foundRoute.path !== "/" && rawParams["**"] : trimPathRight(next.pathname)) if (this.options.notFoundRoute) matchedRoutes = [...matchedRoutes, this.options.notFoundRoute];
    else isGlobalNotFound = true;
    const _notFoundRouteId = isGlobalNotFound ? findGlobalNotFoundRouteId(this.options.notFoundMode, matchedRoutes) : void 0;
    const matches = new Array(matchedRoutes.length);
    const committed = this._committed;
    const previousAt = (route, index) => {
      const match = committed[index];
      return match?.routeId === route.id ? match : route === this.options.notFoundRoute ? committed.find((candidate) => candidate.routeId === route.id) : void 0;
    };
    let strictParams;
    for (let index = 0; index < matchedRoutes.length; index++) {
      const route = matchedRoutes[index];
      const parentMatch = matches[index - 1];
      let preMatchSearch;
      let strictMatchSearch;
      let searchError;
      {
        const parentSearch = parentMatch?.search ?? next.search;
        const parentStrictSearch = parentMatch?._strictSearch ?? void 0;
        try {
          const strictSearch = validateSearch(route.options.validateSearch, { ...parentSearch }) ?? void 0;
          preMatchSearch = {
            ...parentSearch,
            ...strictSearch
          };
          strictMatchSearch = {
            ...parentStrictSearch,
            ...strictSearch
          };
        } catch (err) {
          let searchParamError = err;
          if (!(err instanceof SearchParamError)) searchParamError = new SearchParamError(err.message, { cause: err });
          if (opts?.throwOnError) throw searchParamError;
          preMatchSearch = parentSearch;
          strictMatchSearch = {};
          searchError = searchParamError;
        }
      }
      let loaderDeps = "";
      let loaderDepsHash = "";
      try {
        loaderDeps = route.options.loaderDeps?.({ search: preMatchSearch }) ?? "";
        loaderDepsHash = loaderDeps ? JSON.stringify(loaderDeps) || "" : "";
      } catch (cause2) {
        if (opts?.throwOnError) throw cause2;
        searchError ??= cause2;
      }
      const usedParams = createNull();
      const interpolatedPath = route._interpolation ? interpolatePath(route.fullPath, route._interpolation, rawParams, this.pathParamsDecoder, usedParams) : route.fullPath;
      const matchId = route.id + interpolatedPath + loaderDepsHash;
      const previousMatch = previousAt(route, index);
      const existingMatch = this._cache.get(matchId) ?? (previousMatch?.id === matchId ? previousMatch : void 0);
      strictParams = existingMatch?._strictParams ?? Object.assign(usedParams, strictParams);
      let paramsError;
      if (!existingMatch) try {
        extractStrictParams(route, strictParams);
      } catch (err) {
        if (isNotFound(err) || isRedirect(err)) paramsError = err;
        else paramsError = new PathParamError(err.message, { cause: err });
        if (opts?.throwOnError) throw paramsError;
      }
      const cause = previousMatch ? "stay" : "enter";
      let match;
      if (existingMatch) match = {
        ...existingMatch,
        cause,
        search: previousMatch ? nullReplaceEqualDeep(previousMatch.search, preMatchSearch) : nullReplaceEqualDeep(existingMatch.search, preMatchSearch),
        _strictSearch: strictMatchSearch,
        searchError
      };
      else {
        const status = routeNeedsLoad(route) ? "pending" : "success";
        match = {
          id: matchId,
          ssr: void 0,
          index,
          routeId: route.id,
          params: previousMatch?.params ?? strictParams,
          _strictParams: strictParams,
          pathname: interpolatedPath,
          updatedAt: Date.now(),
          search: previousMatch ? nullReplaceEqualDeep(previousMatch.search, preMatchSearch) : preMatchSearch,
          _strictSearch: strictMatchSearch,
          searchError,
          status,
          isFetching: false,
          error: void 0,
          paramsError,
          context: {},
          abortController: opts?._controller ?? new AbortController(),
          cause,
          loaderDeps: previousMatch ? replaceEqualDeep$1(previousMatch.loaderDeps, loaderDeps) : loaderDeps,
          invalid: false,
          preload: false,
          staticData: route.options.staticData || {},
          fullPath: route.fullPath
        };
      }
      const _notFound = _notFoundRouteId === route.id;
      if (match._notFound && !_notFound) match.error = void 0;
      match._notFound = _notFound;
      matches[index] = match;
    }
    for (let index = 0; index < matches.length; index++) {
      const match = matches[index];
      match.params = match.cause === "stay" ? nullReplaceEqualDeep(match.params, strictParams) : strictParams;
      if (opts?._controller) match.context = {};
    }
    return matches;
  }
  /**
  * Lightweight route matching for buildLocation.
  * Only computes fullPath, accumulated search, and params - skipping expensive
  * operations like AbortController, loaderDeps, and full match objects.
  */
  matchRoutesLightweight(location) {
    const lastRouteId = last(this.stores.ids.get());
    const lastStateMatch = lastRouteId ? this.stores.byRoute.get(lastRouteId).get() : void 0;
    const lastStateMatchId = lastStateMatch?.id;
    const cached = this.lightweightCache.get(location);
    if (cached && cached[0] === lastStateMatchId) return cached[1];
    const [matchedRoutes, rawParams] = this.getMatchedRoutes(location.pathname);
    const lastRoute = last(matchedRoutes);
    const accumulatedSearch = { ...location.search };
    for (const route of matchedRoutes) try {
      Object.assign(accumulatedSearch, validateSearch(route.options.validateSearch, accumulatedSearch));
    } catch {
    }
    const canReuseParams = lastStateMatch && lastStateMatch.routeId === lastRoute.id && lastStateMatch.pathname === location.pathname;
    let params;
    if (canReuseParams) params = lastStateMatch.params;
    else {
      const strictParams = rawParams;
      for (const route of matchedRoutes) try {
        extractStrictParams(route, strictParams);
      } catch {
      }
      params = strictParams;
    }
    const result = [
      matchedRoutes,
      lastRoute.fullPath,
      accumulatedSearch,
      params
    ];
    this.lightweightCache.set(location, [lastStateMatchId, result]);
    return result;
  }
};
var SearchParamError = class extends Error {
};
var PathParamError = class extends Error {
};
function validateSearch(validateSearch2, input) {
  if (validateSearch2 == null) return {};
  if ("~standard" in validateSearch2) {
    const result = validateSearch2["~standard"].validate(input);
    if (result instanceof Promise) throw new SearchParamError("Async validation not supported");
    if (result.issues) throw new SearchParamError(JSON.stringify(result.issues, void 0, 2), { cause: result });
    return result.value;
  }
  if ("parse" in validateSearch2) return validateSearch2.parse(input);
  if (typeof validateSearch2 === "function") return validateSearch2(input);
  return {};
}
function resolveNextParams(spec, base) {
  if (spec === void 0 || spec === true) return base;
  const next = /* @__PURE__ */ Object.create(null);
  if (spec === false || spec === null) return next;
  if (typeof spec === "function") {
    Object.assign(next, base);
    return Object.assign(next, spec(next));
  }
  return Object.assign(next, base, spec);
}
function needsInheritedParams(spec, interpolation) {
  if (typeof spec === "function") return true;
  if (!interpolation || spec === false || spec === null) return false;
  return spec === void 0 || spec === true || interpolation.some((part) => typeof part !== "string" && !hasOwn$1.call(spec, part[1]));
}
const EMPTY_RECORD = Object.freeze({});
function getSearchMiddlewares(destRoutes, includeValidateSearch) {
  const middlewares = [];
  for (let i = 0; i < destRoutes.length; i++) {
    const routeOptions = destRoutes[i].options;
    if ("search" in routeOptions) {
      if (routeOptions.search?.middlewares) middlewares.push(...routeOptions.search.middlewares);
    } else if (routeOptions.preSearchFilters || routeOptions.postSearchFilters) {
      const legacyMiddleware = ({ search, next }) => {
        const result = next(routeOptions.preSearchFilters ? routeOptions.preSearchFilters.reduce((prev, next2) => next2(prev), search) : search);
        return routeOptions.postSearchFilters ? routeOptions.postSearchFilters.reduce((prev, next2) => next2(prev), result) : result;
      };
      middlewares.push(legacyMiddleware);
    }
    const routeValidateSearch = routeOptions.validateSearch;
    if (includeValidateSearch && routeValidateSearch) {
      const validate = ({ search, next, meta }) => {
        const result = next(search);
        try {
          const validated = validateSearch(routeValidateSearch, result);
          if (meta && validated) {
            for (const key in validated) if (!(key in result)) (meta.defaulted ||= /* @__PURE__ */ new Map()).set(key, validated[key]);
          }
          return {
            ...result,
            ...validated
          };
        } catch {
        }
        return result;
      };
      middlewares.push(validate);
    }
  }
  return middlewares;
}
function applySearchMiddleware(middlewares, search, dest) {
  const applyNext = (index, currentSearch, meta) => {
    if (index >= middlewares.length) {
      if (!dest.search) return {};
      if (dest.search === true) return currentSearch;
      const result = functionalUpdate$1(dest.search, currentSearch);
      if (meta) meta.explicit = result;
      return result;
    }
    const next = (newSearch, collectMeta) => {
      if (collectMeta) {
        const nextMeta = meta || {};
        return {
          search: applyNext(index + 1, newSearch, nextMeta),
          meta: nextMeta
        };
      }
      return applyNext(index + 1, newSearch, meta);
    };
    return middlewares[index]({
      search: currentSearch,
      next,
      meta
    });
  };
  return applyNext(0, search);
}
function findGlobalNotFoundRouteId(notFoundMode, routes) {
  if (notFoundMode !== "root") {
    let fallback;
    for (let i = routes.length - 1; i >= 0; i--) {
      const route = routes[i];
      if (route.options.notFoundComponent) return route.id;
      fallback ||= route.children && route.id;
    }
    if (fallback) return fallback;
  }
  return rootRouteId;
}
function extractStrictParams(route, accumulatedParams) {
  const parseParams = route.options.params?.parse ?? route.options.parseParams;
  if (parseParams) Object.assign(accumulatedParams, parseParams(accumulatedParams));
}
const SUCCESS = 0;
const ERROR = 1;
const NOT_FOUND = 2;
const REDIRECTED = 3;
const SKIPPED = 4;
const MATCH_SETTLED_ABORT_REASON = Object.freeze({
  name: "AbortError",
  message: "TanStack Router aborted this server match because it settled."
});
const REDIRECT_ABORT_REASON = Object.freeze({
  name: "AbortError",
  message: "TanStack Router aborted this server match because of a redirect."
});
function getRoute(router2, match) {
  return router2.routesById[match.routeId];
}
function normalize(value, rejected) {
  if (isRedirect(value)) return [REDIRECTED, value];
  if (isNotFound(value)) return [NOT_FOUND, value];
  if (rejected && typeof value?.then === "function") value = new Error("A Promise was thrown", { cause: value });
  return rejected ? [ERROR, value] : [SUCCESS, value];
}
function normalizeError(router2, lane, route, cause, signal, notify = true) {
  signal?.throwIfAborted();
  let outcome = normalize(cause, true);
  if (outcome[0] !== ERROR) return materializeRedirect(router2, lane, route, outcome, signal, notify);
  try {
    route.options.onError?.(outcome[1]);
  } catch (onErrorCause) {
    outcome = normalize(onErrorCause, true);
  }
  signal?.throwIfAborted();
  return materializeRedirect(router2, lane, route, outcome, signal, notify);
}
function materializeRedirect(router2, lane, route, outcome, signal, notify = true) {
  if (outcome[0] !== REDIRECTED) return outcome;
  signal?.throwIfAborted();
  try {
    outcome[1].options._fromLocation = lane.location;
    router2.resolveRedirect(outcome[1]);
    signal?.throwIfAborted();
    return outcome;
  } catch (cause) {
    signal?.throwIfAborted();
    return notify ? normalizeError(router2, lane, route, cause, signal, false) : [ERROR, cause];
  }
}
function maybe(value, cause) {
  if (cause !== void 0) return {
    status: "error",
    error: cause
  };
  return {
    status: "success",
    value
  };
}
function navigateFrom(router2, location) {
  return (options) => router2.navigate({
    ...options,
    _fromLocation: location
  });
}
function waitFor(value, signal) {
  return signal ? waitForReason(value, signal) : value;
}
function resolveSsr(router2, lane, index) {
  const match = lane.matches[index];
  const route = getRoute(router2, match);
  const parentSsr = lane.matches[index - 1]?.ssr;
  if (router2.isShell()) return route.id === rootRouteId;
  if (parentSsr === false) return false;
  const inherit = (value) => {
    return value === true && parentSsr === "data-only" ? "data-only" : value;
  };
  const defaultSsr = router2.options.defaultSsr ?? true;
  const inheritedDefault = inherit(defaultSsr);
  match.ssr = inheritedDefault;
  const option = route.options.ssr;
  if (option === void 0) return inheritedDefault;
  if (typeof option !== "function") return inherit(option);
  const context = {
    search: maybe(match.search, match.searchError),
    params: maybe(match.params, match.paramsError),
    location: lane.location,
    matches: lane.matches.map((candidate) => ({
      index: candidate.index,
      pathname: candidate.pathname,
      fullPath: candidate.fullPath,
      staticData: candidate.staticData,
      id: candidate.id,
      routeId: candidate.routeId,
      search: maybe(candidate.search, candidate.searchError),
      params: maybe(candidate.params, candidate.paramsError),
      ssr: candidate.ssr
    }))
  };
  try {
    return Promise.resolve(option(context)).then((value) => inherit(value ?? defaultSsr));
  } catch (cause) {
    return Promise.reject(cause);
  }
}
function stampNotFound(match, outcome) {
  if (outcome[0] === NOT_FOUND && !outcome[1].routeId) outcome[1].routeId = match.routeId;
  return outcome;
}
async function contextualize(router2, lane, signal) {
  const globalBoundary = lane.matches.findIndex((match) => match._notFound);
  let end = globalBoundary < 0 ? lane.matches.length : globalBoundary + 1;
  let failure;
  let parentContext = { ...router2.options.context ?? {} };
  for (let index = 0; index < end; index++) {
    const match = lane.matches[index];
    const route = getRoute(router2, match);
    try {
      const ssr = resolveSsr(router2, lane, index);
      match.ssr = ssr instanceof Promise ? await ssr : ssr;
    } catch (cause) {
      signal?.throwIfAborted();
      failure = [index, stampNotFound(match, normalizeError(router2, lane, route, cause, signal))];
      end = index;
    }
    signal?.throwIfAborted();
    if (failure?.[1][0] === REDIRECTED) break;
    match.__beforeLoadContext = void 0;
    let context = parentContext;
    try {
      let routeContext;
      if (route.options.context) {
        const routeContextOptions = {
          deps: match.loaderDeps,
          params: match.params,
          context: parentContext,
          location: lane.location,
          navigate: navigateFrom(router2, lane.location),
          buildLocation: router2.buildLocation,
          cause: match.cause,
          abortController: match.abortController,
          preload: false,
          matches: lane.matches,
          routeId: route.id
        };
        routeContext = route.options.context(routeContextOptions) ?? void 0;
      }
      context = {
        ...parentContext,
        ...routeContext
      };
      match.context = context;
    } catch (cause) {
      signal?.throwIfAborted();
      if (!failure) failure = [index, stampNotFound(match, normalizeError(router2, lane, route, cause, signal))];
      end = index;
      break;
    }
    signal?.throwIfAborted();
    if (failure) break;
    const validationError = match.paramsError ?? match.searchError;
    if (validationError !== void 0) {
      failure = [index, stampNotFound(match, normalizeError(router2, lane, route, validationError, signal))];
      end = index;
      break;
    }
    signal?.throwIfAborted();
    if (match.ssr === false || !route.options.beforeLoad) {
      parentContext = context;
      continue;
    }
    const abortController = match.abortController;
    const options = {
      search: match.search,
      abortController,
      params: match.params,
      preload: false,
      context,
      location: lane.location,
      navigate: navigateFrom(router2, lane.location),
      buildLocation: router2.buildLocation,
      cause: match.cause,
      matches: lane.matches,
      routeId: route.id,
      ...router2.options.additionalContext
    };
    try {
      const beforeLoadContext = await route.options.beforeLoad(options);
      signal?.throwIfAborted();
      const outcome = stampNotFound(match, materializeRedirect(router2, lane, route, normalize(beforeLoadContext, false), signal));
      if (outcome[0] !== SUCCESS) {
        failure = [index, outcome];
        end = index;
        break;
      }
      match.__beforeLoadContext = beforeLoadContext;
      match.context = {
        ...context,
        ...beforeLoadContext
      };
      parentContext = match.context;
    } catch (cause) {
      signal?.throwIfAborted();
      failure = [index, stampNotFound(match, normalizeError(router2, lane, route, cause, signal))];
      end = index;
      break;
    }
  }
  return {
    location: lane.location,
    matches: lane.matches,
    end,
    failure
  };
}
function getLoaderContext(router2, lane, match, route, index, tasks) {
  return {
    params: match.params,
    deps: match.loaderDeps,
    preload: false,
    parentMatchPromise: tasks[index - 1]?.match,
    abortController: match.abortController,
    context: match.context,
    location: lane.location,
    navigate: navigateFrom(router2, lane.location),
    cause: match.cause,
    route,
    ...router2.options.additionalContext
  };
}
function createLoaderTask(router2, lane, index, tasks, signal) {
  const match = lane.matches[index];
  const route = getRoute(router2, match);
  let outcome;
  if (match.ssr === false) outcome = Promise.resolve([SKIPPED]);
  else {
    const routeLoader = route.options.loader;
    const loader = typeof routeLoader === "function" ? routeLoader : routeLoader?.handler;
    if (!loader) outcome = Promise.resolve([SUCCESS, void 0]);
    else outcome = Promise.resolve().then(() => loader(getLoaderContext(router2, lane, match, route, index, tasks))).then((result) => normalize(result, false), (cause) => normalize(cause, true)).then((result) => {
      if (signal?.aborted || match.abortController.signal.reason === REDIRECT_ABORT_REASON) return [SKIPPED];
      if (result[0] === ERROR) result = normalizeError(router2, lane, route, result[1], signal);
      else result = materializeRedirect(router2, lane, route, result, signal);
      return stampNotFound(match, result);
    });
  }
  const parentMatch = outcome.then((result) => {
    const snapshot = { ...match };
    if (result[0] === SUCCESS) {
      snapshot.loaderData = result[1];
      snapshot.status = "success";
      snapshot.error = void 0;
      snapshot.invalid = false;
      snapshot.isFetching = false;
    } else if (result[0] === ERROR) {
      snapshot.status = "error";
      snapshot.error = result[1];
    } else if (result[0] === NOT_FOUND) {
      snapshot.status = "notFound";
      snapshot.error = result[1];
    }
    return snapshot;
  });
  return {
    index,
    outcome,
    match: parentMatch
  };
}
async function getNotFoundBoundary(router2, matches, indexed, signal, fallback = 0) {
  const cause = indexed?.[1][1];
  let index = cause?.routeId ? matches.findIndex((match) => match.routeId === cause.routeId) : indexed?.[0] ?? matches.length - 1;
  if (index < 0) index = 0;
  for (let candidate = index; candidate >= 0; candidate--) {
    const route = getRoute(router2, matches[candidate]);
    try {
      const loading = loadRouteChunk(route, false);
      if (loading) await loading;
    } catch {
      signal?.throwIfAborted();
    }
    signal?.throwIfAborted();
    if (route.options.notFoundComponent) return candidate;
  }
  return cause?.routeId ? index : fallback;
}
function abortMatches(matches, start = 0, reason = MATCH_SETTLED_ABORT_REASON) {
  for (let index = start; index < matches.length; index++) matches[index].abortController.abort(reason);
}
async function applyFailure(router2, lane, indexed, signal) {
  if (!indexed) {
    const boundary2 = lane.matches.findIndex((match2) => match2._notFound);
    if (boundary2 >= 0) {
      abortMatches(lane.matches, boundary2 + 1);
      return {
        status: 404,
        boundary: boundary2,
        kind: NOT_FOUND
      };
    }
    return { status: 200 };
  }
  const [index, outcome] = indexed;
  if (outcome[0] === ERROR) {
    const match2 = lane.matches[index];
    match2._notFound = void 0;
    match2.status = "error";
    match2.error = outcome[1];
    match2.isFetching = false;
    abortMatches(lane.matches, index + 1);
    return {
      status: 500,
      boundary: index,
      kind: ERROR
    };
  }
  const boundary = indexed[2] ?? await getNotFoundBoundary(router2, lane.matches, indexed, signal);
  const match = lane.matches[boundary];
  const cause = outcome[1];
  cause.routeId = match.routeId;
  match._notFound = void 0;
  if (match.routeId === router2.routeTree.id) {
    match.status = "success";
    match._notFound = true;
    match.error = cause;
  } else {
    match.status = "notFound";
    match.error = cause;
  }
  match.isFetching = false;
  abortMatches(lane.matches, boundary + 1);
  return {
    status: 404,
    boundary,
    kind: NOT_FOUND
  };
}
async function loadNormalChunks(router2, lane, end, signal) {
  const chunks = [];
  for (let index = 0; index < lane.matches.length; index++) {
    const match = lane.matches[index];
    if (index >= end || match.ssr !== true || match.status !== "success") continue;
    const route = getRoute(router2, match);
    try {
      const loading = loadRouteChunk(route);
      if (loading) {
        const chunk = loading.then(() => {
          signal?.throwIfAborted();
        }, (cause) => {
          signal?.throwIfAborted();
          return [index, stampNotFound(match, normalizeError(router2, lane, route, cause, signal))];
        });
        chunk.catch(() => {
        });
        chunks.push(chunk);
      }
    } catch (cause) {
      signal?.throwIfAborted();
      chunks.push([index, stampNotFound(match, normalizeError(router2, lane, route, cause, signal))]);
    }
  }
  for (const chunk of chunks) {
    const indexed = Array.isArray(chunk) ? chunk : await chunk;
    if (indexed) return indexed;
  }
}
async function projectLane(router2, lane, signal) {
  for (const match of lane.matches) {
    const routeOptions = getRoute(router2, match).options;
    if (routeOptions.head || routeOptions.scripts || routeOptions.headers) {
      const context = {
        ssr: router2.options.ssr,
        matches: lane.matches,
        match,
        params: match.params,
        loaderData: match.loaderData
      };
      try {
        const [head, scripts, headers] = await Promise.all([
          routeOptions.head?.(context),
          routeOptions.scripts?.(context),
          routeOptions.headers?.(context)
        ]);
        signal?.throwIfAborted();
        match.meta = head?.meta;
        match.links = head?.links;
        match.headScripts = head?.scripts;
        match.styles = head?.styles;
        match.scripts = scripts;
        match.headers = headers;
      } catch (cause) {
        signal?.throwIfAborted();
        console.error(cause);
      }
    }
    if (match.ssr === false || match.status !== "success" || match._notFound) break;
  }
}
async function executeServerLane(router2, location, matchedMatches, signal) {
  const matched = {
    location,
    matches: matchedMatches.map((match) => ({
      ...match,
      __beforeLoadContext: void 0,
      context: {},
      isFetching: false,
      abortController: new AbortController()
    }))
  };
  const abortLane = () => abortMatches(matched.matches, 0, signal?.reason ?? MATCH_SETTLED_ABORT_REASON);
  if (signal?.aborted) {
    abortLane();
    signal.throwIfAborted();
  }
  signal?.addEventListener("abort", abortLane, { once: true });
  try {
    const plannedGlobalBoundary = matched.matches.findIndex((match) => match._notFound);
    if (router2.options.notFoundMode !== "root" && plannedGlobalBoundary >= 0) {
      const boundary = await getNotFoundBoundary(router2, matched.matches, void 0, signal, plannedGlobalBoundary);
      if (boundary !== plannedGlobalBoundary) {
        matched.matches[plannedGlobalBoundary]._notFound = void 0;
        matched.matches[boundary]._notFound = true;
      }
    }
    const lane = await contextualize(router2, matched, signal);
    signal?.throwIfAborted();
    let loaderEnd = lane.end;
    if (lane.failure?.[1][0] === REDIRECTED) loaderEnd = 0;
    else if (lane.failure?.[1][0] === NOT_FOUND) {
      lane.failure[2] = await getNotFoundBoundary(router2, lane.matches, lane.failure, signal);
      loaderEnd = Math.min(loaderEnd, lane.failure[2] + 1);
    }
    const tasks = [];
    for (let index = 0; index < loaderEnd; index++) {
      const task = createLoaderTask(router2, lane, index, tasks, signal);
      tasks.push(task);
    }
    let loaderFailure;
    let control = lane.failure?.[1][0] === REDIRECTED ? lane.failure : void 0;
    try {
      await Promise.all(tasks.map((task) => task.outcome.then((loadedOutcome) => {
        const match = lane.matches[task.index];
        const outcome = loadedOutcome;
        if (outcome[0] === SUCCESS) {
          match.loaderData = outcome[1];
          match.status = "success";
          match.error = void 0;
          match.invalid = false;
          match.isFetching = false;
          match.updatedAt = Date.now();
        } else if (outcome[0] === REDIRECTED) {
          control = [task.index, outcome];
          throw control;
        } else {
          if (match.ssr !== false) {
            match.status = "success";
            match.error = void 0;
            match.invalid = true;
            match.isFetching = false;
          }
          if (!loaderFailure && outcome[0] !== SKIPPED) loaderFailure = [task.index, outcome];
        }
      })));
    } catch (cause) {
      if (!Array.isArray(cause)) throw cause;
      control = cause;
    }
    signal?.throwIfAborted();
    if (control?.[1][0] === REDIRECTED) {
      abortMatches(lane.matches, 0, REDIRECT_ABORT_REASON);
      return {
        type: "redirect",
        redirect: control[1][1]
      };
    }
    let failure = lane.failure ?? loaderFailure;
    const plannedBoundary = lane.matches.findIndex((match) => match._notFound);
    let readinessEnd;
    if (failure) {
      const outcomeEnd = failure[2] ??= failure[1][0] === NOT_FOUND ? await getNotFoundBoundary(router2, lane.matches, failure, signal) : failure[0];
      for (const task of tasks) {
        if (task.index >= outcomeEnd) break;
        const outcome = await task.outcome;
        if (outcome[0] !== SUCCESS && outcome[0] < REDIRECTED && !("loaderData" in lane.matches[task.index])) {
          failure = [task.index, outcome];
          failure[2] = outcome[0] === NOT_FOUND ? await getNotFoundBoundary(router2, lane.matches, failure, signal) : task.index;
          break;
        }
      }
      readinessEnd = failure[2];
    } else readinessEnd = plannedBoundary < 0 ? lane.matches.length : plannedBoundary;
    const requiredFailure = await loadNormalChunks(router2, lane, readinessEnd, signal);
    signal?.throwIfAborted();
    if (requiredFailure) {
      if (requiredFailure[1][0] === REDIRECTED) {
        abortMatches(lane.matches, 0, REDIRECT_ABORT_REASON);
        return {
          type: "redirect",
          redirect: requiredFailure[1][1]
        };
      }
      failure = requiredFailure;
    }
    const terminal = await applyFailure(router2, lane, failure, signal);
    if (terminal.boundary !== void 0) {
      const match = lane.matches[terminal.boundary];
      if (match.ssr === true) {
        const route = getRoute(router2, match);
        try {
          if (terminal.kind === ERROR) await loadRouteChunk(route, "errorComponent");
          else if (match._notFound) await Promise.all([loadRouteChunk(route), loadRouteChunk(route, "notFoundComponent")]);
          else await loadRouteChunk(route, "notFoundComponent");
        } catch {
        }
        signal?.throwIfAborted();
      }
    }
    signal?.throwIfAborted();
    await projectLane(router2, {
      location: lane.location,
      matches: lane.matches
    }, signal);
    signal?.throwIfAborted();
    router2.serverSsr?.onCleanup((settled) => {
      if (!settled) abortLane();
    });
    return {
      type: "render",
      status: terminal.status,
      matches: lane.matches
    };
  } finally {
    signal?.removeEventListener("abort", abortLane);
  }
}
async function loadServerRoute(router2, opts) {
  router2.updateLatestLocation();
  const next = router2.latestLocation;
  const previous = router2._committed;
  const previousEnd = router2._lifecycleEnd;
  let result;
  try {
    const canonical = router2.buildLocation({
      to: next.pathname,
      search: true,
      params: true,
      hash: true,
      state: true,
      _includeValidateSearch: true
    });
    if (next.publicHref !== canonical.publicHref) throw redirect({ href: canonical.publicHref || "/" });
    const changeInfo = getLocationChangeInfo(next, router2.stores.resolvedLocation.get());
    router2.emit({
      type: "onBeforeNavigate",
      ...changeInfo
    });
    router2.emit({
      type: "onBeforeLoad",
      ...changeInfo
    });
    opts?._signal?.throwIfAborted();
    result = await waitFor(executeServerLane(router2, next, router2.matchRoutes(next), opts?._signal), opts?._signal);
    opts?._signal?.throwIfAborted();
  } catch (cause) {
    opts?._signal?.throwIfAborted();
    if (!isRedirect(cause)) throw cause;
    cause.options._fromLocation = next;
    result = {
      type: "redirect",
      redirect: router2.resolveRedirect(cause)
    };
  }
  router2._serverResult = result;
  let nextEnd = 0;
  router2.batch(() => {
    router2.stores.location.set(next);
    router2.stores.status.set("idle");
    if (result.type === "render") {
      router2._committed = result.matches;
      nextEnd = router2._lifecycleEnd = lifecycleEnd(result.matches);
      router2.stores.setMatches(result.matches);
      router2.stores.resolvedLocation.set(next);
    }
  });
  if (result.type === "render") runRouteLifecycle(router2, previous, result.matches, previousEnd, nextEnd);
  router2._commitPromise?.resolve();
  router2._commitPromise = void 0;
}
const isServer$2 = true;
function getSsrBodyScriptParts(matches, manifest, nonce, routeScriptAttrs2) {
  const assetMatches = _getAssetMatches(matches);
  const routeScripts = [];
  const manifestScripts = [];
  for (const match of assetMatches) for (const script of Array.isArray(match.scripts) ? match.scripts : []) {
    if (!script) continue;
    const { children, ...attrs } = script;
    routeScripts.push({
      tag: "script",
      attrs: {
        ...attrs,
        ...routeScriptAttrs2,
        nonce
      },
      children
    });
  }
  if (manifest) for (const match of assetMatches) for (const asset of manifest.routes[match.routeId]?.scripts ?? []) manifestScripts.push({
    tag: "script",
    attrs: {
      ...asset.attrs,
      nonce
    },
    children: asset.children
  });
  return [routeScripts, manifestScripts];
}
function composeSsrBodyScripts([routeScripts, manifestScripts], initialHydrationScripts) {
  if (!initialHydrationScripts) return [...routeScripts, ...manifestScripts];
  return [
    ...initialHydrationScripts.before,
    ...routeScripts,
    ...manifestScripts,
    initialHydrationScripts.boundary
  ];
}
var BaseRoute = class {
  get to() {
    return this._to;
  }
  get id() {
    return this._id;
  }
  get path() {
    return this._path;
  }
  get fullPath() {
    return this._fullPath;
  }
  constructor(options) {
    this.init = (originalIndex) => {
      this.originalIndex = originalIndex;
      this._branch = void 0;
      const options2 = this.options;
      const isRoot = !options2?.path && !options2?.id;
      this.parentRoute = this.options.getParentRoute?.();
      if (isRoot) this._path = rootRouteId;
      else if (!this.parentRoute) {
        invariant();
      }
      let path = isRoot ? rootRouteId : options2?.path;
      if (path && path !== "/") path = trimPathLeft(path);
      const customId = options2?.id || path;
      const id = isRoot ? rootRouteId : cleanPath((this.parentRoute.id === "__root__" ? "" : this.parentRoute.id) + "/" + (customId ?? ""));
      if (path === "__root__") path = "/";
      const fullPath = id === "__root__" ? "/" : path === void 0 ? this.parentRoute.fullPath : cleanPath(this.parentRoute.fullPath + "/" + path);
      this._path = path;
      this._id = id;
      this._fullPath = fullPath;
      this._to = trimPathRight(fullPath);
    };
    this.addChildren = (children) => {
      return this._addFileChildren(children);
    };
    this._addFileChildren = (children) => {
      if (Array.isArray(children)) this.children = children;
      if (typeof children === "object" && children !== null) this.children = Object.values(children);
      return this;
    };
    this._addFileTypes = () => {
      return this;
    };
    this.updateLoader = (options2) => {
      Object.assign(this.options, options2);
      return this;
    };
    this.update = (options2) => {
      Object.assign(this.options, options2);
      return this;
    };
    this.lazy = (lazyFn) => {
      this.lazyFn = lazyFn;
      return this;
    };
    this.redirect = (opts) => redirect({
      from: this.fullPath,
      ...opts
    });
    this.options = options || {};
    this.isRoot = !options?.getParentRoute;
    if (options?.id && options?.path) throw new Error(`Route cannot have both an 'id' and a 'path' option.`);
  }
};
var BaseRootRoute = class extends BaseRoute {
  constructor(options) {
    super(options);
  }
};
function useMatch(opts) {
  const router2 = useRouter();
  const nearestRouteId = reactExports.useContext(opts.from ? dummyMatchContext : matchContext);
  const routeId = opts.from ?? nearestRouteId;
  const matchStore = router2.stores.getMatchStore(routeId);
  {
    const match = matchStore.get();
    if (!match) {
      if (opts.shouldThrow ?? true) {
        invariant();
      }
      return;
    }
    return opts.select ? opts.select(match) : match;
  }
}
function useLoaderData(opts) {
  return useMatch({
    from: opts.from,
    strict: opts.strict,
    structuralSharing: opts.structuralSharing,
    select: (match) => {
      return opts.select ? opts.select(match.loaderData) : match.loaderData;
    }
  });
}
function useLoaderDeps(opts) {
  const { select, ...rest } = opts;
  return useMatch({
    ...rest,
    select: (match) => {
      return select ? select(match.loaderDeps) : match.loaderDeps;
    }
  });
}
function useParams(opts) {
  return useMatch({
    from: opts.from,
    shouldThrow: opts.shouldThrow,
    structuralSharing: opts.structuralSharing,
    strict: opts.strict,
    select: (match) => {
      const params = opts.strict === false ? match.params : match._strictParams;
      return opts.select ? opts.select(params) : params;
    }
  });
}
function useSearch(opts) {
  return useMatch({
    from: opts.from,
    strict: opts.strict,
    shouldThrow: opts.shouldThrow,
    structuralSharing: opts.structuralSharing,
    select: (match) => {
      return opts.select ? opts.select(match.search) : match.search;
    }
  });
}
function useNavigate(_defaultOpts) {
  const router2 = useRouter();
  return reactExports.useCallback((options) => {
    return router2.navigate({
      ...options,
      from: options.from ?? _defaultOpts?.from
    });
  }, [_defaultOpts?.from, router2]);
}
function useRouteContext(opts) {
  return useMatch({
    ...opts,
    select: (match) => opts.select ? opts.select(match.context) : match.context
  });
}
function resolveExternalLink(to, protocolAllowlist) {
  const scheme = typeof to === "string" && getUrlScheme(to);
  if (!scheme) return;
  if (!protocolAllowlist.has(scheme)) {
    return null;
  }
  return to;
}
function resolveIsActive(location, next, activeOptions, basepath, isHydrated) {
  const currentPath = removeTrailingSlash(location.pathname, basepath);
  const nextPath = removeTrailingSlash(next.pathname, basepath);
  if (activeOptions?.exact ? currentPath !== nextPath : !(currentPath.startsWith(nextPath) && (currentPath.length === nextPath.length || currentPath[nextPath.length] === "/"))) return false;
  if (activeOptions?.includeSearch ?? true) {
    if (!deepEqual(location.search, next.search, !activeOptions?.exact, activeOptions?.explicitUndefined)) return false;
  }
  if (activeOptions?.includeHash) return isHydrated && location.hash === next.hash;
  return true;
}
function useLinkProps(options, forwardedRef, host) {
  const router2 = useRouter();
  return getServerLinkProps(router2, options, forwardedRef, host);
}
var STATIC_EMPTY_OBJECT = {};
var STATIC_ACTIVE_OBJECT = { className: "active" };
var ROUTER_OPTION_KEYS = /* @__PURE__ */ new Set([
  "to",
  "params",
  "search",
  "hash",
  "state",
  "mask",
  "from",
  "unsafeRelative",
  "_fromLocation",
  "reloadDocument",
  "preload",
  "preloadDelay",
  "preloadIntentProximity",
  "hashScrollIntoView",
  "replace",
  "startTransition",
  "resetScroll",
  "viewTransition",
  "ignoreBlocker",
  "activeProps",
  "inactiveProps",
  "activeOptions",
  "_asChild"
]);
function collectElementProps(options, host) {
  const props = {};
  for (const key in options) {
    if (ROUTER_OPTION_KEYS.has(key) || key === "type" && host !== void 0 || key === "disabled" && host === "a") continue;
    props[key] = options[key];
  }
  return props;
}
function applyLinkState(props, options, isActive, href, linkDisabled, host) {
  const { activeProps, inactiveProps, className, style, target } = options;
  const stateProps = functionalUpdate$1(isActive ? activeProps : inactiveProps, {}) ?? (isActive ? STATIC_ACTIVE_OBJECT : STATIC_EMPTY_OBJECT);
  Object.assign(props, stateProps);
  props.href = href;
  if (host !== "a") props.disabled = linkDisabled;
  props.target = target;
  const stateStyle = stateProps.style;
  if (style || stateStyle) props.style = style && stateStyle ? {
    ...style,
    ...stateStyle
  } : style || stateStyle;
  const stateClassName = stateProps.className;
  if (className || stateClassName) props.className = className ? stateClassName ? `${className} ${stateClassName}` : className : stateClassName;
  if (linkDisabled) {
    props.role = "link";
    props["aria-disabled"] = true;
  }
  if (isActive) {
    props["data-status"] = "active";
    props["aria-current"] = "page";
  }
  return props;
}
function getServerLinkProps(router2, options, forwardedRef, host) {
  const { to, disabled, activeOptions } = options;
  const directExternalLink = resolveExternalLink(to, router2.protocolAllowlist);
  const next = directExternalLink === void 0 ? router2.buildLocation(options) : void 0;
  const hrefOption = next ? getHrefOption(next, router2, disabled) : directExternalLink ?? void 0;
  const linkDisabled = disabled || !hrefOption;
  const externalLink = directExternalLink ?? (hrefOption && getUrlScheme(hrefOption) ? hrefOption : void 0);
  const props = collectElementProps(options, host);
  props.ref = forwardedRef;
  if (externalLink) {
    props.href = externalLink;
    return props;
  }
  return applyLinkState(props, options, !!next && !(!disabled && !hrefOption) && resolveIsActive(router2.stores.location.get(), next, activeOptions, router2.basepath, false), hrefOption, linkDisabled, host);
}
function getHrefOption(next, router2, disabled) {
  if (disabled) return;
  const location = next.maskedLocation ?? next;
  const href = location.external ? location.publicHref : router2.history.createHref(location.publicHref) || "/";
  if ((location.external || href !== location.publicHref) && isDangerousProtocol(href, router2.protocolAllowlist)) {
    return;
  }
  return href;
}
var Link = reactExports.memo(reactExports.forwardRef((props, ref) => {
  const host = props._asChild || "a";
  const linkProps = useLinkProps(props, ref, host);
  const children = typeof props.children === "function" ? props.children({ isActive: linkProps["data-status"] === "active" }) : props.children;
  return reactExports.createElement(host, linkProps, children);
}), areLinkPropsEqual);
function areLinkPropsEqual(prev, next) {
  let extraKeys = 0;
  for (const key in next) {
    extraKeys++;
    if (prev[key] === next[key]) continue;
    if (!ROUTER_OPTION_KEYS.has(key) || !deepEqual(prev[key], next[key], false, true)) return false;
  }
  for (const _key in prev) extraKeys--;
  return extraKeys === 0;
}
var Route$x = class Route extends BaseRoute {
  /**
  * @deprecated Use the `createRoute` function instead.
  */
  constructor(options) {
    super(options);
    this.useMatch = (opts) => {
      return useMatch({
        ...opts,
        from: this.id
      });
    };
    this.useRouteContext = (opts) => {
      return useRouteContext({
        ...opts,
        from: this.id
      });
    };
    this.useSearch = (opts) => {
      return useSearch({
        ...opts,
        from: this.id
      });
    };
    this.useParams = (opts) => {
      return useParams({
        ...opts,
        from: this.id
      });
    };
    this.useLoaderDeps = (opts) => {
      return useLoaderDeps({
        ...opts,
        from: this.id
      });
    };
    this.useLoaderData = (opts) => {
      return useLoaderData({
        ...opts,
        from: this.id
      });
    };
    this.useNavigate = () => {
      return useNavigate({ from: this.fullPath });
    };
    this.Link = React.forwardRef((props, ref) => {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Link, {
        ref,
        from: this.fullPath,
        ...props
      });
    });
  }
};
function createRoute(options) {
  return new Route$x(options);
}
function createRootRouteWithContext() {
  return (options) => {
    return createRootRoute(options);
  };
}
var RootRoute = class extends BaseRootRoute {
  /**
  * @deprecated `RootRoute` is now an internal implementation detail. Use `createRootRoute()` instead.
  */
  constructor(options) {
    super(options);
    this.useMatch = (opts) => {
      return useMatch({
        ...opts,
        from: this.id
      });
    };
    this.useRouteContext = (opts) => {
      return useRouteContext({
        ...opts,
        from: this.id
      });
    };
    this.useSearch = (opts) => {
      return useSearch({
        ...opts,
        from: this.id
      });
    };
    this.useParams = (opts) => {
      return useParams({
        ...opts,
        from: this.id
      });
    };
    this.useLoaderDeps = (opts) => {
      return useLoaderDeps({
        ...opts,
        from: this.id
      });
    };
    this.useLoaderData = (opts) => {
      return useLoaderData({
        ...opts,
        from: this.id
      });
    };
    this.useNavigate = () => {
      return useNavigate({ from: this.fullPath });
    };
    this.Link = React.forwardRef((props, ref) => {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Link, {
        ref,
        from: this.fullPath,
        ...props
      });
    });
  }
};
function createRootRoute(options) {
  return new RootRoute(options);
}
function createFileRoute(path) {
  return (options) => {
    const route = createRoute(options);
    route.isRoot = false;
    return route;
  };
}
function lazyRouteComponent(importer, exportName) {
  let loadPromise;
  let comp;
  let error;
  const load = () => {
    if (!loadPromise) {
      error = void 0;
      loadPromise = importer().then((res) => {
        comp = res[exportName];
      }).catch((err) => {
        loadPromise = void 0;
        error = err;
      });
    }
    return loadPromise;
  };
  const lazyComp = function Lazy(props) {
    if (error) {
      if (isModuleNotFoundError(error) && false) ;
      throw error;
    }
    if (!comp) if (reactUse) reactUse(load());
    else throw load();
    return reactExports.createElement(comp, props);
  };
  lazyComp.preload = load;
  return lazyComp;
}
var getStoreFactory = (opts) => {
  return {
    createMutableStore: createNonReactiveMutableStore,
    createReadonlyStore: createNonReactiveReadonlyStore,
    batch: (fn) => fn()
  };
};
var createRouter = (options) => {
  return new Router(options);
};
var Router = class extends RouterCore {
  constructor(options) {
    super(options, getStoreFactory);
  }
};
var noopScriptHandler = () => {
};
function setScriptAttrs(script, attrs) {
  if (!attrs) return;
  for (const [key, value] of Object.entries(attrs)) if (key !== "suppressHydrationWarning" && value !== void 0 && value !== false) script.setAttribute(key, typeof value === "boolean" ? "" : String(value));
}
function Asset(asset) {
  const { attrs, children, nonce, preventScriptHoist } = asset;
  const innerHTML = reactExports.useMemo(() => children === void 0 ? void 0 : { __html: children }, [children]);
  switch (asset.tag) {
    case "title":
      return /* @__PURE__ */ jsxRuntimeExports.jsx("title", {
        ...attrs,
        suppressHydrationWarning: true,
        children
      });
    case "meta":
      return /* @__PURE__ */ jsxRuntimeExports.jsx("meta", {
        ...attrs,
        suppressHydrationWarning: true
      });
    case "link":
      return /* @__PURE__ */ jsxRuntimeExports.jsx("link", {
        ...attrs,
        precedence: attrs?.precedence ?? (attrs?.rel === "stylesheet" ? "default" : void 0),
        nonce,
        suppressHydrationWarning: true
      });
    case "style":
      if (asset.inlineCss && false) ;
      return /* @__PURE__ */ jsxRuntimeExports.jsx("style", {
        ...attrs,
        dangerouslySetInnerHTML: innerHTML,
        nonce
      });
    case "script":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Script, {
        attrs,
        preventScriptHoist,
        children
      });
    default:
      return null;
  }
}
function Script({ attrs, children, preventScriptHoist }) {
  useRouter();
  useHydrated();
  const innerHTML = reactExports.useMemo(() => children === void 0 ? void 0 : { __html: children }, [children]);
  const dataScript = typeof attrs?.type === "string" && attrs.type !== "" && attrs.type !== "text/javascript" && attrs.type !== "module";
  reactExports.useEffect(() => {
    if (dataScript) return;
    if (attrs?.src) {
      const link = document.createElement("a");
      link.href = attrs.src;
      const normSrc = link.href;
      for (const el of document.scripts) if (el.src === normSrc) return;
      const script = document.createElement("script");
      setScriptAttrs(script, attrs);
      document.head.appendChild(script);
      return () => script.remove();
    }
    if (typeof children === "string") {
      const typeAttr = typeof attrs?.type === "string" ? attrs.type : "text/javascript";
      const nonceAttr = typeof attrs?.nonce === "string" ? attrs.nonce : void 0;
      for (const el of document.scripts) {
        if (el.hasAttribute("src")) continue;
        const sType = el.getAttribute("type") ?? "text/javascript";
        const sNonce = el.getAttribute("nonce") ?? void 0;
        if (el.textContent === children && sType === typeAttr && sNonce === nonceAttr) return;
      }
      const script = document.createElement("script");
      script.textContent = children;
      setScriptAttrs(script, attrs);
      document.head.appendChild(script);
      return () => script.remove();
    }
  }, [
    attrs,
    children,
    dataScript
  ]);
  {
    if (attrs?.src) {
      if (!preventScriptHoist) return /* @__PURE__ */ jsxRuntimeExports.jsx("script", {
        ...attrs,
        suppressHydrationWarning: true
      });
      return /* @__PURE__ */ jsxRuntimeExports.jsx("script", {
        ...attrs,
        onLoad: noopScriptHandler,
        suppressHydrationWarning: true
      });
    }
    if (typeof children === "string") return /* @__PURE__ */ jsxRuntimeExports.jsx("script", {
      ...attrs,
      dangerouslySetInnerHTML: innerHTML,
      suppressHydrationWarning: true
    });
    return null;
  }
}
function buildTagsFromMatches(router2, nonce, matches, assetCrossOrigin) {
  matches = _getAssetMatches(matches);
  const routeMeta = matches.map((match) => match.meta).filter((meta) => meta !== void 0);
  const resultMeta = [];
  const metaByAttribute = {};
  let title;
  for (let i = routeMeta.length - 1; i >= 0; i--) {
    const metas = routeMeta[i];
    for (let j = metas.length - 1; j >= 0; j--) {
      const m = metas[j];
      if (!m) continue;
      if (m.title) {
        if (!title) title = {
          tag: "title",
          children: m.title
        };
      } else if ("script:ld+json" in m) try {
        const json = JSON.stringify(m["script:ld+json"]);
        resultMeta.push({
          tag: "script",
          attrs: { type: "application/ld+json" },
          children: escapeHtml(json)
        });
      } catch {
      }
      else {
        const attribute = m.name ?? m.property;
        if (attribute) if (metaByAttribute[attribute]) continue;
        else metaByAttribute[attribute] = true;
        resultMeta.push({
          tag: "meta",
          attrs: {
            ...m,
            nonce
          }
        });
      }
    }
  }
  if (title) resultMeta.push(title);
  if (nonce) resultMeta.push({
    tag: "meta",
    attrs: {
      property: "csp-nonce",
      content: nonce
    }
  });
  resultMeta.reverse();
  const constructedLinks = matches.flatMap((match) => match.links ?? []).filter((link) => link !== void 0).map((link) => ({
    tag: "link",
    attrs: {
      ...link,
      nonce
    }
  }));
  const manifest = router2.ssr?.manifest;
  const manifestCssTags = [];
  if (manifest) {
    matches.forEach((match) => {
      manifest.routes[match.routeId]?.css?.forEach((link) => {
        const resolvedLink = resolveManifestCssLink(link);
        manifestCssTags.push({
          tag: "link",
          attrs: {
            rel: "stylesheet",
            ...resolvedLink,
            crossOrigin: getAssetCrossOrigin(assetCrossOrigin, "stylesheet") ?? resolvedLink.crossOrigin,
            suppressHydrationWarning: true,
            nonce
          }
        });
      });
    });
    if (manifest.inlineStyle) manifestCssTags.push({
      tag: "style",
      attrs: {
        ...manifest.inlineStyle.attrs,
        nonce
      },
      children: manifest.inlineStyle.children,
      inlineCss: true
    });
  }
  const preloadLinks = [];
  if (manifest) matches.forEach((match) => {
    manifest.routes[match.routeId]?.preloads?.forEach((preload) => {
      preloadLinks.push({
        tag: "link",
        attrs: {
          ...getScriptPreloadAttrs(manifest, preload, assetCrossOrigin),
          nonce
        }
      });
    });
  });
  const styles = matches.flatMap((match) => match.styles ?? []).filter((style) => style !== void 0).map(({ children, ...attrs }) => ({
    tag: "style",
    attrs: {
      ...attrs,
      nonce
    },
    children
  }));
  const headScripts = matches.flatMap((match) => match.headScripts ?? []).filter((script) => script !== void 0).map(({ children, ...script }) => ({
    tag: "script",
    attrs: {
      ...script,
      nonce
    },
    children
  }));
  const tags = [];
  appendUniqueUserTags(tags, resultMeta);
  tags.push(...preloadLinks);
  appendUniqueUserTags(tags, constructedLinks);
  tags.push(...manifestCssTags);
  appendUniqueUserTags(tags, styles);
  appendUniqueUserTags(tags, headScripts);
  return tags;
}
var useTags = (assetCrossOrigin) => {
  const router2 = useRouter();
  const nonce = router2.options.ssr?.nonce;
  return buildTagsFromMatches(router2, nonce, router2.stores.matches.get(), assetCrossOrigin);
};
function HeadContent(props) {
  const tags = useTags(props.assetCrossOrigin);
  const nonce = useRouter().options.ssr?.nonce;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: tags.map((tag) => /* @__PURE__ */ reactExports.createElement(Asset, {
    ...tag,
    key: `tsr-meta-${JSON.stringify(tag)}`,
    nonce
  })) });
}
var routeScriptAttrs = { suppressHydrationWarning: true };
var Scripts = () => {
  const router2 = useRouter();
  const nonce = router2.options.ssr?.nonce;
  const getParts = (matches) => {
    const parts = getSsrBodyScriptParts(matches, router2.ssr?.manifest, nonce, routeScriptAttrs);
    for (const script of parts[1]) if (typeof script.attrs?.src === "string") {
      const scriptWithHoist = script;
      scriptWithHoist.preventScriptHoist = true;
    }
    return parts;
  };
  return renderScripts(composeSsrBodyScripts(getParts(router2.stores.matches.get()), router2.serverSsr?.takeInitialHydrationScriptTags()));
};
function renderScripts(scripts) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: scripts.map((asset, i) => /* @__PURE__ */ reactExports.createElement(Asset, {
    ...asset,
    key: `tsr-scripts-${asset.tag}-${i}`
  })) });
}
const QueryClientContext = reactExports.createContext(void 0);
const QueryClientProvider = ({ client, children }) => {
  reactExports.useEffect(() => {
    client.mount();
    return () => {
      client.unmount();
    };
  }, [client]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientContext.Provider, {
    value: client,
    children
  });
};
const defaultTimeoutProvider = {
  setTimeout: (callback, delay) => setTimeout(callback, delay),
  clearTimeout: (timeoutId) => clearTimeout(timeoutId),
  setInterval: (callback, delay) => setInterval(callback, delay),
  clearInterval: (intervalId) => clearInterval(intervalId)
};
var TimeoutManager = class {
  #provider = defaultTimeoutProvider;
  #providerCalled = false;
  /**
  * `setTimeoutProvider` can be used to set a custom implementation of the
  * `setTimeout`, `clearTimeout`, `setInterval`, `clearInterval` functions,
  * called a `TimeoutProvider`.
  *
  * This may be useful if you notice event loop performance issues with
  * thousands of queries. A custom TimeoutProvider could also support timer
  * delays longer than the global `setTimeout` maximum delay value of about
  * 24 days.
  *
  * It is important to call `setTimeoutProvider` before creating a
  * QueryClient or queries, so that the same provider is used consistently
  * for all timers in the application, since different TimeoutProviders
  * cannot cancel each others' timers.
  *
  * @example
  * ```ts
  * import { timeoutManager, QueryClient } from '@tanstack/query-core'
  * import { CustomTimeoutProvider } from './CustomTimeoutProvider'
  *
  * timeoutManager.setTimeoutProvider(new CustomTimeoutProvider())
  *
  * export const queryClient = new QueryClient()
  * ```
  */
  setTimeoutProvider(provider) {
    this.#provider = provider;
  }
  /**
  * `setTimeout` schedules a callback to run after approximately `delay`
  * milliseconds, like the global `setTimeout` function. The callback can be
  * canceled with `clearTimeout`.
  *
  * It returns a timer ID, which may be a number or an object that can be
  * coerced to a number via `Symbol.toPrimitive`.
  *
  * @example
  * ```ts
  * import { timeoutManager } from '@tanstack/query-core'
  *
  * const timeoutId = timeoutManager.setTimeout(
  *   () => console.log('ran at:', new Date()),
  *   1000,
  * )
  *
  * const timeoutIdNumber: number = Number(timeoutId)
  * ```
  */
  setTimeout(callback, delay) {
    return this.#provider.setTimeout(callback, delay);
  }
  /**
  * `clearTimeout` cancels a timeout callback scheduled with `setTimeout`,
  * like the global `clearTimeout` function. It should be called with a
  * timer ID returned by `setTimeout`.
  *
  * @example
  * ```ts
  * import { timeoutManager } from '@tanstack/query-core'
  *
  * const timeoutId = timeoutManager.setTimeout(
  *   () => console.log('ran at:', new Date()),
  *   1000,
  * )
  *
  * timeoutManager.clearTimeout(timeoutId)
  * ```
  */
  clearTimeout(timeoutId) {
    this.#provider.clearTimeout(timeoutId);
  }
  /**
  * `setInterval` schedules a callback to be called approximately every
  * `delay` milliseconds, like the global `setInterval` function.
  *
  * Like `setTimeout`, it returns a timer ID, which may be a number or an
  * object that can be coerced to a number via `Symbol.toPrimitive`.
  *
  * @example
  * ```ts
  * import { timeoutManager } from '@tanstack/query-core'
  *
  * const intervalId = timeoutManager.setInterval(
  *   () => console.log('ran at:', new Date()),
  *   1000,
  * )
  * ```
  */
  setInterval(callback, delay) {
    return this.#provider.setInterval(callback, delay);
  }
  /**
  * `clearInterval` can be used to cancel an interval, like the global
  * `clearInterval` function. It should be called with an interval ID
  * returned by `setInterval`.
  *
  * @example
  * ```ts
  * import { timeoutManager } from '@tanstack/query-core'
  *
  * const intervalId = timeoutManager.setInterval(
  *   () => console.log('ran at:', new Date()),
  *   1000,
  * )
  *
  * timeoutManager.clearInterval(intervalId)
  * ```
  */
  clearInterval(intervalId) {
    this.#provider.clearInterval(intervalId);
  }
};
const timeoutManager = new TimeoutManager();
function systemSetTimeoutZero(callback) {
  setTimeout(callback, 0);
}
const isServer$1 = typeof window === "undefined" || "Deno" in globalThis;
function noop() {
}
function functionalUpdate(updater, input) {
  return typeof updater === "function" ? updater(input) : updater;
}
function isValidTimeout(value) {
  return typeof value === "number" && value >= 0 && value !== Infinity;
}
function timeUntilStale(updatedAt, staleTime) {
  return Math.max(updatedAt + (staleTime || 0) - Date.now(), 0);
}
function resolveQueryValue(value, query) {
  return typeof value === "function" ? value(query) : value;
}
function matchQuery(filters, query) {
  const { type = "all", exact, fetchStatus, predicate, queryKey, stale } = filters;
  if (queryKey) {
    if (exact) {
      if (query.queryHash !== hashQueryKeyByOptions(queryKey, query.options)) return false;
    } else if (!partialMatchKey(query.queryKey, queryKey)) return false;
  }
  if (type !== "all") {
    const isActive = query.isActive();
    if (type === "active" && !isActive) return false;
    if (type === "inactive" && isActive) return false;
  }
  if (typeof stale === "boolean" && query.isStale() !== stale) return false;
  if (fetchStatus && fetchStatus !== query.state.fetchStatus) return false;
  if (predicate && !predicate(query)) return false;
  return true;
}
function matchMutation(filters, mutation) {
  const { exact, status, predicate, mutationKey } = filters;
  if (mutationKey) {
    if (!mutation.options.mutationKey) return false;
    if (exact) {
      if (hashKey(mutation.options.mutationKey) !== hashKey(mutationKey)) return false;
    } else if (!partialMatchKey(mutation.options.mutationKey, mutationKey)) return false;
  }
  if (status && mutation.state.status !== status) return false;
  if (predicate && !predicate(mutation)) return false;
  return true;
}
function hashQueryKeyByOptions(queryKey, options) {
  return (options?.queryKeyHashFn || hashKey)(queryKey);
}
function hashKey(queryKey) {
  return JSON.stringify(queryKey, (_, val) => isPlainObject(val) ? Object.keys(val).sort().reduce((result, key) => {
    result[key] = val[key];
    return result;
  }, {}) : val);
}
function partialMatchKey(a, b) {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;
  if (a && b && typeof a === "object" && typeof b === "object") {
    if (Array.isArray(a) && Array.isArray(b)) {
      if (b.length > a.length) return false;
      for (let i = 0; i < b.length; i++) if (!partialMatchKey(a[i], b[i])) return false;
      return true;
    }
    const bKeys = Object.keys(b);
    for (const key of bKeys) if (!partialMatchKey(a[key], b[key])) return false;
    return true;
  }
  return false;
}
const hasOwn = Object.prototype.hasOwnProperty;
function replaceEqualDeep(a, b, depth = 0) {
  if (a === b) return a;
  if (depth > 500) return b;
  const array = isPlainArray(a) && isPlainArray(b);
  if (!array && !(isPlainObject(a) && isPlainObject(b))) return b;
  const aSize = (array ? a : Object.keys(a)).length;
  const bItems = array ? b : Object.keys(b);
  const bSize = bItems.length;
  const copy = array ? new Array(bSize) : {};
  let equalItems = 0;
  for (let i = 0; i < bSize; i++) {
    const key = array ? i : bItems[i];
    const aItem = a[key];
    const bItem = b[key];
    if (aItem === bItem) {
      copy[key] = aItem;
      if (array ? i < aSize : hasOwn.call(a, key)) equalItems++;
      continue;
    }
    if (aItem === null || bItem === null || typeof aItem !== "object" || typeof bItem !== "object") {
      copy[key] = bItem;
      continue;
    }
    const v = replaceEqualDeep(aItem, bItem, depth + 1);
    copy[key] = v;
    if (v === aItem) equalItems++;
  }
  return aSize === bSize && equalItems === aSize ? a : copy;
}
function isPlainArray(value) {
  return Array.isArray(value) && value.length === Object.keys(value).length;
}
function isPlainObject(o) {
  if (!hasObjectPrototype(o)) return false;
  const objectPrototype = Object.getPrototypeOf(o);
  const ctor = objectPrototype?.constructor;
  if (ctor === void 0) return true;
  if (typeof ctor !== "function") return false;
  const prot = ctor.prototype;
  if (!hasObjectPrototype(prot)) return false;
  if (!prot.hasOwnProperty("isPrototypeOf")) return false;
  if (objectPrototype !== Object.prototype) return false;
  return true;
}
function hasObjectPrototype(o) {
  return Object.prototype.toString.call(o) === "[object Object]";
}
function sleep(timeout) {
  return new Promise((resolve) => {
    timeoutManager.setTimeout(resolve, timeout);
  });
}
function replaceData(prevData, data, options) {
  if (typeof options.structuralSharing === "function") return options.structuralSharing(prevData, data);
  else if (options.structuralSharing !== false) {
    return replaceEqualDeep(prevData, data);
  }
  return data;
}
function addToEnd(items, item, max = 0) {
  const newItems = [...items, item];
  return max && newItems.length > max ? newItems.slice(1) : newItems;
}
function addToStart(items, item, max = 0) {
  const newItems = [item, ...items];
  return max && newItems.length > max ? newItems.slice(0, -1) : newItems;
}
const skipToken = /* @__PURE__ */ Symbol();
function ensureQueryFn(options, fetchOptions) {
  if (!options.queryFn && fetchOptions?.initialPromise) return () => fetchOptions.initialPromise;
  if (!options.queryFn || options.queryFn === skipToken) return () => Promise.reject(/* @__PURE__ */ new Error(`Missing queryFn: '${options.queryHash}'`));
  return options.queryFn;
}
function addConsumeAwareSignal(object, getSignal, onCancelled) {
  let consumed = false;
  let signal;
  Object.defineProperty(object, "signal", {
    enumerable: true,
    get: () => {
      signal ??= getSignal();
      if (consumed) return signal;
      consumed = true;
      if (signal.aborted) onCancelled();
      else signal.addEventListener("abort", onCancelled, { once: true });
      return signal;
    }
  });
  return object;
}
let isServerFn = () => isServer$1;
const isServer = () => isServerFn();
var Subscribable = class {
  constructor() {
    this.listeners = /* @__PURE__ */ new Set();
    this.subscribe = this.subscribe.bind(this);
  }
  subscribe(listener) {
    this.listeners.add(listener);
    this.onSubscribe();
    return () => {
      this.listeners.delete(listener);
      this.onUnsubscribe();
    };
  }
  hasListeners() {
    return this.listeners.size > 0;
  }
  onSubscribe() {
  }
  onUnsubscribe() {
  }
};
var FocusManager = class extends Subscribable {
  #focused;
  #cleanup;
  #setup;
  constructor() {
    super();
    this.#setup = (onFocus) => {
      if (typeof window !== "undefined" && window.addEventListener) {
        const listener = () => onFocus();
        window.addEventListener("visibilitychange", listener, false);
        return () => {
          window.removeEventListener("visibilitychange", listener);
        };
      }
    };
  }
  onSubscribe() {
    if (!this.#cleanup) this.setEventListener(this.#setup);
  }
  onUnsubscribe() {
    if (!this.hasListeners()) {
      this.#cleanup?.();
      this.#cleanup = void 0;
    }
  }
  /**
  * `setEventListener` can be used to set a custom event listener that will
  * be used to determine the focus state. The provided `setup` function
  * receives a `setFocused` callback: call it with a `boolean` to manually
  * set the focus state, or with no arguments to re-evaluate the current
  * focus state and notify subscribers.
  *
  * @example
  * ```ts
  * import { focusManager } from '@tanstack/query-core'
  *
  * focusManager.setEventListener((handleFocus) => {
  *   const listener = () => handleFocus()
  *   // Listen to visibilitychange
  *   if (typeof window !== 'undefined' && window.addEventListener) {
  *     window.addEventListener('visibilitychange', listener, false)
  *   }
  *
  *   return () => {
  *     // Be sure to unsubscribe if a new handler is set
  *     window.removeEventListener('visibilitychange', listener)
  *   }
  * })
  * ```
  */
  setEventListener(setup) {
    this.#setup = setup;
    this.#cleanup?.();
    this.#cleanup = setup((focused) => {
      if (typeof focused === "boolean") this.setFocused(focused);
      else this.onFocus();
    });
  }
  /**
  * `setFocused` can be used to manually set the focus state. Set `undefined`
  * to fall back to the default focus check.
  *
  * @example
  * ```ts
  * import { focusManager } from '@tanstack/query-core'
  *
  * // Set focused
  * focusManager.setFocused(true)
  *
  * // Set unfocused
  * focusManager.setFocused(false)
  *
  * // Fallback to the default focus check
  * focusManager.setFocused(undefined)
  * ```
  */
  setFocused(focused) {
    if (this.#focused !== focused) {
      this.#focused = focused;
      this.onFocus();
    }
  }
  /**
  * `onFocus` notifies all subscribed listeners with the current focus state.
  */
  onFocus() {
    const isFocused = this.isFocused();
    this.listeners.forEach((listener) => {
      listener(isFocused);
    });
  }
  /**
  * `isFocused` can be used to get the current focus state.
  */
  isFocused() {
    if (typeof this.#focused === "boolean") return this.#focused;
    return globalThis.document?.visibilityState !== "hidden";
  }
};
const focusManager = new FocusManager();
const defaultScheduler = systemSetTimeoutZero;
function createNotifyManager() {
  let queue = [];
  let transactions = 0;
  let notifyFn = (callback) => {
    callback();
  };
  let batchNotifyFn = (callback) => {
    callback();
  };
  let scheduleFn = defaultScheduler;
  const schedule = (callback) => {
    if (transactions) queue.push(callback);
    else scheduleFn(() => {
      notifyFn(callback);
    });
  };
  const flush = () => {
    const originalQueue = queue;
    queue = [];
    if (originalQueue.length) scheduleFn(() => {
      batchNotifyFn(() => {
        originalQueue.forEach((callback) => {
          notifyFn(callback);
        });
      });
    });
  };
  return {
    /**
    * Batches all updates scheduled inside the passed callback.
    * This is mainly used internally to optimize query client updating.
    * Batches can be nested; the queue is only flushed once the outermost `batch` call finishes.
    * The return value of `callback` is passed through.
    */
    batch: (callback) => {
      let result;
      transactions++;
      try {
        result = callback();
      } finally {
        transactions--;
        if (!transactions) flush();
      }
      return result;
    },
    /**
    * All calls to the wrapped function will be batched.
    */
    batchCalls: (callback) => {
      return (...args) => {
        schedule(() => {
          callback(...args);
        });
      };
    },
    /**
    * Schedules a function to be run on the next batch.
    * By default, the batch is run with a `setTimeout`, but this can be configured via `setScheduler`.
    */
    schedule,
    /**
    * Use this method to set a custom notify function.
    * This can be used to for example wrap notifications with `React.act` while running tests.
    */
    setNotifyFunction: (fn) => {
      notifyFn = fn;
    },
    /**
    * Use this method to set a custom function to batch notifications together into a single tick.
    * Framework adapters use this to plug in their own batching primitive, so that a single query
    * update only triggers one re-render instead of one per subscriber.
    *
    * @example
    * ```ts
    * import { notifyManager } from '@tanstack/query-core'
    * import { batch } from 'solid-js'
    *
    * notifyManager.setBatchNotifyFunction(batch)
    * ```
    */
    setBatchNotifyFunction: (fn) => {
      batchNotifyFn = fn;
    },
    /**
    * Configures a custom callback that schedules when the next batch runs.
    * The default behavior is `setTimeout(callback, 0)`.
    *
    * @example
    * ```ts
    * import { notifyManager } from '@tanstack/query-core'
    *
    * // Schedule batches in the next microtask
    * notifyManager.setScheduler(queueMicrotask)
    *
    * // Schedule batches before the next frame is rendered
    * notifyManager.setScheduler(requestAnimationFrame)
    *
    * // Schedule batches some time in the future
    * notifyManager.setScheduler((cb) => setTimeout(cb, 10))
    * ```
    */
    setScheduler: (fn) => {
      scheduleFn = fn;
    }
  };
}
const notifyManager = createNotifyManager();
var OnlineManager = class extends Subscribable {
  #online = true;
  #cleanup;
  #setup;
  constructor() {
    super();
    this.#setup = (onOnline) => {
      if (typeof window !== "undefined" && window.addEventListener) {
        const onlineListener = () => onOnline(true);
        const offlineListener = () => onOnline(false);
        window.addEventListener("online", onlineListener, false);
        window.addEventListener("offline", offlineListener, false);
        return () => {
          window.removeEventListener("online", onlineListener);
          window.removeEventListener("offline", offlineListener);
        };
      }
    };
  }
  onSubscribe() {
    if (!this.#cleanup) this.setEventListener(this.#setup);
  }
  onUnsubscribe() {
    if (!this.hasListeners()) {
      this.#cleanup?.();
      this.#cleanup = void 0;
    }
  }
  /**
  * `setEventListener` can be used to set a custom event listener that will
  * be used to determine the online state. The provided `setup` function
  * receives a `setOnline` callback that should be called with a `boolean`
  * whenever the online state changes.
  *
  * @example
  * ```ts
  * import NetInfo from '@react-native-community/netinfo'
  * import { onlineManager } from '@tanstack/query-core'
  *
  * onlineManager.setEventListener((setOnline) => {
  *   return NetInfo.addEventListener((state) => {
  *     setOnline(!!state.isConnected)
  *   })
  * })
  * ```
  */
  setEventListener(setup) {
    this.#setup = setup;
    this.#cleanup?.();
    this.#cleanup = setup(this.setOnline.bind(this));
  }
  /**
  * `setOnline` can be used to manually set the online state.
  *
  * @example
  * ```ts
  * import { onlineManager } from '@tanstack/query-core'
  *
  * // Set to online
  * onlineManager.setOnline(true)
  *
  * // Set to offline
  * onlineManager.setOnline(false)
  * ```
  */
  setOnline(online) {
    if (this.#online !== online) {
      this.#online = online;
      this.listeners.forEach((listener) => {
        listener(online);
      });
    }
  }
  /**
  * `isOnline` can be used to get the current online state.
  */
  isOnline() {
    return this.#online;
  }
};
const onlineManager = new OnlineManager();
function defaultRetryDelay(failureCount) {
  return Math.min(1e3 * 2 ** failureCount, 3e4);
}
function canFetch(networkMode) {
  return (networkMode ?? "online") === "online" ? onlineManager.isOnline() : true;
}
var CancelledError = class extends Error {
  constructor(options) {
    super("CancelledError");
    this.revert = options?.revert;
    this.silent = options?.silent;
  }
};
function createRetryer(config) {
  let isRetryCancelled = false;
  let failureCount = 0;
  let continueFn;
  let status = "pending";
  let promiseResolve;
  let promiseReject;
  const promise = new Promise((resolve2, reject2) => {
    promiseResolve = resolve2;
    promiseReject = reject2;
  });
  promise.catch(noop);
  const isResolved = () => status !== "pending";
  const cancel = (cancelOptions) => {
    if (!isResolved()) {
      const error = new CancelledError(cancelOptions);
      reject(error);
      config.onCancel?.(error);
    }
  };
  const cancelRetry = () => {
    isRetryCancelled = true;
  };
  const continueRetry = () => {
    isRetryCancelled = false;
  };
  const canContinue = () => focusManager.isFocused() && (config.networkMode === "always" || onlineManager.isOnline()) && config.canRun();
  const canStart = () => canFetch(config.networkMode) && config.canRun();
  const resolve = (value) => {
    if (!isResolved()) {
      continueFn?.();
      status = "resolved";
      promiseResolve(value);
    }
  };
  const reject = (value) => {
    if (!isResolved()) {
      continueFn?.();
      status = "rejected";
      promiseReject(value);
    }
  };
  const pause = () => {
    return new Promise((continueResolve) => {
      continueFn = (value) => {
        if (isResolved() || canContinue()) continueResolve(value);
      };
      config.onPause?.();
    }).then(() => {
      continueFn = void 0;
      if (!isResolved()) config.onContinue?.();
    });
  };
  const run = () => {
    if (isResolved()) return;
    let promiseOrValue;
    const initialPromise = failureCount === 0 ? config.initialPromise : void 0;
    try {
      promiseOrValue = initialPromise ?? config.fn();
    } catch (error) {
      promiseOrValue = Promise.reject(error);
    }
    Promise.resolve(promiseOrValue).then(resolve).catch((error) => {
      if (isResolved()) return;
      const retry = config.retry ?? (isServer() ? 0 : 3);
      const retryDelay = config.retryDelay ?? defaultRetryDelay;
      const delay = typeof retryDelay === "function" ? retryDelay(failureCount, error) : retryDelay;
      const shouldRetry = retry === true || typeof retry === "number" && failureCount < retry || typeof retry === "function" && retry(failureCount, error);
      if (isRetryCancelled || !shouldRetry) {
        reject(error);
        return;
      }
      failureCount++;
      config.onFail?.(failureCount, error);
      sleep(delay).then(() => {
        return canContinue() ? void 0 : pause();
      }).then(() => {
        if (isRetryCancelled) reject(error);
        else run();
      });
    });
  };
  return {
    promise,
    status: () => status,
    cancel,
    continue: () => {
      continueFn?.();
      return promise;
    },
    cancelRetry,
    continueRetry,
    canStart,
    start: () => {
      if (canStart()) run();
      else pause().then(run);
      return promise;
    }
  };
}
var Removable = class {
  #gcTimeout;
  destroy() {
    this.clearGcTimeout();
  }
  scheduleGc() {
    this.clearGcTimeout();
    if (isValidTimeout(this.gcTime)) this.#gcTimeout = timeoutManager.setTimeout(() => {
      this.optionalRemove();
    }, this.gcTime);
  }
  updateGcTime(newGcTime) {
    this.gcTime = Math.max(this.gcTime || 0, newGcTime ?? (isServer() ? Infinity : 3e5));
  }
  clearGcTimeout() {
    if (this.#gcTimeout !== void 0) {
      timeoutManager.clearTimeout(this.#gcTimeout);
      this.#gcTimeout = void 0;
    }
  }
};
function infiniteQueryBehavior(pages) {
  return { onFetch: (context, query) => {
    const options = context.options;
    const direction = context.fetchOptions?.meta?.fetchMore?.direction;
    const oldPages = context.state.data?.pages || [];
    const oldPageParams = context.state.data?.pageParams || [];
    let result = {
      pages: [],
      pageParams: []
    };
    let currentPage = 0;
    const fetchFn = async () => {
      let cancelled = false;
      const addSignalProperty = (object) => {
        addConsumeAwareSignal(object, () => context.signal, () => cancelled = true);
      };
      const queryFn = ensureQueryFn(context.options, context.fetchOptions);
      const fetchPage = async (data, param, previous) => {
        if (cancelled) return Promise.reject(context.signal.reason);
        if (param == null && data.pages.length) return Promise.resolve(data);
        const createQueryFnContext = () => {
          const queryFnContext2 = {
            client: context.client,
            queryKey: context.queryKey,
            pageParam: param,
            direction: previous ? "backward" : "forward",
            meta: context.options.meta
          };
          addSignalProperty(queryFnContext2);
          return queryFnContext2;
        };
        const queryFnContext = createQueryFnContext();
        const page = await queryFn(queryFnContext);
        const { maxPages } = context.options;
        const addTo = previous ? addToStart : addToEnd;
        return {
          pages: addTo(data.pages, page, maxPages),
          pageParams: addTo(data.pageParams, param, maxPages)
        };
      };
      if (direction && oldPages.length) {
        const previous = direction === "backward";
        const pageParamFn = previous ? getPreviousPageParam : getNextPageParam;
        const oldData = {
          pages: oldPages,
          pageParams: oldPageParams
        };
        result = await fetchPage(oldData, pageParamFn(options, oldData), previous);
      } else {
        const remainingPages = pages ?? oldPages.length;
        do {
          const param = currentPage === 0 ? oldPageParams[0] ?? options.initialPageParam : getNextPageParam(options, result);
          if (currentPage > 0 && param == null) break;
          result = await fetchPage(result, param);
          currentPage++;
        } while (currentPage < remainingPages);
      }
      return result;
    };
    if (context.options.persister) context.fetchFn = () => {
      return context.options.persister?.(fetchFn, {
        client: context.client,
        queryKey: context.queryKey,
        meta: context.options.meta,
        signal: context.signal
      }, query);
    };
    else context.fetchFn = fetchFn;
  } };
}
function getNextPageParam(options, { pages, pageParams }) {
  const lastIndex = pages.length - 1;
  return pages.length > 0 ? options.getNextPageParam(pages[lastIndex], pages, pageParams[lastIndex], pageParams) : void 0;
}
function getPreviousPageParam(options, { pages, pageParams }) {
  return pages.length > 0 ? options.getPreviousPageParam?.(pages[0], pages, pageParams[0], pageParams) : void 0;
}
var Query = class extends Removable {
  #queryType;
  #initialState;
  #revertState;
  #cache;
  #client;
  #retryer;
  #defaultOptions;
  #abortSignalConsumed;
  constructor(config) {
    super();
    this.#abortSignalConsumed = false;
    this.#defaultOptions = config.defaultOptions;
    this.setOptions(config.options);
    this.observers = [];
    this.#client = config.client;
    this.#cache = this.#client.getQueryCache();
    this.queryKey = config.queryKey;
    this.queryHash = config.queryHash;
    this.#initialState = getDefaultState$1(this.options);
    this.state = config.state ?? this.#initialState;
    this.scheduleGc();
  }
  /**
  * The `meta` object passed in the query's options, if any.
  */
  get meta() {
    return this.options.meta;
  }
  /** @internal */
  get queryType() {
    return this.#queryType;
  }
  /**
  * The promise for the currently in-flight fetch, if the query is fetching.
  * `undefined` when the query is not fetching.
  */
  get promise() {
    return this.#retryer?.promise;
  }
  /** @internal */
  setOptions(options) {
    this.options = {
      ...this.#defaultOptions,
      ...options
    };
    if (options?._type) this.#queryType = options._type;
    this.updateGcTime(this.options.gcTime);
    if (this.state && this.state.data === void 0) {
      const defaultState = getDefaultState$1(this.options);
      if (defaultState.data !== void 0) {
        this.setState(successState(defaultState.data, defaultState.dataUpdatedAt));
        this.#initialState = defaultState;
      }
    }
  }
  optionalRemove() {
    if (!this.observers.length && this.state.fetchStatus === "idle") this.#cache.remove(this);
  }
  /** @internal */
  setData(newData, options) {
    const data = replaceData(this.state.data, newData, this.options);
    this.#dispatch({
      data,
      type: "success",
      dataUpdatedAt: options?.updatedAt,
      manual: options?.manual
    });
    return data;
  }
  /**
  * Merges the given partial state directly into this query's state, notifying observers. Used
  * by persistence and broadcast plugins to restore a state snapshot, and by devtools to let a
  * user manually trigger a loading/error state or edit the cached data.
  */
  setState(state) {
    this.#dispatch({
      type: "setState",
      state
    });
  }
  /**
  * Cancels the query's currently in-flight fetch, if any.
  * - Returns a promise that resolves once the cancellation has settled.
  * - If no fetch is in progress, resolves immediately.
  *
  * @example
  * ```ts
  * await query.cancel()
  * ```
  */
  cancel(options) {
    const promise = this.#retryer?.promise;
    this.#retryer?.cancel(options);
    return promise ? promise.then(noop).catch(noop) : Promise.resolve();
  }
  /**
  * Clears the query's garbage collection timeout and silently cancels any
  * in-flight fetch. Called by `QueryCache` when the query is removed from
  * the cache.
  *
  * @see {@link Query#cancel}
  */
  destroy() {
    super.destroy();
    this.cancel({ silent: true });
  }
  /** @internal */
  get resetState() {
    return this.#initialState;
  }
  /**
  * Resets the query back to its initial state (the state it had when it was
  * first created, e.g. any `initialData`), destroying it first to cancel any
  * in-flight fetch.
  */
  reset() {
    this.destroy();
    this.setState(this.resetState);
  }
  /**
  * Returns `true` if the query has at least one observer for which `enabled`
  * does not resolve to `false`.
  */
  isActive() {
    return this.observers.some((observer) => resolveQueryValue(observer.options.enabled, this) !== false);
  }
  /**
  * Returns `true` if the query is disabled, meaning it will not fetch
  * automatically.
  * - If the query has observers, it is disabled when none of them are active
  *   (see `isActive`).
  * - If the query has no observers, it is disabled when its `queryFn` is
  *   `skipToken` or it has never been fetched.
  */
  isDisabled() {
    if (this.getObserversCount() > 0) return !this.isActive();
    return this.options.queryFn === skipToken || !this.isFetched();
  }
  /**
  * Returns `true` if the query has been fetched, i.e. it has resolved with
  * either data or an error at least once.
  */
  isFetched() {
    return this.state.dataUpdateCount + this.state.errorUpdateCount > 0;
  }
  /**
  * Returns `true` if the query has at least one observer configured with
  * `staleTime: 'static'`, meaning it is treated as never stale.
  */
  isStatic() {
    if (this.getObserversCount() > 0) return this.observers.some((observer) => resolveQueryValue(observer.options.staleTime, this) === "static");
    return false;
  }
  /**
  * Returns `true` if the query is stale.
  * - If the query has observers, defers to whether any observer's current
  *   result reports `isStale` (which accounts for each observer's own
  *   `staleTime` and `enabled` state).
  * - If the query has no observers, it is considered stale when it has no
  *   data or has been invalidated.
  *
  * @see {@link Query#isStaleByTime}
  * @example
  * ```ts
  * if (query.isStale()) {
  *   // refetch or otherwise treat the cached data as outdated
  * }
  * ```
  */
  isStale() {
    if (this.getObserversCount() > 0) return this.observers.some((observer) => observer.getCurrentResult().isStale);
    return this.state.data === void 0 || this.state.isInvalidated;
  }
  /**
  * Returns `true` if the query's data is stale relative to the given
  * `staleTime` (defaults to `0`).
  * - A query with no data is always stale.
  * - `staleTime: 'static'` is never stale.
  * - An invalidated query is always stale.
  * - Otherwise, staleness is based on elapsed time since `dataUpdatedAt`.
  *
  * @see {@link Query#isStale}
  * @example
  * ```ts
  * const isStale = query.isStaleByTime(1000 * 60)
  * ```
  */
  isStaleByTime(staleTime = 0) {
    if (this.state.data === void 0) return true;
    if (staleTime === "static") return false;
    if (this.state.isInvalidated) return true;
    return !timeUntilStale(this.state.dataUpdatedAt, staleTime);
  }
  /** @internal */
  onFocus() {
    this.observers.find((x) => x.shouldFetchOnWindowFocus())?.refetch({ cancelRefetch: false });
    this.#retryer?.continue();
  }
  /** @internal */
  onOnline() {
    this.observers.find((x) => x.shouldFetchOnReconnect())?.refetch({ cancelRefetch: false });
    this.#retryer?.continue();
  }
  /** @internal */
  addObserver(observer) {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
      this.clearGcTimeout();
      this.#cache.notify({
        type: "observerAdded",
        query: this,
        observer
      });
    }
  }
  /** @internal */
  removeObserver(observer) {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
      if (!this.observers.length) {
        if (this.#retryer) {
          if (this.#abortSignalConsumed || this.state.fetchStatus === "paused" && this.state.status === "pending") this.#retryer.cancel({ revert: true });
          else this.#retryer.cancelRetry();
        }
        this.scheduleGc();
      }
      this.#cache.notify({
        type: "observerRemoved",
        query: this,
        observer
      });
    }
  }
  /**
  * Returns the number of observers currently subscribed to this query.
  *
  * @example
  * ```ts
  * if (query.getObserversCount() === 0) {
  *   // no component is currently watching this query
  * }
  * ```
  */
  getObserversCount() {
    return this.observers.length;
  }
  /**
  * Marks the query as invalidated, unless it is already invalidated. This
  * updates `state.isInvalidated` and notifies observers, but does not by
  * itself trigger a refetch.
  *
  * @example
  * ```ts
  * query.invalidate()
  * ```
  */
  invalidate() {
    if (!this.state.isInvalidated) this.#dispatch({ type: "invalidate" });
  }
  /**
  * Fetches the query, i.e. runs its `queryFn` (through any configured
  * retryer/behavior) and updates the query's state with the result.
  * - If a fetch is already in flight, returns its promise instead of
  *   starting a new one, unless `fetchOptions.cancelRefetch` is set and the
  *   query already has data, in which case the current fetch is silently
  *   cancelled first.
  * - If `options` is passed, it replaces the query's current options
  *   before fetching.
  */
  async fetch(options, fetchOptions) {
    if (this.state.fetchStatus !== "idle" && this.#retryer?.status() !== "rejected") {
      if (this.state.data !== void 0 && fetchOptions?.cancelRefetch) this.cancel({ silent: true });
      else if (this.#retryer) {
        this.#retryer.continueRetry();
        return this.#retryer.promise;
      }
    }
    if (options) this.setOptions(options);
    if (!this.options.queryFn) {
      const observer = this.observers.find((x) => x.options.queryFn);
      if (observer) this.setOptions(observer.options);
    }
    const abortController = new AbortController();
    const addSignalProperty = (object) => {
      Object.defineProperty(object, "signal", {
        enumerable: true,
        get: () => {
          this.#abortSignalConsumed = true;
          return abortController.signal;
        }
      });
    };
    const fetchFn = () => {
      const queryFn = ensureQueryFn(this.options, fetchOptions);
      const createQueryFnContext = () => {
        const queryFnContext2 = {
          client: this.#client,
          queryKey: this.queryKey,
          meta: this.meta
        };
        addSignalProperty(queryFnContext2);
        return queryFnContext2;
      };
      const queryFnContext = createQueryFnContext();
      this.#abortSignalConsumed = false;
      if (this.options.persister) return this.options.persister(queryFn, queryFnContext, this);
      return queryFn(queryFnContext);
    };
    const createFetchContext = () => {
      const context2 = {
        fetchOptions,
        options: this.options,
        queryKey: this.queryKey,
        client: this.#client,
        state: this.state,
        fetchFn
      };
      addSignalProperty(context2);
      return context2;
    };
    const context = createFetchContext();
    (this.#queryType === "infinite" ? infiniteQueryBehavior(this.options.pages) : this.options.behavior)?.onFetch(context, this);
    this.#revertState = this.state;
    if (this.state.fetchStatus === "idle" || this.state.fetchMeta !== context.fetchOptions?.meta) this.#dispatch({
      type: "fetch",
      meta: context.fetchOptions?.meta
    });
    const retryer = this.#retryer = createRetryer({
      initialPromise: fetchOptions?.initialPromise,
      fn: context.fetchFn,
      onCancel: (error) => {
        if (error instanceof CancelledError && error.revert) this.setState({
          ...this.#revertState,
          fetchStatus: "idle"
        });
        abortController.abort();
      },
      onFail: (failureCount, error) => {
        this.#dispatch({
          type: "failed",
          failureCount,
          error
        });
      },
      onPause: () => {
        this.#dispatch({ type: "pause" });
      },
      onContinue: () => {
        this.#dispatch({ type: "continue" });
      },
      retry: context.options.retry,
      retryDelay: context.options.retryDelay,
      networkMode: context.options.networkMode,
      canRun: () => true
    });
    try {
      const data = await retryer.start();
      if (data === void 0) {
        if (false) ;
        throw new Error(`${this.queryHash} data is undefined`);
      }
      this.setData(data);
      this.#cache.config.onSuccess?.(data, this);
      this.#cache.config.onSettled?.(data, this.state.error, this);
      return data;
    } catch (error) {
      if (error instanceof CancelledError) {
        if (error.silent) return this.#retryer.promise;
        else if (error.revert) {
          if (this.state.data === void 0) throw error;
          return this.state.data;
        }
      }
      this.#dispatch({
        type: "error",
        error
      });
      this.#cache.config.onError?.(error, this);
      this.#cache.config.onSettled?.(this.state.data, error, this);
      throw error;
    } finally {
      if (this.#retryer === retryer) this.#retryer = void 0;
      this.scheduleGc();
    }
  }
  #dispatch(action) {
    const reducer = (state) => {
      switch (action.type) {
        case "failed":
          return {
            ...state,
            fetchFailureCount: action.failureCount,
            fetchFailureReason: action.error
          };
        case "pause":
          return {
            ...state,
            fetchStatus: "paused"
          };
        case "continue":
          return {
            ...state,
            fetchStatus: "fetching"
          };
        case "fetch":
          return {
            ...state,
            ...fetchState(state.data, this.options),
            fetchMeta: action.meta ?? null
          };
        case "success":
          const newState = {
            ...state,
            ...successState(action.data, action.dataUpdatedAt),
            dataUpdateCount: state.dataUpdateCount + 1,
            ...!action.manual && {
              fetchStatus: "idle",
              fetchFailureCount: 0,
              fetchFailureReason: null
            }
          };
          this.#revertState = action.manual ? newState : void 0;
          return newState;
        case "error":
          const error = action.error;
          return {
            ...state,
            error,
            errorUpdateCount: state.errorUpdateCount + 1,
            errorUpdatedAt: Date.now(),
            fetchFailureCount: state.fetchFailureCount + 1,
            fetchFailureReason: error,
            fetchStatus: "idle",
            status: "error",
            isInvalidated: true
          };
        case "invalidate":
          return {
            ...state,
            isInvalidated: true
          };
        case "setState":
          return {
            ...state,
            ...action.state
          };
      }
    };
    this.state = reducer(this.state);
    notifyManager.batch(() => {
      this.observers.slice().forEach((observer) => {
        observer.onQueryUpdate();
      });
      this.#cache.notify({
        query: this,
        type: "updated",
        action
      });
    });
  }
};
function fetchState(data, options) {
  return {
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchStatus: canFetch(options.networkMode) ? "fetching" : "paused",
    ...data === void 0 && {
      error: null,
      status: "pending"
    }
  };
}
function successState(data, dataUpdatedAt) {
  return {
    data,
    dataUpdatedAt: dataUpdatedAt ?? Date.now(),
    error: null,
    isInvalidated: false,
    status: "success"
  };
}
function getDefaultState$1(options) {
  const data = typeof options.initialData === "function" ? options.initialData() : options.initialData;
  const hasData = data !== void 0;
  const initialDataUpdatedAt = hasData ? typeof options.initialDataUpdatedAt === "function" ? options.initialDataUpdatedAt() : options.initialDataUpdatedAt : 0;
  return {
    data,
    dataUpdateCount: 0,
    dataUpdatedAt: hasData ? initialDataUpdatedAt ?? Date.now() : 0,
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: false,
    status: hasData ? "success" : "pending",
    fetchStatus: "idle"
  };
}
var Mutation = class extends Removable {
  #client;
  #observers;
  #mutationCache;
  #retryer;
  constructor(config) {
    super();
    this.#client = config.client;
    this.mutationId = config.mutationId;
    this.#mutationCache = config.mutationCache;
    this.#observers = [];
    this.state = config.state || getDefaultState();
    this.setOptions(config.options);
    this.scheduleGc();
  }
  /** @internal */
  setOptions(options) {
    this.options = options;
    this.updateGcTime(this.options.gcTime);
  }
  /**
  * The `meta` object passed in the mutation's options, if any.
  */
  get meta() {
    return this.options.meta;
  }
  /** @internal */
  addObserver(observer) {
    if (!this.#observers.includes(observer)) {
      this.#observers.push(observer);
      this.clearGcTimeout();
      this.#mutationCache.notify({
        type: "observerAdded",
        mutation: this,
        observer
      });
    }
  }
  /** @internal */
  removeObserver(observer) {
    this.#observers = this.#observers.filter((x) => x !== observer);
    this.scheduleGc();
    this.#mutationCache.notify({
      type: "observerRemoved",
      mutation: this,
      observer
    });
  }
  optionalRemove() {
    if (!this.#observers.length) {
      if (this.state.status === "pending") this.scheduleGc();
      else this.#mutationCache.remove(this);
    }
  }
  /**
  * Resumes a mutation that is currently paused or was restored from a
  * dehydrated, still-`pending` state.
  *
  * - If this mutation has an active retryer (it paused mid-attempt, e.g. due
  *   to the network mode or scope-based queuing), its retryer is resumed.
  * - Otherwise, if the mutation's status is still `pending` (e.g. it was
  *   dehydrated while an attempt was in flight and never got a retryer in
  *   this instance), `execute` is called again with the last known variables.
  * - Otherwise the mutation has already settled and this resolves immediately
  *   without running anything again.
  *
  * @example
  * ```ts
  * // typically driven by reconnect handling, e.g. queryClient.resumePausedMutations()
  * const mutation = mutationCache.find({ mutationKey: ['addPost'] })
  * await mutation?.continue()
  * ```
  *
  * @see {@link Mutation#execute}
  */
  continue() {
    return this.#retryer?.continue() ?? (this.state.status === "pending" ? this.execute(this.state.variables) : Promise.resolve());
  }
  /**
  * Runs the mutation function for the given variables through a retryer, and
  * drives the mutation's state and lifecycle callbacks through to settlement.
  *
  * If this mutation's state is already `pending` when `execute` is called
  * (i.e. it was restored, still in-flight, from a dehydrated state), the
  * `onMutate` step is skipped and a `continue` action is dispatched to
  * unpause it; otherwise a `pending` action is dispatched first, then the
  * mutation cache's `onMutate` and the mutation's own `onMutate` option are
  * awaited in that order, and the resulting context is stored.
  *
  * The mutation function is then run (subject to `retry`/`retryDelay`/
  * `networkMode`, and to the mutation cache's scope-based serialization).
  * On success, the cache's `onSuccess`/`onSettled` callbacks run before the
  * mutation's own `onSuccess`/`onSettled` options, a `success` action is
  * dispatched, and the resolved data is returned. On failure, the same
  * cache-then-option ordering is used for `onError`/`onSettled`, but each of
  * those four callbacks is individually caught so that a throwing callback
  * cannot mask the original error; an `error` action is then dispatched and
  * the original error is re-thrown.
  *
  * @example
  * ```ts
  * // Called internally by `MutationObserver.mutate` and `Mutation.continue` —
  * // applications normally trigger mutations through those, not this method.
  * const data = await mutation.execute(variables)
  * ```
  *
  * @see {@link Mutation#continue}
  */
  async execute(variables) {
    const onContinue = () => {
      this.#dispatch({ type: "continue" });
    };
    const mutationFnContext = {
      client: this.#client,
      meta: this.options.meta,
      mutationKey: this.options.mutationKey
    };
    const retryer = this.#retryer = createRetryer({
      fn: () => {
        if (!this.options.mutationFn) return Promise.reject(/* @__PURE__ */ new Error("No mutationFn found"));
        return this.options.mutationFn(variables, mutationFnContext);
      },
      onFail: (failureCount, error) => {
        this.#dispatch({
          type: "failed",
          failureCount,
          error
        });
      },
      onPause: () => {
        this.#dispatch({ type: "pause" });
      },
      onContinue,
      retry: this.options.retry ?? 0,
      retryDelay: this.options.retryDelay,
      networkMode: this.options.networkMode,
      canRun: () => this.#mutationCache.canRun(this)
    });
    const restored = this.state.status === "pending";
    const isPaused = !retryer.canStart();
    try {
      if (restored) onContinue();
      else {
        this.#dispatch({
          type: "pending",
          variables,
          isPaused
        });
        if (this.#mutationCache.config.onMutate) await this.#mutationCache.config.onMutate(variables, this, mutationFnContext);
        const context = await this.options.onMutate?.(variables, mutationFnContext);
        if (context !== this.state.context) this.#dispatch({
          type: "pending",
          context,
          variables,
          isPaused
        });
      }
      const data = await retryer.start();
      await this.#mutationCache.config.onSuccess?.(data, variables, this.state.context, this, mutationFnContext);
      await this.options.onSuccess?.(data, variables, this.state.context, mutationFnContext);
      await this.#mutationCache.config.onSettled?.(data, null, this.state.variables, this.state.context, this, mutationFnContext);
      await this.options.onSettled?.(data, null, variables, this.state.context, mutationFnContext);
      this.#dispatch({
        type: "success",
        data
      });
      return data;
    } catch (error) {
      try {
        await this.#mutationCache.config.onError?.(error, variables, this.state.context, this, mutationFnContext);
      } catch (e) {
        Promise.reject(e);
      }
      try {
        await this.options.onError?.(error, variables, this.state.context, mutationFnContext);
      } catch (e) {
        Promise.reject(e);
      }
      try {
        await this.#mutationCache.config.onSettled?.(void 0, error, this.state.variables, this.state.context, this, mutationFnContext);
      } catch (e) {
        Promise.reject(e);
      }
      try {
        await this.options.onSettled?.(void 0, error, variables, this.state.context, mutationFnContext);
      } catch (e) {
        Promise.reject(e);
      }
      this.#dispatch({
        type: "error",
        error
      });
      throw error;
    } finally {
      if (this.#retryer === retryer) this.#retryer = void 0;
      this.#mutationCache.runNext(this);
    }
  }
  #dispatch(action) {
    const reducer = (state) => {
      switch (action.type) {
        case "failed":
          return {
            ...state,
            failureCount: action.failureCount,
            failureReason: action.error
          };
        case "pause":
          return {
            ...state,
            isPaused: true
          };
        case "continue":
          return {
            ...state,
            isPaused: false
          };
        case "pending":
          return {
            ...state,
            context: action.context,
            data: void 0,
            failureCount: 0,
            failureReason: null,
            error: null,
            isPaused: action.isPaused,
            status: "pending",
            variables: action.variables,
            submittedAt: Date.now()
          };
        case "success":
          return {
            ...state,
            data: action.data,
            failureCount: 0,
            failureReason: null,
            error: null,
            status: "success",
            isPaused: false
          };
        case "error":
          return {
            ...state,
            data: void 0,
            error: action.error,
            failureCount: state.failureCount + 1,
            failureReason: action.error,
            isPaused: false,
            status: "error"
          };
      }
    };
    this.state = reducer(this.state);
    notifyManager.batch(() => {
      this.#observers.forEach((observer) => {
        observer.onMutationUpdate(action);
      });
      this.#mutationCache.notify({
        mutation: this,
        type: "updated",
        action
      });
    });
  }
};
function getDefaultState() {
  return {
    context: void 0,
    data: void 0,
    error: null,
    failureCount: 0,
    failureReason: null,
    isPaused: false,
    status: "idle",
    variables: void 0,
    submittedAt: 0
  };
}
var MutationCache = class extends Subscribable {
  #mutations;
  #scopes;
  #mutationId;
  constructor(config = {}) {
    super();
    this.config = config;
    this.#mutations = /* @__PURE__ */ new Set();
    this.#scopes = /* @__PURE__ */ new Map();
    this.#mutationId = 0;
  }
  /** @internal */
  build(client, options, state) {
    const mutation = new Mutation({
      client,
      mutationCache: this,
      mutationId: ++this.#mutationId,
      options: client.defaultMutationOptions(options),
      state
    });
    this.add(mutation);
    return mutation;
  }
  /** @internal */
  add(mutation) {
    this.#mutations.add(mutation);
    const scope = scopeFor(mutation);
    if (typeof scope === "string") {
      const scopedMutations = this.#scopes.get(scope);
      if (scopedMutations) scopedMutations.push(mutation);
      else this.#scopes.set(scope, [mutation]);
    }
    this.notify({
      type: "added",
      mutation
    });
  }
  /** @internal */
  remove(mutation) {
    if (this.#mutations.delete(mutation)) {
      const scope = scopeFor(mutation);
      if (typeof scope === "string") {
        const scopedMutations = this.#scopes.get(scope);
        if (scopedMutations) {
          if (scopedMutations.length > 1) {
            const index = scopedMutations.indexOf(mutation);
            if (index !== -1) scopedMutations.splice(index, 1);
          } else if (scopedMutations[0] === mutation) this.#scopes.delete(scope);
        }
      }
    }
    this.notify({
      type: "removed",
      mutation
    });
  }
  /** @internal */
  canRun(mutation) {
    const scope = scopeFor(mutation);
    if (typeof scope === "string") {
      const firstPendingMutation = this.#scopes.get(scope)?.find((m) => m.state.status === "pending");
      return !firstPendingMutation || firstPendingMutation === mutation;
    } else return true;
  }
  /** @internal */
  runNext(mutation) {
    const scope = scopeFor(mutation);
    if (typeof scope === "string") return this.#scopes.get(scope)?.find((m) => m !== mutation && m.state.isPaused)?.continue() ?? Promise.resolve();
    else return Promise.resolve();
  }
  /**
  * Removes all mutations from the cache.
  *
  * @example
  * ```ts
  * const mutationCache = queryClient.getMutationCache()
  *
  * mutationCache.clear()
  * ```
  */
  clear() {
    notifyManager.batch(() => {
      this.#mutations.forEach((mutation) => {
        this.notify({
          type: "removed",
          mutation
        });
      });
      this.#mutations.clear();
      this.#scopes.clear();
    });
  }
  /**
  * Returns all mutations within the cache.
  *
  * This is not typically needed for most applications, but can come in handy when needing more
  * information about a mutation in rare scenarios.
  *
  * @example
  * ```ts
  * const mutationCache = queryClient.getMutationCache()
  *
  * const mutations = mutationCache.getAll()
  * ```
  */
  getAll() {
    return Array.from(this.#mutations);
  }
  /**
  * A slightly more advanced method that can be used to get an existing mutation instance from
  * the cache. If the mutation does not exist, `undefined` is returned.
  *
  * This is not typically needed for most applications, but can come in handy when needing more
  * information about a mutation in rare scenarios.
  *
  * @see {@link MutationCache#findAll}
  * @example
  * ```ts
  * const mutationCache = queryClient.getMutationCache()
  *
  * const mutation = mutationCache.find({ mutationKey: ['addPost'] })
  * ```
  */
  find(filters) {
    const defaultedFilters = {
      exact: true,
      ...filters
    };
    return this.getAll().find((mutation) => matchMutation(defaultedFilters, mutation));
  }
  /**
  * An even more advanced method that can be used to get existing mutation instances from the
  * cache that match the given filters. If no mutations match, an empty array is returned.
  *
  * This is not typically needed for most applications, but can come in handy when needing more
  * information about mutations in rare scenarios.
  *
  * @see {@link MutationCache#find}
  * @example
  * ```ts
  * const mutationCache = queryClient.getMutationCache()
  *
  * const mutations = mutationCache.findAll({ mutationKey: ['addPost'] })
  * ```
  */
  findAll(filters = {}) {
    return this.getAll().filter((mutation) => matchMutation(filters, mutation));
  }
  /** @internal */
  notify(event) {
    notifyManager.batch(() => {
      this.listeners.forEach((listener) => {
        listener(event);
      });
    });
  }
  /** @internal */
  resumePausedMutations() {
    const pausedMutations = this.getAll().filter((x) => x.state.isPaused);
    return notifyManager.batch(() => Promise.all(pausedMutations.map((mutation) => mutation.continue().catch(noop))));
  }
};
function scopeFor(mutation) {
  return mutation.options.scope?.id;
}
var QueryCache = class extends Subscribable {
  #queries;
  constructor(config = {}) {
    super();
    this.config = config;
    this.#queries = /* @__PURE__ */ new Map();
  }
  /**
  * Returns the existing `Query` instance for the given options' `queryKey`/`queryHash`, or
  * builds and adds a new one to the cache if none exists yet. Used by framework adapters and
  * plugins (e.g. broadcast/persistence) that need to get-or-create a `Query` directly, bypassing
  * the reactive `QueryObserver` machinery.
  *
  * @example
  * ```ts
  * const queryCache = queryClient.getQueryCache()
  *
  * const query = queryCache.build(queryClient, {
  *   queryKey: ['posts'],
  *   queryFn: fetchPosts,
  * })
  * ```
  */
  build(client, options, state) {
    const queryKey = options.queryKey;
    const queryHash = options.queryHash ?? hashQueryKeyByOptions(queryKey, options);
    let query = this.get(queryHash);
    if (!query) {
      query = new Query({
        client,
        queryKey,
        queryHash,
        options: client.defaultQueryOptions(options),
        state,
        defaultOptions: client.getQueryDefaults(queryKey)
      });
      this.add(query);
    }
    return query;
  }
  /** @internal */
  add(query) {
    if (!this.#queries.has(query.queryHash)) {
      this.#queries.set(query.queryHash, query);
      this.notify({
        type: "added",
        query
      });
    }
  }
  /**
  * Destroys the given `Query` and removes it from the cache, notifying subscribers with a
  * `'removed'` event. A no-op if the query is no longer the one currently stored under its hash
  * (e.g. it was already replaced). Used by plugins (e.g. the broadcast client) that mirror
  * removals across `QueryCache` instances.
  *
  * @example
  * ```ts
  * const queryCache = queryClient.getQueryCache()
  * const query = queryCache.find({ queryKey: ['posts'] })
  *
  * if (query) {
  *   queryCache.remove(query)
  * }
  * ```
  */
  remove(query) {
    const queryInMap = this.#queries.get(query.queryHash);
    if (queryInMap) {
      query.destroy();
      if (queryInMap === query) this.#queries.delete(query.queryHash);
      this.notify({
        type: "removed",
        query
      });
    }
  }
  /**
  * Removes all queries from the cache.
  *
  * @example
  * ```ts
  * const queryCache = queryClient.getQueryCache()
  *
  * queryCache.clear()
  * ```
  */
  clear() {
    notifyManager.batch(() => {
      this.getAll().forEach((query) => {
        this.remove(query);
      });
    });
  }
  /**
  * Returns the `Query` instance stored under the given `queryHash`, or `undefined` if none
  * exists. Unlike {@link QueryCache#find}, this looks up by the already-computed hash rather
  * than by `QueryFilters`. Used by plugins (e.g. broadcast/hydration) that already have a hash
  * to look up directly.
  *
  * @example
  * ```ts
  * const queryCache = queryClient.getQueryCache()
  * const queryHash = hashKey(['posts'])
  *
  * const query = queryCache.get(queryHash)
  * ```
  */
  get(queryHash) {
    return this.#queries.get(queryHash);
  }
  /**
  * Returns all queries within the cache.
  *
  * @example
  * ```ts
  * const queryCache = queryClient.getQueryCache()
  *
  * const queries = queryCache.getAll()
  * ```
  */
  getAll() {
    return [...this.#queries.values()];
  }
  /**
  * A slightly more advanced method that can be used to get an existing query instance from the
  * cache. This instance not only contains all the state for the query, but all of the instances,
  * and underlying guts of the query as well. If the query does not exist, `undefined` is
  * returned.
  *
  * This is not typically needed for most applications, but can come in handy when needing more
  * information about a query in rare scenarios (e.g. looking at `query.state.dataUpdatedAt` to
  * decide whether a query is fresh enough to be used as an initial value).
  *
  * @see {@link QueryCache#findAll}
  * @example
  * ```ts
  * const queryCache = queryClient.getQueryCache()
  *
  * const query = queryCache.find({ queryKey: ['posts'] })
  * ```
  */
  find(filters) {
    const defaultedFilters = {
      exact: true,
      ...filters
    };
    return this.getAll().find((query) => matchQuery(defaultedFilters, query));
  }
  /**
  * An even more advanced method that can be used to get existing query instances from the cache
  * that partially match a query key. If no queries match, an empty array is returned.
  *
  * This is not typically needed for most applications, but can come in handy when needing more
  * information about queries in rare scenarios.
  *
  * @see {@link QueryCache#find}
  * @example
  * ```ts
  * const queryCache = queryClient.getQueryCache()
  *
  * const queries = queryCache.findAll({ queryKey: ['posts'] })
  * ```
  */
  findAll(filters = {}) {
    const queries = this.getAll();
    return Object.keys(filters).length > 0 ? queries.filter((query) => matchQuery(filters, query)) : queries;
  }
  /** @internal */
  notify(event) {
    notifyManager.batch(() => {
      this.listeners.forEach((listener) => {
        listener(event);
      });
    });
  }
  /** @internal */
  onFocus() {
    notifyManager.batch(() => {
      this.getAll().forEach((query) => {
        query.onFocus();
      });
    });
  }
  /** @internal */
  onOnline() {
    notifyManager.batch(() => {
      this.getAll().forEach((query) => {
        query.onOnline();
      });
    });
  }
};
var QueryClient = class {
  #queryCache;
  #mutationCache;
  #defaultOptions;
  #queryDefaults;
  #mutationDefaults;
  #mountCount;
  #unsubscribeFocus;
  #unsubscribeOnline;
  constructor(config = {}) {
    this.#queryCache = config.queryCache || new QueryCache();
    this.#mutationCache = config.mutationCache || new MutationCache();
    this.#defaultOptions = config.defaultOptions || {};
    this.#queryDefaults = /* @__PURE__ */ new Map();
    this.#mutationDefaults = /* @__PURE__ */ new Map();
    this.#mountCount = 0;
  }
  /**
  * Called by a framework adapter's `QueryClientProvider`-equivalent when it mounts, to start
  * listening for focus/online events and resume paused mutations. Ref-counted via an internal
  * mount count, so nested or multiple providers sharing the same `QueryClient` don't tear down
  * the shared listeners until the last one unmounts.
  */
  mount() {
    this.#mountCount++;
    if (this.#mountCount !== 1) return;
    this.#unsubscribeFocus = focusManager.subscribe(async (focused) => {
      if (focused) {
        await this.resumePausedMutations();
        this.#queryCache.onFocus();
      }
    });
    this.#unsubscribeOnline = onlineManager.subscribe(async (online) => {
      if (online) {
        await this.resumePausedMutations();
        this.#queryCache.onOnline();
      }
    });
  }
  /**
  * The inverse of {@link QueryClient#mount} — called by a framework adapter's
  * `QueryClientProvider`-equivalent when it unmounts. Only tears down the focus/online
  * listeners once the mount count returns to `0`.
  */
  unmount() {
    this.#mountCount--;
    if (this.#mountCount !== 0) return;
    this.#unsubscribeFocus?.();
    this.#unsubscribeFocus = void 0;
    this.#unsubscribeOnline?.();
    this.#unsubscribeOnline = void 0;
  }
  /**
  * Returns the number of queries in the cache that are currently fetching, optionally
  * matching a set of filters. This includes background-fetching, loading new pages, and
  * loading more infinite query results.
  *
  * @example
  * ```ts
  * if (queryClient.isFetching()) {
  *   console.log('At least one query is fetching!')
  * }
  * ```
  */
  isFetching(filters) {
    return this.#queryCache.findAll({
      ...filters,
      fetchStatus: "fetching"
    }).length;
  }
  /**
  * Returns the number of mutations in the cache that are currently pending, optionally
  * matching a set of filters.
  *
  * @example
  * ```ts
  * if (queryClient.isMutating()) {
  *   console.log('At least one mutation is pending!')
  * }
  * ```
  */
  isMutating(filters) {
    return this.#mutationCache.findAll({
      ...filters,
      status: "pending"
    }).length;
  }
  /**
  * Imperative (non-reactive) way to retrieve data for a QueryKey.
  * Should only be used in callbacks or functions where reading the latest data is necessary, e.g. for optimistic updates.
  *
  * Hint: Do not use this function inside a component, because it won't receive updates.
  * Use `useQuery` to create a `QueryObserver` that subscribes to changes.
  *
  * @see {@link QueryClient#getQueriesData}
  */
  getQueryData(queryKey) {
    const options = this.defaultQueryOptions({ queryKey });
    return this.#queryCache.get(options.queryHash)?.state.data;
  }
  /**
  * @deprecated Use queryClient.query({ ...options, staleTime: 'static' }) instead. This method will be removed in the next major version.
  */
  ensureQueryData(options) {
    const defaultedOptions = this.defaultQueryOptions(options);
    const query = this.#queryCache.build(this, defaultedOptions);
    const cachedData = query.state.data;
    if (cachedData === void 0) return this.fetchQuery(options);
    if (options.revalidateIfStale && query.isStaleByTime(resolveQueryValue(defaultedOptions.staleTime, query))) this.prefetchQuery(defaultedOptions);
    return Promise.resolve(cachedData);
  }
  /**
  * Imperative (non-reactive) way to retrieve the cached data of multiple queries at once.
  * Only queries matching the given filters are returned; if none match, an empty array is
  * returned.
  *
  * Because the matched queries can hold data of different shapes (e.g. a broad filter can match
  * queries with unrelated data types), the `TQueryFnData` generic defaults to `unknown` rather
  * than being inferred. Passing a more specific type is a convenience for call sites that know
  * every matched query holds the same shape — it is not checked against the actual cache
  * contents.
  *
  * @see {@link QueryClient#getQueryData}
  * @example
  * ```ts
  * const data = queryClient.getQueriesData({ queryKey: ['posts'] })
  * ```
  */
  getQueriesData(filters) {
    return this.#queryCache.findAll(filters).map(({ queryKey, state }) => {
      return [queryKey, state.data];
    });
  }
  /**
  * Synchronous way to immediately update a query's cached data. If the updater (or the value
  * passed) resolves to `undefined`, the cache is left untouched and no query is created;
  * otherwise, if the query does not exist yet, it will be created. To update multiple queries
  * at once by partially matching query keys, use {@link QueryClient#setQueriesData} instead.
  *
  * Updates must be performed immutably: do not mutate `oldData`, or data previously retrieved
  * via {@link QueryClient#getQueryData}, in place.
  *
  * @param queryKey - The query key to set data for.
  * @param updater - Either the new data, or a function that receives the current data (which
  * may be `undefined`) and returns the new data.
  *
  * @example
  * ```ts
  * queryClient.setQueryData(['posts'], newPosts)
  *
  * // Or, using an updater function that receives the current data:
  * queryClient.setQueryData(['posts'], (oldPosts) => [...oldPosts, newPost])
  * ```
  */
  setQueryData(queryKey, updater, options) {
    const defaultedOptions = this.defaultQueryOptions({ queryKey });
    const prevData = this.#queryCache.get(defaultedOptions.queryHash)?.state.data;
    const data = functionalUpdate(updater, prevData);
    if (data === void 0) return;
    return this.#queryCache.build(this, defaultedOptions).setData(data, {
      ...options,
      manual: true
    });
  }
  /**
  * Synchronous way to immediately update the cached data of multiple queries at once, using
  * filters or partial query key matching. Only queries that already exist and match the given
  * filters are updated; no new cache entries are created. Internally this calls
  * {@link QueryClient#setQueryData} for each matching query.
  *
  * @example
  * ```ts
  * queryClient.setQueriesData({ queryKey: ['posts'] }, (oldPosts) =>
  *   oldPosts ? oldPosts.filter((post) => post.id !== deletedId) : oldPosts,
  * )
  * ```
  */
  setQueriesData(filters, updater, options) {
    return notifyManager.batch(() => this.#queryCache.findAll(filters).map(({ queryKey }) => [queryKey, this.setQueryData(queryKey, updater, options)]));
  }
  /**
  * Imperative (non-reactive) way to retrieve an existing query's state. If the query does not
  * exist, `undefined` is returned.
  *
  * @example
  * ```ts
  * const state = queryClient.getQueryState(['posts'])
  * console.log(state?.dataUpdatedAt)
  * ```
  */
  getQueryState(queryKey) {
    const options = this.defaultQueryOptions({ queryKey });
    return this.#queryCache.get(options.queryHash)?.state;
  }
  /**
  * Removes queries from the cache that match the given filters. Unlike
  * {@link QueryClient#invalidateQueries} or {@link QueryClient#refetchQueries}, this removes
  * matching queries from the cache instead of refetching them. Without filters, every query in
  * the cache is removed.
  *
  * @example
  * ```ts
  * queryClient.removeQueries({ queryKey: ['posts'], exact: true })
  * ```
  */
  removeQueries(filters) {
    const queryCache = this.#queryCache;
    notifyManager.batch(() => {
      queryCache.findAll(filters).forEach((query) => {
        queryCache.remove(query);
      });
    });
  }
  /**
  * Resets queries matching the given filters back to their initial state (e.g. any
  * `initialData`), notifying subscribers rather than removing them. Active queries among the
  * matched set are then refetched, and the returned promise resolves once that refetch settles.
  *
  * @example
  * ```ts
  * await queryClient.resetQueries({ queryKey: ['posts'], exact: true })
  * ```
  */
  resetQueries(filters, options) {
    const queryCache = this.#queryCache;
    return notifyManager.batch(() => {
      const matched = queryCache.findAll(filters);
      const queriesToRefetch = new Set(matched);
      matched.forEach((query) => {
        query.reset();
      });
      return this.refetchQueries({
        type: "active",
        predicate: (query) => queriesToRefetch.has(query)
      }, options);
    });
  }
  /**
  * Cancels outgoing fetches for queries matching the given filters. Most useful when performing
  * optimistic updates, since any outgoing refetch that resolves afterwards would otherwise
  * overwrite the optimistic update. By default (`revert: true`), a cancelled query's data is
  * reverted to its state before the outgoing fetch started.
  *
  * The returned promise never rejects, even if individual cancellations fail.
  *
  * @example
  * ```ts
  * await queryClient.cancelQueries({ queryKey: ['posts'], exact: true })
  * ```
  */
  cancelQueries(filters, cancelOptions = {}) {
    const defaultedCancelOptions = {
      revert: true,
      ...cancelOptions
    };
    const promises = notifyManager.batch(() => this.#queryCache.findAll(filters).map((query) => query.cancel(defaultedCancelOptions)));
    return Promise.all(promises).then(noop).catch(noop);
  }
  /**
  * Marks queries matching the given filters as invalidated. Unlike
  * {@link QueryClient#removeQueries}, invalidated queries stay in the cache.
  *
  * Unless `filters.refetchType` is `'none'`, matching queries are then refetched via
  * {@link QueryClient#refetchQueries}, using `filters.refetchType` if set, otherwise
  * `filters.type`, otherwise `'active'`.
  *
  * @example
  * ```ts
  * await queryClient.invalidateQueries({ queryKey: ['posts'], refetchType: 'active' })
  * ```
  */
  invalidateQueries(filters, options = {}) {
    return notifyManager.batch(() => {
      this.#queryCache.findAll(filters).forEach((query) => {
        query.invalidate();
      });
      if (filters?.refetchType === "none") return Promise.resolve();
      return this.refetchQueries({
        ...filters,
        type: filters?.refetchType ?? filters?.type ?? "active"
      }, options);
    });
  }
  /**
  * Refetches queries matching the given filters, regardless of whether they are stale. Without
  * filters, every query in the cache is refetched. Queries that are disabled, or static (only
  * have observers with a static `staleTime`), are never refetched.
  *
  * By default (`cancelRefetch: true`), a currently running fetch is cancelled before the new
  * one starts. The returned promise resolves once all matching queries have settled; it does
  * not reject on individual query failures unless `throwOnError` is set.
  *
  * @example
  * ```ts
  * // refetch all active queries partially matching a query key:
  * await queryClient.refetchQueries({ queryKey: ['posts'], type: 'active' })
  * ```
  */
  refetchQueries(filters, options = {}) {
    const fetchOptions = {
      ...options,
      cancelRefetch: options.cancelRefetch ?? true
    };
    const promises = notifyManager.batch(() => this.#queryCache.findAll(filters).filter((query) => !query.isDisabled() && !query.isStatic()).map((query) => {
      let promise = query.fetch(void 0, fetchOptions);
      if (!fetchOptions.throwOnError) promise = promise.catch(noop);
      return query.state.fetchStatus === "paused" ? Promise.resolve() : promise;
    }));
    return Promise.all(promises).then(noop);
  }
  /**
  * Asynchronous method to fetch and cache a query, resolving with the data or throwing with
  * the error.
  *
  * If the query already exists in the cache and its data is not stale (per the given
  * `staleTime`), the cached data is returned without fetching. Otherwise, the query is fetched
  * and the promise resolves once the fetch settles. If a `select` function is provided, it is
  * applied to the data in both cases (cached or freshly fetched) before it is returned.
  *
  * Unlike a reactive observer, retries are disabled by default here (`retry: false`) unless
  * explicitly configured, since there is no component to catch a thrown error and retry through
  * re-render.
  *
  * The accepted options are `QueryObserverOptions` minus the fields that only make sense for a
  * reactive observer — `enabled`, `refetchInterval`, `refetchIntervalInBackground`,
  * `refetchOnWindowFocus`, `refetchOnReconnect`, `refetchOnMount`, `retryOnMount`,
  * `notifyOnChangeProps`, `throwOnError`, `suspense`, and `placeholderData` are not part of this
  * method's options.
  *
  * This method replaces the deprecated `fetchQuery`, and — combined with
  * `{ staleTime: 'static' }` — the deprecated `ensureQueryData`.
  *
  * @example
  * ```ts
  * try {
  *   const data = await queryClient.query({ queryKey, queryFn, staleTime: 10000 })
  * } catch (error) {
  *   console.log(error)
  * }
  * ```
  */
  async query(options) {
    const defaultedOptions = this.defaultQueryOptions(options);
    if (defaultedOptions.retry === void 0) defaultedOptions.retry = false;
    const query = this.#queryCache.build(this, defaultedOptions);
    const queryData = query.isStaleByTime(resolveQueryValue(defaultedOptions.staleTime, query)) ? await query.fetch(defaultedOptions) : query.state.data;
    const select = defaultedOptions.select;
    if (select) return select(queryData);
    return queryData;
  }
  /**
  * @deprecated Use queryClient.query(options) instead. This method will be removed in the next major version.
  */
  fetchQuery(options) {
    const defaultedOptions = this.defaultQueryOptions(options);
    if (defaultedOptions.retry === void 0) defaultedOptions.retry = false;
    const query = this.#queryCache.build(this, defaultedOptions);
    return query.isStaleByTime(resolveQueryValue(defaultedOptions.staleTime, query)) ? query.fetch(defaultedOptions) : Promise.resolve(query.state.data);
  }
  /**
  * @deprecated Use queryClient.query(options) instead. You can swallow errors with `.catch(noop)`. This method will be removed in the next major version.
  */
  prefetchQuery(options) {
    return this.fetchQuery(options).then(noop).catch(noop);
  }
  /**
  * Asynchronous method to fetch and cache an infinite query, resolving with an
  * {@link InfiniteData} object or throwing with the error.
  *
  * Behaves like {@link QueryClient#query}, accepting the same options (minus
  * `initialPageParam`), plus the required `initialPageParam`, and an optional `pages` /
  * `getNextPageParam` pair used to refetch a fixed number of pages from the start.
  *
  * This method replaces the deprecated `fetchInfiniteQuery`, and — combined with
  * `{ staleTime: 'static' }` — the deprecated `ensureInfiniteQueryData`.
  *
  * @example
  * ```ts
  * try {
  *   const data = await queryClient.infiniteQuery({ queryKey, queryFn, initialPageParam: 0 })
  *   console.log(data.pages)
  * } catch (error) {
  *   console.log(error)
  * }
  * ```
  */
  infiniteQuery(options) {
    options._type = "infinite";
    return this.query(options);
  }
  /**
  * @deprecated Use queryClient.infiniteQuery(options) instead. This method will be removed in the next major version.
  */
  fetchInfiniteQuery(options) {
    options._type = "infinite";
    return this.fetchQuery(options);
  }
  /**
  * @deprecated Use queryClient.infiniteQuery(options) instead. You can swallow errors with `.catch(noop)`. This method will be removed in the next major version.
  */
  prefetchInfiniteQuery(options) {
    return this.fetchInfiniteQuery(options).then(noop).catch(noop);
  }
  /**
  * @deprecated Use queryClient.infiniteQuery({ ...options, staleTime: 'static' }) instead. This method will be removed in the next major version.
  */
  ensureInfiniteQueryData(options) {
    options._type = "infinite";
    return this.ensureQueryData(options);
  }
  /**
  * Resumes mutations that were paused because there was no network connection. Does nothing
  * (resolving immediately) if the client is currently offline.
  *
  * @example
  * ```ts
  * import { QueryClient } from '@tanstack/query-core'
  *
  * const queryClient = new QueryClient()
  * await queryClient.resumePausedMutations()
  * ```
  */
  resumePausedMutations() {
    if (onlineManager.isOnline()) return this.#mutationCache.resumePausedMutations();
    return Promise.resolve();
  }
  /**
  * Returns the query cache this client is connected to.
  *
  * @example
  * ```ts
  * import { QueryClient } from '@tanstack/query-core'
  *
  * const queryClient = new QueryClient()
  * const queryCache = queryClient.getQueryCache()
  * const queries = queryCache.findAll({ queryKey: ['posts'] })
  * ```
  */
  getQueryCache() {
    return this.#queryCache;
  }
  /**
  * Returns the mutation cache this client is connected to.
  *
  * @example
  * ```ts
  * import { QueryClient } from '@tanstack/query-core'
  *
  * const queryClient = new QueryClient()
  * const mutationCache = queryClient.getMutationCache()
  * const mutations = mutationCache.findAll({ status: 'pending' })
  * ```
  */
  getMutationCache() {
    return this.#mutationCache;
  }
  /**
  * Returns the default options that were set when creating the client, or via
  * {@link QueryClient#setDefaultOptions}.
  *
  * @example
  * ```ts
  * import { QueryClient } from '@tanstack/query-core'
  *
  * const queryClient = new QueryClient()
  * const defaultOptions = queryClient.getDefaultOptions()
  * ```
  */
  getDefaultOptions() {
    return this.#defaultOptions;
  }
  /**
  * Dynamically sets the default options for this client, overwriting any previously defined
  * default options.
  *
  * @see {@link QueryClient#getDefaultOptions}
  * @example
  * ```ts
  * import { QueryClient } from '@tanstack/query-core'
  *
  * const queryClient = new QueryClient()
  * queryClient.setDefaultOptions({
  *   queries: {
  *     staleTime: Infinity,
  *   },
  * })
  * ```
  */
  setDefaultOptions(options) {
    this.#defaultOptions = options;
  }
  /**
  * Sets default options for queries whose query key partially matches the given `queryKey`.
  *
  * If several registered query defaults match a given query key, they are merged together in
  * registration order by {@link QueryClient#getQueryDefaults}, so register defaults from the
  * most generic key to the least generic one — more specific defaults should be registered
  * after more generic ones so they take precedence.
  *
  * @example
  * ```ts
  * queryClient.setQueryDefaults(['posts'], { queryFn: fetchPosts })
  *
  * await queryClient.query({ queryKey: ['posts'] })
  * ```
  */
  setQueryDefaults(queryKey, options) {
    this.#queryDefaults.set(hashKey(queryKey), {
      queryKey,
      defaultOptions: options
    });
  }
  /**
  * Returns the default options registered for queries whose query key partially matches the
  * given `queryKey`, via {@link QueryClient#setQueryDefaults}. If multiple registered defaults
  * match, they are merged together in registration order.
  *
  * @example
  * ```ts
  * const defaultOptions = queryClient.getQueryDefaults(['posts'])
  * ```
  */
  getQueryDefaults(queryKey) {
    const defaults = [...this.#queryDefaults.values()];
    const result = {};
    defaults.forEach((queryDefault) => {
      if (partialMatchKey(queryKey, queryDefault.queryKey)) Object.assign(result, queryDefault.defaultOptions);
    });
    return result;
  }
  /**
  * Sets default options for mutations whose mutation key partially matches the given
  * `mutationKey`. As with {@link QueryClient#setQueryDefaults}, the order of registration
  * matters when several registered defaults match the same mutation key.
  *
  * @see {@link QueryClient#getMutationDefaults}
  * @example
  * ```ts
  * queryClient.setMutationDefaults(['addPost'], { mutationFn: addPost })
  * ```
  */
  setMutationDefaults(mutationKey, options) {
    this.#mutationDefaults.set(hashKey(mutationKey), {
      mutationKey,
      defaultOptions: options
    });
  }
  /**
  * Returns the default options registered for mutations whose mutation key partially matches
  * the given `mutationKey`, via {@link QueryClient#setMutationDefaults}. If multiple registered
  * defaults match, they are merged together in registration order.
  *
  * @example
  * ```ts
  * const defaultOptions = queryClient.getMutationDefaults(['addPost'])
  * ```
  */
  getMutationDefaults(mutationKey) {
    const defaults = [...this.#mutationDefaults.values()];
    const result = {};
    defaults.forEach((queryDefault) => {
      if (partialMatchKey(mutationKey, queryDefault.mutationKey)) Object.assign(result, queryDefault.defaultOptions);
    });
    return result;
  }
  /**
  * Called by framework adapters (e.g. inside `useQuery`) to resolve the options passed by the
  * caller into their final, defaulted form: merging `queryClient.setQueryDefaults` for the
  * given `queryKey`, then the client's own `defaultOptions.queries`, then the caller's options
  * on top. A no-op if the options are already defaulted (`_defaulted: true`).
  */
  defaultQueryOptions(options) {
    if (options._defaulted) return options;
    const defaultedOptions = {
      ...this.#defaultOptions.queries,
      ...this.getQueryDefaults(options.queryKey),
      ...options,
      _defaulted: true
    };
    if (!defaultedOptions.queryHash) defaultedOptions.queryHash = hashQueryKeyByOptions(defaultedOptions.queryKey, defaultedOptions);
    if (defaultedOptions.refetchOnReconnect === void 0) defaultedOptions.refetchOnReconnect = defaultedOptions.networkMode !== "always";
    if (defaultedOptions.throwOnError === void 0) defaultedOptions.throwOnError = !!defaultedOptions.suspense;
    if (!defaultedOptions.networkMode && defaultedOptions.persister) defaultedOptions.networkMode = "offlineFirst";
    if (defaultedOptions.queryFn === skipToken) defaultedOptions.enabled = false;
    return defaultedOptions;
  }
  /**
  * The mutation counterpart of {@link QueryClient#defaultQueryOptions}. Called by framework
  * adapters (e.g. inside `useMutation`) to merge `queryClient.setMutationDefaults` for the
  * given `mutationKey`, then the client's `defaultOptions.mutations`, then the caller's options
  * on top. A no-op if the options are already defaulted (`_defaulted: true`).
  */
  defaultMutationOptions(options) {
    if (options?._defaulted) return options;
    return {
      ...this.#defaultOptions.mutations,
      ...options?.mutationKey && this.getMutationDefaults(options.mutationKey),
      ...options,
      _defaulted: true
    };
  }
  /**
  * Clears both the query cache and the mutation cache this client is connected to.
  *
  * @example
  * ```ts
  * import { QueryClient } from '@tanstack/query-core'
  *
  * const queryClient = new QueryClient()
  * queryClient.clear()
  * ```
  */
  clear() {
    this.#queryCache.clear();
    this.#mutationCache.clear();
  }
};
const appCss = "/assets/styles-DVbA3LYV.css";
function reportHiggsfieldError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__higgsfieldEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
const og_title = "HeidSec — Sicherheit ist kein Zufall.";
const og_description = "HeidSec bündelt SecApp, MailGuard, Vault und VPN in einer premium Security Suite — eine Engine, vier Schutzschichten, ein Konto.";
const og_image_url = "/assets/og-cover.png";
const favicon_url = "/assets/favicon.svg";
const og_video_url = null;
const appMetaJson = {
  og_title,
  og_description,
  og_image_url,
  favicon_url,
  og_video_url
};
const DEFAULT_TITLE = "HeidSec";
const DEFAULT_DESCRIPTION = "HeidSec — Sicherheit ist kein Zufall.";
const appMeta = appMetaJson;
const APP_HOST_ZONES = ["higgsfield.app", "higgsfield-dev.app"];
function toOwnAssetUrl(value) {
  if (!value) return null;
  if (value.startsWith("/")) return value;
  try {
    const u = new URL(value);
    const isAppHost = APP_HOST_ZONES.some(
      (zone) => u.hostname === zone || u.hostname.endsWith(`.${zone}`)
    );
    if (isAppHost) return u.pathname + u.search;
    return value;
  } catch {
    return value;
  }
}
function buildHead(meta) {
  const title = meta.og_title ?? DEFAULT_TITLE;
  const description = meta.og_description ?? DEFAULT_DESCRIPTION;
  const ogImage = toOwnAssetUrl(meta.og_image_url);
  const favicon = toOwnAssetUrl(meta.favicon_url);
  const ogVideo = toOwnAssetUrl(meta.og_video_url);
  return {
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title },
      { name: "description", content: description },
      { name: "author", content: "HeidSec" },
      { name: "theme-color", content: "#05070B" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "HeidSec" },
      { name: "twitter:card", content: ogImage ? "summary_large_image" : "summary" },
      ...ogImage ? [
        { property: "og:image", content: ogImage },
        { name: "twitter:image", content: ogImage }
      ] : [],
      ...ogVideo ? [{ property: "og:video", content: ogVideo }] : []
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap"
      },
      { rel: "icon", href: favicon ?? "/assets/favicon.svg", type: "image/svg+xml" },
      { rel: "alternate icon", href: "/assets/favicon.ico" },
      { rel: "apple-touch-icon", href: "/assets/apple-touch-icon.png" },
      { rel: "manifest", href: "/assets/site.webmanifest" }
    ]
  };
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-dvh flex-col items-center justify-center gap-4 bg-ink px-6 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/assets/logo-monogram.svg", alt: "HeidSec", className: "h-10 w-10 opacity-80" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl font-semibold text-frost", children: "404 — Seite nicht gefunden" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "btn-ghost", children: "Zur Startseite" })
  ] });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportHiggsfieldError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-dvh flex-col items-center justify-center gap-4 bg-ink px-6 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl font-semibold text-frost", children: "Diese Seite konnte nicht geladen werden" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap justify-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "btn-primary",
          children: "Erneut versuchen"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/", className: "btn-ghost", children: "Zur Startseite" })
    ] })
  ] });
}
const Route$w = createRootRouteWithContext()({
  head: () => buildHead(appMeta),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "de", style: { colorScheme: "dark" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { className: "bg-ink text-frost", children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$w.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) });
}
const $$splitComponentImporter$t = () => import("./index-BVZcAmbP.js");
const Route$v = createFileRoute()({
  component: lazyRouteComponent($$splitComponentImporter$t, "component")
});
const $$splitComponentImporter$s = () => import("./admin-txhyGv1q.js");
const Route$u = createFileRoute()({
  component: lazyRouteComponent($$splitComponentImporter$s, "component")
});
const $$splitComponentImporter$r = () => import("./kuendigen-CVbtwNA7.js");
const Route$t = createFileRoute()({
  component: lazyRouteComponent($$splitComponentImporter$r, "component")
});
const $$splitComponentImporter$q = () => import("./login-yxLNIuxh.js");
const Route$s = createFileRoute()({
  component: lazyRouteComponent($$splitComponentImporter$q, "component")
});
const $$splitComponentImporter$p = () => import("./mein-konto-BpHWtl-Q.js");
const Route$r = createFileRoute()({
  component: lazyRouteComponent($$splitComponentImporter$p, "component")
});
const $$splitComponentImporter$o = () => import("./register-Djd90rTv.js");
const Route$q = createFileRoute()({
  component: lazyRouteComponent($$splitComponentImporter$o, "component")
});
const $$splitComponentImporter$n = () => import("./reset-password-mbCjchfZ.js");
const Route$p = createFileRoute()({
  component: lazyRouteComponent($$splitComponentImporter$n, "component")
});
const Route$o = createFileRoute()({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const origin = new URL(request.url).origin;
        const body = [
          "User-agent: *",
          "Allow: /",
          "",
          `Sitemap: ${origin}/sitemap.xml`
        ].join("\n");
        return new Response(body, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=86400"
          }
        });
      }
    }
  }
});
const Route$n = createFileRoute()({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const origin = new URL(request.url).origin;
        const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
        const publicPaths = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/login", changefreq: "monthly", priority: "0.5" },
          { path: "/register", changefreq: "monthly", priority: "0.5" },
          { path: "/login/forgot-password", changefreq: "monthly", priority: "0.3" },
          { path: "/verify-email", changefreq: "monthly", priority: "0.3" },
          { path: "/kuendigen", changefreq: "monthly", priority: "0.8" },
          { path: "/widerruf", changefreq: "monthly", priority: "0.8" },
          { path: "/legal/agb", changefreq: "yearly", priority: "0.4" },
          { path: "/legal/app-datenschutz", changefreq: "yearly", priority: "0.4" },
          { path: "/legal/datenschutz", changefreq: "yearly", priority: "0.4" },
          { path: "/legal/impressum", changefreq: "yearly", priority: "0.4" },
          { path: "/legal/ki-bedingungen", changefreq: "yearly", priority: "0.4" },
          { path: "/legal/lizenzbedingungen", changefreq: "yearly", priority: "0.4" },
          { path: "/legal/nutzungsbedingungen", changefreq: "yearly", priority: "0.4" },
          { path: "/legal/vpn-bedingungen", changefreq: "yearly", priority: "0.4" },
          { path: "/legal/widerruf", changefreq: "yearly", priority: "0.4" }
        ];
        const xml = [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          ...publicPaths.map(
            (p) => `  <url>
    <loc>${origin}${p.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
          ),
          "</urlset>"
        ].join("\n");
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600"
          }
        });
      }
    }
  }
});
const $$splitComponentImporter$m = () => import("./support-hTxs8AhE.js");
const Route$m = createFileRoute()({
  component: lazyRouteComponent($$splitComponentImporter$m, "component")
});
const $$splitComponentImporter$l = () => import("./verify-email-CbBHv2ah.js");
const Route$l = createFileRoute()({
  component: lazyRouteComponent($$splitComponentImporter$l, "component")
});
const $$splitComponentImporter$k = () => import("./widerruf-BR4kripR.js");
const Route$k = createFileRoute()({
  component: lazyRouteComponent($$splitComponentImporter$k, "component")
});
const $$splitComponentImporter$j = () => import("./index-D4Zuo9e6.js");
const Route$j = createFileRoute()({
  component: lazyRouteComponent($$splitComponentImporter$j, "component")
});
const $$splitComponentImporter$i = () => import("./announcements-BUlGGb7i.js");
const Route$i = createFileRoute()({
  component: lazyRouteComponent($$splitComponentImporter$i, "component")
});
const $$splitComponentImporter$h = () => import("./faqs-Kn4zYz5b.js");
const Route$h = createFileRoute()({
  component: lazyRouteComponent($$splitComponentImporter$h, "component")
});
const $$splitComponentImporter$g = () => import("./legal-i3WFcB5i.js");
const Route$g = createFileRoute()({
  component: lazyRouteComponent($$splitComponentImporter$g, "component")
});
const $$splitComponentImporter$f = () => import("./media-BE7YAdGV.js");
const Route$f = createFileRoute()({
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const $$splitComponentImporter$e = () => import("./sections-D-BNjfMS.js");
const Route$e = createFileRoute()({
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("./index-Dt9B-Nt9.js");
const Route$d = createFileRoute()({
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./cancel-CEc2FRJo.js");
const Route$c = createFileRoute()({
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./success-CkZtpp7n.js");
const Route$b = createFileRoute()({
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./agb-BS_AL8-S.js");
const Route$a = createFileRoute()({
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./app-datenschutz-BZU-k2s_.js");
const Route$9 = createFileRoute()({
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./datenschutz-BosrnzfW.js");
const Route$8 = createFileRoute()({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./impressum-CEJe1BVK.js");
const Route$7 = createFileRoute()({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./ki-bedingungen-C-nbXQxn.js");
const Route$6 = createFileRoute()({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./lizenzbedingungen-Bu4X6IJ7.js");
const Route$5 = createFileRoute()({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./nutzungsbedingungen-_UR97xpe.js");
const Route$4 = createFileRoute()({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./vpn-bedingungen-DpWVJCz4.js");
const Route$3 = createFileRoute()({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./widerruf-Du7MA8qr.js");
const Route$2 = createFileRoute()({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./login_.forgot-password-dyLuonnR.js");
const Route$1 = createFileRoute()({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./callback-BxmKe0Vw.js");
const Route2 = createFileRoute()({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const IndexRoute = Route$v.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$w
});
const AdminRoute = Route$u.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$w
});
const KuendigenRoute = Route$t.update({
  id: "/kuendigen",
  path: "/kuendigen",
  getParentRoute: () => Route$w
});
const LoginRoute = Route$s.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$w
});
const MeinKontoRoute = Route$r.update({
  id: "/mein-konto",
  path: "/mein-konto",
  getParentRoute: () => Route$w
});
const RegisterRoute = Route$q.update({
  id: "/register",
  path: "/register",
  getParentRoute: () => Route$w
});
const ResetPasswordRoute = Route$p.update({
  id: "/reset-password",
  path: "/reset-password",
  getParentRoute: () => Route$w
});
const RobotsDottxtRoute = Route$o.update({
  id: "/robots.txt",
  path: "/robots.txt",
  getParentRoute: () => Route$w
});
const SitemapDotxmlRoute = Route$n.update({
  id: "/sitemap.xml",
  path: "/sitemap.xml",
  getParentRoute: () => Route$w
});
const SupportRoute = Route$m.update({
  id: "/support",
  path: "/support",
  getParentRoute: () => Route$w
});
const VerifyEmailRoute = Route$l.update({
  id: "/verify-email",
  path: "/verify-email",
  getParentRoute: () => Route$w
});
const WiderrufRoute = Route$k.update({
  id: "/widerruf",
  path: "/widerruf",
  getParentRoute: () => Route$w
});
const AdminIndexRoute = Route$j.update({
  id: "/",
  path: "/",
  getParentRoute: () => AdminRoute
});
const AdminAnnouncementsRoute = Route$i.update({
  id: "/announcements",
  path: "/announcements",
  getParentRoute: () => AdminRoute
});
const AdminFaqsRoute = Route$h.update({
  id: "/faqs",
  path: "/faqs",
  getParentRoute: () => AdminRoute
});
const AdminLegalRoute = Route$g.update({
  id: "/legal",
  path: "/legal",
  getParentRoute: () => AdminRoute
});
const AdminMediaRoute = Route$f.update({
  id: "/media",
  path: "/media",
  getParentRoute: () => AdminRoute
});
const AdminSectionsRoute = Route$e.update({
  id: "/sections",
  path: "/sections",
  getParentRoute: () => AdminRoute
});
const CheckoutIndexRoute = Route$d.update({
  id: "/checkout/",
  path: "/checkout/",
  getParentRoute: () => Route$w
});
const CheckoutCancelRoute = Route$c.update({
  id: "/checkout/cancel",
  path: "/checkout/cancel",
  getParentRoute: () => Route$w
});
const CheckoutSuccessRoute = Route$b.update({
  id: "/checkout/success",
  path: "/checkout/success",
  getParentRoute: () => Route$w
});
const LegalAgbRoute = Route$a.update({
  id: "/legal/agb",
  path: "/legal/agb",
  getParentRoute: () => Route$w
});
const LegalAppDatenschutzRoute = Route$9.update({
  id: "/legal/app-datenschutz",
  path: "/legal/app-datenschutz",
  getParentRoute: () => Route$w
});
const LegalDatenschutzRoute = Route$8.update({
  id: "/legal/datenschutz",
  path: "/legal/datenschutz",
  getParentRoute: () => Route$w
});
const LegalImpressumRoute = Route$7.update({
  id: "/legal/impressum",
  path: "/legal/impressum",
  getParentRoute: () => Route$w
});
const LegalKiBedingungenRoute = Route$6.update({
  id: "/legal/ki-bedingungen",
  path: "/legal/ki-bedingungen",
  getParentRoute: () => Route$w
});
const LegalLizenzbedingungenRoute = Route$5.update({
  id: "/legal/lizenzbedingungen",
  path: "/legal/lizenzbedingungen",
  getParentRoute: () => Route$w
});
const LegalNutzungsbedingungenRoute = Route$4.update({
  id: "/legal/nutzungsbedingungen",
  path: "/legal/nutzungsbedingungen",
  getParentRoute: () => Route$w
});
const LegalVpnBedingungenRoute = Route$3.update({
  id: "/legal/vpn-bedingungen",
  path: "/legal/vpn-bedingungen",
  getParentRoute: () => Route$w
});
const LegalWiderrufRoute = Route$2.update({
  id: "/legal/widerruf",
  path: "/legal/widerruf",
  getParentRoute: () => Route$w
});
const LoginForgotPasswordRoute = Route$1.update({
  id: "/login_/forgot-password",
  path: "/login/forgot-password",
  getParentRoute: () => Route$w
});
const AuthSocialCallbackRoute = Route2.update({
  id: "/auth/social/callback",
  path: "/auth/social/callback",
  getParentRoute: () => Route$w
});
const AdminRouteChildren = {
  AdminAnnouncementsRoute,
  AdminFaqsRoute,
  AdminLegalRoute,
  AdminMediaRoute,
  AdminSectionsRoute,
  AdminIndexRoute
};
const AdminRouteWithChildren = AdminRoute._addFileChildren(AdminRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AdminRoute: AdminRouteWithChildren,
  KuendigenRoute,
  LoginRoute,
  MeinKontoRoute,
  RegisterRoute,
  ResetPasswordRoute,
  RobotsDottxtRoute,
  SitemapDotxmlRoute,
  SupportRoute,
  VerifyEmailRoute,
  WiderrufRoute,
  CheckoutCancelRoute,
  CheckoutSuccessRoute,
  LegalAgbRoute,
  LegalAppDatenschutzRoute,
  LegalDatenschutzRoute,
  LegalImpressumRoute,
  LegalKiBedingungenRoute,
  LegalLizenzbedingungenRoute,
  LegalNutzungsbedingungenRoute,
  LegalVpnBedingungenRoute,
  LegalWiderrufRoute,
  LoginForgotPasswordRoute,
  CheckoutIndexRoute,
  AuthSocialCallbackRoute
};
const routeTree = Route$w._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Link as L,
  useSearch as a,
  router as r,
  useNavigate as u
};
