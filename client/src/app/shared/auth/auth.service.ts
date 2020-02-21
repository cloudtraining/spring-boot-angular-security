import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {map} from 'rxjs/operators';
import {ActivatedRoute, Router} from "@angular/router";

const pkceConfig = {
    authUrl: 'https://dev-737080.okta.com/oauth2/default/v1/authorize',
    secret: 'M25iVXpKU3puUjFaYWg3T1NDTDQtcW1ROUY5YXlwalNoc0hhakxifmZHag',
    challenge: 'qjrzSW9gMiUgpUvqgEPE4_-8swvyCtfOVvg55o5S_es',
    method: 'S256',
    clientId: '0oa2gffttf7ea1gKR4x6',
    redirectUri: 'http://localhost:4200/auth-callback',
    scope: 'openid profile email',
    state: 'MdXrGikS5LACsWs2HZFqS7IC9zMC6F9thOiWDa5gxKRqoMf7bCkTetrrwKw5JIAA',
    nonce: 'iAXdcF77sQ2ejthPM5xZtytYUjqZkJTXcHkgdyY2NinFx6y83nKssxEzlBtvnSY2'
};

@Injectable()
export class AuthService {

    currentUser = null;
    testTokenResults: any;
    pkceLoginUrl = `${pkceConfig.authUrl}?response_type=code&response_mode=fragment`
        + `&client_id=${pkceConfig.clientId}`
        + `&redirect_uri=${pkceConfig.redirectUri}`
        + `&scope=${pkceConfig.scope}`
        + `&state=${pkceConfig.state}`
        + `&nonce=${pkceConfig.nonce}`
        + `&code_challenge=${pkceConfig.challenge}`
        + `&code_challenge_method=${pkceConfig.method}`;

    constructor(
        public afAuth: AngularFireAuth,
        private router: Router,
        private route: ActivatedRoute,
        private http: HttpClient
    ) {
        this.afAuth.authState.subscribe(async (user) => {
            this.currentUser = user;
            this.testToken();
        });
        this.getPKCEToken();
        // this.route.queryParams.subscribe(params => {
        //   if(this.router.url.indexOf('/auth-callback?') === 0) {
        //     const code = params['code'];
        //     const state = params['state'];
        //     const tokenRequest = {
        //       "grant_type": 'authorization_code',
        //       "code": code,
        //       "redirect_uri": 'http://localhost:4200/home',
        //       "": pkceConfig.clientId,
        //       "code_verifier": pkceConfig.secret
        //     }
        //     if(code && state === pkceConfig.state ) {
        //
        //       const tokenUrl = `https://github.com/login/oauth/access_token`
        //           + `?client_id=${pkceConfig.clientId}`
        //           + `&client_secret=8c6f2b187a421a5730ccc29aa51ed791c8803b09`
        //           + `&code=${code}`
        //           + `&redirect_uri=${encodeURIComponent(pkceConfig.redirectUri)}`
        //           + `&state=${pkceConfig.state}`;
        //       console.log(tokenUrl);
        //
        //       const tokenUrl2 = `https://github.com/login/oauth/access_token`
        //           + `?client_id=${pkceConfig.clientId}`
        //           + `&grant_type=authorization_code`
        //           + `&code_verifier=${pkceConfig.secret}`
        //           + `&code=${code}`
        //           + `&redirect_uri=${encodeURIComponent(pkceConfig.redirectUri)}`
        //           + `&state=${pkceConfig.state}`;
        //       console.log(tokenUrl2);
        //
        //       const headers = new HttpHeaders().set("Accept", "application/json");
        //       // this.http.get(tokenUrl, {headers}).subscribe(result => {
        //       //   // this.http.post('https://github.com/login/oauth/access_token',tokenRequest).subscribe(result=>{
        //       //   console.log('access_token', result);
        //       // }, error => {
        //       //   console.error('access_token error', error);
        //       // });
        //     }
        //   }
        // });
    }

    testToken() {
        const httpRequest = this.http.get(environment.httpEndpoint + '/cars');
        httpRequest.pipe(
            map((httpResults: any) => {
                return httpResults;
            })
        ).subscribe(
            results => this.testTokenResults = results,
            error => this.testTokenResults = error
        );
    }

