require("dotenv").config({ path: "../.env" });
require("dotenv").config();

const request = require("supertest");
const express = require("express");
const app = express();
const healthRoute = require("../../src/routes/healthRoute");
const healthService = require("../../src/services/healthService");

// // Mocking the healthService to simulate a successful DB check
jest.mock("../../src/services/healthService");
healthService.checkDBConnection.mockResolvedValue();

app.use("/healthz", healthRoute);

describe("GET /healthz", () => {
  it("should return 200 OK", async () => {
    const res = await request(app).get("/healthz");
    expect(res.statusCode).toEqual(200);
  });
});
