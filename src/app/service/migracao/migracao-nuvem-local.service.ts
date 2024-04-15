import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from '../config/config-service';

import { Fabricante } from '../../model/fabricante.model';
import { TipoWhisky } from '../../model/tipowhisky.model';
import { Whisky } from '../../model/whisky.model';

@Injectable({
  providedIn: 'root'
})
export class MigracaoService {

    constructor(private http: HttpClient,  private configService: ConfigService) {}

    public ambiente: string = "";
    public criarfabricantePostAllURL = '/api/fabricante/incluir';
    public criartipowhiskyPostAllURL = '/api/tipowhisky/incluir';
    public criarwhiskyPostAllURL = '/api/whisky/incluir';

    criarFabricanteMigracaoPost(data: any) {
        this.ambiente = this.configService.buscarAmbienteLocal()
        const url = this.ambiente + this.criarfabricantePostAllURL;
        return  this.http.post(url, data);
    }

    criartipowhiskyMigracaoPost(data: any) {
        this.ambiente = this.configService.buscarAmbienteLocal()
        const url = this.ambiente + this.criartipowhiskyPostAllURL;
        return  this.http.post(url, data);
    }

    criarWhiskyMigracaoPost(data: any) {
        this.ambiente = this.configService.buscarAmbienteLocal()
        const url = this.ambiente + this.criarwhiskyPostAllURL;
        return  this.http.post(url, data);
    }




    public fabricanteGetAllURL = '/api/fabricantes';

    listarALL()  {
        this.ambiente = this.configService.buscarAmbienteLocal()
        const url = this.ambiente + this.fabricanteGetAllURL;
        return this.http.get<Fabricante[]>(`${url}`);
    }

    public tipowhiskyGetAllURL = '/api/tipowhiskys';

    listarTipoWhiskyALL()  { 
        this.ambiente = this.configService.buscarAmbienteLocal()
        const url = this.ambiente + this.tipowhiskyGetAllURL;
        return this.http.get<TipoWhisky[]>(`${url}`);
    }


    public whiskyGetRangerURL = '/api/whiskys/getranger';

    listarRengeID(num1: number, num2: number){ 
    this.ambiente = this.configService.buscarAmbienteLocal()
    const url = this.ambiente + this.whiskyGetRangerURL + '/' + num1 + '/' + num2;
    return this.http.get<Whisky[]>(`${url}`);
    } 
}