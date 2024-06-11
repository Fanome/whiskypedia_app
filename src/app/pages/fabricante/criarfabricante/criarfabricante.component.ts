import { Component, OnInit } from '@angular/core';
import { FabricanteService } from 'src/app/service/fabricante/fabricante.service';
import { Fabricante } from 'src/app/model/fabricante.model';
import { Router } from '@angular/router'; 
import { ToastrService } from "ngx-toastr";
import { ConfigService } from 'src/app/service/config/config-service';
import { FabricanteDataBase } from 'src/app/service_db/fabricante_db/fabricante_db.service';

@Component({
  selector: 'app-criarfabricante',
  templateUrl: './criarfabricante.component.html',
  styleUrls: ['./criarfabricante.component.scss']
})
export class CriarfabricanteComponent implements OnInit {

  fabricante: Fabricante = {};

  loaderCriar = false;

  constructor(
    private fabricanteService: FabricanteService, 
    private router: Router,
    private toastr: ToastrService,
    private configService: ConfigService,
    private fabricanteDataBase: FabricanteDataBase
  ) { }

  ngOnInit() { 
  }

  async criarFabricante(): Promise<void>{
    this.loaderCriar = true;
    
    if(this.configService.bancoDados() == "sqllite"){
      await this.criarFabricantesAllLocal();
      this.loaderCriar = false;
    }
    else{
      await this.criarFabricantesAllNuvem();
    }

  }

  async criarFabricantesAllLocal(): Promise<void>{
    const nome = this.fabricante.nomeFabricante == undefined? "" : this.fabricante.nomeFabricante
    const result = await this.fabricanteDataBase.criarFabricantes(nome);
    if(result){
      this.notificacao("sucesso", "Fabricante criado com sucesso");
      this.fabricante = {};
      this.loaderCriar = false;
      this.router.navigate(["/fabricante"]);
    }else{
      this.notificacao("danger", "Erro ao criar Fabricante");
      this.loaderCriar = false;
    }
  }

  async criarFabricantesAllNuvem(): Promise<void>{
    this.fabricanteService.criarFabricantePost(this.fabricante).subscribe(result => {
      if(result){
        this.notificacao("sucesso", "Fabricante criado com sucesso");
        this.fabricante = {};
        this.loaderCriar = false;
        this.router.navigate(["/fabricante"]);
      }else{
        this.notificacao("danger", "Erro ao criar Fabricante");
        this.loaderCriar = false;
      }
    }, error => {
        console.log(error);
        this.notificacao("danger", "Erro de acesso a API");
        this.loaderCriar = false;
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
