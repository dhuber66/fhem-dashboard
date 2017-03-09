import {Component, ViewChildren, QueryList} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { FhemSwitchComponent } from "./fhem.switch/fhem.switch.component";

const SWITCHES: string[] = [
  "LichtDecke",
  "bed.light",
  "Test"
  ];

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
})

export class AppComponent {
  switches = SWITCHES;
  a = this.switches[0];
  b = this.switches[1];

  @ViewChildren(FhemSwitchComponent) myChild: QueryList<FhemSwitchComponent>;

  ngOnInit() {
      let timer = Observable.timer(5000,12000);
      timer.subscribe(t => { this.refresh(t)})

  }

  refresh(time): void
  {

      console.log("AutoRefresh");
      this.myChild.forEach(function(i:FhemSwitchComponent,j:number,a) {i.getStatus();});
  }
}
