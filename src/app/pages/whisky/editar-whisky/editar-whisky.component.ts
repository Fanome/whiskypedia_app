import { Component, OnInit } from '@angular/core';
import { WhiskyService } from 'src/app/service/whisky/whisky.service';
import { Whisky } from 'src/app/model/whisky.model';
import { FabricanteService } from 'src/app/service/fabricante/fabricante.service';
import { Fabricante } from 'src/app/model/fabricante.model';
import { TipowhiskyService } from 'src/app/service/tipowhisky/tipowhisky.service';
import { TipoWhisky } from 'src/app/model/tipowhisky.model';
import { Router, ActivatedRoute } from '@angular/router'; 
import { ToastrService } from "ngx-toastr";
import { formatDate } from '@angular/common';
import { WhiskyDataBase } from 'src/app/service_db/whisky_db/whisky_db.service';
import { FabricanteDataBase } from 'src/app/service_db/fabricante_db/fabricante_db.service';
import { TipoWhiskyDataBase } from 'src/app/service_db/tipowhisky_db/tipowhisky_db.service';
import { ConfigService } from 'src/app/service/config/config-service';


@Component({
  selector: 'app-editar-whisky',
  templateUrl: './editar-whisky.component.html',
  styleUrls: ['./editar-whisky.component.scss']
})
export class EditarWhiskyComponent implements OnInit {

  whiskys: Whisky = {};
  fabricantes: Fabricante[] = [];
  tipoWhiskys: TipoWhisky[] = [];

  base64String: any;
  imagemUrl: any; 

  loaderEditar = false;

  constructor(private whiskyService: WhiskyService, 
    private fabricanteService: FabricanteService, 
    private tipowhiskyService: TipowhiskyService,
    private router: Router, 
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private configService: ConfigService,
    private whiskyDataBase: WhiskyDataBase,
    private fabricanteDataBase: FabricanteDataBase,
    private tipoWhiskyDataBase: TipoWhiskyDataBase
    ) { }

  async ngOnInit() {
    console.log("foi");
    this.route.queryParams.subscribe(params => {
      this.whiskys = JSON.parse(params['whiskySelecionado']);
    });

    const img = new Image();

    if(this.configService.bancoDados() == "sqllite"){
      await this.listarFabricantesALLLocal();
      await this.listarTipoWhiskyALLLocal();
    }
    else{
      this.listarFabricantesALL();
      this.listarTipoWhiskyALL();
    }

    this.base64String = this.whiskys.imagem;
    img.src = this.base64String;
    this.imagemUrl = img.src;

    this.whiskys.dataCadastro = this.whiskys.dataCadastro = formatDate(new Date(), 'yyyy-MM-dd', 'en'); 
  }

  async editarWhisky(whiskyEditado: any): Promise<void>{
    if(this.configService.bancoDados() == "sqllite"){
      await this.editarWhiskyocal(whiskyEditado);
    }
    else{
      await this.editarWhiskyNuvem(whiskyEditado);
    }
  }

  async editarWhiskyocal(whiskyEditado: any): Promise<void>{
    const result = await this.whiskyDataBase.alterarWhisky(whiskyEditado);
    if(result){
      this.notificacao("sucesso", "Whisky alterado com sucesso!");
      this.loaderEditar = false;
      this.router.navigate(["/whisky"]);
    }else{
      this.notificacao("danger", "Erro ao alterar o Whisky");
      this.loaderEditar = false;
    }
  }

  async editarWhiskyNuvem(whiskyEditado: any): Promise<void>{
    this.loaderEditar = true;
    this.whiskyService.editarwhiskyPut(whiskyEditado).subscribe(result => {
      if(result){
        this.notificacao("sucesso", "Whisky alterado com sucesso!");
        this.loaderEditar = false;
        this.router.navigate(["/whisky"]);
      }else{
        this.notificacao("danger", "Erro ao alterar o Whisky");
        this.loaderEditar = false;
      }
    }, error => {
        console.log(error);
        this.notificacao("danger", "Erro de acesso a API");
        this.loaderEditar = false;
    });
  }

  async listarFabricantesALLLocal(): Promise<void>{
    this.fabricantes = [];
    this.fabricantes = await this.fabricanteDataBase.listarFabricantes();
  }

  listarFabricantesALL(){
    this.fabricanteService.listarALL().subscribe(result => {
      this.fabricantes = result
    }, error => {
        console.log(error);
        this.notificacao("danger", "Erro de acesso a API");
    });
  }

  async listarTipoWhiskyALLLocal(): Promise<void>{
    this.tipoWhiskys = [];
    this.tipoWhiskys = await this.tipoWhiskyDataBase.listarTipoWhiskys();
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
    const selectedFiles = <FileList>event.srcElement.files;
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

  excluirWhisky(whiskyExcluido: any){
    this.router.navigate(['/whisky/excluirwhisky'], { queryParams: { whiskyExcluido: JSON.stringify(whiskyExcluido) } });
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