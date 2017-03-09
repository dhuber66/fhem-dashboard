import {Component, Input} from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';

require('font-awesome/css/font-awesome.css');

@Component({
  selector: 'fhem-switch',
  styleUrls: ['./fhem.switch.component.css'],
  templateUrl: './fhem.switch.component.html'
})
export class FhemSwitchComponent {
    constructor(private http: Http) { }

    @Input('name') name: string = "LichtDecke";
    error;
    status: string = "Unknown";
    
    ngOnInit() {
      this.getStatus();
    }
    
    getStatus(): void {
      this.getState(this.name);
    }

    updateStatus(status: string): void {
        console.log(`updateStatus ${ status }`)
        if(status.substr(0,4)=="set_")
          this.getStatus();
        else
          this.status=status;  
    }

    toggleStatus(): void {
      if(this.status == "off")
        this.setState(this.name,true);
      else
        this.setState(this.name,false);
      
    }


    private setState(name: string,state: boolean) {
    let params = new URLSearchParams();
    params.set('XHR', '1');
    let status='off';
    if(state)
      status='on'

    let url = `http://192.168.55.2:8083/fhem?cmd=set ${ name } ${ status }`;
    return this.http.get(url, {search: params})
      .subscribe((data) => {this.getStatus();},
                 (err) => {this.error = err;});
    }

    private getState(name: string) {
    let params = new URLSearchParams();
    params.set('XHR', '1');

    let url = `http://192.168.55.2:8083/fhem?cmd=jsonlist2+NAME=${ name }`;
    return this.http.get(url, {search: params})
      .map((res) => res.json())
      .subscribe((status) => {this.updateStatus(status['Results'][0]['Internals']['STATE']);},
                 (err) => {console.log(err);});
  }
}
