import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from '../../models/Client';
import { FlashMessagesService } from 'flash-messages-angular';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';
import {SettingsService} from '../../services/settings.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };

  disableBalanceOnAdd: boolean;
  @ViewChild('clientForm') form: any;


  constructor(
    private fleshMessage: FlashMessagesService,
    private clientService: ClientService,
    private router: Router,
    private settingsService: SettingsService) { }

  ngOnInit(){
    this.disableBalanceOnAdd = this.settingsService.getSettings().disableBalanceOnAdd;
  }

  onSubmit({value, valid}: {value: Client, valid: boolean}) {
    // console.log(value, valid)
    if(this.disableBalanceOnAdd) {
      value.balance = 0;
    }

    if(!valid) {
      // show error
      this.fleshMessage.show('Please fill out all fields correctly', {cssClass: 'alert-danger', timeout: 4000})
    } else {
      // add new client
      this.clientService.newClient(value);

      // show message
      this.fleshMessage.show('New client added successfully', {cssClass: 'alert-success', timeout: 4000})

      // redirect to dashboard
      this.router.navigate(['/']);
    }
  }


}
