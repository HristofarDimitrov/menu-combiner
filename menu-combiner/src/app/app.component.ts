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

  public data: any = this.getData.getPivniceUcapaData();

  ngOnInit() {
    // this.getData.getPivniceUcapaData().subscribe((data) => {
    //   console.log(data);
    // });
  }
}
