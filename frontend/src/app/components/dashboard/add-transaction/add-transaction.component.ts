import { Component, EventEmitter, Output } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatOption } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { Transaction } from "src/app/models/transaction.model";
import { TransactionService } from "src/app/services/transactions/transaction.service";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { provideNativeDateAdapter } from "@angular/material/core";
import { MatSelect } from "@angular/material/select";
import { date_regex } from "src/app/shared/regex";
import { JsonPipe } from "@angular/common";

const matModules = [
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatOption,
  MatDatepickerModule,
  MatSelect,
];
@Component({
  selector: "app-add-transaction",
  standalone: true,
  imports: [...matModules, ReactiveFormsModule, JsonPipe],
  templateUrl: "./add-transaction.component.html",
  styleUrl: "./add-transaction.component.scss",
  providers: [provideNativeDateAdapter()],
})
export class AddTransactionComponent {
  @Output() transactionAdded = new EventEmitter<Transaction>();

  transactionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService,
  ) {
    this.transactionForm = this.fb.group({
      type: ["", Validators.required],
      amount: [
        null,
        [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)],
      ],
      category: ["", Validators.required],
      date: ["", [Validators.required]],
      description: [""],
    });
  }

  onSubmit(): void {
    if (this.transactionForm.valid) {
      this.transactionService
        .addTransaction(this.transactionForm.value)
        .subscribe({
          next: (newTransaction) => {
            this.resetForm();
            this.transactionAdded.emit(newTransaction);
          },
          error: (error) => {
            console.error("Error adding transaction:", error);
          },
        });
    }
  }
  resetForm() {
    this.transactionForm.reset();
   
    (Object as any).values(this.transactionForm.controls).forEach((control: FormControl) => {
      control.setErrors(null);
  });
  
  }
}
