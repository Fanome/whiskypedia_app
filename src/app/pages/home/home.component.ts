import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { ToastrService } from "ngx-toastr";
import { ChartOptions } from 'chart.js';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    constructor(
        private router: Router,
        private toastr: ToastrService) { }
    
    ngOnInit() {
    }

    title = 'ng2-charts-demo';

    // Pie
    public pieChartOptions: ChartOptions<'pie'> = {
      responsive: false,
    };
    public pieChartLabels = [ [ 'Single Malt' ], [ 'Blended' ], 'Blended Malt', 'Single Grein', 'Bourbon' ];
    public pieChartDatasets = [ {
      data: [ 20, 50, 10, 15, 10 ]
    } ];
    public pieChartColors = [
      {
        backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff']
      }
    ];
    public pieChartLegend = true;
    public pieChartPlugins = [];

}