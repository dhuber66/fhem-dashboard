

import { Component, Input, ViewChild, ComponentFactoryResolver, OnInit } from '@angular/core';
import { Widget } from './app.widget';
import { WidgetDef, WidgetData }     from './app.widgetdef';

@Component({
  selector: 'widget-host',
  template: `
              <div class="widget-banner">
                <template widget></template>
              </div>
            `
})
export class WidgetHost implements OnInit {
  @Input() widgets: WidgetDef[];
  @ViewChild(Widget) widget: Widget;
  constructor(private _componentFactoryResolver: ComponentFactoryResolver) { }
  
  ngOnInit() {
    this.loadComponent();
  }
  
  loadComponent() {
    let viewContainerRef = this.widget.viewContainerRef;
    viewContainerRef.clear();

    var thiswidget: WidgetDef;
    for(thiswidget of this.widgets) {
        let componentFactory = this._componentFactoryResolver.resolveComponentFactory(thiswidget.component);
        let componentRef = viewContainerRef.createComponent(componentFactory);
        (<WidgetData>componentRef.instance).data = thiswidget.data;
      }    
    }
}