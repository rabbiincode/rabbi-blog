import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CodeInputModule } from 'angular-code-input';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { timer, take, map, Subject, Subscription } from 'rxjs';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmailValidator, PasswordMatchValidator, PasswordPatternValidator } from '../../customValidation/custom-validation/custom-validation.component';

@Component({
  selector: 'blog-forgot-password',
  standalone: true,
  imports: [CodeInputModule, CommonModule, FormsModule, MatIconModule, MatInputModule, ReactiveFormsModule, RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrl: '../login/login.component.scss'
})

export class ForgotPasswordComponent{
  reset = 1
  hide = true
  hide1 = true
  email!: string
  countDown!: string
  resend = false
  resetForm!: FormGroup
  recoveryForm!: FormGroup
  reset$ = new Subject<void>() // Create a Subject to signal when to reset the countdown
  countdownSubscription: Subscription | undefined
  constructor(private formBuilder: FormBuilder){}

  ngOnInit() {
    this.recoveryForm = this.formBuilder.group({
      email: ['', [Validators.required, EmailValidator]]
    })

    this.resetForm = this.formBuilder.group({
      email: [{value: '', disabled: true}, [Validators.required, EmailValidator]],
      password: ['', [Validators.required, PasswordPatternValidator]],
      confirmPassword: ['', [Validators.required]]
    },
      {validators: PasswordMatchValidator}
    )
  }

  ngOnDestroy() {
    this.reset$.next() // Ensure to complete the countdown when the component is destroyed
    if (this.countdownSubscription) this.countdownSubscription.unsubscribe()
  }

  get resetFormControl(){
    return this.resetForm?.controls
  }

  setEmailAddress(){
    this.resetForm.patchValue({email: this.email})
  }

  maskMail = (mail: string) => {
    const a = mail?.split('@')
    const b = a[0]
    let maskedMail = ''
    let max = 0
    for (let i = 0; i < b?.length; i++){
      const index = Number(i)
      if (index > 1 && index < b?.length - 1){
        if (max < 3){
          maskedMail += '*'
          max++
        }
      }
      else maskedMail += b[i]
    }
    return maskedMail + '@' + a[1]
  }

  tokenTimer = () => {
    // Unsubscribe from the previous countdown subscription, if exists
    if (this.countdownSubscription) this.countdownSubscription.unsubscribe()
    const countdown$ = timer(0, 1000).pipe(
      take(160),
      map(secondsElapsed => {
        const totalSeconds = 159
        const secondsLeft = Math.max(totalSeconds - secondsElapsed, 0)
        const minutes = Math.floor(secondsLeft / 60)
        const seconds = secondsLeft % 60
        if (secondsLeft == 0) this.resend = true
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
      })
    )
    this.countdownSubscription = countdown$.subscribe(timeLeft => this.countDown = timeLeft)
  }

  resendToken = () => {
    this.reset$.next()
    this.resend = false
    this.tokenTimer()
  }

  sendToken = () => {
    this.email = this.recoveryForm.value.email
    this.setEmailAddress()
    this.reset = 2
    this.tokenTimer()
  }

  validateToken = (code: string) => {
    this.reset = 3
  }
  resetPassword = () => {}
}
