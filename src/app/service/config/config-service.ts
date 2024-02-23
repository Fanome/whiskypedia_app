import { Injectable } from '@angular/core';
import { Ambientes } from '../../model/app-config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

    buscarAmbiente()  {
        return "http://localhost:3001";
        //return "https://whiskypedia.onrender.com";
    }
}