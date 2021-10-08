import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class AdminService {
    private url = environment.api;

    constructor(private http: HttpClient) {}

    getUsers() {
        return this.http.get(this.url + "user");
    }

    newUser(email: string, password: string) {
        return this.http.post(this.url + "user", { email, password });
    }

    getLetters(userId?: number) {
        let params = new HttpParams();
        if (userId !== undefined) {
            params = params.set("user", userId);
        }
        return this.http.get(this.url + "news", { params });
    }

    newLetter(name: string) {
        return this.http.post(this.url + "news", { name });
    }

    deleteSub(letterId: number, userId: number) {
        const params = new HttpParams().set("user", userId);
        return this.http.delete(this.url + `news/${letterId}`, { params, responseType: "text" });
    }
}
