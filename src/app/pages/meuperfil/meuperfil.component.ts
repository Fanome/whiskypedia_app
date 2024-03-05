import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-home',
  templateUrl: './meuperfil.component.html',
  styleUrls: ['./meuperfil.component.scss']
})
export class MeuPerfilComponent implements OnInit {
    constructor(
        private router: Router,
        private toastr: ToastrService) { }
    
    ngOnInit() {
    }
}