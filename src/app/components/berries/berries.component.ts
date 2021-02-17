import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-berries',
  templateUrl: './berries.component.html',
  styleUrls: ['./berries.component.css']
})
export class BerriesComponent implements OnInit {

  bestsellers: any;
  slug: any;
  vegitables: any;
  name: any;
  productslug: void;
  isLogin: string;

  constructor(private service:DataService, private router:Router) { }

  ngOnInit() {
    this.isLogin = localStorage.getItem('Authorization');
    this.name = localStorage.getItem('productname');
    this.getProducts();
  }

  // getBestSellers(){
  //   this.service.getBestSellers().subscribe(
  //     (data:any)=> {
  //       debugger
  //     this.bestsellers= data.data.bestSellers;
  //   });

  // }

  getProducts() {
    // debugger
    this.slug = localStorage.getItem('productname');
    // this.slug = "vegetables";
    this.service.getProducts(this.slug).subscribe(
      (data:any) => {
        // debugger
      this.vegitables = data.data.products;
      this.name = data.data.slug;
      // location.reload();
      // this.router.navigate(['/products']);
  
    },
    err => {
      let message = 'There is an issue with service. Please retry.';
      if (err.status === 400) {
        message = 'There is an error in getting list of sold to. Please retry.';
  
      }
    }
  );
  
  }

  getProductsbyId(item: any) {
    // debugger
    this.slug = item.product_slug;
    // this.slug = "vegetables";
    this.service.getProductsbyId(this.slug).subscribe(
      (data:any) => {
        // debugger
      this.vegitables = data.data.products;
      this.name = data.data.products.product_slug;
      this.productslug = localStorage.setItem('productslug', data.data.products.product_slug);
      this.router.navigate(['/productdetails']);
      // location.reload();

    },
    err => {
      let message = 'There is an issue with service. Please retry.';
      if (err.status === 400) {
        message = 'There is an error in getting list of sold to. Please retry.';
  
      }
    }
  );
  
  }

}
