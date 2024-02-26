import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; 
import { ToastrService } from "ngx-toastr";
import { ChartOptions } from 'chart.js';
import { Usuario } from 'src/app/model/usuario.model';
import { UsuarioService } from 'src/app/service/usuario/usuario.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', './home2.component.scss']
})
export class HomeComponent implements OnInit {

  usuarioLogado: Usuario = {};

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private usuarioService: UsuarioService,
        private toastr: ToastrService) { }
    
    ngOnInit() {
      this.usuarioLogado = this.usuarioService.getGlobalVariable();
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