import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BudgetService } from 'src/app/services/budget/budget.service';
import { Budget } from 'src/app/models/budget.model';


@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './budgets.component.html',
   styleUrl: './budgets.component.scss'
})
export class BudgetsComponent implements OnInit {
  budgetForm: FormGroup;
  currentBudget!: Budget ;

  constructor(private budgetService:BudgetService, private fb:FormBuilder) {
    this.budgetForm = this.fb.group({
      amount: [''],
      startDate: [''],
      endDate: [''],
    });
  }

  ngOnInit() {
    this.getBudget();
  }

  getBudget(){
    this.budgetService.getBudget().subscribe((res) => {
          this.currentBudget = res[0];
          this.budgetForm.patchValue(this.currentBudget);
        });
  }

  onSubmit() {
    if (this.currentBudget) {
      this.budgetService.updateBudget(this.currentBudget._id,this.budgetForm.value).subscribe((res) => {
        this.currentBudget = res.budget
      });
    } else {
      this.budgetService.createBudget(this.budgetForm.value).subscribe((res) => {
        this.currentBudget = res.budget        
      });
    }
  }
}
