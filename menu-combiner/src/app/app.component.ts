import { Component, OnInit } from '@angular/core';
import { GetDataService } from './services/getData.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'menu-combiner';

  constructor(private getData: GetDataService) {}

  public data: any = this.getData.getData();

  ngOnInit() {
    this.getData.getData().subscribe((data) => {
      console.log(data);
    });
  }
}
