import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {SettingsService} from '../services/settings.service';
import 'rxjs/add/operator/map';


@Injectable() 
export class RegisterGuard implements CanActivate {
    constructor(
        private router: Router,
        private settingsService: SettingsService
    ) {}

    canActivate(): boolean {
     if(this.settingsService.getSettings().allowRegistration) {
         return true;
     } else {
        //  if registration is not allowed- will boot to login page
         this.router.navigate(['/login']);
         return false;
     }
    }
}