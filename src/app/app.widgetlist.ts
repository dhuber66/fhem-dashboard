import { Injectable }           from '@angular/core';
import { FhemSwitchComponent }  from './fhem.switch/fhem.switch.component';
import { WidgetDef }            from './app.WidgetDef';
@Injectable()
export class WidgetList {
  getWidgetList() {
    return [
      new WidgetDef(FhemSwitchComponent, {name: 'LichtDecke' }),
      new WidgetDef(FhemSwitchComponent, {name: 'bed.light' }),
    ];
  }
}