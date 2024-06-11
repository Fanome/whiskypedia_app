import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { TipoWhisky } from 'src/app/model/tipowhisky.model';

@Injectable({
  providedIn: 'root'
})

export class TipoWhiskyDataBase {
    db:SQLiteObject;
    tipoWhiskys: TipoWhisky[];
    cofirmaDeletar: boolean;
    cofirmaAlterar: boolean;
    cofirmaCriar: boolean;

    constructor(private sqlite: SQLite) {}

    async createTable_TipoWhisky(db:SQLiteObject): Promise<void>{
        this.db=db;
    
        this.db.executeSql(`CREATE TABLE IF NOT EXISTS tipowhisky (
                idTipoWhisky INTEGER PRIMARY KEY AUTOINCREMENT, 
                nomeTipoWhisky VARCHAR(100) NOT NULL
            )`, [])
        .then((result) => {
            //alert('table tipowhisky criada');
        } )
        .catch(e => alert(JSON.stringify(e)));
      
    }

    async listarTipoWhiskys(): Promise<TipoWhisky[]>{
        this.tipoWhiskys=[];
        await this.db.executeSql('select * from tipowhisky',[])
        .then((result) => {
          for(let i=0; i<result.rows.length;i++)
          {
            this.tipoWhiskys.push({idTipoWhisky:result.rows.item(i).idTipoWhisky,
              "nomeTipoWhisky":result.rows.item(i).nomeTipoWhisky
            });
          }
        })
        .catch(e => alert(JSON.stringify(e)));
    
        return this.tipoWhiskys;
    }

    async criarTipoWhisky(nomeTipoWhisky: string): Promise<boolean>{
        this.cofirmaCriar = false;
        let query:string=`insert into tipowhisky(nomeTipoWhisky) 
                            values("`+ nomeTipoWhisky +`")`;

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

    async alterarTipoWhisky(nomeTipoWhisky?: string, idTipoWhisky?: number ): Promise<boolean>{
        this.cofirmaAlterar = false;

        await this.db.executeSql(`update tipowhisky 
            set nomeTipoWhisky = ?  
            where idTipoWhisky = ?`,[nomeTipoWhisky, idTipoWhisky])
        .then((result) => {
            //alert('tipowhisky alterado');
            this.cofirmaAlterar = true;
        })
        .catch(e => {
            alert(JSON.stringify(e));
            this.cofirmaAlterar = false;
        });

        return this.cofirmaAlterar;
    }
    
    async deletarTipoWhisky(idTipoWhisky: number ): Promise<boolean>{
        this.cofirmaDeletar = false;


        await this.db.executeSql('delete from tipowhisky where idTipoWhisky = ?',[idTipoWhisky])
            .then((result) => {
                //alert('tipowhisky deletado');
                this.cofirmaDeletar = true;
            })
            .catch(e => {
                alert(JSON.stringify(e));
                this.cofirmaDeletar = false;
            });

        return this.cofirmaDeletar;
    }
}