import { Component, OnInit } from '@angular/core';

// Servicios
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor( private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  logout() {

      // Show loading
      Swal.fire({
        title: 'Cerrando sesión!',
        onBeforeOpen: () => {
          Swal.showLoading()
        },
      });

    this.authService.logout()
      .then( logout => {
        Swal.close();
        this.router.navigate(['/login']);
      })
      .catch( err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        })
      })
  }

}
