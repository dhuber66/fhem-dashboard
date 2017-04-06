import { Injectable }           from '@angular/core';
import { FhemSwitchComponent }  from './fhem.switch/fhem.switch.component';
import { FhemRoofComponent }    from './fhem.roof/fhem.roof.component';
import { WeatherComponent }     from './weather/weather.component';
import { WidgetDef }            from './app.WidgetDef';
@Injectable()
export class WidgetList {
  getWidgetList() {
    return [
      new WidgetDef(FhemSwitchComponent, {title: 'Licht Flur EG', name: 'LichtDecke',  url: 'http://192.168.55.2:8083' }),
      new WidgetDef(FhemRoofComponent,   {title: 'Dachfenster',   name: 'Dachfenster', url: 'http://192.168.55.2:8083' }),
      new WidgetDef(FhemSwitchComponent, {title: 'Schlafzimmer',  name: 'bed.light',   url: 'http://192.168.55.2:8083' }),
      new WidgetDef(WeatherComponent,    {title: 'Wetter',        location: 'Oberhaching', key: '3bda1d8ed11fb9126db17139f9b4346f' })
    ];
  }
}