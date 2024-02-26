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
  searchTerm: string = '';

  controlePagina: string = '';
  controlePesquisa: string = '';

  base64String: any; 
  imagemUrl: any;

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
    this.currentPage= 1;
    this.pageSize = 5;
    this.totalPages = 0;
  }

  ionViewDidEnter() { // metodo para atualizar a pagina
    this.escolheGrid();

    if(this.searchTerm != ''){
      this.listarWhiskyPesquisaPaginado(this.currentPage, this.searchTerm);
    }else{
      this.listarWhiskyALL(this.currentPage);
    }
  }

  listarWhiskyALL (pageNumber: number) {
    this.loaderListar = true;

    //this.controlePaginaMetodo('A');
    if(this.controlePagina != 'A'){
      this.controlePagina = 'A';
      this.currentPage= 1;
      pageNumber = 1;
    }

    this.whiskyService.listarALLPaginado(pageNumber, this.pageSize).subscribe(result => {

      this.whiskysPaginado = result;

      this.whiskys = this.whiskysPaginado.data ? this.whiskysPaginado.data : [];
      this.totalPages = this.whiskysPaginado.totalPage ? this.whiskysPaginado.totalPage : 0
      this.currentPage = this.whiskysPaginado.page ? this.whiskysPaginado.page : 0;

      console.log(this.whiskys.length);

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
      if(this.searchTerm != ''){
        this.listarWhiskyPesquisaPaginado(this.currentPage + 1, this.searchTerm);
      }else{
        this.listarWhiskyALL(this.currentPage + 1);
      }
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      if(this.searchTerm != ''){
        this.listarWhiskyPesquisaPaginado(this.currentPage - 1, this.searchTerm);
      }else{
        this.listarWhiskyALL(this.currentPage - 1);
      }
    }
  }

  search() {
    // Lógica para lidar com a pesquisa aqui
    console.log(this.searchTerm);

    if(this.searchTerm != ''){
      this.listarWhiskyPesquisaPaginado(this.currentPage, this.searchTerm);
    }else{
      this.listarWhiskyALL(this.currentPage);
    }
  }

  listarWhiskyPesquisaPaginado (pageNumber: number, pesquisa: string) {
    this.loaderListar = true;

    //this.controlePaginaMetodo('B');
    if(this.controlePagina != 'B'){
      this.controlePagina = 'B';
      this.currentPage= 1;
      pageNumber = 1;
    }

    if(this.controlePesquisa == ''){
      this.controlePagina = 'B';
      this.currentPage= 1;
      this.controlePesquisa = this.searchTerm
      pageNumber = 1;
    }else{
      if(this.controlePesquisa != this.searchTerm)
      {
        this.controlePagina = 'B';
        this.currentPage= 1;
        this.controlePesquisa = this.searchTerm
        pageNumber = 1;
      }
    }

    this.whiskyService.listarWhiskyPesquisaPaginado(pageNumber, this.pageSize, pesquisa).subscribe(result => {

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

  nextPagePrimeiro(){
    if(this.searchTerm != ''){
      this.listarWhiskyPesquisaPaginado(1, this.searchTerm);
    }else{
      this.listarWhiskyALL(1);
    }
  }

  nextPageUltimo(){
    if(this.searchTerm != ''){
      this.listarWhiskyPesquisaPaginado(this.totalPages, this.searchTerm);
    }else{
      this.listarWhiskyALL(this.totalPages);
    }
  }

}