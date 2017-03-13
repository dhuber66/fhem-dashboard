import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[widget]',
})
export class Widget {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
