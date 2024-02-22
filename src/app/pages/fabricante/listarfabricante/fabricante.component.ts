import { Component, OnInit } from '@angular/core';
import { Fabricante } from 'src/app/model/fabricante.model';
import { Router } from '@angular/router'; 
import { ToastrService } from "ngx-toastr";
import { FabricanteService } from 'src/app/service/fabricante/fabricante.service';

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
    private toastr: ToastrService
    ) 
  { 
  }

  ngOnInit(): void {
    this.fabricantes = [];
    this.listarFabricantesALL();
  }

  ionViewDidEnter() { // metodo para atualizar a pagina
    this.fabricantes = [];
    this.listarFabricantesALL();
  }

  listarFabricantesALL(): void{
    this.loaderListar = true;
    this.fabricanteService.listarALL().subscribe(results => {
      this.fabricantes = results;
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
