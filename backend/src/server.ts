import cors from "cors";
import express from "express";
import jwt from "express-jwt";
import { MainRouter } from "routes/main-router";

export const app = express();

// Load environement variables
require("dotenv").config()

// Allow CORS for all origins
app.use(cors());

// Request parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Protect endpoints
app.use(jwt({
	secret: process.env.JWT_SECRET,
	algorithms: ["HS256"]
}).unless({ path: ["", "/", "/login", "/hash"] }));

// Routes
app.use("/", MainRouter);

// Handle Errors
app.use((err, req, res, next) => {
	if (err) {
		if (err.name = "UnauthorizedError") {
			return res.sendStatus(401);
		}
		return res.status(500).send(err);
	}
	return next();
});

// Server
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));


