import { Component, OnInit } from "@angular/core";
import { ClientService } from "../../services/client.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Client } from "../../modles/Client";

@Component({
  selector: "app-client-details",
  templateUrl: "./client-details.component.html",
  styleUrls: ["./client-details.component.css"]
})
export class ClientDetailsComponent implements OnInit {
  id: string;
  client: Client;
  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;

  constructor(
    public clientService: ClientService,
    public router: Router,
    public route: ActivatedRoute,
    public flashMessagesService: FlashMessagesService
  ) {}

  ngOnInit() {
    // get id
    this.id = this.route.snapshot.params["id"];

    // get client
    this.clientService
      .getClient(this.id)
      .valueChanges()
      .subscribe(client => {
        if (client.balance > 0) {
          this.hasBalance = true;
        }
        this.client = client;
        // console.log(this.client);
      });
  }

  onDelete() {
    if (confirm("Are you sure you want to delete this client?")) {
      this.clientService.deleteClient(this.id);
      this.flashMessagesService.show("Client Deleted", {
        cssClass: "alert-success",
        timeout: 4000
      });
      this.router.navigate(["/"]);
    }
  }
}
