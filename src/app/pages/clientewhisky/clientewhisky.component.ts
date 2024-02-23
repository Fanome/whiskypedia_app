import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-home',
  templateUrl: './clientewhisky.component.html',
  styleUrls: ['./clientewhisky.component.scss']
})
export class ClienteWhiskyComponent implements OnInit {
    constructor(
        private router: Router,
        private toastr: ToastrService) { }
    
    ngOnInit() {
    }
}