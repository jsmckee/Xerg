import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabOptionComponent } from './tab-option.component';

describe('TabOptionComponent', () => {
  let component: TabOptionComponent;
  let fixture: ComponentFixture<TabOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabOptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
