import 'mocha';
import { expect } from 'chai';
import request from "supertest";
import { app } from "../../src/server";

describe('Login API Endpoint', () => {

	const user = {
		email: "admin@neatnews.com",
		password: "admin"
	};

	it('should return a JWT token', async () => {
		const res = await request(app).post('/login').send(user);
		expect(res.status).to.equal(200);
		expect(res.text).to.contain("Bearer");
	});

	it('should find our login is invalid', async () => {
		const res = await request(app).post('/login').send({
			email: user.email,
			password: "asdfasdf",
		});
		expect(res.status).to.equal(401);
	});

	it('should say our email is invalid', async () => {
		const res = await request(app).post('/login').send({
			email: "moose",
			password: "asdfasdf",
		});
		expect(res.status).to.equal(400);
		expect(res.text).to.contain("email");
	});

	it('should ask for a password', async () => {
		const res = await request(app).post('/login').send({
			email: user.email,
		});
		expect(res.status).to.equal(400);
		expect(res.text).to.contain("password");
	});

});
