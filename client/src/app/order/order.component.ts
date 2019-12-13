import { Component, OnInit } from '@angular/core';
import { OrderService } from "../services/order.service";
import { Observable } from "rxjs";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers: [OrderService]
})
export class OrderComponent implements OnInit {
  orders: any;
  _id: string;
  firstName: string;
  lastName: string;
  type: string;
  size: string;
  quantity: number;
  total: number;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.getOrders().subscribe(res => {
      this.orders = res;
    }, err => {
      console.log('Sad ' + err);
    });
  }

  getOrders(): void {
    this.orderService.getOrders().subscribe(res => {
      this.orders = res;
    }, err => {
      console.log('Sad ' + err);
    });
  }
  getOrder(order): void {
    this._id = order._id;
    this.firstName = order.firstName;
    this.lastName = order.lastName;
    this.type = order.type;
    this.size = order.size;
    this.quantity = order.quantity;
    this.total = order.total;
  }
  deleteOrder(_id: string): void {
    this.orderService.deleteOrder(_id).subscribe(response => {
      this.getOrders();
    })
  }
  deleteOrders(): void {
    this.orderService.deleteOrders().subscribe(response => {
      this.getOrders();
    })
  }

  addOrder(): void{

    var costPer;

    if(this.size == "S"){
      costPer = 10;
    }
    if(this.size == "M"){
      costPer = 15;
    }
    if(this.size == "L"){
      costPer = 20;
    }

    var hold = costPer * this.quantity;

    var order = {
      firstName: this.firstName,
      lastName: this.lastName,
      type: this.type,
      size: this.size,
      quantity: this.quantity,
      total: hold
    }

    this.orderService.addOrder(order).subscribe(response => {
      this.getOrders();
      this.clearForm();
    })
  }

  clearForm(): void {
    this._id = null;
    this.firstName = null;
    this.lastName = null;
    this.type = null;
    this.size = null;
    this.quantity = null;
    this.total = null;
  }
}
