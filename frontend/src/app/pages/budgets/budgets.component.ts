import { Component, OnInit, computed, inject, signal } from '@angular/core';
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
  currentBudget = signal<Budget | null>(null);
  hasBudget = computed(() => !!this.currentBudget());
  statusMessage = signal<string | null>(null);

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
          this.currentBudget.set(res); 
          this.budgetForm.patchValue(res);
        });
  }

  onSubmit() {
    if (this.hasBudget()) {
      this.budgetService.updateBudget(this.currentBudget()!._id,this.budgetForm.value).subscribe((res) => {
        this.currentBudget.set(res);
        this.statusMessage.set('Budget updated successfully!');
        this.clearMessageAfterDelay();
      });
    } else {
      this.budgetService.createBudget(this.budgetForm.value).subscribe((res) => {
        this.currentBudget.set(res);
        this.statusMessage.set('Budget created successfully!');
        this.clearMessageAfterDelay();
      });
    }
  }


  clearMessageAfterDelay() {
    setTimeout(() => {
      this.statusMessage.set(null);
    }, 3000); // Clear the message after 3 seconds
  }


}
