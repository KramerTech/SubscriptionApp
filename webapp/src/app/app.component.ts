import { Component } from "@angular/core";
import { AuthService } from "src/app/auth.service";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent {
    constructor(private authService: AuthService) {
        authService.load();
    }

    logout() {
        this.authService.logout();
    }
}
