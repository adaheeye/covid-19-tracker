import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Country } from "./countries.interface";

@Injectable()
export class CountriesService {

  private readonly resourceUrl = './assets/images/flag/countries.json';
  constructor(private http: HttpClient) {}

  public getCountries(): Observable<Country[]> {
    return this.http.get(this.resourceUrl)
      .pipe(
        map((response: any) => {
          return response.data;
        })
      );
  }
}
