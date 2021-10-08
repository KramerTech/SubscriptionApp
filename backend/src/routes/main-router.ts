import { Router } from "express";
import { body } from "express-validator";
import { UserRouter } from "routes/user-router";
import { NewsRouter } from "routes/news-router";
import { DB, hashPass, verifyPass } from "utils";
import { sign } from "jsonwebtoken";
import { validate } from "middleware";

export const MainRouter = Router()
    .use("/user", UserRouter)
    .use("/news", NewsRouter)

    .post("/login", body("email").isEmail(), body("password").isLength({ min: 5 }), validate, async (req, res) => {
        const email = req.body.email.toLowerCase();
        const result = await DB.query("select subscriber_id, admin, pass from subscriber where email = $1", [email]);
        // Email exists as known user
        if (result.rows.length) {
            const user = result.rows[0];
            // Password verification
            if (verifyPass(req.body.password, user.pass)) {
                // Provide signed JWT
                const payload = {
                    id: user.subscriber_id,
                    admin: user.admin,
                };
                const token = sign(payload, process.env.JWT_SECRET);
                return res.setHeader("Content-Type", "text/plain").send(`Bearer ${token}`);
            }
        }
        return res.status(401).send("Invalid Login");
    })

    // Used for seed data through URL
    .get("/hash", (req, res) => {
        if (!req.query || !req.query.pass || typeof req.query.pass !== "string") {
            res.send("Set 'pass=' in the query params");
        } else if (req.query.check && typeof req.query.check === "string") {
            res.send(verifyPass(req.query.pass, req.query.check));
        } else {
            res.send(hashPass(req.query.pass));
        }
    })

    // Health endpoing
    .get("/", async (_, res) => {
        const status = await DB.query(`
		select
		(select count(*) from subscriber) as subscribers,
		(select count(*) from newsletter) as newsletters,
		(select count(*) from subscription) as subscriptions;
	`);
        res.send(`Backend Online @ ${new Date().toString()}<br><br>Database Status: ${JSON.stringify(status.rows[0])}`);
    })

    // 404 for all else
    .get("*", (_, res) => {
        res.sendStatus(404);
    });
