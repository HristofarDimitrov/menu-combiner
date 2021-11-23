import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RestaurantData {
  name: string;
  menuItems: string[];
}

@Injectable({ providedIn: 'root' })
export class GetDataService {
  constructor(private http: HttpClient) {}

  public getData(): Observable<RestaurantData[]> {
    return this.http.get('http://localhost:3000/crawler') as Observable<
      RestaurantData[]
    >;
  }
}
