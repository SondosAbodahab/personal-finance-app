import { Component, Input, Pipe, ViewChild } from "@angular/core";
import { Transaction } from "src/app/models/transaction.model";
import { CurrencyPipe, DatePipe } from "@angular/common";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
// import { TransactionService } from '../../services/transaction.service';
// import { Transaction } from '../../models/transaction.model';

@Component({
  selector: "app-transactions",
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule,CurrencyPipe, DatePipe],
  templateUrl: "./transactions.component.html",
  styleUrl: "./transactions.component.scss",
})
export class TransactionsComponent {
  @Input() transactions: Transaction[] = [];
  displayedColumns: string[] = [
    "type",
    "amount",
    "category",
    "date",
    "description",
  ];
  dataSource = new MatTableDataSource<Transaction>([]);


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  ngOnChanges(): void {
    if (this.transactions.length > 0) {
      this.dataSource.data = this.transactions;
    }
  }
}