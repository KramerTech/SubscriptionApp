import { Component, Input } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AdminService } from "src/app/admin/admin.service";
import { AuthService } from "src/app/auth.service";

@Component({
    selector: "app-admin",
    templateUrl: "./admin.component.html",
    styleUrls: ["./admin.component.scss"],
})
export class AdminComponent {
    admin?: boolean;

    users: any[] = [];
    letters: any[] = [];
    fullLetters: any[] = [];

    selectedUser?: number;

    constructor(private adminService: AdminService, private authService: AuthService) {
        this.admin = authService.admin;

        if (!this.admin) {
            this.selectUser(authService.id as number);
        } else {
            adminService.getUsers().subscribe(
                (users) => {
                    this.users = users as any[];
                },
                (err) => {},
            );
            adminService.getLetters().subscribe(
                (letters) => {
                    this.letters = letters as any[];
                    this.fullLetters = this.letters;
                },
                (err) => {},
            );
        }
    }

    addLetter() {
        const name = prompt("Enter the name for your new Newsletter:");
        if (name) {
            this.adminService.newLetter(name).subscribe(
                (letter) => {
                    this.fullLetters.push(letter);
                },
                (err) => {},
            );
        }
    }

    addUser() {
        const pass = (Math.random() + "").substring(2);
        const name = prompt(`Enter the email of the user you want to add. Their password will be ${pass}:`);
        if (name) {
            this.adminService.newUser(name, pass).subscribe(
                (newUser) => {
                    this.users.push(newUser);
                },
                (err) => {},
            );
        }
    }

    selectUser(id: number) {
        console.log(id);
        if (this.selectedUser === id) {
            delete this.selectedUser;
            this.letters = this.fullLetters;
        } else {
            // Get just this user's subscriptions
            this.selectedUser = id;
            this.letters = [];
            this.adminService.getLetters(this.selectedUser).subscribe(
                (letters) => {
                    this.letters = letters as any[];
                },
                (err) => {},
            );
        }
    }

    deleteSub(id: number, name: string) {
        if (this.selectedUser === undefined) {
            return;
        }
        const tmp = this.selectedUser;
        const user = this.admin ? this.users.find((u) => u.subscriber_id === this.selectedUser) : { email: "yourself" };
        if (confirm(`Unsubscribe ${user.email} from "${name}"?`))
            this.adminService.deleteSub(id, this.selectedUser).subscribe(() => {
                if (this.selectedUser === tmp) {
                    this.letters = this.letters.filter((letter) => letter.newsletter_id !== id);
                }
            });
    }
}
