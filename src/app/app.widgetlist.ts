import { Injectable }           from '@angular/core';
import { FhemSwitchComponent }  from './fhem.switch/fhem.switch.component';
import { FhemRoofComponent }    from './fhem.roof/fhem.roof.component';
import { WidgetDef }            from './app.WidgetDef';
@Injectable()
export class WidgetList {
  getWidgetList() {
    return [
      new WidgetDef(FhemSwitchComponent, {name: 'LichtDecke',  url: 'http://192.168.55.2:8083' }),
      new WidgetDef(FhemRoofComponent,   {name: 'Dachfenster', url: 'http://192.168.55.2:8083' }),
      new WidgetDef(FhemSwitchComponent, {name: 'bed.light',   url: 'http://192.168.55.2:8083' }),
    ];
  }
}