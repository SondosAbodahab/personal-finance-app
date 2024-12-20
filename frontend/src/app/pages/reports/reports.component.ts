import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { ReportsService } from '../../services/reports/reports.service';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  private reportsService = inject(ReportsService);

  ngOnInit() {
    this.loadReports();
  }

  loadReports() {
    this.reportsService.getTotalSpending().subscribe((data) => {
      this.renderChart('spendingChart', data, 'Spending by Category');
    });

    this.reportsService.getMostExpensiveTransactions().subscribe((data) => {
      const labels = data.map((item: any) => item.description);
      const values = data.map((item: any) => item.amount);
      this.renderChart('mostExpensiveChart', { labels, values }, 'Most Expensive Transactions');
    });

    this.reportsService.getAverageExpenses().subscribe((average) => {
      this.renderChart('averageExpensesChart', { labels: ['Average'], values: [average] }, 'Average Monthly Expenses');
    });
  }

  renderChart(chartId: string, data: any, title: string) {
    new Chart(chartId, {
      type: 'bar',
      data: {
        labels: data.labels || data.map((item: any) => item._id),
        datasets: [
          {
            label: title,
            data: data.values || data.map((item: any) => item.total),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
          title: { display: true, text: title },
        },
      },
    });
  }
}
