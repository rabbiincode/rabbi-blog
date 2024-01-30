import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { PostComponent } from './components/post/post.component';
import { EditorComponent } from './components/editor/editor.component';
import { SearchComponent } from './components/search/search.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AllPostsComponent } from './admin/all-posts/all-posts.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';

export const routes: Routes = [
  { path: '', title: 'Rabbi Blog - Your journey into knowledge begins here', component: HomeComponent },
  { path: 'login', title: 'Login', component: LoginComponent },
  { path: 'post', title: 'Content', component: PostComponent },
  { path: 'user', title: 'User', component: DashboardComponent },
  { path: 'editor', title: 'Editor', component: EditorComponent },
  { path: 'search', title: 'Search', component: SearchComponent },
  { path: 'register', title: 'Registration', component: RegisterComponent },
  { path: 'password-recovery', title: 'Recover Password', component: ForgotPasswordComponent },
  { path: 'admin', title: 'Admin', component: AdminComponent },
  {
    path: 'admin',
    children: [
      { path: 'all-posts', title: 'Admin | Posts', component: AllPostsComponent }
    ]
  },
  { path: '**', component: NotFoundComponent }
]