    doRegister(value) {
        return new Promise<any>((resolve, reject) => {
            firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
                .then(res => {
                    resolve(res);
                }, err => reject(err));
        });
    }

    doLogin(value) {
        return new Promise<any>((resolve, reject) => {
            firebase.auth().signInWithEmailAndPassword(value.email, value.password)
                .then(res => {
                    // this.testIdToken();
                    resolve(res);
                }, err => reject(err));
        });
    }

    doLogout() {
        return new Promise((resolve, reject) => {
            if (firebase.auth().currentUser) {
                this.afAuth.auth.signOut().then(() => {
                });
                resolve();
            } else {
                reject();
            }
        });
    }

    doGithubLogin() {
        return new Promise<any>((resolve, reject) => {
            const provider = new firebase.auth.GithubAuthProvider();
            this.afAuth.auth
                .signInWithPopup(provider)
                .then(res => {
                    resolve(res);
                }, err => {
                    console.log(err);
                    reject(err);
                });
        });
    }

    doFacebookLogin() {
        return new Promise<any>((resolve, reject) => {
            const provider = new firebase.auth.FacebookAuthProvider();
            this.afAuth.auth
                .signInWithPopup(provider)
                .then(res => {
                    resolve(res);
                }, err => {
                    console.log(err);
                    reject(err);
                });
        });
    }

    doTwitterLogin() {
        return new Promise<any>((resolve, reject) => {
            const provider = new firebase.auth.TwitterAuthProvider();
            this.afAuth.auth
                .signInWithPopup(provider)
                .then(res => {
                    resolve(res);
                }, err => {
                    console.log(err);
                    reject(err);
                });
        });
    }

    doGoogleLogin() {
        return new Promise<any>((resolve, reject) => {
            const provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('profile');
            provider.addScope('email');
            this.afAuth.auth
                .signInWithPopup(provider)
                .then(res => {
                    resolve(res);
                }, err => {
                    console.log(err);
                    reject(err);
                })
        })
    }

    parseParms(str): any {
        var pieces = str.split(/[\?\#\&]/g), data = {}, i, parts;
        // process each query pair
        for (i = 0; i < pieces.length; i++) {
            parts = pieces[i].split("=");
            if (parts.length < 2) {
                parts.push("");
            }
            data[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
        }
        return data;
    }

    async getPKCEToken() {
        const cbParams = this.parseParms(window.location.href);
        if (cbParams.code && cbParams.state === pkceConfig.state) {
            const headers = new HttpHeaders().set("Accept", "application/json").set("Content-Type","application/x-www-form-urlencoded");
            this.http.post('https://dev-737080.okta.com/oauth2/default/v1/token',
                `client_id=${pkceConfig.clientId}&code_verifier=${pkceConfig.secret}&redirect_uri=${pkceConfig.redirectUri}&grant_type=authorization_code&code=${cbParams.code}`
                ,{headers}).subscribe(result => {
                debugger;
            }, error => {
                debugger;
            });
        }
    }

    // Generate a secure random string using the browser crypto functions
    generateRandomString() {
        var array = new Uint32Array(28);
        window.crypto.getRandomValues(array);
        return Array.from(array, dec => ('0' + dec.toString(16)).substr(-2)).join('');
    }

    // Calculate the SHA256 hash of the input text.
    // Returns a promise that resolves to an ArrayBuffer
    sha256(plain) {
        const encoder = new TextEncoder();
        const data = encoder.encode(plain);
        return window.crypto.subtle.digest('SHA-256', data);
    }

    // Base64-urlencodes the input string
    base64urlencode(str) {
        // Convert the ArrayBuffer to string using Uint8 array to convert to what btoa accepts.
        // btoa accepts chars only within ascii 0-255 and base64 encodes them.
        // Then convert the base64 encoded to base64url encoded
        //   (replace + with -, replace / with _, trim trailing =)
        return btoa(String.fromCharCode.apply(null, new Uint8Array(str)))
            .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    }

    // Return the base64-urlencoded sha256 hash for the PKCE challenge
    async pkceChallengeFromVerifier(v) {
        const hashed = await this.sha256(v);
        return this.base64urlencode(hashed);
    }
}
