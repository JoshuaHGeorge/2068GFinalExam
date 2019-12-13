import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from "rxjs";
import globals from "../../../../config/globals";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application.json'})
}

@Injectable({
  providedIn: 'root'
})

export class OrderService {

  constructor(private http: HttpClient) { }

  getOrders() {
    return this.http.get(globals.apiRoot + 'orders', httpOptions);
  }
  getOrder(_id) {
    return this.http.get(globals.apiRoot + 'orders/' + _id, httpOptions);
  }

  addOrder(order) {
    return this.http.post(globals.apiRoot + 'orders', order, httpOptions);
  }

  deleteOrders(){
    return this.http.delete(globals.apiRoot + 'orders', httpOptions);
  }
  deleteOrder(_id){
    return this.http.delete(globals.apiRoot + 'orders/' + _id, httpOptions);
  }

}
