import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import * as firebase from "firebase";
import {environment} from "../../../environments/environment";
import {AngularFireAuth} from "@angular/fire/auth";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  authReady = false;
  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(async(user)=> {
      this.authReady = true;
    });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.handleAccess(request, next));
  }

  private async handleAccess(request: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
    let accessToken = 'TODO:IDK'
    if (this.authReady && request.urlWithParams.indexOf(environment.httpEndpoint.replace(/http[s]*:/,'')) > -1) {
      let firebaseUser = firebase.auth().currentUser;
      accessToken = await firebaseUser.getIdToken(true);
    } else {
      // TODO: No One On The Internet Has An Example How To Wait For Auth Before Running An Intercept!
    }
    request = request.clone({
      setHeaders: {
        Authorization: 'Bearer ' + accessToken
      }
    });
    return next.handle(request).toPromise();
  }
}
