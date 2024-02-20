import { Component, OnInit } from '@angular/core';
import { FabricanteService } from 'src/app/service/fabricante/fabricante.service';
import { Fabricante } from 'src/app/model/fabricante.model';
import { Router } from '@angular/router'; 
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-criarfabricante',
  templateUrl: './criarfabricante.component.html',
  styleUrls: ['./criarfabricante.component.scss']
})
export class CriarfabricanteComponent implements OnInit {

  fabricante: Fabricante = {};

  constructor(
    private fabricanteService: FabricanteService, 
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() { 
  }

  criarFabricante(){
    this.fabricanteService.criarFabricantePost(this.fabricante).subscribe(result => {
      if(result){
        this.notificacao("sucesso", "Fabricante criado com sucesso");
        this.router.navigate(["/fabricante"]);
      }else{
        this.notificacao("danger", "Erro ao criar Fabricante");
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
