import { expect } from "chai";
import client from "./";

describe("/health", () => {
  it("ok", async () => {
    const response = await client.get("/health");
    expect(response.status).to.eq(200);
    expect(response.text).to.eq("Ok!!");
  });
});
