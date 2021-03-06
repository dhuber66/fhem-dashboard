import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http'; 

import { FhemSwitchComponent } from './fhem.switch/fhem.switch.component';
import { FhemRoofComponent } from './fhem.roof/fhem.roof.component';
import { WeatherComponent } from './weather/weather.component';
import { WidgetList } from './app.widgetlist';
import { Widget } from './app.widget';
import { WidgetHost } from './app.widgethost';


@NgModule({
  declarations: [
    AppComponent,
    FhemSwitchComponent,
    FhemRoofComponent,
    WeatherComponent,
    WidgetHost,
    Widget,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
  //  RouterModule.forRoot(rootRouterConfig, { useHash: true })
  ],
  entryComponents: [ FhemSwitchComponent, FhemRoofComponent, WeatherComponent ],
  providers: [
    WidgetList
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {

}
