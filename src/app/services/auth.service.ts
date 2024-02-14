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
  signIn = (email: string, password: string) => {
    return this.afAuth
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      this.isLogin = true
      this.afAuth.authState.subscribe((user) => {
        if (user?.emailVerified){
          this.username = user.email
          this.router.navigate(['/user'])
        } else{
          user?.sendEmailVerification()
          this.warnAlert1()
        }
      })
    })
    .catch((error) => {
      this.warnAlert3(error)
    })
  }

  // Sign up with email/password
  signUp = (email: string, password: string) => {
    return this.afAuth
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      // Send email verification message -- implement
      this.afAuth.authState.subscribe((user) => {
        if (user){
          user.sendEmailVerification()
          .then(() => {
            this.warnAlert()
          })
          .catch(() => {
            this.warnAlert()
          })
        }
      })
    })
    .catch((error) => {
      this.warnAlert3(error)
    })
  }

  // Sign in with Google
  signInWithGoggle = () => {
    return this.authLogin(new GoogleAuthProvider())
  }

  // Auth logic to run auth providers
  authLogin = (provider: any) => {
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

  recoverPassword = (mail: string, maskedMail: string) => {
    return this.afAuth
    .sendPasswordResetEmail(mail)
    .then(() => {
      this.warnAlert2(maskedMail)
      this.router.navigate(['/login'])

    })
    .catch((error) => {
      this.warnAlert3(error)
    })
  }

  getUsername = (mail: string) => {
    const a = mail?.split('@')
    return a[0]
  }
  warnAlert = () => this.alert.openWarnDialog('A verification link has been sent to your mail, verify to proceed...', 'Registration successful')
  warnAlert1 = () => this.alert.openWarnDialog(`A verification link has been sent to your mail, verify to proceed...`, 'Email not verified.')
  warnAlert2 = (mail: string) => this.alert.openWarnDialog('Click to reset your password...', `A password reset link has been sent to ${mail}.`)
  warnAlert3 = (error: any) => this.alert.openWarnDialog(error.message.replace(/^Firebase: | \([^)]+\)/g, '')) // To get only error message string
  failAlert = () => this.alert.openFailDialog()
}
