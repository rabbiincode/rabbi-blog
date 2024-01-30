import { Inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> => {
  const router = Inject(Router)
  const auth = Inject(AuthService)
  
  if (auth.isLogin){
    return true
  } else{
    router.navigate(['/login'])
    return false
  }
}
