import { Component, OnInit } from '@angular/core';
import { Client } from '../../models/Client';
import { FlashMessagesService } from 'flash-messages-angular';
import { ClientService } from '../../services/client.service';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  id: string;
  client: Client;
  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;

  constructor(
    private fleshMessage: FlashMessagesService,
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // get id from url
    this.id = this.route.snapshot.params['id'];

    // get client
    this.clientService.getClient(this.id).subscribe(client => {
      if(client !=null) {
        if(client.balance > 0) {
          this.hasBalance  = true;
        }
      }
      this.client = client;
      // console.log(this.client);
    });
  };

  onDeleteClick() {
    if(confirm('Confirm delete client')) {
      this.clientService.deleteClient(this.client);
      this.fleshMessage.show("Client removed", {
        cssClass: "alert-success", timout: 4000 
      });
      this.router.navigate(['/']);
    }
  };

  updateBalance() {
    this.clientService.updateClient(this.client);
    this.fleshMessage.show("Balance updated successfully", {
      cssClass: "alert-success", timout: 4000
    });
  }

}
