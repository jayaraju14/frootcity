import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Subject } from 'rxjs';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  @ViewChild(DataTableDirective)

  dtElement: DataTableDirective;
	dtOptions: DataTables.Settings = {};
	dtInstance:DataTables.Api;
	dtTrigger = new Subject();
  orders: any;
  id: string;

  constructor(private service:DataService, private router: Router,private toastr: ToastrManager, private http: HttpClient) { }

  ngOnInit() {    
      this.getOrders();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  listUsers() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.getOrders();
    });
  }

  getOrders(){
    // debugger
    this.id = localStorage.getItem('userId')
    this.service.getOrders(this.id).subscribe(
      (data: any)=>{
      // debugger
      this.orders = data.data.orders;
      this.dtTrigger.next();

    },
    err => {
      // this.showLoadingBar = false;
      let message = 'There is an issue with service. Please retry.';
      if (err.status === 400) {
        message = 'There is an error in getting list of sold to. Please retry.';
  
      }
    }
  );
  
  }    

  getOrderDetailsByID(item: any){
    // debugger
    this.id = item.order_id;
    this.service.getOrderDetailsByID(this.id).subscribe(
      (data: any)=>{
      // debugger
      this.orders = data.data.order_products_details;

    },
    err => {
      // this.showLoadingBar = false;
      let message = 'There is an issue with service. Please retry.';
      if (err.status === 400) {
        message = 'There is an error in getting list of sold to. Please retry.';
  
      }
    }
  );
  
  } 

  close(){
    this.listUsers();
  }


}

