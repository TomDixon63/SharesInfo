import { AlertService } from "./../../components/alert/alert.service";
import { UpgradableComponent } from "theme/components/upgradable";
import {
  Component,
  OnInit,
  HostBinding,
  ChangeDetectorRef,
} from "@angular/core";

@Component({
  selector: "app-test",
  templateUrl: "./test.component.html",
  styleUrls: ["./test.component.scss"],
})
export class TestComponent extends UpgradableComponent implements OnInit {
  //SCSS
  @HostBinding("class.mdl-grid") public readonly mdlGrid = true;
  @HostBinding("class.mdl-grid--no-spacing")
  public readonly mdlGridNoSpacing = true;

  //alert options
  public options = {
    autoClose: false,
    keepAfterRouteChange: false,
  };

  // flag progress bar
  public isLoading = true;

  constructor(public alertService: AlertService) {
    super();
  }

  ngOnInit() {}

  public progressStart() {
    this.isLoading = true;
    console.log(this.isLoading);
  }

  public progressStop() {
    this.isLoading = false;
    console.log(this.isLoading);
  }
}
