import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "src/app/admin/admin.component";
import { LoginComponent } from "src/app/login/login.component";

const routes: Routes = [
    { path: "login", component: LoginComponent },
    { path: "admin", component: AdminComponent },
    { path: "user", component: AdminComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
