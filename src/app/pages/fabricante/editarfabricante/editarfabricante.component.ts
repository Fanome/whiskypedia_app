import { Component, OnInit } from '@angular/core';
import { FabricanteService } from 'src/app/service/fabricante/fabricante.service';
import { Fabricante } from 'src/app/model/fabricante.model';
import { Router, ActivatedRoute } from '@angular/router'; 
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-editarfabricante',
  templateUrl: './editarfabricante.component.html',
  styleUrls: ['./editarfabricante.component.scss']
})
export class EditarfabricanteComponent implements OnInit {

  fabricante: Fabricante = {};

  constructor(
    private fabricanteService: FabricanteService, 
    private router: Router, 
    private route: ActivatedRoute,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.fabricante.idFabricante = this.route.snapshot.params['idFabricante'];
    this.fabricante.nomeFabricante = this.route.snapshot.params['nomeFabricante'];
  }

  editarFabricante(barrilEditado: any){
    this.fabricanteService.editarFabricantePut(barrilEditado).subscribe(result => {
      if(result){
        this.notificacao("sucesso", "Fabricante alterado com sucesso");
        this.router.navigate(["/fabricante"]);
      }else{
        this.notificacao("danger", "Erro ao alterar Fabricante");
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

}
