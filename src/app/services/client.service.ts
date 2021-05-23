import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';


import {Client} from '../models/Client';


@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clientsCollection!: AngularFirestoreCollection<Client>;
  clientDoc: AngularFirestoreDocument<Client>;
  clients: Observable<Client[]>;
  client: Observable<Client>;

  constructor(private angfirestore: AngularFirestore) { 
    this.clientsCollection = this.angfirestore.collection('client',
    ref => ref.orderBy('lastName', 'asc'));
  };

  getClients(): Observable<Client[]> {
    // get clients with id
    this.clients = this.clientsCollection.snapshotChanges()
    .map((changes: any[]) => {
      return changes.map(action => {
        const data = action.payload.doc.data() as Client;
        data.id = action.payload.doc.id;
        return data;
      });
    });
    return this.clients;
  };

  newClient(client: Client) {
    this.clientsCollection.add(client);
  };

  getClient(id: string): Observable<Client> {
    this.clientDoc = this.angfirestore.doc<Client>(`client/${id}`);
    this.client = this.clientDoc.snapshotChanges().map(action => {
      if(action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as Client;
        data.id = action.payload.id;
        return data;
      }
    });
    return this.client;
  };

  updateClient(client: Client) {
    this.clientDoc = this.angfirestore.doc(`client/${client.id}`);
    this.clientDoc.update(client);
  };

  deleteClient(client: Client) {
    this.clientDoc = this.angfirestore.doc(`client/${client.id}`);
    this.clientDoc.delete();
  };
};
