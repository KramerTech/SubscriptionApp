import "mocha";
import { expect } from "chai";
import request from "supertest";
import { app } from "../../src/server";

describe("User API Endpoint", () => {
    const admin = {
        email: "admin@neatnews.com",
        password: "admin",
    };

    const user = {
        email: "test_user@gmail.com",
        password: "password",
    };

    let admin_jwt, jwt: string;

    before(async () => {
        jwt = (await request(app).post("/login").send(user)).text;
        admin_jwt = (await request(app).post("/login").send(admin)).text;
    });

    it("ensures both test JWTs are valid", () => {
        expect(jwt).to.contain("Bearer");
        expect(admin_jwt).to.contain("Bearer");
    });

    it("should be unauthorized without a token", async () => {
        const res = await request(app).get("/user");
        expect(res.status).to.equal(401);
    });

    it("should be authorized with a valid admin token", async () => {
        const res = await request(app).get("/user").set("Authorization", admin_jwt);
        expect(res.status).to.equal(200);
    });

    it("should create a new user", async () => {
        // This has side effects and is bad but no time for proper setup/teardown
        const res = await request(app)
            .post("/user")
            .set("Authorization", admin_jwt)
            .send({
                email: "User_" + (Math.random() + "").substr(2) + "@gmail.com",
                password: "password",
            });
        expect(res.status).to.equal(200);
        expect(res.text).to.contain("subscriber_id");
    });

    it("should 404 on a nonsense endpoint", async () => {
        const res = await request(app).get("/user/nonsense").set("Authorization", admin_jwt);
        expect(res.status).to.equal(404);
    });

    it("should be authorized with a non admin token", async () => {
        const res = await request(app).get("/user").set("Authorization", jwt);
        expect(res.status).to.equal(401);
    });
});
