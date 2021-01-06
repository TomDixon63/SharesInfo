import { AlphavantageService } from "./../../services/alphavantage/alphavantage.service";
// login component with a very primitive authenfication using the entered api key and a request call to alpha vantage
// using this key. stores the apikey in the local storage
import { BlankLayoutCardComponent } from "./../../components/blank-layout-card/blank-layout-card.component";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "@services/*";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: [
    "../../components/blank-layout-card/blank-layout-card.component.scss",
  ],
})
export class LoginComponent extends BlankLayoutCardComponent implements OnInit {
  // form
  public loginForm: FormGroup;

  // input api key
  public apikey;

  // error
  public error: string;

  // creates form and validation for input
  constructor(
    private alphavantageService: AlphavantageService,
    public router: Router,
    public fb: FormBuilder
  ) {
    super();
    this.loginForm = this.fb.group({
      apikey: new FormControl("", [Validators.required, Validators.minLength(4)]),
    });
    this.apikey = this.loginForm.get("apikey");
  }

  ngOnInit(): void {
    this.loginForm.valueChanges.subscribe(() => {
      this.error = "";
    });
  }

  // login
  public login() {
    this.error = null;
    let loginApiKey = this.loginForm.get("apikey").value;
    localStorage.setItem("apikey", JSON.stringify(loginApiKey));

    if (this.loginForm.valid) {
      this.alphavantageService
        .checkIfApiKeyIsValid(loginApiKey)
        .subscribe((data) => {
          console.log(JSON.stringify(data));
          let result = JSON.stringify(data);
          if (result.includes("Error") || result.includes("Information") || result.includes("Note")) {
            this.error = "Not a valid key!";
          } else {
            this.router.navigate(["/app/dashboard"]);
          }
        });
    }
  }

  public onInputChange(event) {
    event.target.required = true;
  }
}
