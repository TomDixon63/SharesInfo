import { ThemeModule } from "./../../../theme/theme.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, ThemeModule, FormsModule, ReactiveFormsModule],
})
export class LoginModule {}
