import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CountriesService {

  private readonly resourceUrl = './assets/country-icons/countries.json';
  constructor(private http: HttpClient) {}

  public getCountries(): Observable<any> {
    return this.http.get(this.resourceUrl);
  }
}
