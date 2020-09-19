import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, Router} from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable()
export class AuthService implements CanActivate {

    constructor(
        private router: Router, 
        private user: UserService,
        private afAuth: AngularFireAuth
    ) {
    }

    canActivate(route, state): Observable<boolean> | Promise<boolean> | boolean {
        return this.afAuth.authState.pipe(map(authState => {
            if (authState) {
                this.user.setUser({
                    username: authState.email.split("@")[0],
                    uid: authState.uid
                })
                return true;
            } else {
                this.router.navigate(['/login']);
                return false;
            }
        }));

    }

}