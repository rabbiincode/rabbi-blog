import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})

export class AuthService{
  isLogin = false
  isAdmin = false
  username: any = 'Awesome Person'
  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private alert: AlertService, private router: Router){}

  // Sign in with email/password
  SignIn = (email: string, password: string) => {
    return this.afAuth
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      this.isLogin = true
      this.afAuth.authState.subscribe((user) => {
        if (user){
          this.username = user.email
          this.router.navigate(['/user'])
        }      
      })
    })
    .catch(() => {
      this.failAlert()
    })
  }

  // Sign up with email/password
  SignUp = (email: string, password: string) => {
    return this.afAuth
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      // Send email verification message -- implement
      this.afAuth.authState.subscribe((user) => {
        if (user){
          this.isLogin = true
          this.successAlert()
          this.username = user.email
          this.router.navigate(['/user'])
        }      
      })
    })
    .catch(() => {
      this.failAlert()
    })
  }

  // Sign in with Google
  SignInWithGoggle = () => {
    return this.AuthLogin(new GoogleAuthProvider())
  }

  // Auth logic to run auth providers
  AuthLogin = (provider: any) => {
    return this.afAuth
    .signInWithPopup(provider)
    .then(() => {
      this.afAuth.authState.subscribe((user) => {
        if (user){
          this.isLogin = true
          this.username = user.email
          this.router.navigate(['/user'])
        }      
      })
    })
    .catch(() => {
      this.failAlert()
    })
  }

  logOut = () => {
    this.username = ''
    this.isLogin = false
    this.router.navigate(['/'])
    return this.isLogin
  }

  getUsername = (mail: string) => {
    const a = mail?.split('@')
    return a[0]
  }
  successAlert = () => this.alert.openSuccessDialog('0ms', '0ms')
  failAlert = () => this.alert.openFailDialog('0ms', '0ms')
}
