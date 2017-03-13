import {Component, ViewChild, ViewChildren, ViewContainerRef, QueryList, ElementRef, ComponentFactoryResolver, OnInit} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { FhemSwitchComponent } from "./fhem.switch/fhem.switch.component";
import { WidgetList } from './app.widgetlist';
import { WidgetDef } from './app.widgetdef';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  constructor(private widgetList: WidgetList) {}
  
  widgets: WidgetDef[];

  @ViewChildren(FhemSwitchComponent) myChild: QueryList<FhemSwitchComponent>;
  @ViewChild('widgetContainer', {read: ViewContainerRef}) widgetContainer: ViewContainerRef;

  ngOnInit() {
      this.widgets = this.widgetList.getWidgetList();
   
      let timer = Observable.timer(5000,12000);
      timer.subscribe(t => { this.refresh(t)})
  }

  refresh(time): void
  {
      console.log("AutoRefresh");
      this.myChild.forEach(function(i:FhemSwitchComponent,j:number,a) {i.getStatus();});
  }
}


//    <div class="col-md-4" *ngFor="let widget of widget"><[widget.selector] name="{{widget.name}}"></[widget.selector]></div>
