import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from '../../service/config/config-service';

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

}