// Netlify Function wrapper that reuses the Vercel-style handler in
// /api/generate.js by adapting the request/response shapes.

import handler from "../../api/generate.js";

class MockRes {
  constructor() {
    this.statusCode = 200;
    this.headers = { "content-type": "application/json" };
    this._body = "";
  }
  setHeader(k, v) { this.headers[k.toLowerCase()] = v; }
  end(chunk) { this._body = chunk == null ? "" : String(chunk); }
}

export const handler_netlify = async (event) => {
  const req = {
    method: event.httpMethod,
    headers: event.headers,
    body: event.body,
    on() {},
  };
  const res = new MockRes();
  await handler(req, res);
  return {
    statusCode: res.statusCode,
    headers: res.headers,
    body: res._body,
  };
};

// Netlify expects `handler` as the named export.
export { handler_netlify as handler };
