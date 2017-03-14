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
    
    ngOnInit() {
      this.getStatus();
    
      let timer = Observable.timer(5000,12000);
      timer.subscribe(t => { this.refresh(t)})  
    }
    
    getStatus(): void {
      this.getState();
    }

    updateStatus(status: string): void {
        console.log(`updateStatus ${ status }`)
        if(status.substr(0,4)=="set_")
          this.getState();
        else
          this.status=status;  
    }

    toggleStatus(): void {
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
      .subscribe((data) => {this.getStatus();},
                (err) => {this.error = err;});
  }

  private getState() {
    let params = new URLSearchParams();
    params.set('XHR', '1');

    let url = `${ this.data.url }/fhem?cmd=jsonlist2+NAME=${ this.data.name }`;
    return this.http.get(url, {search: params})
      .map((res) => res.json())
      .subscribe((status) => { console.log(status); this.updateStatus(status['Results'][0]['Internals']['STATE']);},
                (err) => {console.log(err);});
  }

  refresh(time): void {
      console.log("AutoRefresh");
      this.getStatus();
  }
}
