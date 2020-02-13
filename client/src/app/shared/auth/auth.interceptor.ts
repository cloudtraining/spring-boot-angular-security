import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import * as firebase from "firebase";
import {environment} from "../../../environments/environment";
import {AngularFireAuth} from "@angular/fire/auth";
import {first, map, take} from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  urlToIntercept = environment.httpEndpoint.replace(/https?:/,'');
  constructor(private afAuth: AngularFireAuth) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.handleAccess(request, next));
  }

  private async handleAccess(request: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
    if(request.url.indexOf(this.urlToIntercept) > -1) {
      const token = await this.afAuth.idToken.pipe(first()).toPromise();
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token
        }
      });
    }
    return next.handle(request).toPromise();
  }
}
