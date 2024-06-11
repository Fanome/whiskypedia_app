import { Component, OnInit } from '@angular/core';
import { Fabricante } from 'src/app/model/fabricante.model';
import { Router } from '@angular/router'; 
import { ToastrService } from "ngx-toastr";
import { FabricanteService } from 'src/app/service/fabricante/fabricante.service';
import { ConfigService } from 'src/app/service/config/config-service';
import { FabricanteDataBase } from 'src/app/service_db/fabricante_db/fabricante_db.service';

@Component({
  selector: 'app-fabricante',
  templateUrl: './fabricante.component.html',
  styleUrls: ['./fabricante.component.scss'],
})
export class FabricanteComponent  implements OnInit {

  public fabricantes: Fabricante[] = [];

  //items: any[] = [this.fabricantes];
  pageSize: number = 5; // Quantidade de itens por página
  currentPage: number = 1; // Página inicial

  loaderListar = false;

  constructor(
    private fabricanteService: FabricanteService, 
    private router: Router,
    private toastr: ToastrService,
    private configService: ConfigService,
    private fabricanteDataBase: FabricanteDataBase
    ) 
  { 
  }

  ngOnInit(): void {
    this.fabricantes = [];
  }

  ionViewDidEnter() { // metodo para atualizar a pagina
    this.fabricantes = [];
    this.listarFabricantesALL();
  }

  async listarFabricantesALL(): Promise<void>{
    this.loaderListar = true;
    this.fabricantes = [];

    if(this.configService.bancoDados() == "sqllite"){
      await this.listarFabricantesAllLocal();
      this.loaderListar = false;
    }
    else{
      await this.listarFabricantesAllNuvem();
    }
  }

  async listarFabricantesAllLocal(): Promise<void>{
    this.fabricantes = [];
    this.fabricantes = await this.fabricanteDataBase.listarFabricantes();
  }

  async listarFabricantesAllNuvem(): Promise<void>{
    this.fabricantes = [];
    this.fabricantes = await this.fabricanteService.listarALLAsync();
    this.loaderListar = false;
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
