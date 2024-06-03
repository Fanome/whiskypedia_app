import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { ToastrService } from "ngx-toastr";
import { ListaWhiskyPaginado } from "../../model/listawhiskyPaginado.model";
import { ListaWhisky } from "../../model/listawhisky.model";
import { MinhaAdegaService } from 'src/app/service/minhaadega/minhaadega.service';
import { UsuarioService } from 'src/app/service/usuario/usuario.service';
import { ListaWhiskyService } from 'src/app/service/listawhisky/listawhisky.service';
import { Usuario } from '../../model/usuario.model';

@Component({
  selector: 'app-home',
  templateUrl: './minhaadega.component.html',
  styleUrls: ['./minhaadega.component.scss']
})
export class MinhaAdegaComponent implements OnInit {  
  whiskysPaginado: ListaWhiskyPaginado = {};
  whiskys: ListaWhisky[] = []; 

  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 0;
  data: any[] = [];
  usuarioLogado: Usuario = {};
  id_usuarios: number = 0;

  loaderListar = false;


  constructor(
    private router: Router,
    private minhaAdegaService: MinhaAdegaService,
    private usuarioService: UsuarioService,
    private listaWhiskyService: ListaWhiskyService,
    private toastr: ToastrService) { }
  
  ngOnInit() {
    this.currentPage= 1;
    this.pageSize = 5;
    this.totalPages = 0;
    this.usuarioLogado = this.usuarioService.getGlobalVariable();
    this.id_usuarios = this.usuarioLogado.id_usuarios ? this.usuarioLogado.id_usuarios : 0;
    this.listarWhiskyALL(this.currentPage);
  }
    
  ionViewDidEnter() { // metodo para atualizar a pagina
    this.usuarioLogado = this.usuarioService.getGlobalVariable();
    this.id_usuarios = this.usuarioLogado.id_usuarios ? this.usuarioLogado.id_usuarios : 0;
    //this.escolheGrid();

    //if(this.searchTerm != ''){
    //  this.listarWhiskyPesquisaPaginado(this.currentPage, this.searchTerm);
    //}else{
      this.listarWhiskyALL(this.currentPage);
    //}
  }
    
  listarWhiskyALL (pageNumber: number) {
    this.loaderListar = true;

    //this.controlePaginaMetodo('A');
    // if(this.controlePagina != 'A'){
    //   this.controlePagina = 'A';
    //   this.currentPage= 1;
    //   pageNumber = 1;
    // }

    this.minhaAdegaService.listarALLPaginado(this.id_usuarios, pageNumber, this.pageSize).subscribe(result => {

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
    
  selecionarWhisky(whiskySelecionado:any){
    console.log("foi");
    //console.log("whiskySelecionado");
    //this.router.navigate(['/whisky/editarwhisky'], { queryParams: { whiskySelecionado: JSON.stringify(whiskySelecionado) } });
  }
    
  nextPage() {
    if (this.currentPage < this.totalPages) {
      //if(this.searchTerm != ''){
      //  this.listarWhiskyPesquisaPaginado(this.currentPage + 1, this.searchTerm);
      //}else{
        this.listarWhiskyALL(this.currentPage + 1);
      //}
    }
  }
    
  prevPage() {
    if (this.currentPage > 1) {
      //if(this.searchTerm != ''){
      //  this.listarWhiskyPesquisaPaginado(this.currentPage - 1, this.searchTerm);
      //}else{
        this.listarWhiskyALL(this.currentPage - 1);
      //}
    }
  }
    
  nextPagePrimeiro(){
    //if(this.searchTerm != ''){
    //  this.listarWhiskyPesquisaPaginado(1, this.searchTerm);
    //}else{
      this.listarWhiskyALL(1);
    //}
  }
    
  nextPageUltimo(){
    //if(this.searchTerm != ''){
    //  this.listarWhiskyPesquisaPaginado(this.totalPages, this.searchTerm);
    //}else{
      this.listarWhiskyALL(this.totalPages);
    //}
  }
    
  favoritar(idwhisky: number){  
    if(this.id_usuarios == 0 || idwhisky == 0){
      this.notificacao("danger", "Erro ao curtit Whiskiy");
    }else{
      this.listaWhiskyService.favoritar(this.id_usuarios ,idwhisky).subscribe(result => {

        let ok = result;
  
        if(ok){
          this.notificacao("sucess", "Whiskiy curtido");
          this.listarWhiskyALL(this.currentPage);
        }else{
          this.notificacao("danger", "Erro ao curtit Whiskiy");
        }
        
        //this.loaderListar = false;
      }, error => {
          console.log(error); 
          this.notificacao("danger", "Erro de acesso a API");
          //this.loaderListar = false;
      });
    }    
  }
    
  desFavoritar(idwhisky: number){
    if(this.id_usuarios == 0 || idwhisky == 0){
      this.notificacao("danger", "Erro ao descurtit Whiskiy");
    }else{
      this.listaWhiskyService.desFavoritar(this.id_usuarios ,idwhisky).subscribe(result => {

        let ok = result;
  
        if(ok){
          this.notificacao("sucess", "Whiskiy descurtido");
          this.listarWhiskyALL(this.currentPage);
        }else{
          this.notificacao("danger", "Erro ao descurtit Whiskiy");
        }
        
        //this.loaderListar = false;
      }, error => {
          console.log(error); 
          this.notificacao("danger", "Erro de acesso a API");
          //this.loaderListar = false;
      });
    }    
  }
    
  colocarNaMinhaAdega(idwhisky: number){
    if(this.id_usuarios == 0 || idwhisky == 0){
      this.notificacao("danger", "Erro ao incluido whiskiy na minha adega");
    }else{
      this.listaWhiskyService.colocarNaMinhaAdega(this.id_usuarios ,idwhisky).subscribe(result => {

        let ok = result;
  
        if(ok){
          this.notificacao("sucess", "Whiskiy incluido na minha adega");
          this.listarWhiskyALL(this.currentPage);
        }else{
          this.notificacao("danger", "Erro ao incluido whiskiy na minha adega");
        }
        
        //this.loaderListar = false;
      }, error => {
          console.log(error); 
          this.notificacao("danger", "Erro de acesso a API");
          //this.loaderListar = false;
      });
    }    
  }
    
  tirarNaMinhaAdega(idwhisky: number){
    if(this.id_usuarios == 0 || idwhisky == 0){
      this.notificacao("danger", "Erro ao retirar Whiskiy da minha adega");
    }else{
      this.listaWhiskyService.tirarNaMinhaAdega(this.id_usuarios ,idwhisky).subscribe(result => {

        let ok = result;
  
        if(ok){
          this.notificacao("sucess", "Whiskiy retirado da minha adega");
          this.listarWhiskyALL(this.currentPage);
        }else{
          this.notificacao("danger", "Erro ao retirar Whiskiy da minha adega");
        }
        
        //this.loaderListar = false;
      }, error => {
          console.log(error); 
          this.notificacao("danger", "Erro de acesso a API");
          //this.loaderListar = false;
      });
    }    
  }
    
    
    
}