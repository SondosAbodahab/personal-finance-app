import { Component } from '@angular/core';
import { AddTransactionComponent } from './add-transaction/add-transaction.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { Transaction } from 'src/app/models/transaction.model';
import { TransactionService } from 'src/app/services/transactions/transaction.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AddTransactionComponent, TransactionsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  transactions: Transaction[] = [];

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.transactionService.getAllTransactions().subscribe({
      next: (data) => {
        this.transactions = data;  
      },
      error :  (error) => {
        console.error('Error loading transactions:', error);
      }
    }
    );
  }

  handleTransactionAdded(newTransaction: any): void {
    this.transactions = [newTransaction, ...this.transactions];
  }
}
