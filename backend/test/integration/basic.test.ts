import "mocha";
import { expect } from "chai";
import request from "supertest";
import { app } from "../../src/server";

describe("Basic Server Functionality", () => {
    it("should show server status on root", async () => {
        const res = await request(app).get("/");
        expect(res.status).to.equal(200);
        expect(res.text).to.contain("subscriptions");
    });

    it("should 401 on invalid URLs without token", async () => {
        // Should be 404 if token included
        const res = await request(app).get("/nonsense");
        expect(res.status).to.equal(401);
    });
});
