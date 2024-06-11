import { Component, OnInit } from '@angular/core';
import { TipowhiskyService } from 'src/app/service/tipowhisky/tipowhisky.service';
import { TipoWhisky } from 'src/app/model/tipowhisky.model';
import { Router } from '@angular/router'; 
import { ToastrService } from "ngx-toastr";
import { ConfigService } from 'src/app/service/config/config-service';
import { TipoWhiskyDataBase } from 'src/app/service_db/tipowhisky_db/tipowhisky_db.service';

@Component({
  selector: 'app-listar-tipowhisky',
  templateUrl: './listar-tipowhisky.component.html',
  styleUrls: ['./listar-tipowhisky.component.scss']
})
export class ListarTipowhiskyComponent implements OnInit {

  tipoWhiskys: TipoWhisky[] = [];

  loaderListar = false;

  pageSize: number = 5; // Quantidade de itens por página
  currentPage: number = 1; // Página inicial

  constructor(
    private tipowhiskyService: TipowhiskyService, 
    private router: Router,
    private toastr: ToastrService,
    private configService: ConfigService,
    private tipoWhiskyDataBase: TipoWhiskyDataBase
  ) { 
  }

  ngOnInit() {
    this.tipoWhiskys = [];
  }

  ionViewDidEnter() { // metodo para atualizar a pagina
    this.tipoWhiskys = [];
    this.listarTipoWhiskyALL();
  }

  async listarTipoWhiskyALL(): Promise<void>{
    this.loaderListar = true;
    this.tipoWhiskys = [];

    if(this.configService.bancoDados() == "sqllite"){
      await this.listarFabricantesAllLocal();
    }
    else{
      await this.listarFabricantesAllNuvem();
    }
  }

  async listarFabricantesAllLocal(): Promise<void>{
    this.tipoWhiskys = await this.tipoWhiskyDataBase.listarTipoWhiskys();
    this.loaderListar = false;
  }

  async listarFabricantesAllNuvem(): Promise<void>{
    this.tipowhiskyService.listarALL().subscribe(result => {
      this.tipoWhiskys = result
      this.loaderListar = false;
    }, error => {
        console.log(error);
        this.notificacao("danger", "Erro de acesso a API");
        this.loaderListar = false;
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

}
