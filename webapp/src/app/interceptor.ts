import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "src/app/auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
	constructor(public auth: AuthService) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (this.auth.jwt) {
			console.log("INTERCEPT");
			req = req.clone({ headers: req.headers.set("Authorization", this.auth.jwt) });
		}
		return next.handle(req);
	}
}