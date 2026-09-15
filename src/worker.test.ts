import { describe, expect, it } from "vitest";
import worker, { rewriteRscPrefetchPath, type Env } from "./worker";

describe("rewriteRscPrefetchPath", () => {
  it.each([
    [
      "/carrito/__next.carrito.__PAGE__.txt",
      "/carrito/__next.carrito/__PAGE__.txt",
    ],
    [
      "/licencias/office/__next.licencias.$d$categoria.__PAGE__.txt",
      "/licencias/office/__next.licencias/$d$categoria/__PAGE__.txt",
    ],
  ])("maps %s to %s", (pathname, expected) => {
    expect(rewriteRscPrefetchPath(pathname)).toBe(expected);
  });

  it.each([
    "/carrito",
    "/carrito/page.txt",
    "/carrito/__next.carrito.txt",
    "/carrito/__next.carrito.__PAGE__.json",
  ])("leaves non-RSC path %s unchanged", (pathname) => {
    expect(rewriteRscPrefetchPath(pathname)).toBe(pathname);
  });
});

describe("Worker asset requests", () => {
  it("preserves query strings, method, headers, and body", async () => {
    const requests: Request[] = [];
    const env: Env = {
      ASSETS: {
        fetch(request) {
          requests.push(request);
          return Promise.resolve(new Response("asset"));
        },
      },
    };
    const request = new Request(
      "https://cidfetcher.de/licencias/office/__next.licencias.$d$categoria.__PAGE__.txt?dpl=abc",
      {
        method: "POST",
        headers: { "x-test": "preserved" },
        body: "request-body",
      },
    );

    await worker.fetch(request, env);

    expect(requests).toHaveLength(1);
    expect(requests[0].url).toBe(
      "https://cidfetcher.de/licencias/office/__next.licencias/$d$categoria/__PAGE__.txt?dpl=abc",
    );
    expect(requests[0].method).toBe("POST");
    expect(requests[0].headers.get("x-test")).toBe("preserved");
    expect(await requests[0].text()).toBe("request-body");
  });

  it("returns normal asset responses unchanged", async () => {
    const assetResponse = new Response("asset", { status: 201 });
    const env: Env = {
      ASSETS: {
        fetch: () => Promise.resolve(assetResponse),
      },
    };

    const response = await worker.fetch(new Request("https://cidfetcher.de/logo.svg"), env);

    expect(response).toBe(assetResponse);
  });
});
