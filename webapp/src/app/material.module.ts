import { NgModule } from '@angular/core';

import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";

const modules = [
	MatCardModule,
	MatInputModule,
	MatButtonModule,
	MatListModule,
];

@NgModule({
	imports: modules,
	exports: modules,
})
export class MaterialModule { }
