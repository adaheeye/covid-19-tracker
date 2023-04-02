import {Component, OnDestroy, OnInit} from '@angular/core';
import {CovidService} from "./service/covid-case.service";
import {CovidCase} from "./model/covid-case.model";
import {Subject, takeUntil} from "rxjs";
import {CountriesService} from "../country/countries.service";
import {Country} from "../country/countries.model";
import {AllCovidCase} from "./model/all-covid-case.model";

@Component({
  selector: 'app-covid-case',
  templateUrl: './covid-case.component.html',
  styleUrls: ['./covid-case.component.scss']
})
export class CovidCaseComponent implements OnInit, OnDestroy {
  public covidCases: CovidCase[] = [];
  private unsubscribe$: Subject<void> = new Subject();
  public countries: Country[] = []
  public allCovidCase: AllCovidCase | null = null;

  constructor(private covidService: CovidService,
              private countriesService: CountriesService) { }

  ngOnInit() {
    this.getCountries();
    this.getAllCovidData();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
    return `${date.toDateString()} ${hours}:${minutes}:${seconds} UTC`;
  }

  private getCountries() {
    this.countriesService.getCountries()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((countries) => {
        if (!!countries) {
          this.countries = countries;
        }
        this.getCovidCases();
      });
  }

  private getCovidCases(): void {
    this.covidService.getCovidData()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((covidCases: CovidCase[]) => {
        this.covidCases = covidCases.map((covidCase) => {
          const country = this.countries.find((country) => country?.alpha3 === covidCase?.countryInfo?.iso3);
          if (country) {
            covidCase.countryInfo.flag = country?.file_url || covidCase.countryInfo.flag;
          }
          return covidCase;
        });
        console.log('covidCases: ', this.covidCases);
      });
  }

  private getAllCovidData() {
    this.covidService.getAllCovidData()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((allCovidCase: AllCovidCase) => {
        this.allCovidCase = allCovidCase;
        console.log('allCovidCase: ', this.allCovidCase);
      });
  }
}
