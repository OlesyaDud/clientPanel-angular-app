import { Component, OnInit } from '@angular/core';
import { Client } from '../../models/Client';
import { FlashMessagesService } from 'flash-messages-angular';
import { ClientService } from '../../services/client.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {SettingsService} from '../../services/settings.service';


@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  id: string;
  client: Client = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    balance: 0
  };
  disableBalanceOnEdit: boolean;


  constructor(
    private fleshMessage: FlashMessagesService,
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private settingsService: SettingsService
  ) { }

  ngOnInit(){
    this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;

        // get id from url
        this.id = this.route.snapshot.params['id'];

        // get client
        this.clientService.getClient(this.id).subscribe(client => {
          this.client = client;
          // console.log(this.client);
        });

        
      }; 
      
      onSubmit({value, valid}: {value: Client, valid: boolean}) {
        if(!valid) {
          this.fleshMessage.show('Please fill out the form correctly',  {
            cssClass: 'alert-danger', timeout: 4000
          });
        } else {
          // add id to client
          value.id = this.id;
          // update client
          this.clientService.updateClient(value);
          this.fleshMessage.show('Client updated successfully', {
            cssClass: 'alert-success', timeout: 4000
          });
          this.router.navigate([`/client/`+this.id]);
        }
        }
  }

