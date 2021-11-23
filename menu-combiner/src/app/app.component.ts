import { Component, OnInit } from '@angular/core';
import { GetDataService, RestaurantData } from './services/getData.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private getData: GetDataService) {}

  public data?: RestaurantData[];

  public error: any;

  ngOnInit() {
    this.getData.getData().subscribe(
      (data) => {
        this.data = data;
      },
      (error) => (this.error = error)
    );
  }
}
