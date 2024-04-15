import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { ToastrService } from "ngx-toastr";

import { FabricanteService } from 'src/app/service/fabricante/fabricante.service';
import { Fabricante } from 'src/app/model/fabricante.model';

import { TipowhiskyService } from 'src/app/service/tipowhisky/tipowhisky.service';
import { TipoWhisky } from 'src/app/model/tipowhisky.model';

import { WhiskyService } from 'src/app/service/whisky/whisky.service';
import { Whisky } from 'src/app/model/whisky.model';
import { WhiskyPaginado } from 'src/app/model/whiskyPaginado.model';

import { MigracaoService } from 'src/app/service/migracao/migracao-nuvem-local.service';
import { Observable } from 'rxjs/internal/Observable';
import { formatDate } from '@angular/common';


import { MigracaoLocalNuvemService } from 'src/app/service/migracao/migracao-local-nuvem.service';

@Component({
  selector: 'app-migracao',
  templateUrl: './migracao.component.html',
  styleUrls: ['./migracao.component.scss']
})
export class MigracaoComponent implements OnInit {  

  public fabricantes: Fabricante[] = [];
  public tipoWhiskys: TipoWhisky[] = [];
  public whiskys: Whisky[] = [];
  public whiskysPaginado: WhiskyPaginado = {};

  public num1: number = 0;
  public num2: number = 0;

  constructor(
      private router: Router,
      private toastr: ToastrService,
      private fabricanteService: FabricanteService, 
      private tipowhiskyService: TipowhiskyService, 
      private migracaoService: MigracaoService, 
      private whiskyService: WhiskyService, 
      private migracaoLocalNuvemService: MigracaoLocalNuvemService
  ) { }
  
  ngOnInit(): void {
    
  }

  //// Migracao Nuvem para Local

  migrarFabricantes(): void{
    this.fabricanteService.listarALL().subscribe(results => {
      this.fabricantes = results;
      var cont = 0;

      for (const value of this.fabricantes) {
        this.migracaoService.criarFabricanteMigracaoPost(value).subscribe(result => {
          cont = cont + 1;
          console.log(cont);
        }, error => {
            console.log(error);
            this.notificacao("danger", "Erro de acesso a API");
        });

      }

      this.notificacao("sucesso", "Migração feita com sucesso");
    }, error => {
        console.log(error);
        this.notificacao("danger", "Erro de acesso a API");
    });

  }

  migrarTipoWhiskys(): void{
    this.tipowhiskyService.listarALL().subscribe(result => {
      this.tipoWhiskys = result;
      var cont = 0;

      console.log(this.tipoWhiskys);
      for (const value of this.tipoWhiskys) {
        this.migracaoService.criartipowhiskyMigracaoPost(value).subscribe(result => {
          cont = cont + 1;
          console.log(cont);
        }, error => {
            console.log(error);
            this.notificacao("danger", "Erro de acesso a API");
        });
      }

      this.notificacao("sucesso", "Migração feita com sucesso");

    }, error => {
        console.log(error);
        this.notificacao("danger", "Erro de acesso a API");
    });
  }

  migrarWhiskys(num10: number, num20: number): void{

    this.whiskyService.listarRengeID(num10, num20).subscribe(result => {
      this.whiskys = result;

      console.log(this.whiskys);

      for (const value of this.whiskys) {
        value.dataCadastro = formatDate(value.dataCadastro != null ? value.dataCadastro : new Date(), 'yyyy-MM-dd', 'en');;
        this.migracaoService.criarWhiskyMigracaoPost(value).subscribe(result => {
        }, error => {
            console.log(error);
            this.notificacao("danger", "Erro de acesso a API");
        });
      }

    }, error => {
        console.log(error); 
        this.notificacao("danger", "Erro de acesso a API");
    });

    
  }

  //MOTIFICAÇÃO 
  notificacao(tipo: any, msg: any){
    
    if(tipo == "sucesso"){
      this.toastr.success(
        '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">'+ msg +'</span>',
        "",
        {
          timeOut: 4000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-success alert-with-icon",
          positionClass: "toast-" + "top" + "-" + "center"
        }
      );
    }

    if(tipo == "danger"){
      this.toastr.error(
        '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">'+ msg +'</span>',
          "",
          {
            timeOut: 4000,
            enableHtml: true,
            closeButton: true,
            toastClass: "alert alert-danger alert-with-icon",
            positionClass: "toast-" + "top" + "-" + "center"
          }
        );
    }

    if(tipo == "info"){
      this.toastr.info(
        '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">'+ msg +'</span>',
          "",
          {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-info alert-with-icon",
            positionClass: "toast-" + "top" + "-" + "center"
          }
        );
    }
  }


  //// Migracao Local para Nuvem

  migrarFabricantesLocalParaNuvem(): void{
    this.migracaoService.listarALL().subscribe(results => {
      this.fabricantes = results;
      var cont = 0;

      //console.log(this.fabricantes);

      for (const value of this.fabricantes) {
        this.migracaoLocalNuvemService.criarFabricanteMigracaoLocalParaNuvemPost(value).subscribe(result => {
          cont = cont + 1;
          console.log(cont);
        }, error => {
            console.log(error);
            this.notificacao("danger", "Erro de acesso a API");
        });

      }

      this.notificacao("sucesso", "Migração feita com sucesso");
    }, error => {
        console.log(error);
        this.notificacao("danger", "Erro de acesso a API");
    });

  }

  migrarTipoWhiskysLocalParaNuvem(): void{
    this.migracaoService.listarTipoWhiskyALL().subscribe(result => {
      this.tipoWhiskys = result;
      var cont = 0;

      //console.log(this.tipoWhiskys);
      for (const value of this.tipoWhiskys) {
        this.migracaoLocalNuvemService.criartipowhiskyMigracaoLocalParaNuvemPost(value).subscribe(result => {
          cont = cont + 1;
          console.log(cont);
        }, error => {
            console.log(error);
            this.notificacao("danger", "Erro de acesso a API");
        });
      }

      this.notificacao("sucesso", "Migração feita com sucesso");

    }, error => {
        console.log(error);
        this.notificacao("danger", "Erro de acesso a API");
    });
  }

  migrarWhiskysLocalParaNuvem(num10: number, num20: number): void{

    this.migracaoService.listarRengeID(num10, num20).subscribe(result => {
      this.whiskys = result;

      console.log(this.whiskys);

      for (const value of this.whiskys) {
        value.dataCadastro = formatDate(value.dataCadastro != null ? value.dataCadastro : new Date(), 'yyyy-MM-dd', 'en');;
        this.migracaoLocalNuvemService.criarWhiskyMigracaoLocalParaNuvemPos(value).subscribe(result => {
        }, error => {
            console.log(error);
            this.notificacao("danger", "Erro de acesso a API");
        });
      }

    }, error => {
        console.log(error); 
        this.notificacao("danger", "Erro de acesso a API");
    });

    
  }

}