import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
// import { StripeService } from 'ngx-stripe';
import { addcart, addressU, confirmP, paymentC } from 'src/app/models/user';
import { DataService } from 'src/app/service/data.service';
import { environment } from 'src/environments/environment';

declare const $: any;
declare var Razorpay: any; 

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  id: string;
  items: any[];
  products: any;
  quantity: number;
  image: any[];
  addressObj: addressU = new addressU();
  addressForm: any;
  address: any;
  addObj: addcart = new addcart();
  confirmObj: confirmP = new confirmP();
  paymentObj: paymentC = new paymentC();
  cartcount: any;
  total: any;
  isVisible : boolean = true;
  clickedUser: any;
  // cartArray: any;
  cartArray = [];
  groupList:any = [];
  payableAmount: number;
  prodid: any;
  paymentId: void;
  slug: any;
  profile: any[];
  firstname: any;
  lastname: any;
  categorieslist: any;
  textValue = '';
  log: '';
  isLogin: string;
  profilepic: any;
  order_array_input = []
  list: any;



  constructor(private service:DataService, private router: Router,private toastr: ToastrManager, private http: HttpClient) { }
  private baseUrl = environment.baseUrl;
  
  ngOnInit() {
    this.isLogin = localStorage.getItem('Authorization');
    this.getCartDetails();
    this.getUserAddress();
    this.getUserProfile();
    this.getCategories();
    this.loadScripts();
    this.quantity = 1;
    // this.quantity = 1;

    this.addressForm = new FormGroup({
      address: new FormControl(''),
      landmark: new FormControl(''),
      state: new FormControl(''),
      pin_code: new FormControl(''),
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

  getCartDetails(){
    // debugger
    this.id = localStorage.getItem('userId')
    this.service.getCartDetails(this.id).subscribe(
      (data:any)=> {
        // debugger
        // if(data.data !== null){
          this.products= data.data.cart_products; 
          this.quantity = data.data.cart_products[0].quantity;
          this.cartcount= data.data.count;
          this.total = data.data.total;
          this.payableAmount =  this.total * 100;
          console.log(this.payableAmount)
      // this.image = data.data.cart_products[0].images[0].product_image_name;
 console.log(this.cartcount)
    })
  }  

  orderConfirmation(){
    // debugger
    this.confirmObj.user_id = localStorage.getItem('userId');
    this.confirmObj.total_price_input = this.total;
    this.confirmObj.order_array_input = [];
    this.products.forEach((item, index) => {
      let obj:any = {}
      this.groupList.push(item.product_id, item.quantity);
    obj.product_id =item.product_id;
    obj.product_qty=item.quantity;
    this.confirmObj.order_array_input.push(obj)
    });
    
    // var obj =   { "total_price_input": this.confirmObj.total_price_input, "user_id": this.confirmObj.user_id, "order_array_input": [{ "product_id":this.confirmObj.product_id, "product_qty":this.confirmObj.product_qty }] } 
                    
    const headers = new HttpHeaders({ 
      "x-api-key":"12345" ,
    })
    const profile = "order_confirmation";
    this.http.post(this.baseUrl + profile, this.confirmObj, {headers}).subscribe((data:any) => {
      // debugger
      if (data.data === null){
        this.toastr.errorToastr(data.data.error, 'Oops!', {position: 'bottom-center', toastTimeout:1000});
        // alert(data.message)
        // location.reload()
      } else {
        // debugger
        this.toastr.successToastr('Order Confirmed. Please make the payment', 'Success!', {position: 'bottom-center', toastTimeout:1000});
        this.confirmObj = new confirmP;
        // this.c.reset();
        // this.getUserAddress();
        localStorage.setItem("OrderId", data.data.ORDER_ID);
        localStorage.setItem("TxnAmount", data.data.TXN_AMOUNT);
  
      }
  },
  err => {
    //debugger
    if (err && err.error && err.error){
      const errorMesg = err.error.message;
        this.toastr.errorToastr(errorMesg, 'Oops!', {position: 'bottom-center', toastTimeout:1000})
        this.addressForm.reset();
  
    }
        else {
          this.toastr.errorToastr('Something went wrong', 'Oops!', {position: 'bottom-center', toastTimeout:1000});
        }
  }
  );
  
  }

  preparePaymentDetails(){
  var ref = this;
    return  {
    "key": 'rzp_test_Z5ipkQmtNe1fTj',
    "amount": this.payableAmount,
    "currency":"INR",
    "name":'Frootcity',
    "description":"Products Payment",
    "image": "assets/images/1.png",// COMPANY LOGO
    "handler": response => {
                // console.log(response);
                // this.paymentId = response.razorpay_payment_id;
                this.paymentId = localStorage.setItem("paymentId", response.razorpay_payment_id);
                this.paymentSuccess();
               },
               "notes": { 
                 "address": this.clickedUser
                },
               "theme": {
                   "color": "#36B44E"
               }
  };
  

}

initPay() {
  var rzp1 = new Razorpay(this.preparePaymentDetails());
  rzp1.open();
  // console.log("works");
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

  addAddress(){
    // debugger
    this.addressObj.user_id = localStorage.getItem('userId');
    let fData = new FormData();
    fData.append("user_id", this.addressObj.user_id);  
    fData.append("address", this.addressObj.address);          
    fData.append("landmark", this.addressObj.landmark); 
    fData.append("state", this.addressObj.state);          
    fData.append("pin_code", this.addressObj.pin_code);          
           
    const headers = new HttpHeaders({ 
      "x-api-key":"12345" ,
    })
    const profile = "update_address";
    this.http.post(this.baseUrl + profile, fData, {headers}).subscribe((data:any) => {
      // debugger
      if (data.status === false){
        this.toastr.errorToastr(data.data.error, 'Oops!', {position: 'bottom-center', toastTimeout:1000});
        // alert(data.message)
        this.addressForm.reset();
        // location.reload()
      } else {
        this.toastr.successToastr(data.message, 'Success!', {position: 'bottom-center', toastTimeout:1000});
        this.addressObj = new addressU;
        this.addressForm.reset();
        $('#addaddress').modal('hide');
        $('#editaddress').modal('hide');
        this.getUserAddress();
      }
  },
  err => {
    //debugger
    if (err && err.error && err.error){
      const errorMesg = err.error.message;
        this.toastr.errorToastr(errorMesg, 'Oops!', {position: 'bottom-center', toastTimeout:1000})
        this.addressForm.reset();
  
    }
        else {
          this.toastr.errorToastr('Something went wrong', 'Oops!', {position: 'bottom-center', toastTimeout:1000});
        }
  }
  );
  
  }

  editAddress(value) {
    this.addressObj = new addressU;
    this.addressObj.address = value.address;
    this.addressObj.landmark = value.Landmark;
    this.addressObj.state = value.state;
    this.addressObj.pin_code = value.pin_code;
    this.addressObj.user_id = value.user_id;
  }
  

  increment(item: any){
    // debugger
    this.addObj.product_id = item.product_id
    this.addObj.user_id = localStorage.getItem('userId');
    this.addObj.quantity = item.quantity;
    let fData = new FormData();
    fData.append("product_id", this.addObj.product_id);          
    fData.append("user_id", this.addObj.user_id);  
    fData.append("quantity", this.addObj.quantity); 
                    
    const headers = new HttpHeaders({ 
      "x-api-key":"12345" ,
    })
    const profile = "increment";
    this.http.post(this.baseUrl + profile, fData, {headers}).subscribe((data:any) => {
      // debugger
      if (data.status === false){
        this.toastr.errorToastr(data.data.error, 'Oops!', {position: 'bottom-center', toastTimeout:1000});
        // location.reload()
      } else {
        this.toastr.successToastr(data.message, 'Success!', {position: 'bottom-center', toastTimeout:1000});
        this.addObj = new addcart;
        // location.reload();
        this.getCartDetails();
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

  decrement(item: any){
    // debugger
    this.addObj.product_id = item.product_id
    this.addObj.user_id = localStorage.getItem('userId');
    this.addObj.quantity = item.quantity;
    let fData = new FormData();
    fData.append("product_id", this.addObj.product_id);          
    fData.append("user_id", this.addObj.user_id);  
    fData.append("quantity", this.addObj.quantity); 
                    
    const headers = new HttpHeaders({ 
      "x-api-key":"12345" ,
    })
    const profile = "decrement";
    this.http.post(this.baseUrl + profile, fData, {headers}).subscribe((data:any) => {
      if (data.status === false){
        this.toastr.errorToastr(data.data.error, 'Oops!', {position: 'bottom-center', toastTimeout:1000});
        // location.reload()
      } else {
        this.toastr.successToastr(data.message, 'Success!', {position: 'bottom-center', toastTimeout:1000});
        //delete if quantity is zero
        if(this.addObj.quantity-1==0)
        {
          this.deleteItem(item)
        }
        else{
          this.addObj = new addcart;
          // location.reload();
          this.getCartDetails();
        }
        
       
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

  getUserAddress(){
    // debugger
    this.id = localStorage.getItem('userId')
    this.service.getUserAddress(this.id).subscribe(
      (data:any)=> {
        // //debugger
      this.address= [data.data.user_address];
      // this.profileObj = Object.assign({}, this.profile.users);
  
    })
  }

  onSelect(item)
{
  // debugger
   this.isVisible = false;
   this.clickedUser = item;
}

deleteItem(item:any) {
  // debugger
  this.id = localStorage.getItem('userId')
  this.prodid = item.product_id;
  this.service.deleteCartItems(this.id, this.prodid).subscribe(
    (data:any) => {
      // debugger
      this.toastr.successToastr(data.message, 'Success!', {position: 'bottom-center', toastTimeout:1000})
    // this.products = data.data.products;
    setTimeout(function () {
      window.location.reload();
    }, 500);
    this.getCartDetails();
  },
  err => {
    let message = 'There is an issue with service. Please retry.';
    if (err.status === 400) {
      message = 'There is an error in getting list of sold to. Please retry.';

    }
  }
);

}

paymentSuccess(){
  // debugger
  this.paymentObj.user_id = localStorage.getItem('userId');
  this.paymentObj.razorpay_payment_id = localStorage.getItem('paymentId');;
  this.paymentObj.TXN_AMOUNT = localStorage.getItem('TxnAmount');
  this.paymentObj.ORDER_ID = localStorage.getItem('OrderId');

  let fData = new FormData();
  fData.append("user_id", this.paymentObj.user_id);  
  fData.append("razorpay_payment_id", this.paymentObj.razorpay_payment_id);          
  fData.append("TXN_AMOUNT", this.paymentObj.TXN_AMOUNT); 
  fData.append("ORDER_ID", this.paymentObj.ORDER_ID);          
         
  const headers = new HttpHeaders({ 
    "x-api-key":"12345" ,
  })
  const profile = "sccess_response";
  this.http.post(this.baseUrl + profile, fData, {headers}).subscribe((data:any) => {
    // debugger
    if (data.status === false){
      this.toastr.errorToastr(data.data), 'Oops!', {position: 'bottom-center', toastTimeout:1000};
      // alert(data.message)
      // location.reload()
    } else {
      this.toastr.successToastr(data.data, 'Success!', {position: 'bottom-center', toastTimeout:1000});
      this.paymentObj = new paymentC;
      // this.addressForm.reset();
      this.getCartDetails();
      setTimeout(function () {
        window.location.reload();
      }, 500); 
      // localStorage.setItem("Authorization", data);
      // localStorage.setItem("userId", data.user._id);

    }
},
err => {
  //debugger
  if (err && err.error && err.error){
    const errorMesg = err.error.message;
      this.toastr.errorToastr(errorMesg, 'Oops!', {position: 'bottom-center', toastTimeout:1000})
      this.addressForm.reset();

  }
      else {
        this.toastr.errorToastr('Something went wrong', 'Oops!', {position: 'bottom-center', toastTimeout:1000});
      }
}
);

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

  
}
