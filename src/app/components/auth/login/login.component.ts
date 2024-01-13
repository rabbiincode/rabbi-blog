import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmailValidator, PasswordPatternValidator } from '../../customValidation/custom-validation/custom-validation.component';

@Component({
  selector: 'blog-login',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatInputModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent{
  hide = true
  loginForm!: FormGroup
  constructor(private formBuilder: FormBuilder){}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      emailAddressOrUserName: ['', [Validators.required, EmailValidator]],
      password: ['', [Validators.required, PasswordPatternValidator]]
    })
  }

  loginUser = () => {}

  resetPasswordOpen = () => {}
}
