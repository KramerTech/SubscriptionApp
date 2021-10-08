import 'mocha';
import { expect } from 'chai';
import request from "supertest";
import { app } from "../../src/server";

describe('Newsletters API Endpoint', () => {

	const admin = {
		email: "admin@neatnews.com",
		password: "admin"
	};

	let admin_jwt: string;

	before(async () => {
		admin_jwt = (await request(app).post('/login').send(admin)).text;
	});

	it('ensures JWTs is valid', () => {
		expect(admin_jwt).to.contain("Bearer");
	});

	it('should create a new newsletter', async () => {
		// This has side effects and is bad but no time for proper setup/teardown
		const res = await (request(app).post('/news').set("Authorization", admin_jwt).send({
			name: "Newsletter " + (Math.random() + "").substr(2)
		}));
		expect(res.status).to.equal(200);
		expect(res.text).to.contain("newsletter_id");
	});

	it('should ask for a name', async () => {
		const res = await (request(app).post('/news').set("Authorization", admin_jwt).send({}));
		expect(res.status).to.equal(400);
		expect(res.text).to.contain("name");
	});

});
