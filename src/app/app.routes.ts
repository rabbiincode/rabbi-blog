import { Routes } from '@angular/router';
import { BlogComponent } from './components/blog/blog.component';
import { HomeComponent } from './components/home/home.component';
import { EditorComponent } from './components/editor/editor.component';
import { SearchComponent } from './components/search/search.component';
import { LoginComponent } from './components/auth/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'login', component: LoginComponent },
  { path: 'editor', component: EditorComponent },
  { path: 'search', component: SearchComponent },
  { path: 'user', component: DashboardComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'password-recovery', component: ForgotPasswordComponent },
  { path: '**', component: NotFoundComponent }
]
