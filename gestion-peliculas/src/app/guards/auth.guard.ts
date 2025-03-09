import { inject, Injectable } from '@angular/core';
import { Router, CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Route, UrlSegment, CanMatchFn } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/services/auth.service';


const checkAuthStatus = (): boolean => {
  const authService: AuthService = inject(AuthService)
  const router: Router = inject(Router)

  if(!localStorage.getItem('token')){
    router.navigate(['/'])
  }
  return true;
}

export const canActivateGuard: CanActivateFn = ( //tipado CanActivate
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
)=>{

  return checkAuthStatus();
}

export const canMatchGuard: CanMatchFn = ( //tipado CanMatchFN
  route: Route,
  segments: UrlSegment[]
)=>{

  return checkAuthStatus();
}


