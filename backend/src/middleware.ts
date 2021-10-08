import { RequestHandler } from "express";
import { validationResult } from "express-validator";

declare global {
	namespace Express {
		interface User {
			id: number,
			admin?: boolean,
		}
	}
}

export const isAdmin: RequestHandler = (req, res, next) => {
	if (!req.user.admin) {
		return res.sendStatus(401);
	}
	return next();
}

export const validate: RequestHandler = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	return next();
}