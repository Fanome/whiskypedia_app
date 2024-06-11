import { Component, OnInit } from '@angular/core';
import { FabricanteService } from 'src/app/service/fabricante/fabricante.service';
import { Fabricante } from 'src/app/model/fabricante.model';
import { Router, ActivatedRoute } from '@angular/router'; 
import { ToastrService } from "ngx-toastr";
import { ConfigService } from 'src/app/service/config/config-service';
import { FabricanteDataBase } from 'src/app/service_db/fabricante_db/fabricante_db.service';

@Component({
  selector: 'app-editarfabricante',
  templateUrl: './editarfabricante.component.html',
  styleUrls: ['./editarfabricante.component.scss']
})
export class EditarfabricanteComponent implements OnInit {

  fabricante: Fabricante = {};

  loaderEditar = false;

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

  async editarFabricante(barrilEditado: any){
    this.loaderEditar = true;
    
    if(this.configService.bancoDados() == "sqllite"){
      await this.alterarFabricantesAllLocal(barrilEditado);
    }
    else{
      await this.alterarFabricantesAllNuvem(barrilEditado);
    }
  }


  async alterarFabricantesAllLocal(fabricanteExcluido: any): Promise<void>{
    const result = await this.fabricanteDataBase.alterarFabricantes(fabricanteExcluido.nomeFabricante, fabricanteExcluido.idFabricante);
    if(result){
      this.notificacao("sucesso", "Fabricante alterado com sucesso");
        this.loaderEditar = false;
        this.router.navigate(["/fabricante"]);
    }else{
      this.notificacao("danger", "Erro ao alterar Fabricante");
      this.loaderEditar = false;
    }
  }

  async alterarFabricantesAllNuvem(barrilEditado: any): Promise<void>{
    this.fabricanteService.editarFabricantePut(barrilEditado).subscribe(result => {
      if(result){
        this.notificacao("sucesso", "Fabricante alterado com sucesso");
        this.loaderEditar = false;
        this.router.navigate(["/fabricante"]);
      }else{
        this.notificacao("danger", "Erro ao alterar Fabricante");
        this.loaderEditar = false;
      }
    }, error => {
        console.log(error);
        this.notificacao("danger", "Erro de acesso a API");
        this.loaderEditar = false;
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
