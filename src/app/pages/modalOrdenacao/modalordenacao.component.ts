import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-ordenacao',
  templateUrl: './modalordenacao.component.html',
  styleUrls: ['./modalordenacao.component.scss']
})
export class ModelOrdenacaoComponent {
  
    public aus: string = "";
    opcoes: string[] = ['Data Cadastro', 'Fabricante', 'Nome A - Z', 'Nome Z - A'];
    opcaoSelecionada: string = "";

    constructor(
        public dialogRef: MatDialogRef<ModelOrdenacaoComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
      ) {
        this.aus = data.item;
    }

    cancelar(): void{
        this.dialogRef.close('');
    }

    ordenar(opcao: string ){
      this.dialogRef.close(opcao);
    }
}

