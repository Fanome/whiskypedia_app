import { Component, OnInit } from '@angular/core';
import { WhiskyService } from 'src/app/service/whisky/whisky.service';
import { Whisky } from 'src/app/model/whisky.model';
import { Router, ActivatedRoute } from '@angular/router'; 
import { ToastrService } from "ngx-toastr";
import { ConfigService } from 'src/app/service/config/config-service';
import { WhiskyDataBase } from 'src/app/service_db/whisky_db/whisky_db.service';

@Component({
  selector: 'app-excluir-whisky',
  templateUrl: './excluir-whisky.component.html',
  styleUrls: ['./excluir-whisky.component.scss']
})
export class ExcluirWhiskyComponent implements OnInit {

  whiskys: Whisky = {};

  base64String: any;
  imagemUrl: any;

  loaderExcluir = false;

  constructor(private whiskyService: WhiskyService,  
    private router: Router, 
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private configService: ConfigService,
    private whiskyDataBase: WhiskyDataBase,
  ) { }

  ngOnInit() {
    this.whiskys.idWhisky = this.route.snapshot.params['idWhisky'];
    this.whiskys.nomeWhisky = this.route.snapshot.params['nomeWhisky'];

    this.route.queryParams.subscribe(params => {
      this.whiskys = JSON.parse(params['whiskyExcluido']);
    });

    const img = new Image();

    this.base64String = this.whiskys.imagem;
    img.src = this.base64String;
    this.imagemUrl = img.src;

  }

  async excluirWhisky(tipowhiskyExcluido: any): Promise<void>{
    this.loaderExcluir = true;
    if(this.configService.bancoDados() == "sqllite"){
      await this.excluirWhiskyLocal(tipowhiskyExcluido);
    }
    else{
      await this.excluirWhiskyNuvem(tipowhiskyExcluido);
    }
  }

  async excluirWhiskyLocal(whiskyExcluido: Whisky): Promise<void>{
    const id = whiskyExcluido.idWhisky == undefined? 0 : whiskyExcluido.idWhisky;
    const result = await this.whiskyDataBase.deletarWhisky(id);
    if(result){
      this.notificacao("sucesso", "Whisky excluirdo com sucesso!");
        this.loaderExcluir = false;
        this.router.navigate(["/whisky"]);
    }else{
      this.notificacao("danger", "Erro ao excluir o Whisky");
        this.loaderExcluir = false;
    }
  }

  async excluirWhiskyNuvem(whiskyExcluido: Whisky): Promise<void>{
    this.whiskyService.excluirwhiskyPost(whiskyExcluido).subscribe(result => {
      if(result){
        this.notificacao("sucesso", "Whisky excluirdo com sucesso!");
        this.loaderExcluir = false;
        this.router.navigate(["/whisky"]);
      }else{
        this.notificacao("danger", "Erro ao excluir o Whisky");
        this.loaderExcluir = false;
      }
    }, error => {
        console.log(error);
        this.notificacao("danger", "Erro de acesso a API");
        this.loaderExcluir = false;
    });
  }

  selecionarWhisky(whiskySelecionado: any){
    this.router.navigate(['/whisky/editarwhisky'], { queryParams: { whiskySelecionado: JSON.stringify(whiskySelecionado) } });
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
