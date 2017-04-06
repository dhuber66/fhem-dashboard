import {Component, Input} from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';
import {WidgetData} from '../app.widgetdef'
import { Observable } from 'rxjs/Rx';

require('font-awesome/css/font-awesome.css');

@Component({
  selector: 'fhem-switch',
  styleUrls: ['./fhem.switch.component.css'],
  templateUrl: './fhem.switch.component.html'
})
export class FhemSwitchComponent implements WidgetData {
    constructor(private http: Http) { }

    @Input() data: any;
    error;
    status: string = "Unknown";
    
    ngOnInit() {
      this.getStatus();
    
      let timer = Observable.timer(5000,12000);
      timer.subscribe(t => { this.refresh(t)})  
    }
    
    getStatus(): void {
      this.getState();
    }

    updateStatus(status: string): void {
      if(status.substr(0,4)=="set_") 
        this.getState();
      else {
        let oldstatus=this.status;
        this.status=status;  
        if(oldstatus!=status) {
          console.log(`updateStatus of ${ this.data.name } to ${ status }`)
          this.getState();
        }    
      }
    }

    toggleStatus(): void {
      this.getState();
      if(this.status == "off")
        this.setState(true);
      else
        this.setState(false);
    }


    private setState(state: boolean) {
    let params = new URLSearchParams();
    params.set('XHR', '1');
    let status='off';
    if(state)
      status='on'

    let url = `${ this.data.url }/fhem?cmd=set ${ this.data.name } ${ status }`;
    return this.http.get(url, {search: params})
      .subscribe((data) => {this.getState();},
                 (err) => {this.error = err;});
    }

    private getState() {
    let params = new URLSearchParams();
    params.set('XHR', '1');

    let url = `${ this.data.url }/fhem?cmd=jsonlist2+NAME=${ this.data.name }`;
    return this.http.get(url, {search: params})
      .map((res) => res.json())
      .subscribe((status) => { this.updateStatus(status['Results'][0]['Internals']['STATE']);},
                 (err) => {console.log(err);});
  }

  refresh(time): void {
      this.getStatus();
  }
}
