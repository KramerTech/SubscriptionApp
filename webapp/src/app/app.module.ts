import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from "src/app/material.module";
import { ReactiveFormsModule } from "@angular/forms";
import { AuthService } from "src/app/auth.service";
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from "src/app/app-routing.module";
import { AdminService } from "src/app/admin/admin.service";
import { AdminComponent } from "src/app/admin/admin.component";
import { TokenInterceptor } from "src/app/interceptor";

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		AdminComponent,
	],
	imports: [
		HttpClientModule,
		AppRoutingModule,
		BrowserModule,
		ReactiveFormsModule,
		MaterialModule,
		BrowserAnimationsModule,
	],
	providers: [
		HttpClient,
		AuthService,
		AdminService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptor,
			multi: true
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
