import { Component, OnInit } from '@angular/core';
import { Client } from '../../models/Client';
import { AuthService } from '../../services/auth.service';
import { Router} from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { SettingsService } from 'src/app/services/settings.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean;
  loggedInUser: string;
  showRegister: boolean;


  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if(auth) {
        this.isLoggedIn = true;
        // auth is getting from Observable auth
        this.loggedInUser = auth.email;
      } else {
        this.isLoggedIn = false;
      }
    });

    this.showRegister = this.settingsService.getSettings().allowRegistration;
  };

  onLogoutClick() {
    this.authService.logout();
    this.flashMessage.show('You are now logged out',  {
      cssClass: 'alert-success', timeout: 4000
    });
    this.router.navigate(['/login']);
  }

}
