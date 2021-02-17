import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { favourite } from 'src/app/models/user';
import { DataService } from 'src/app/service/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recommended-products',
  templateUrl: './recommended-products.component.html',
  styleUrls: ['./recommended-products.component.css']
})
export class RecommendedProductsComponent implements OnInit {
  bestsellers: any;
  slug: any;
  vegitables: any;
  name: any;
  productslug: any;
  isLogin: string;
  recommended: any;
  favObj: favourite = new favourite();
  // id: string;
  favourites: any;
  id: string;
  recommended1: any;




  constructor(private service:DataService, private router: Router,private toastr: ToastrManager, private http: HttpClient) { }
  private baseUrl = environment.baseUrl;

  ngOnInit() {
    const element = document.querySelector('#scrollId');
    window.scrollTo(0, 0);
    this.isLogin = localStorage.getItem('Authorization');
    this.getRecommended();
    this.getRecommended1();

  }

  getRecommended(){
    this.service.getRecommended().subscribe(
      (data:any)=> {
        // debugger
      this.recommended= data.data.recommendedProducts;
    });

  }

  getRecommended1(){
    this.id = localStorage.getItem('userId');
    this.service.getRecommended1(this.id).subscribe(
      (data:any)=> {
        // debugger
      this.recommended1= data.data.recommendedProducts;
    });

  }

  getProductsbyId(item: any) {
    // debugger
    this.slug = item.product_slug;
    // this.slug = "vegetables";
    this.service.getProductsbyId(this.slug).subscribe(
      (data:any) => {
        // debugger
      // this.vegitables = data.data.products;
      // this.name = data.data.products.product_slug;
      this.productslug = localStorage.setItem('productslug', data.data.products.product_slug);
      this.router.navigate(['/productdetails']);
      // location.reload()
    },
    err => {
      let message = 'There is an issue with service. Please retry.';
      if (err.status === 400) {
        message = 'There is an error in getting list of sold to. Please retry.';
  
      }
    }
  );
  
  }

  favorite(item: any) {
    // debugger
      if(item.is_favourite === "0"){
        this.favObj.favourite = true;
      }
      if(item.is_favourite === "1"){
        this.favObj.favourite = false;
      }
      // this.favObj.favourite = true;
      this.addToFavourites(item)
    }
    // console.log(this.quantity+1);

  addToFavourites(item: any){
    // debugger
    this.favObj.product_id = item.product_id
    this.favObj.user_id = localStorage.getItem('userId');
    // this.favObj.favourite = true;
    let fData = new FormData();
    fData.append("product_id", this.favObj.product_id);          
    fData.append("user_id", this.favObj.user_id);
    fData.append("favourite", JSON.stringify(this.favObj.favourite));   
                    
    const headers = new HttpHeaders({ 
      "x-api-key":"12345" ,
    })
    const profile = "addtofavourites";
    this.http.post(this.baseUrl + profile, fData, {headers}).subscribe((data:any) => {
      // debugger
      if (data.status === false){
        this.toastr.errorToastr(data.data.error, 'Oops!', {position: 'bottom-center', toastTimeout:1000});
        // location.reload()
      } else {
        this.toastr.successToastr(data.message, 'Success!', {position: 'bottom-center', toastTimeout:1000});
        this.favObj = new favourite;
        this.getRecommended1();
        // location.reload();
      }
  },
  err => {
    //debugger
    if (err && err.error && err.error){
      const errorMesg = err.error.message;
        this.toastr.errorToastr(errorMesg, 'Oops!', {position: 'bottom-center', toastTimeout:1000})  
    }
        else {
          this.toastr.errorToastr('Something went wrong', 'Oops!', {position: 'bottom-center', toastTimeout:1000});
        }
  }
  );
  
  }


}
