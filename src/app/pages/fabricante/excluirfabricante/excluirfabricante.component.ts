import { Component, OnInit } from '@angular/core';
import { FabricanteService } from 'src/app/service/fabricante/fabricante.service';
import { Fabricante } from 'src/app/model/fabricante.model';
import { Router, ActivatedRoute } from '@angular/router'; 
import { ToastrService } from "ngx-toastr";
import { ConfigService } from 'src/app/service/config/config-service';
import { FabricanteDataBase } from 'src/app/service_db/fabricante_db/fabricante_db.service';

@Component({
  selector: 'app-excluirfabricante',
  templateUrl: './excluirfabricante.component.html',
  styleUrls: ['./excluirfabricante.component.scss']
})
export class ExcluirfabricanteComponent implements OnInit {

  fabricante: Fabricante = {};

  loaderExcluir = false;

  constructor(
    private fabricanteService: FabricanteService, 
    private router: Router, 
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private configService: ConfigService,
    private fabricanteDataBase: FabricanteDataBase
  ) { }

  ngOnInit() {
    this.fabricante.idFabricante = this.route.snapshot.params['idFabricante'];
    this.fabricante.nomeFabricante = this.route.snapshot.params['nomeFabricante'];
  }

  async excluirFabricante(fabricanteExcluido: any): Promise<void>{
    this.loaderExcluir = true;

    if(this.configService.bancoDados() == "sqllite"){
      await this.excluirFabricantesAllLocal(fabricanteExcluido);
    }
    else{
      await this.excluirFabricantesAllNuvem(fabricanteExcluido);
    }
  }


  async excluirFabricantesAllLocal(fabricanteExcluido: any): Promise<void>{
    const result = await this.fabricanteDataBase.deletarFabricantes(fabricanteExcluido.idFabricante);
    if(result){
      this.notificacao("sucesso", "Fabricante excluído com sucesso");
      this.fabricante = {};
      this.loaderExcluir = false;
      this.router.navigate(["/fabricante"]);
    }else{
      this.notificacao("danger", "Erro ao excluir Fabricante");
      this.loaderExcluir = false;
    }
  }

  async excluirFabricantesAllNuvem(fabricanteExcluido: any): Promise<void>{
    this.fabricanteService.excluirFabricantePost(fabricanteExcluido).subscribe(result => {
      if(result){
        this.notificacao("sucesso", "Fabricante excluirdo com sucesso");
        this.loaderExcluir = false;
        this.router.navigate(["/fabricante"]);
      }else{
        this.notificacao("danger", "Erro ao excluir Fabricante");
        this.loaderExcluir = false;
      }
    }, error => {
        console.log(error);
        this.notificacao("danger", "Erro de acesso a API");
        this.loaderExcluir = false;
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
