import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CovidService } from './service/covid-case.service';
import { CovidCase } from './model/covid-case.model';
import { Subject, takeUntil } from 'rxjs';
import { CountriesService } from '../country/countries.service';
import { Country } from '../country/countries.interface';
import { AllCovidCase } from './model/all-covid-case.model';
import { ChartComponent } from 'ng-apexcharts';
import { ChartOptions } from './model/chart-options.model';

@Component({
  selector: 'app-covid-case',
  templateUrl: './covid-case.component.html',
  styleUrls: ['./covid-case.component.scss'],
})
export class CovidCaseComponent implements OnInit, OnDestroy {
  public covidCases: CovidCase[] = [];
  public countries: Country[] = [];
  public allCovidCase: AllCovidCase | undefined;
  public selectedCountry: CovidCase | undefined;
  @ViewChild('chart') chart: ChartComponent | undefined;
  public chartOptions: Partial<ChartOptions> | undefined;
  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    private covidService: CovidService,
    private countriesService: CountriesService
  ) {}

  ngOnInit() {
    this.getCountries();
    this.getAllCovidData();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onCountrySelect(covidCase: CovidCase) {
    this.selectedCountry = covidCase;
    this.updateChart();
  }

  updateChart(): void {
    if (this.selectedCountry) {
      this.chartOptions = {
        chart: {
          type: 'pie',
          height: 350,
          width: '100%',
          foreColor: '#FFFFFF'
        },
        series: [this.selectedCountry.cases, this.selectedCountry.recovered, this.selectedCountry.deaths],
        labels: ['Cases', 'Recovered', 'Deaths'],
        colors: ['#04779e', '#138750', '#bf0909'],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: 'bottom',
              },
            },
          },
        ]
      };
    }
  }

  private getCountries() {
    this.countriesService
      .getCountries()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((countries) => {
        if (!!countries) {
          this.countries = countries;
        }
        this.getCovidCases();
      });
  }

  private getCovidCases(): void {
    this.covidService
      .getCovidData()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((covidCases: CovidCase[]) => {
        this.covidCases = covidCases;
        // Sort the covidCases array by country
        this.covidCases.sort((a, b) => {
          if (a.country === 'Canada') {
            return -1;
          } else if (b.country === 'Canada') {
            return 1;
          } else {
            return b.cases - a.cases;
          }
        });
        this.selectedCountry = this.covidCases[0];
        this.onCountrySelect(this.selectedCountry);
      });
  }

  private getAllCovidData() {
    this.covidService
      .getAllCovidData()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((allCovidCase: AllCovidCase) => {
        this.allCovidCase = allCovidCase;
      });
  }


}
