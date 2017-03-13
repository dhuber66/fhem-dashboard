import { Type } from '@angular/core';
export class WidgetDef {
  constructor(public component: Type<any>, public data: any) {}
}

export interface WidgetData {
  data: any;
}