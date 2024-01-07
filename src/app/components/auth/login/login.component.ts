import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'blog-login',
  standalone: true,
  imports: [MatIconModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent{
  hide = true
  loginForm!: FormGroup
  constructor(private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      emailAddressOrUserName: [''],
      password: ['']
    })
  }

  loginUser = () => {}

  resetPasswordOpen = () => {}
}
