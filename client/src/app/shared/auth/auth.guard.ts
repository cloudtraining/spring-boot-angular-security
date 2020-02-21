import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AngularFireAuth} from "@angular/fire/auth";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
      public afAuth: AngularFireAuth,
      public authService: AuthService,
      private router: Router
  ) {}

  canActivate(): Promise<boolean>{
    return new Promise((resolve, reject) => {
      const isValidUser = !!this.authService.currentUser;
      if(!isValidUser){
        this.router.navigate(['/home']);
      }
      return resolve(isValidUser);
    });
  }
  
}
