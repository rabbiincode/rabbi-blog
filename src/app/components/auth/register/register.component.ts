import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'blog-register',
  standalone: true,
  imports: [MatIconModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: '../login/login.component.scss'
})

export class RegisterComponent{
  hide = true
  registerForm!: FormGroup
  constructor(private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      emailAddressOrUserName: [''],
      password: [''],
      confirmPassword: ['']
    })
  }

  registerUser = () => {}
}
