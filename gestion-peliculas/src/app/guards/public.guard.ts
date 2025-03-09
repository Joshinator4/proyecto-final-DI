import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from "@angular/router";
import { inject } from "@angular/core";
import { AuthService } from "src/services/auth.service";

const checkAuthStatus = (): boolean => {
  const authService: AuthService = inject(AuthService)
  const router: Router = inject(Router)

  if(localStorage.getItem('token')){
    router.navigate(['/films/seach'])
  }

  return true;
}

export const canActivateGuardPublic: CanActivateFn = ( //tipado CanActivate
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
)=>{

  return checkAuthStatus();
}

export const canMatchGuardPublic: CanMatchFn = ( //tipado CanMatchFN
  route: Route,
  segments: UrlSegment[]
)=>{


  return checkAuthStatus();
}
