import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  bestsellers: any;
  slug: any;
  vegitables: any;
  name: any;
  productslug: void;
  isLogin: string;
  prods: any;
  search: string;
  log: any;

  constructor(private service:DataService, private router:Router, private activeroute: ActivatedRoute)  { }

  ngOnInit() {
    // debugger
    this.isLogin = localStorage.getItem('Authorization');
    this.search = this.activeroute.snapshot.paramMap.get("search");
    this.search = localStorage.getItem('search');
    this.getSearchProducts();
  }

  getSearchProducts(){
    // debugger
    this.search = localStorage.getItem('search');
    this.service.search(this.search).subscribe(
      (data:any)=> {
        // debugger
        this.prods = data.data.products;
        // setTimeout(function () {
        //   window.location.reload();
        // }, 500);      
        // localStorage.setItem('lastname', data.data.users.last_name);
      // this.profileObj = Object.assign({}, this.profile.users);
  
    })
  }

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
