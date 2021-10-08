import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	public admin?: boolean;
	public id?: number;

	public jwt?: string;
	private url = environment.api;

	constructor(private http: HttpClient, private router: Router) {}

	load() {
		const jwt = localStorage.getItem("jwt");
		if (jwt) {
			this.decodeAndRoute(jwt);
		} else {
			this.router.navigate(["login"]);
		}
	}

	decodeAndRoute(jwt: string) {
		this.jwt = jwt;
		localStorage.setItem("jwt", jwt);
		const decode = new JwtHelperService().decodeToken(jwt);
		this.admin = decode.admin;
		this.id = decode.id;
		this.router.navigate([this.admin ? "admin" : "user"]);
	}

	login(email: string, password: string) {
		const obs = this.http.post(this.url + "login", {email, password}, {responseType: "text"});
		obs.subscribe(jwt => {
			this.decodeAndRoute(jwt as string);
		});
		return obs;
	}

	logout() {
		delete this.jwt;
		localStorage.removeItem("jwt");
		this.router.navigate(["login"]);
	}

}
