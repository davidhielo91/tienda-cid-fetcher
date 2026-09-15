const RSC_PREFIX = "__next.";
const RSC_SUFFIX = ".__PAGE__.txt";

export interface Env {
  ASSETS: {
    fetch(request: Request): Promise<Response>;
  };
}

export function rewriteRscPrefetchPath(pathname: string): string {
  const slashIndex = pathname.lastIndexOf("/");
  if (slashIndex < 1) return pathname;

  const directory = pathname.slice(0, slashIndex);
  const filename = pathname.slice(slashIndex + 1);
  if (!filename.startsWith(RSC_PREFIX) || !filename.endsWith(RSC_SUFFIX)) {
    return pathname;
  }

  const routeSegments = filename.slice(RSC_PREFIX.length, -RSC_SUFFIX.length).split(".");
  if (routeSegments.some((segment) => segment.length === 0)) return pathname;

  return `${directory}/${RSC_PREFIX}${routeSegments[0]}${routeSegments
    .slice(1)
    .map((segment) => `/${segment}`)
    .join("")}/__PAGE__.txt`;
}

export function rewriteRscPrefetchRequest(request: Request): Request {
  const url = new URL(request.url);
  const rewrittenPath = rewriteRscPrefetchPath(url.pathname);
  if (rewrittenPath === url.pathname) return request;

  url.pathname = rewrittenPath;
  return new Request(url, request);
}

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    return env.ASSETS.fetch(rewriteRscPrefetchRequest(request));
  },
};

export default worker;
