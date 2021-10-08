import { Router } from "express";
import { DB } from "../utils";
import { isAdmin, validate } from "../middleware";
import { body, query } from "express-validator";

export const NewsRouter = Router()
    .get("", async (req, res) => {
        // Allow admins to provide a user query param that will be used instead of JWT id
        let user = req.query.user;
        if (!req.user.admin) {
            user = req.user.id + "";
        }

        if (user) {
            return res.send(
                (
                    await DB.query(
                        `
			select n.newsletter_id, name from newsletter n
			join subscription s on n.newsletter_id = s.newsletter_id
			where subscriber_id = $1
			`,
                        [req.query.user],
                    )
                ).rows,
            );
        } else {
            return res.send((await DB.query("select newsletter_id, name from newsletter")).rows);
        }
    })

    .post("", isAdmin, body("name").exists(), validate, async (req, res) => {
        try {
            const result = await DB.query("insert into newsletter (name) values ($1) returning name, newsletter_id", [
                req.body.name,
            ]);
            return res.send(result.rows[0]);
        } catch {
            return res.status(400).send("Duplicate Newsletter Name");
        }
    })

    .delete("/:newsletterId", query("user").if(query("user").exists).isNumeric(), validate, async (req, res) => {
        let user = req.user.id;

        // Allow admins to provide a user query param that will be used instead of JWT id
        if (req.query.user && req.user.admin) {
            user = req.query.user;
        }

        try {
            const result = await DB.query("delete from subscription where subscriber_id = $1 and newsletter_id = $2", [
                user,
                req.params.newsletterId,
            ]);
            return res.sendStatus(200);
        } catch {
            return res.status(400).send("Subscription Does Not Exist");
        }
    });
