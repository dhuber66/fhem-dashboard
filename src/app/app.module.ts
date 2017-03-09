import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http'; 

import { FhemSwitchComponent } from './fhem.switch/fhem.switch.component';

@NgModule({
  declarations: [
    AppComponent,
    FhemSwitchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
  //  RouterModule.forRoot(rootRouterConfig, { useHash: true })
  ],
  providers: [
  //  GithubService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {

}
