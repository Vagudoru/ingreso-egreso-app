import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Servicios
import { AuthService } from '../../services/auth.service';

// SweetAlert
import Swal from 'sweetalert2'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  registroForm: FormGroup;

  constructor( private fb: FormBuilder, private authServices: AuthService, private router: Router ) { }

  ngOnInit() {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  crearUsuario() {

    if ( this.registroForm.invalid ) { return; }

    // Show loading
    Swal.fire({
      title: 'Espere por favor!',
      onBeforeOpen: () => {
        Swal.showLoading()
      },
    });

    const { nombre, correo, password } = this.registroForm.value;

    this.authServices.crearUsuario( nombre, correo, password )
    .then( credenciales => {
      Swal.close();
      this.router.navigate(['/'])
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
