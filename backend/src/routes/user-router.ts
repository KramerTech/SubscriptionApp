import { Router } from "express";
import { DB, hashPass } from "../utils";
import { isAdmin, validate } from "../middleware"
import { body } from "express-validator";

export const UserRouter = Router()

.get("", isAdmin, async (req, res) => {
	return res.json((await DB.query("select subscriber_id, email from subscriber")).rows);
})

.post("", isAdmin, body("email").isEmail(), body("password").isLength({min: 5}), validate, async (req, res) => {
	const email = req.body.email.toLowerCase();
	const pass = hashPass(req.body.password);
	try {
		const result = await DB.query("insert into subscriber (email, pass) values ($1, $2) returning email, subscriber_id", [email, pass]);
		return res.json(result.rows[0]);
	} catch {
		return res.status(400).send("Duplicate Email");
	}
})