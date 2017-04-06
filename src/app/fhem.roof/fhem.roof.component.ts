import {Component, Input} from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';
import {WidgetData} from '../app.widgetdef'
import { Observable } from 'rxjs/Rx';

require('font-awesome/css/font-awesome.css');

@Component({
  selector: 'fhem-roof',
  styleUrls: ['./fhem.roof.component.css'],
  templateUrl: './fhem.roof.component.html'
})
export class FhemRoofComponent implements WidgetData {
  constructor(private http: Http) { }

  @Input() data: any;
  error;
  status: string = "Unknown";
  lastcommand: string ="";
  timer;

  ngOnInit() {
    this.getStatus();
  
    this.timer = Observable.timer(5000,12000);
    this.timer.subscribe(t => { this.refresh(t)})  
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
    if(this.status == "off")
      this.setState("on");
    else if(this.status == "on")
      this.setState("off");
    else if(this.lastcommand=="on") 
      this.setState("stop");
    else if(this.lastcommand=="off") 
      this.setState("stop");
    else 
      this.setState("off");
  }

  private setState(state: string) {
    let params = new URLSearchParams();
    params.set('XHR', '1');
    this.lastcommand=state;
    console.log(`setting ${ this.data.name } new state to ${ state }`);

    let url = `${ this.data.url }/fhem?cmd=set ${ this.data.name } ${ state }`;
    return this.http.get(url, {search: params})
      .subscribe((data) => {this.getStatus();},
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
