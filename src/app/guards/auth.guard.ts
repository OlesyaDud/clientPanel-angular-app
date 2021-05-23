import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';


@Injectable() 
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private afAuth: AngularFireAuth
    ) {}

    canActivate(): Observable<boolean> {
        return this.afAuth.authState.map(auth => {
            if(!auth) {
                this.router.navigate(['/login']);
                return false;
            } else {
                // let us go to that route
                return true;
            }
        })
    }
}