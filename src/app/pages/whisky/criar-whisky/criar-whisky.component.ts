import { Component, OnInit } from '@angular/core';
import { WhiskyService } from 'src/app/service/whisky/whisky.service';
import { Whisky } from 'src/app/model/whisky.model';
import { FabricanteService } from 'src/app/service/fabricante/fabricante.service';
import { Fabricante } from 'src/app/model/fabricante.model';
import { TipowhiskyService } from 'src/app/service/tipowhisky/tipowhisky.service';
import { TipoWhisky } from 'src/app/model/tipowhisky.model';
import { Router } from '@angular/router'; 
import { formatDate } from '@angular/common';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-criar-whisky',
  templateUrl: './criar-whisky.component.html',
  styleUrls: ['./criar-whisky.component.scss']
})
export class CriarWhiskyComponent implements OnInit {

  whiskys: Whisky = {};
  fabricantes: Fabricante[] = [];
  tipoWhiskys: TipoWhisky[] = [];

  base64String: any;
  imagemUrl: any;

  constructor(private whiskyService: WhiskyService, 
    private fabricanteService: FabricanteService, 
    private tipowhiskyService: TipowhiskyService,
    private router: Router,
    private toastr: ToastrService
    ) { }

  ngOnInit() {
    this.whiskys.dataCadastro = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.listarFabricantesALL();
    this.listarTipoWhiskyALL();
  }

  ionViewDidEnter() { // metodo para atualizar a pagina
    this.whiskys.dataCadastro = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.listarFabricantesALL();
    this.listarTipoWhiskyALL();
  }

  criarWhisky(){
    //console.log(this.whiskys)
    this.whiskyService.criarwhiskyPost(this.whiskys).subscribe(result => {
      if(result){
        this.notificacao("sucesso", "Whisky criado com sucesso!");
        this.router.navigate(["/whisky"]);
      }else{
        this.notificacao("danger", "Erro ao criar o Whisky");
      }
    }, error => {
        console.log(error);
        this.notificacao("danger", "Erro de acesso a API");
    });
  }

  listarFabricantesALL(){
    this.fabricanteService.listarALL().subscribe(result => {
      this.fabricantes = result
    }, error => {
        console.log(error);
        this.notificacao("danger", "Erro de acesso a API");
    });
  }

  listarTipoWhiskyALL(){
    this.tipowhiskyService.listarALL().subscribe(result => {
      this.tipoWhiskys = result
    }, error => {
        console.log(error);
        this.notificacao("danger", "Erro de acesso a API");
    });
  }

  onChange(event: any){
    
    const selectedFiles: any = <FileList>event.srcElement.files;
    //document.getElementById('customFileLangLabel').innerHTML = selectedFiles[0].name;

    const file: File = event.target.files[0];

    if (file) {
      this.convertToBase64(file);
    }
  }

  convertToBase64(file: File): void {
    const reader = new FileReader();
    const img2 = new Image();

    reader.onload = (e: any) => {
      const base64String: string = e.target.result;
      console.log('String Base64:', base64String);
      this.whiskys.imagem = base64String;
      img2.src = this.whiskys.imagem;
      this.imagemUrl = img2.src;
    };
    reader.readAsDataURL(file);
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
