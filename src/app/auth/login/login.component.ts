import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {  Router } from '@angular/router';

// Servicios
import { AuthService } from '../../services/auth.service';

// SweetAlert
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor( private fb: FormBuilder, private authService: AuthService, private router: Router ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [ Validators.required, Validators.email ]],
      password: ['', [ Validators.required ]]
    });
  }

  loginUsuario() {
    if ( this.loginForm.invalid ) { return; }

    const { email, password} = this.loginForm.value;

    // Show loading
    Swal.fire({
      title: 'Espere por favor!',
      onBeforeOpen: () => {
        Swal.showLoading()
      },
    });

    this.authService.loginUsuario( email, password )
    .then( login => {
      Swal.close();
      this.router.navigate(['/']);
    })
    .catch( err => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message,
      })
    });
  }

}
