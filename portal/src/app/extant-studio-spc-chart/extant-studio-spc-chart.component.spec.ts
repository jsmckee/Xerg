import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtantStudioSpcChartComponent } from './extant-studio-spc-chart.component';

describe('ExtantStudioSpcChartComponent', () => {
  let component: ExtantStudioSpcChartComponent;
  let fixture: ComponentFixture<ExtantStudioSpcChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExtantStudioSpcChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtantStudioSpcChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
