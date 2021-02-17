import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { from } from 'rxjs';
import { loginM, loginOtp, signupM, signupOtp } from 'src/app/models/user';
import {DataService} from 'src/app/service/data.service';
import { environment} from 'src/environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { ToastrManager } from 'ng6-toastr-notifications';


declare const $: any;

@Component({
  selector: 'app-firstnav',
  templateUrl: './firstnav.component.html',
  styleUrls: ['./firstnav.component.css']
})
export class FirstnavComponent implements OnInit {
  id;
  @ViewChild('ngOtpInput', { static: false}) ngOtpInput: any;

  categorieslist:any;
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
  isLogin: string;
  data: any;
  mobile: string;
  slug: any;
  products: any;
  firstname: string;
  lastname: string;
  userid: string;
  profile: any[];
  cartcount: any;
  vegitables: any;
  name: any;
  querystring: any;
  filteredData: any;
  login_option
  signup_option
  login_show
  signup_show
  textValue = '';
  log: '';
  search: any;
  prods: any;
  profilepic: any;


  constructor(private service:DataService, private router: Router,
    private toastr: ToastrManager, private http: HttpClient) { }
    private baseUrl = environment.baseUrl;

  ngOnInit() {

    this.isLogin = localStorage.getItem('Authorization');
    this.getCategories();
    this.getUserProfile();
    this.getCartDetails();
    console.log(this.cartcount)
    // this.getProducts();
    this.loadScripts();
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
        this.router.navigate(['/landing']);
        this.getCategories();
        this.getUserProfile();
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
        $('#myModal2').modal('hide');
        // $('#otppage').modal('show');
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
    // debugger
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
        // setTimeout(function () {
        //     window.location.reload();
        //   }, 500);
        this.router.navigate(['/home']);
        // location.reload()
        this.getUserProfile();
        this.getCartDetails();
        this.getCategories();
      } else {
        this.toastr.errorToastr('This number is not registered. Do you want to Signup?', 'Oops!', {position: 'bottom-center', toastTimeout:1000});
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

  getCategories(){
    this.service.getcategories().subscribe(
      (data:any)=> {
        // //debugger
      this.categorieslist= data.data.categories;
    })
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
    // this.router.navigate(['/landing']);

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
      console.log(this.cartcount)
      // this.cartcount= this.products.length; 
      // this.image = data.data.cart_products[0].images[0].product_image_name;
 
    })
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

  myFunction() {
      var x = document.getElementById("myTopnav");
      if (x.className === "topnav") {
          x.className += " responsive";
      } else {
          x.className = "topnav";
      }
  }



}