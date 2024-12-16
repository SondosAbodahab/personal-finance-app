import { Component, Input, Pipe } from '@angular/core';
import { Transaction } from 'src/app/models/transaction.model';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent {
  @Input() transactions: Transaction[] = [];
}
