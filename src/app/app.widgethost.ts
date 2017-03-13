

import { Component, Input, AfterViewInit, ViewChild, ComponentFactoryResolver, OnDestroy, OnInit } from '@angular/core';
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
export class WidgetHost implements OnInit, OnDestroy {
  @Input() my_widgets: WidgetDef[];
  currentAddIndex: number = -1;
  @ViewChild(Widget) widget: Widget;
  subscription: any;
  interval: any;
  constructor(private _componentFactoryResolver: ComponentFactoryResolver) { }
  
  
  ngOnInit() {
    this.loadComponent();
  }
  
  ngOnDestroy() {
    clearInterval(this.interval);
  }
  
  loadComponent() {
    let viewContainerRef = this.widget.viewContainerRef;
    viewContainerRef.clear();

    var thiswidget: WidgetDef;
    for(thiswidget of this.my_widgets) {
        let componentFactory = this._componentFactoryResolver.resolveComponentFactory(thiswidget.component);
        let componentRef = viewContainerRef.createComponent(componentFactory);
        (<WidgetData>componentRef.instance).data = thiswidget.data;
      }    
    }
}