import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmailValidator, PasswordMatchValidator, PasswordPatternValidator } from '../../customValidation/custom-validation/custom-validation.component';

@Component({
  selector: 'blog-register',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatInputModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: '../login/login.component.scss'
})

export class RegisterComponent{
  constructor(private auth: AuthService, private formBuilder: FormBuilder){}
  hide = true
  hide1 = true
  registerForm!: FormGroup

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, EmailValidator]],
      password: ['', [Validators.required, PasswordPatternValidator]],
      confirmPassword: ['', [Validators.required]]
    },
      {validators: PasswordMatchValidator}
    )
  }

  get registerFormControl(){
    return this.registerForm?.controls
  }

  registerUser = () => {
    this.auth.SignUp(this.registerForm.value.email, this.registerForm.value.password)
  }
  registerWithGoggle = () => this.auth.SignInWithGoggle()
}
