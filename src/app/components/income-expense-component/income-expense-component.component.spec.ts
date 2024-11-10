import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeExpenseComponentComponent } from './income-expense-component.component';

describe('IncomeExpenseComponentComponent', () => {
  let component: IncomeExpenseComponentComponent;
  let fixture: ComponentFixture<IncomeExpenseComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncomeExpenseComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomeExpenseComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
