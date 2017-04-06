import {Component, Input} from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';
import {WidgetData} from '../app.widgetdef'
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'weather',
  styleUrls: ['./weather.component.css', '../../assets/css/owfont-regular.min.css'],
  templateUrl: './weather.component.html'
})
export class WeatherComponent implements WidgetData {
  constructor(private http: Http) { }

  @Input() data: any;
  error;
  status: string="Unknown";
  icon: string="200";
  temp: string="?";
  lastcommand: string ="";
  timer;

  ngOnInit() {
    this.getStatus();
  
    this.timer = Observable.timer(5000,300000); // every 5 minutes
    this.timer.subscribe(t => { this.refresh(t)})  
  }
    
  getStatus(): void {
    this.getState();
  }

  updateStatus(status: JSON): void {
    this.status = status['weather'][0]['description']; 
    this.icon = status['weather'][0]['id']; //no it's not the 'icon' code!!!!
    this.temp = status['main']['temp'];
  }

  toggleStatus(): void {

  }

  private setState(state: string) {

  }

  private getState() {
    let params = new URLSearchParams();
    params.set('APPID', this.data.key );
    params.set('units', 'metric');
    params.set('lang',  'de');
    params.set('q',     this.data.location);

    this.http.get('http://api.openweathermap.org/data/2.5/weather', {search: params})
      .map((res) => res.json())
      .subscribe((status) => { this.updateStatus(status);},
                (err) => {console.log(err);});
  
    http://api.openweathermap.org/data/2.5/forecast/daily?q=Oberhaching&lang=de&units=metric&APPID=3bda1d8ed11fb9126db17139f9b4346f&cnt=2

    this.http.get('http://api.openweathermap.org/data/2.5/weather', {search: params})
      .map((res) => res.json())
      .subscribe((status) => { this.updateStatus(status);},
                (err) => {console.log(err);});
  

  }

  refresh(time): void {
      this.getStatus();
  }
}
