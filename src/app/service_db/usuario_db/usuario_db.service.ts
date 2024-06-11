import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Usuario } from 'src/app/model/usuario.model';

@Injectable({
  providedIn: 'root'
})

export class UsuarioDataBase {
  db:SQLiteObject;
  book_name: string;
  book_price: string;
  usuarioLogadoTeste: Usuario[];

  constructor(private sqlite: SQLite) {}

  createOpenDatabase(){
    try{
      this.sqlite.create({
        name: 'whiskypedia.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.db=db;
          alert('database created/opened');

          this.createTable();
        })
        .catch(e => alert(JSON.stringify(e)))
    }
    catch(err:any){
      alert(err);
    }
  }

  createTable(){
    this.db.executeSql( `CREATE TABLE IF NOT EXISTS usuarios (id_usuarios INTEGER PRIMARY KEY AUTOINCREMENT, 
            email_usuario VARCHAR(100) NOT NULL,
            nome_usuario VARCHAR(45) NOT NULL,
            senha_usuario VARCHAR(45) NOT NULL,
            id_tipousuario int NOT NULL,
            telefone_usuario VARCHAR(11) DEFAULT NULL,
            data_nascimento_usuario date DEFAULT NULL
        )`, [])
    .then((result) => {
        alert('table usuarios criada')
        this.usuarioLogadoTeste = this.verificaUsuarioAdmin();

        if(this.usuarioLogadoTeste.length == null ){
            this.insertUsuarioAdmin();
        }
    } )
    .catch(e => alert(JSON.stringify(e)));
  }

  verificaUsuarioAdmin(){
    this.usuarioLogadoTeste=[];
    this.db.executeSql('select * from usuarios where email_usuario = ? and nome_usuario = ?',["admin@yahoo.com.br", "Admin"])
    .then((result) => {
      for(let i=0; i<result.rows.length;i++)
      {
        this.usuarioLogadoTeste.push({email_usuario:result.rows.item(i).email_usuario,
          "nome_usuario":result.rows.item(i).nome_usuario
        });
      }
    })
    .catch(e => alert(JSON.stringify(e)));

    return this.usuarioLogadoTeste;
  }

  insertUsuarioAdmin(){
    const email_usuario = "admin@yahoo.com.br"
    const nome_usuario = "Admin";
    const senha_usuario = "12345678";
    const id_tipousuario = 1;
    const telefone_usuario = "";
    const data_nascimento_usuario = null;

    let query:string=`insert into usuarios(email_usuario,nome_usuario,senha_usuario,id_tipousuario,telefone_usuario,data_nascimento_usuario) 
                      values("`+ email_usuario +`","`+ nome_usuario +`","`+ senha_usuario +`","`+ id_tipousuario +`","`+ telefone_usuario +`","`+ data_nascimento_usuario +`")`;
    this.db.executeSql(query,[])
    .then(() => alert('Record inserted'))
      .catch(e => alert(JSON.stringify(e)));
  }

  selectData(){
    this.usuarioLogadoTeste=[];
    this.db.executeSql('select * from usuarios',[])
    .then((result) => {
      for(let i=0; i<result.rows.length;i++)
      {
        this.usuarioLogadoTeste.push({email_usuario:result.rows.item(i).email_usuario,
          "nome_usuario":result.rows.item(i).nome_usuario,
          "id_usuarios":result.rows.item(i).id_usuarios,
        });
      }
    })
    .catch(e => alert(JSON.stringify(e)));

    return this.usuarioLogadoTeste;
  }

  alterarUsuario(email_usuario: string, nome_usuario: string, id_usuarios: number ){
    this.db.transaction(() => {
        this.db.executeSql(`update usuarios 
            set email_usuario = ? , nome_usuario = ? 
            where id_usuarios = ?`,[email_usuario, nome_usuario, id_usuarios])
        .then((result) => {
            //alert('usuario deletado');
        })
        .catch(e => alert(JSON.stringify(e)));
    }).then(() => {
        //alert('transacao com sucesso');
    })
    .catch(e => alert(JSON.stringify(e)));
  }

  deletarUsuario(id_usuarios: number ){
    this.db.transaction(() => {
        this.db.executeSql('delete from usuarios where id_usuarios = ?',[id_usuarios])
        .then((result) => {
            //alert('usuario deletado');
        })
        .catch(e => alert(JSON.stringify(e)));
    })
    .then(() => {
        //alert('transacao com sucesso');
    })
    .catch(e => alert(JSON.stringify(e)));
  }

  async login(email_usuario: string, senha_usuario: string){
    this.usuarioLogadoTeste=[];
    await this.db.executeSql('SELECT * FROM usuarios where email_usuario = ? and senha_usuario = ?',[email_usuario, senha_usuario])
    .then((result) => {
      for(let i=0; i<result.rows.length;i++)
      {
        this.usuarioLogadoTeste.push({email_usuario:result.rows.item(i).email_usuario,
          "nome_usuario":result.rows.item(i).nome_usuario,
          "id_usuarios":result.rows.item(i).id_usuarios,
          "telefone_usuario":result.rows.item(i).telefone_usuario,
          "id_tipousuario":result.rows.item(i).id_tipousuario,
          "data_nascimento_usuario":result.rows.item(i).data_nascimento_usuario,
        });
      }
    })
    .catch(e => alert(JSON.stringify(e)));

    return this.usuarioLogadoTeste;
  }

}

