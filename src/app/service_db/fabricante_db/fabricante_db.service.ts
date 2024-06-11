import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Fabricante } from 'src/app/model/fabricante.model';

@Injectable({
  providedIn: 'root'
})

export class FabricanteDataBase {
    db:SQLiteObject;
    fabricantes: Fabricante[];
    cofirmaDeletar: boolean;
    cofirmaAlterar: boolean;
    cofirmaCriar: boolean;

    constructor(private sqlite: SQLite) {}

    async createTable_Fabricante(db:SQLiteObject): Promise<void>{
        this.db=db;
    
        this.db.executeSql(`CREATE TABLE IF NOT EXISTS fabricante (
                idFabricante INTEGER PRIMARY KEY AUTOINCREMENT, 
                nomeFabricante VARCHAR(100) NOT NULL
            )`, [])
        .then((result) => {
            //alert('table fabricante criada');
        } )
        .catch(e => alert(JSON.stringify(e)));
      
    }

    async listarFabricantes(): Promise<Fabricante[]>{
        this.fabricantes=[];
        await this.db.executeSql('select * from fabricante',[])
        .then((result) => {
          for(let i=0; i<result.rows.length;i++)
          {
            this.fabricantes.push({idFabricante:result.rows.item(i).idFabricante,
              "nomeFabricante":result.rows.item(i).nomeFabricante
            });
          }
        })
        .catch(e => alert(JSON.stringify(e)));
    
        return this.fabricantes;
    }

    async criarFabricantes(nomeFabricante: string): Promise<boolean>{
        this.cofirmaCriar = false;
        let query:string=`insert into fabricante(nomeFabricante) 
                            values("`+ nomeFabricante +`")`;

        await this.db.executeSql(query,[])
        .then(() => {
            //alert('Record inserted')
            this.cofirmaCriar = true;
        })
        .catch(e => {
            alert(JSON.stringify(e));
            this.cofirmaCriar = false;
        });

        return this.cofirmaCriar;
    }

    async alterarFabricantes(nomeFabricante: string, idFabricante: number ): Promise<boolean>{
        this.cofirmaAlterar = false;

        //await this.db.transaction(() => {
            await this.db.executeSql(`update fabricante 
                set nomeFabricante = ?  
                where idFabricante = ?`,[nomeFabricante, idFabricante])
            .then((result) => {
                //alert('fabricante deletado');
                this.cofirmaAlterar = true;
            })
            .catch(e => {
                alert(JSON.stringify(e));
                this.cofirmaAlterar = false;
            });
        // }).then(() => {
        //     //alert('transacao com sucesso');
        // })
        // .catch(e => alert(JSON.stringify(e)));

        return this.cofirmaAlterar;
    }
    
    async deletarFabricantes(idFabricante: number ): Promise<boolean>{
        this.cofirmaDeletar = false;

        //await this.db.transaction(() => {
            await this.db.executeSql('delete from fabricante where idFabricante = ?',[idFabricante])
                .then((result) => {
                    //alert('fabricante deletado');
                    this.cofirmaDeletar = true;
                })
                .catch(e => {
                    alert(JSON.stringify(e));
                    this.cofirmaDeletar = false;
                });
        // })
        // .then(() => {
        //     //alert('transacao com sucesso');
        // })
        // .catch(e => alert(JSON.stringify(e)));

        return this.cofirmaDeletar;
    }
}