import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {CovidCase} from "../model/covid-case.model";
import {AllCovidCase} from "../model/all-covid-case.model";

@Injectable()
export class CovidService {

  private url = /*'https://corona.lmao.ninja/v2/countries'*/'assets/api/countries.json';
  private all_cases_url = /*'https://corona.lmao.ninja/v2/all'*/'assets/api/all.json';

  constructor(private http: HttpClient) { }

  public getCovidData(): Observable<CovidCase[]> {
    return this.http.get<CovidCase[]>(this.url);
  }

  public getAllCovidData(): Observable<AllCovidCase> {
    return this.http.get<AllCovidCase>(this.all_cases_url);
  }
}
