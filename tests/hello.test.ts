import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { createHelloResponse } from "../src/handlers/hello.js";

describe("createHelloResponse", () => {
  it("greets the world by default", () => {
    const response = createHelloResponse();

    assert.equal(response.statusCode, 200);
    assert.deepEqual(JSON.parse(response.body ?? "{}"), {
      message: "Hello, World!",
    });
  });

  it("greets a supplied name", () => {
    const response = createHelloResponse("Tom");

    assert.deepEqual(JSON.parse(response.body ?? "{}"), {
      message: "Hello, Tom!",
    });
  });
});
