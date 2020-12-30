import { UpgradableComponent } from 'theme/components/upgradable';
import { Component, OnInit, Inject, HostBinding } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent extends UpgradableComponent implements OnInit {
   //SCSS
   @HostBinding("class.mdl-grid") public readonly mdlGrid = true;
   @HostBinding("class.mdl-grid--no-spacing")
   public readonly mdlGridNoSpacing = true;
 

  constructor(){
    super();
  }
 

  ngOnInit(){}

}

