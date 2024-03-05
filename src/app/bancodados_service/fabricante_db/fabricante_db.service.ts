import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
    providedIn: 'root'
})

export class FabricanteDataBase {
    databaseObj!: SQLiteObject;

    constructor(
        private sqlite: SQLite
    ){}

    async createDataBase(){
        await this.sqlite.create({
            name: "whiskypedia",
            location: "default",
        })
        .then((db: SQLiteObject ) => {
            this.databaseObj = db;
        })
        .catch((e) => {
            alert("erro ao criar banco " + JSON.stringify(e));
        });

        await this.createTable();

    }

    async createTable(){
        await this.databaseObj.executeSql(
            `CREATE TABLE IF NOT EXISTS fabricante (idFabricante INTEGER PRIMARY KEY AUTOINCREMENT, nomeFabricante VARCHAR(255) )`, []
        );
    }

    async addFabricante(nomeFabricante: string){
        return this.databaseObj.executeSql(
            `INSERT INTO fabricante (nomeFabricante) VALUES ('${nomeFabricante}')`, []
        ).then(() => {
            return "Fabricante criado";
        }).catch((e) => {
            if(e.code === 6){
                return "fabricante já existe";
            }

            return "erro ao criar fabricante " + JSON.stringify(e) ;
        });
    }

    async getFabricante(){
        return this.databaseObj.executeSql(
            `SELECT * FROM fabricante`, []
        ).then((res) => {
            return res;
        }).catch((e) => {
            return "erro ao buscar fabricante " + JSON.stringify(e) ;
        });
    }
}