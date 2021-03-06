import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

// Operadores
import { map } from 'rxjs/operators'

// Modelos
import { Usuario } from '../models/usuario.model';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( public auth: AngularFireAuth, public firestore: AngularFirestore ) { }

  crearUsuario( nombre: string, email: string, password: string) {
    return this.auth.auth.createUserWithEmailAndPassword( email, password )
          .then( ({ user }) => {
            const newUser = new Usuario( user.uid, nombre, user.email);
            return this.firestore.doc(`${user.uid}/usuario`)
              .set( {...newUser} )
          });
  }

  loginUsuario( email: string, password: string) {
    return this.auth.auth.signInWithEmailAndPassword( email, password );
  }

  logout() {
    return this.auth.auth.signOut();
  }

  initAuthListener() {
    this.auth.authState.subscribe( fuser => {
      console.log( fuser );
    });
  }

  isAuth() {
    return this.auth.authState.pipe(
      map( fbUser => fbUser != null )
    );
  }
}
