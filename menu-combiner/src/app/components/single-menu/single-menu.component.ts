import { Component, Input, OnInit } from '@angular/core';
import { RestaurantData } from 'src/app/services/getData.service';

@Component({
  selector: 'app-single-menu',
  templateUrl: './single-menu.component.html',
  styleUrls: ['./single-menu.component.css'],
})
export class SingleMenuComponent {
  @Input() public menu?: RestaurantData;
}
