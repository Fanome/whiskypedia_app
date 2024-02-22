import { Component, OnInit } from '@angular/core';
import { WhiskyService } from 'src/app/service/whisky/whisky.service';
import { Whisky } from 'src/app/model/whisky.model';
import { Router } from '@angular/router'; 
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-listar-whisky',
  templateUrl: './listar-whisky.component.html',
  styleUrls: ['./listar-whisky.component.scss']
})
export class ListarWhiskyComponent implements OnInit {

  whiskys: Whisky[] = [];
  exibeLista: boolean = false;
  exibeGrid: boolean = false;

  base64String: any;
  imagemUrl: any;

  pageSize: number = 5; // Quantidade de itens por página
  currentPage: number = 1; // Página inicial

  constructor(private whiskyService: WhiskyService, private router: Router,
    private toastr: ToastrService) { 
  }

  ngOnInit() {
    this.escolheGrid();
    this.listarWhiskyALL();
  }

  ionViewDidEnter() { // metodo para atualizar a pagina
    this.escolheGrid();
    this.listarWhiskyALL();
  }

  listarWhiskyALL(){
    this.whiskyService.listarALL().subscribe(result => {
      this.whiskys = result
    }, error => {
        console.log(error);
        this.notificacao("danger", "Erro de acesso a API");
    });
    
    this.converteImagem();
  }

  selecionarWhisky(whiskySelecionado:any){
    console.log("foi");
    console.log("whiskySelecionado");
    this.router.navigate(['/whisky/editar-whisky'], { queryParams: { whiskySelecionado: JSON.stringify(whiskySelecionado) } });
  }

  converteImagem(){
    const img2:any = new Image();
    img2.src = "";
    var i = 1;
    for (const value of this.whiskys) {
      img2.src = value.imagem;
      value.imagem = img2.src;

      this.whiskys[i].imagem = value.imagem;
      i = i+1;
    }
  }

  escolheLista(){
    this.exibeLista = true;
    this.exibeGrid = false;
  }

  escolheGrid(){
    this.exibeLista = false;
    this.exibeGrid = true;
  }


   //MOTIFICAÇÃO 
   notificacao(tipo:any, msg:any){
    
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