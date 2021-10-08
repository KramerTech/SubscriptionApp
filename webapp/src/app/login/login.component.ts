import { Component, Input } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService as AuthService } from "src/app/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent {

	form: FormGroup = new FormGroup({
		username: new FormControl("", [Validators.required, Validators.email]),
		password: new FormControl("", [Validators.required, Validators.minLength(4)]),
	});

	loading = false;

	constructor(private authService: AuthService) {

	}

	submit() {
		if (this.form.valid) {
			this.loading = true;
			this.authService.login(
				this.form.get("username")?.value,
				this.form.get("password")?.value
			).subscribe(() => {
				this.loading = false;
			}, err => {
				this.error = err.error;
				this.loading = false;
			});
		}
	}

	@Input() error?: string;

}
