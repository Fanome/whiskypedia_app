import { Component, OnInit } from '@angular/core';
import { WhiskyService } from 'src/app/service/whisky/whisky.service';
import { Whisky } from 'src/app/model/whisky.model';
import { Router } from '@angular/router'; 
import { ToastrService } from "ngx-toastr";
import { WhiskyPaginado } from 'src/app/model/whiskyPaginado.model';

@Component({
  selector: 'app-listar-whisky',
  templateUrl: './listar-whisky.component.html',
  styleUrls: ['./listar-whisky.component.scss']
})
export class ListarWhiskyComponent implements OnInit {

  whiskys: Whisky[] = [];
  whiskysPaginado: WhiskyPaginado = {};
  exibeLista: boolean = false;
  exibeGrid: boolean = false;

  base64String: any; 
  imagemUrl: any;

  // pageSize: number = 5; // Quantidade de itens por página
  // currentPage: number = 1; // Página inicial

  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 0;
  data: any[] = [];

  loaderListar = false;

  constructor(private whiskyService: WhiskyService, private router: Router,
    private toastr: ToastrService) { 
  }

  ngOnInit() {
    // this.escolheGrid();
    // this.listarWhiskyALL(this.currentPage);
  }

  ionViewDidEnter() { // metodo para atualizar a pagina
    this.escolheGrid();
    this.listarWhiskyALL(this.currentPage);
  }

  listarWhiskyALL (pageNumber: number) {
    this.loaderListar = true;

    this.whiskyService.listarALLPaginado(pageNumber, this.pageSize).subscribe(result => {

      this.whiskysPaginado = result;

      this.whiskys = this.whiskysPaginado.data ? this.whiskysPaginado.data : [];
      this.totalPages = this.whiskysPaginado.totalPage ? this.whiskysPaginado.totalPage : 0
      this.currentPage = this.whiskysPaginado.page ? this.whiskysPaginado.page : 0;

      this.loaderListar = false;
    }, error => {
        console.log(error); 
        this.notificacao("danger", "Erro de acesso a API");
        this.loaderListar = false;
    });
    
    this.converteImagem(); 
  }

  selecionarWhisky(whiskySelecionado:any){
    console.log("foi");
    console.log("whiskySelecionado");
    this.router.navigate(['/whisky/editarwhisky'], { queryParams: { whiskySelecionado: JSON.stringify(whiskySelecionado) } });
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

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.listarWhiskyALL(this.currentPage + 1);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.listarWhiskyALL(this.currentPage - 1);
    }
  }

}