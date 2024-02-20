import { Component, OnInit } from '@angular/core';
import { TipowhiskyService } from 'src/app/service/tipowhisky/tipowhisky.service';
import { TipoWhisky } from 'src/app/model/tipowhisky.model';
import { Router } from '@angular/router'; 
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-listar-tipowhisky',
  templateUrl: './listar-tipowhisky.component.html',
  styleUrls: ['./listar-tipowhisky.component.scss']
})
export class ListarTipowhiskyComponent implements OnInit {

  tipoWhiskys: TipoWhisky[] = [];

  pageSize: number = 5; // Quantidade de itens por página
  currentPage: number = 1; // Página inicial

  constructor(
    private tipowhiskyService: TipowhiskyService, 
    private router: Router,
    private toastr: ToastrService) { 
  }

  ngOnInit() {
    this.tipoWhiskys = [];
    this.listarTipoWhiskyALL();
  }

  ionViewDidEnter() { // metodo para atualizar a pagina
    this.tipoWhiskys = [];
    this.listarTipoWhiskyALL();
  }


  listarTipoWhiskyALL(){
    this.tipowhiskyService.listarALL().subscribe(result => {
      this.tipoWhiskys = result
      console.log(this.tipoWhiskys);
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
