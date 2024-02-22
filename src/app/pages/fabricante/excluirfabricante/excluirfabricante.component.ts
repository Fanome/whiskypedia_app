import { Component, OnInit } from '@angular/core';
import { FabricanteService } from 'src/app/service/fabricante/fabricante.service';
import { Fabricante } from 'src/app/model/fabricante.model';
import { Router, ActivatedRoute } from '@angular/router'; 
import { ToastrService } from "ngx-toastr";

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
    private toastr: ToastrService) { }

  ngOnInit() {
    this.fabricante.idFabricante = this.route.snapshot.params['idFabricante'];
    this.fabricante.nomeFabricante = this.route.snapshot.params['nomeFabricante'];
  }

  excluirFabricante(fabricanteExcluido: any){
    this.loaderExcluir = true;
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
