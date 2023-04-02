import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidCaseComponent } from './covid-case.component';

describe('CovidCaseComponent', () => {
  let component: CovidCaseComponent;
  let fixture: ComponentFixture<CovidCaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CovidCaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CovidCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
