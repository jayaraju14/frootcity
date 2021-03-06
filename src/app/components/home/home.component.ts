import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { favourite } from 'src/app/models/user';
import { DataService } from 'src/app/service/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categorieslist = [];
  slidedata = [];
  bestsellers: any;
  slug: any;
  vegitables: any;
  name: any;
  productslug: any;
  isLogin: string;
  quantity: number;
  recommended: any;
  favObj: favourite = new favourite();
  id: string;
  favourites: any;
  bestsellers1: any;
  recommended1: any;

  // slidedata : any = [];
  
  constructor(private service:DataService, private router: Router,private toastr: ToastrManager, private http: HttpClient) { }
  private baseUrl = environment.baseUrl;
  

  ngOnInit() {
    this.isLogin = localStorage.getItem('Authorization');
    this.slider();
    this.getBestSellers();
    this.getBestSellers1();
    this.getRecommended();
    this.getRecommended1();
    this.quantity = 1;
    // this.loadScripts();
  }

  customOptions: OwlOptions = {
    loop: true,
      margin: 10,
      nav: false,
      dots: false,
      autoplay: true,
      responsive: {
          0: {
              items: 1
          },
          600: {
              items: 1
          },
          1000: {
              items: 1
          }
  }
}

    customOptions1: OwlOptions = {
      loop: true,
        margin: 10,
        nav: false,
        dots: false,
        autoplay: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 4
            }
    }
  }

  


  loadScripts() {
    // debugger
    const dynamicScripts = [
      '../../assets/js/owl.carousel.min.js',
      '../../assets/js/owl-content.js',
    ];
    for (let i = 0; i < dynamicScripts.length; i++) {
      const node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = 'text/javascript';
      node.async = false;
      node.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }

  getBestSellers(){
    this.service.getBestSellers().subscribe(
      (data:any)=> {
        // debugger
      this.bestsellers= data.data.bestSellers;
    });

  }
  getBestSellers1(){
    this.id = localStorage.getItem('userId')
    this.service.getBestSellers1(this.id).subscribe(
      (data:any)=> {
        // debugger
      this.bestsellers1= data.data.bestSellers;
    });

  }
  slider(){
    this.service.slide().subscribe(
      (data:any)=>{
        // debugger
      this.slidedata= data.data.sliderImages;
    })
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
    },
    err => {
      let message = 'There is an issue with service. Please retry.';
      if (err.status === 400) {
        message = 'There is an error in getting list of sold to. Please retry.';
  
      }
    }
  );
  
  }

  getRecommended(){
    this.service.getRecommended().subscribe(
      (data:any)=> {
        // debugger
      this.recommended= data.data.recommendedProducts;
    });

  }

  getRecommended1(){
    this.id = localStorage.getItem('userId')
    this.service.getRecommended1(this.id).subscribe(
      (data:any)=> {
        // debugger
      this.recommended1= data.data.recommendedProducts;
    });

  }

  // increment product qty
  incrementQty() {
    console.log(this.quantity+1);
    this.quantity += 1;
  }

  // decrement product qty
  decrementQty() {
    if(this.quantity-1 < 1 ){
      this.quantity = 1
      console.log('1->'+this.quantity);
    }else{
      this.quantity -= 1;
      console.log('2->'+this.quantity);
    }
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
    debugger
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
        this.getBestSellers1();
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

