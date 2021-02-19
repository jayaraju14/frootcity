import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { addcart, favourite, loginM, loginOtp, rating, signupM, signupOtp } from 'src/app/models/user';
import { DataService } from 'src/app/service/data.service';
import { environment } from 'src/environments/environment';
import { RatingModule, StarRatingComponent } from 'ng-starrating';

declare const $: any;


@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {
  bestsellers: any;
  slug: any;
  vegitables: any = [];
  name: any;
  productslug: any;
  image: any;
  item_qty: number;
  addObj: addcart = new addcart();
  addForm: any;
  quantity: any;
  isLogin: string;
  products: any;
  categorieslist: any;

  loginObj: loginM = new loginM();
  loginForm: FormGroup;
  signupObj: signupM = new signupM();
  signupForm: any;
  signupOtpForm: FormGroup;
  loginOtpForm: FormGroup;
  verifySignupObj: signupOtp = new signupOtp();
  verifyLoginObj: loginOtp = new loginOtp();
  myNumber : any;
  otp: any;
  data: any;
  mobile: string;
  id: string;
  profile: any[];
  firstname: any;
  lastname: any;
  cartcount: any;
  isVisible : boolean = true;
  clickedUser: any;
  recommended: any;
  login_option
  signup_option
  login_show
  signup_show
  // log: any;
  textValue = '';
  log: '';
  profilepic: any;
  rating: any;
  userRating: any;  
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number = 0;
  // onClickResult: OnClickEvent;
  totalstar = 5;
  rateObj: rating = new rating();
  favObj: favourite = new favourite();
  // id: string;
  favourites: any;
  recommended1: any;




  constructor(private service:DataService, private router: Router,private toastr: ToastrManager, private http: HttpClient) { }
  private baseUrl = environment.baseUrl;
  
  ngOnInit() {
    const element = document.querySelector('#scrollId');
    window.scrollTo(0, 0);
    this.isLogin = localStorage.getItem('Authorization');
    if(this.isLogin !== null){
      this.getUserProfile();
      this.getCartDetails();
    }
    this.getCategories();
    this.getProductsbyId();
    this.getRecommended();
    this.getRecommended1()
    this.loadScripts();
    this.quantity = 1;

    this.signupForm = new FormGroup({
      // name: new FormControl(''),
      // email: new FormControl(''),
      // password: new FormControl(''),
      mobile_number_login: new FormControl('', [Validators.required, Validators.pattern("^[0-9_-]{10,12}"), Validators.maxLength(10), Validators.maxLength(10)]),
      });

      this.signupOtpForm = new FormGroup({
        // otp: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(6), Validators.maxLength(6)])
        otp: new FormControl('')
      });

      this.loginForm = new FormGroup({
        mobile_number_login: new FormControl('', [Validators.required, Validators.pattern("^[0-9_-]{10,12}"), Validators.maxLength(10), Validators.maxLength(10)]),
        // password: new FormControl('')
      });

      this.loginOtpForm = new FormGroup({
        // otp_login: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(6), Validators.maxLength(6)])
        otp_login: new FormControl('')
      });

      
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

  getProductsbyId() {
    // debugger
    this.slug = localStorage.getItem('productslug');
    this.service.getProductsbyId(this.slug).subscribe(
      (data:any) => {
        // debugger
      this.vegitables = [data.data.products];
      this.image = [data.data.products.images[0].product_image_name];
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

  addToCart(item: any){
    // debugger
    this.addObj.product_id = item.product_id
    this.addObj.user_id = localStorage.getItem('userId');
    this.addObj.quantity = this.quantity;
   console.log(item)
    let fData = new FormData();
    fData.append("product_id", this.addObj.product_id);          
    fData.append("user_id", this.addObj.user_id);  
    fData.append("quantity", this.addObj.quantity); 
                    
    const headers = new HttpHeaders({ 
      "x-api-key":"12345" ,
    })
    const profile = "addcart";
    this.http.post(this.baseUrl + profile, fData, {headers}).subscribe((data:any) => {
      // debugger
      // console.log(data)
     
      if (data.status === false){
        this.toastr.errorToastr(data.data.error);
        // location.reload()
      } else {
      
        this.toastr.successToastr(data.message, 'Success!', {position: 'bottom-center', toastTimeout:1000});
        this.addObj = new addcart;
        this.getCartDetails();
        // setTimeout(function () {
        //   window.location.reload();
        // }, 1000);
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

  getCategories(){
    this.service.getcategories().subscribe(
      (data:any)=> {
        // //debugger
      this.categorieslist= data.data.categories;
    })
  }

  onRate($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}, item) {
    // debugger
    this.selectedValue = $event.oldValue;
    this.userRating = $event.newValue;
    this.addRating(item);
  }

  addRating(item: any){
    // debugger
    this.rateObj.product_id = item.product_id
    this.rateObj.user_id = localStorage.getItem('userId');
    // this.rating = $("#rating").val();
    // this.rateObj.rating = this.selectedValue;
    this.rateObj.rating = this.userRating;
    let fData = new FormData();
    fData.append("product_id", this.rateObj.product_id);          
    fData.append("user_id", this.rateObj.user_id);  
    fData.append("rating", this.rateObj.rating); 
                    
    const headers = new HttpHeaders({ 
      "x-api-key":"12345" ,
    })
    const profile = "addrating";
    this.http.post(this.baseUrl + profile, fData, {headers}).subscribe((data:any) => {
      // debugger
      if (data.status === false){
        this.toastr.errorToastr(data.data.error);
        // location.reload()
      } else {
        this.toastr.successToastr(data.message, 'Success!', {position: 'bottom-center', toastTimeout:1000});
        this.rateObj = new rating;
        this.getProductsbyId();
        // setTimeout(function () {
        //   window.location.reload();
        // }, 1000);
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

  logout() {
    // this.data.logout();
    localStorage.clear();
    // location.reload()
    this.router.navigate(['/landing']);
    this.toastr.successToastr('Logout successfully', 'Success!', {position: 'bottom-center', toastTimeout:1000})
    this.getCategories();
    this.getUserProfile();
    this.getCartDetails();

  }

  goToProductDetails(item:any) {
    // debugger
    this.slug = item.ns_category_slug;
    // this.slug = "vegetables";
    this.service.getProducts(this.slug).subscribe(
      (data:any) => {
        // debugger
      this.products = data.data.products;
      // localStorage.setItem('productname', data.data.products[0].ns_category_slug);
      localStorage.setItem('productname', this.slug);
      if (this.slug === 'apple-and-pears') {
        this.router.navigate(['/apple-and-pears']);
      }
      if (this.slug === 'main-menu-categories') {
        this.router.navigate(['/all']);
      } if (this.slug === 'avacado-stone-fruits') {
        this.router.navigate(['/avacado-stone-fruits']);
      } if (this.slug === 'berries') {
        this.router.navigate(['/berries']);
      } if (this.slug === 'citrus') {
        this.router.navigate(['/citrus']);
      } 
      // this.router.navigate(['/products']);
      // location.reload();
      // this.getProducts();
    },
    err => {
      let message = 'There is an issue with service. Please retry.';
      if (err.status === 400) {
        message = 'There is an error in getting list of sold to. Please retry.';
  
      }
    }
  );
  
  }

  config = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '50px',
      'height': '50px'
    }
  };
  onOtpChange(otp) {
    this.otp = otp;
  }


  signup(){
    // //debugger
    this.signupObj.mobile_number_login = this.signupForm.value.mobile_number_login;
    let fData = new FormData();
    fData.append("mobile_number_login", this.signupObj.mobile_number_login);          
    const headers = new HttpHeaders({ 
      "x-api-key":"12345" ,
    })
    const sendsignupotp = "sendOtp";
     this.http.post(this.baseUrl + sendsignupotp, fData, {headers}).subscribe(
       (data:any) => {
      if (data != null){
        this.signupObj = new signupM
        // localStorage.setItem("id", data.id);
        localStorage.setItem("mobilenumber", data.mobile);
        localStorage.setItem("sessionotp", data.OTP);
        this.mobile = localStorage.getItem('mobilenumber');
        // this.toastr.successToastr(data.message);
        this.signupForm.reset();
        $('#myModal2').modal('hide');
        $('#otppage').modal('show');
      } else {
        this.signupForm.reset();

      }
  },
  err => {
    // console.log();
    if (err && err.error && err.error.errors){
    const errorMesg = err.error.error;
        this.toastr.errorToastr(errorMesg, 'Oops!', {position: 'bottom-center', toastTimeout:1000})
        this.signupForm.reset();

    }
        else {
          this.toastr.errorToastr('Something went wrong', 'Oops!', {position: 'bottom-center', toastTimeout:1000});
        }
  }
  );

  }

  verifySignupOtp(){
    //debugger
    this.verifySignupObj.mobile_number_register = localStorage.getItem('mobilenumber');
    this.verifySignupObj.session_otp = localStorage.getItem('sessionotp');
    this.verifySignupObj.otp = this.otp;
    let fData = new FormData();
    fData.append("mobile_number_register", this.verifySignupObj.mobile_number_register);  
    fData.append("session_otp", this.verifySignupObj.session_otp);          
    fData.append("otp", this.verifySignupObj.otp);          
        
    const headers = new HttpHeaders({ 
      "x-api-key":"12345" ,
    })
    const verifysignupotp = "register";
    this.http.post(this.baseUrl + verifysignupotp, fData, {headers}).subscribe((data:any) => {
      // debugger
      if (data.type == "error"){
        this.toastr.errorToastr('This number is already registered. Do you want to login…?', 'Oops!', {position: 'bottom-center', toastTimeout:1000});
        // alert(data.message)
        this.signupOtpForm.reset();
        // location.reload()
      } else {
        this.toastr.successToastr('You have registered successfuly. Please login', 'Success!', {position: 'bottom-center', toastTimeout:1000});
        this.verifySignupObj = new signupOtp;
        this.signupOtpForm.reset();
        $('#otppage').modal('hide');
        // localStorage.setItem("Authorization", data);
        // localStorage.setItem("userId", data.user._id);
        // this.router.navigate(['/landing']);
        // location.reload()

      }
  },
  err => {
    //debugger
    if (err && err.error && err.error){
      const errorMesg = err.error.message;
        this.toastr.errorToastr(errorMesg, 'Oops!', {position: 'bottom-center', toastTimeout:1000})
        this.signupOtpForm.reset();

    }
        else {
          this.toastr.errorToastr('Something went wrong', 'Oops!', {position: 'bottom-center', toastTimeout:1000});
        }
  }
  );

  }

  login(){
    // //debugger
    this.loginObj.mobile_number_login = this.loginForm.value.mobile_number_login;
    let fData = new FormData();
    fData.append("mobile_number_login", this.loginObj.mobile_number_login);          
    const headers = new HttpHeaders({ 
      "x-api-key":"12345" ,
    })
    const sendotp = "sendOtp";
     this.http.post(this.baseUrl + sendotp, fData, {headers}).subscribe(
       (data:any) => {
      // //debugger
      if (data != ""){
        this.toastr.successToastr('OTP Sent Successfully To Registered Mobile Number', 'Success!', {position: 'bottom-center', toastTimeout:1000})
        this.loginObj = new loginM;
        localStorage.setItem("mobilenumber", data.mobile);
        localStorage.setItem("sessionotp", data.OTP);
        this.mobile = localStorage.getItem('mobilenumber');
        this.loginForm.reset();
        $('#loginotppage').modal('show');
      } else {
        this.loginForm.reset();

      }
  },
  err => {
    //debugger
    const errorMesg = err.error.error;
        if (errorMesg == undefined) {
          this.toastr.errorToastr('Something went wrong', 'Oops!', {position: 'bottom-center', toastTimeout:1000})
        }
        else {
          this.toastr.errorToastr(errorMesg, 'Oops!', {position: 'bottom-center', toastTimeout:1000});
        }
  });

  }

  verifyLoginOtp(){
    // //debugger
    this.verifyLoginObj.mobile_number_login = localStorage.getItem('mobilenumber');
    this.verifyLoginObj.session_otp_login = localStorage.getItem('sessionotp');
    this.verifyLoginObj.otp_login = this.otp;
    let fData = new FormData();
    fData.append("mobile_number_login", this.verifyLoginObj.mobile_number_login);  
    fData.append("session_otp_login", this.verifyLoginObj.session_otp_login);          
    fData.append("otp_login", this.verifyLoginObj.otp_login);          
        
    const headers = new HttpHeaders({ 
      "x-api-key":"12345" ,
    })
    const verifyloginotp = "login_otp";
    this.http.post(this.baseUrl + verifyloginotp, fData, {headers}).subscribe(
      (data:any) => {
      // debugger
      if (data.user_id != null){
        this.toastr.successToastr('Signin Successfully', 'Success!', {position: 'bottom-center', toastTimeout:1000});
        this.verifyLoginObj = new loginOtp;
        this.loginOtpForm.reset();
        $('#loginotppage').modal('hide');
        localStorage.setItem("Authorization", data);
        localStorage.setItem("userId", data.user_id);
        setTimeout(function () {
            window.location.reload();
          }, 500);
        this.router.navigate(['/productdetails']);        
        // location.reload()
        this.getUserProfile();
        this.getCartDetails();
        this.getCategories();
        this.getProductsbyId();
      } else {
        // this.toastr.errorToastr(data.errors.message);
        this.loginOtpForm.reset();
        // location.reload()

      }
  },
  err => {
    //debugger
    const errorMesg = err.error.error;
        if (errorMesg == undefined) {
          this.toastr.errorToastr('Something went wrong', 'Oops!', {position: 'bottom-center', toastTimeout:1000})
        }
        else {
          this.toastr.errorToastr(errorMesg, 'Oops!', {position: 'bottom-center', toastTimeout:1000});
        }
  }
  );

  }

  resend(){
    // //debugger
    this.loginObj.mobile_number_login = localStorage.getItem('mobilenumber');
    let fData = new FormData();
    fData.append("mobile_number_login", this.loginObj.mobile_number_login);          
    const headers = new HttpHeaders({ 
      "x-api-key":"12345" ,
    })
    const sendotp = "sendOtp";
     this.http.post(this.baseUrl + sendotp, fData, {headers}).subscribe(
       (data:any) => {
      // //debugger
      if (data != ""){
        this.toastr.successToastr('OTP Sent Successfully To Registered Mobile Number', 'Success!', {position: 'bottom-center', toastTimeout:1000})
        this.loginObj = new loginM;
        localStorage.setItem("mobilenumber", data.mobile);
        localStorage.setItem("sessionotp", data.OTP);
        this.mobile = localStorage.getItem('mobilenumber');
        this.loginForm.reset();
        // $('#myModal2').modal('hide');
        $('#loginotppage').modal('show');
      } else {
        this.loginForm.reset();

      }
  },
  err => {
    //debugger
    const errorMesg = err.error.error;
        if (errorMesg == undefined) {
          this.toastr.errorToastr('Something went wrong', 'Oops!', {position: 'bottom-center', toastTimeout:1000})
        }
        else {
          this.toastr.errorToastr(errorMesg, 'Oops!', {position: 'bottom-center', toastTimeout:1000});
        }
  });

  }

  getUserProfile(){
    // debugger
    this.id = localStorage.getItem('userId')
    this.service.getUserProfile(this.id).subscribe(
      (data:any)=> {
        // //debugger
      this.profile= [data.data.users];
      this.firstname = data.data.users.first_name
      this.lastname = data.data.users.last_name
      this.profilepic = data.data.users.photo

      // localStorage.setItem('firstname', data.data.users.first_name);
      // localStorage.setItem('lastname', data.data.users.last_name);
      // this.profileObj = Object.assign({}, this.profile.users);
  
    })
  }

  getCartDetails(){
    // debugger
    this.id = localStorage.getItem('userId')
    this.service.getCartDetails(this.id).subscribe(
      (data:any)=> {
        // debugger
      this.products= data.data.cart_products; 
      this.cartcount= data.data.count; 
      // this.cartcount= this.products.length;
      // this.image = data.data.cart_products[0].images[0].product_image_name;
 
    })
  }

  onSelect(item)
{
  // debugger
   this.isVisible = false;
   this.clickedUser = item;
}

getNumber(value)
{
  // debugger
  //  this.isVisible = false;
   this.quantity = value;
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

getProductsbyId1(item: any) {
  // debugger
  this.slug = item.product_slug;
  // this.slug = "vegetables";
  this.service.getProductsbyId(this.slug).subscribe(
    (data:any) => {
      // debugger
    this.vegitables = data.data.products;
    this.name = data.data.products.product_slug;
    this.productslug = localStorage.setItem('productslug', data.data.products.product_slug);
    // this.router.navigate(['/productdetails']);
    // location.reload()
    const element = document.querySelector('#scrollId');
    window.scrollTo(0, 0);
    this.quantity=1
    this.getProductsbyId();
  },
  err => {
    let message = 'There is an issue with service. Please retry.';
    if (err.status === 400) {
      message = 'There is an error in getting list of sold to. Please retry.';

    }
  }
);

}

clicked(event)
  {
    // console.log(event.target.name)
    if(event.target.name=="login")
    {
        this.login_option=true
        this.signup_option=false
        this.login_show=true
        this.signup_show=false
    }
    else if(event.target.name=='signup')
    {
      this.login_option=false
      this.signup_option=true
      this.login_show=false
      this.signup_show=true
    }
  }
  
  logText(value: any) {
    // debugger
    this.log = value;
    localStorage.setItem('search', this.log);
    // this.router.navigate(['/search', this.log]);
    this.router.navigate(['/products'], { queryParams: { search: this.log } });
    setTimeout(function () {
      window.location.reload();
    }, 500);    
    // this.getSearchProducts();

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
