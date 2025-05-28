import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TanksAndZombiesComponent } from './tanks-and-zombies.component';

describe('TanksAndZombiesComponent', () => {
  let component: TanksAndZombiesComponent;
  let fixture: ComponentFixture<TanksAndZombiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TanksAndZombiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TanksAndZombiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
