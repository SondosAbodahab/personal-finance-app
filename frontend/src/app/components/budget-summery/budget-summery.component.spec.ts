import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetSummeryComponent } from './budget-summery.component';

describe('BudgetSummeryComponent', () => {
  let component: BudgetSummeryComponent;
  let fixture: ComponentFixture<BudgetSummeryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetSummeryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetSummeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
