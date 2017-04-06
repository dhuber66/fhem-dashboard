import {Component, OnInit} from '@angular/core';
import { WidgetList } from './app.widgetlist';
import { WidgetDef } from './app.widgetdef';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None, // Allow CSS to override globals.
})
export class AppComponent implements OnInit {

  constructor(private widgetList: WidgetList) {}
  
  widgets: WidgetDef[];


  ngOnInit() {
      this.widgets = this.widgetList.getWidgetList();
  }
}


//    <div class="col-md-4" *ngFor="let widget of widget"><[widget.selector] name="{{widget.name}}"></[widget.selector]></div>
