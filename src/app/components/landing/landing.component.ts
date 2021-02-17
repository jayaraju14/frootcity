import { HttpClient, HttpHeaders } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { favourite } from 'src/app/models/user';
import { DataService } from 'src/app/service/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  categorieslist = [];
  slidedata = [];
  bestsellers: any;
  slug: any;
  vegitables: any;
  name: any;
  productslug: any;
  isLogin: string;
  recommended = [];
  quantity: number;
  favObj: favourite = new favourite();
  id: string;
  favourites: any;
  isClicked: boolean;

  // slidedata : any = [];
  
  constructor(private service:DataService, private router: Router,private toastr: ToastrManager, private http: HttpClient) { }
  private baseUrl = environment.baseUrl;
  
  ngOnInit() {
    this.isLogin = localStorage.getItem('Authorization');
    this.slider();
    this.getBestSellers();
    this.getRecommended()
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

  

//   onSelect(item)
// {
//   // debugger
//    this.isVisible = false;
//    this.clickedUser = item;
// }

}
