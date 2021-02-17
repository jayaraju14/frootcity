import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment} from 'src/environments/environment';
import { Router } from '@angular/router';
import { loginM, loginOtp, signupM, signupOtp } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient, private router: Router){ }
  private baseUrl = environment.baseUrl;
  private apiUrl = environment.apiUrl;

   reqHeaders = new HttpHeaders(
      {'Content-type' : 'application/json', 'x-api-key': '12345'}
    )

  logout() {
    localStorage.clear();
    this.router.navigate(['/landing']);
  }

  getcategories(){
    const headers = new HttpHeaders({
      "Content-type" : "application/json", 
      "x-api-key":"12345" 
    })
    return this.http.get(this.baseUrl + "get_categories", {headers:headers});
  }

  slide(){
    const headers = new HttpHeaders({
      "Content-type" : "application/json", 
      "x-api-key":"12345" 
    })
    return this.http.get(this.baseUrl + "get_sliders", {headers:headers});
  }

  sendOtp(signupObj: signupM){
    const headers = new HttpHeaders({
      "Content-Type": "multipart/form-data", 
      "x-api-key":"12345",
      'Cookie': 'TwfCwMpULwigvnBt=28ee93fad659fc49111db562d7a6b026'

    })
    const sendOtp = "sendOtp";
    return this.http.post(this.baseUrl + sendOtp, signupObj, {headers:headers});  
  }

  register(verifySignupObj: signupOtp){
    const headers = new HttpHeaders({
      "Content-Type": "multipart/form-data", 
      "x-api-key":"12345" 
    })
    const verifySignupotp = "register";
    return this.http.post(this.baseUrl + verifySignupotp, verifySignupObj, {headers:headers});  
  }

  sendLoginOtp(loginObj: loginM){
    const headers = new HttpHeaders({
      "Content-Type": "multipart/form-data", 
      "x-api-key":"12345" ,
            'Cookie': "TwfCwMpULwigvnBt=28ee93fad659fc49111db562d7a6b026"

    })
    const sendOtp = "sendOtp";
    return this.http.post(this.baseUrl + sendOtp, loginObj, {headers:headers});  
  }

  login(verifyLoginObj: loginOtp){
    const headers = new HttpHeaders({
      "Content-Type": "multipart/form-data", 
      "x-api-key":"12345" 
    })
    const verifyLoginotp = "login_otp";
    return this.http.post(this.baseUrl + verifyLoginotp, verifyLoginObj, {headers:headers});  
  }

  getBestSellers(){
    const headers = new HttpHeaders({
      "Content-type" : "application/json", 
      "x-api-key":"12345" 
    })
    return this.http.get(this.baseUrl + "get_best_sellers", {headers:headers});
  }

  getProducts(slug: any){
    const headers = new HttpHeaders({
      "Content-type" : "application/json", 
      "x-api-key":"12345" 
    })
    return this.http.get(this.baseUrl + "category_products?slug=" + slug, {headers:headers});
  }

  getProductsbyId(slug: any){
    const headers = new HttpHeaders({
      "Content-type" : "application/json", 
      "x-api-key":"12345" 
    })
    return this.http.get(this.baseUrl + "products_details?slug=" + slug, {headers:headers});
    // return this.http.get(this.baseUrl + "product?slug=" + slug, {headers:headers});
  }

  getUserProfile(id: any){
    const headers = new HttpHeaders({
      "Content-type" : "application/json", 
      "x-api-key":"12345" 
    })
    return this.http.get(this.baseUrl + "user_profile?user_id=" + id, {headers:headers});
  }

  getUserAddress(id: any){
    const headers = new HttpHeaders({
      "Content-type" : "application/json", 
      "x-api-key":"12345" 
    })
    return this.http.get(this.baseUrl + "user_address?user_id=" + id, {headers:headers});
  }

  getCartDetails(id: any){
    const headers = new HttpHeaders({
      "Content-type" : "application/json", 
      "x-api-key":"12345" 
    })
    return this.http.get(this.baseUrl + "cart_details?user_id=" + id, {headers:headers});
  }

  deleteCartItems(id: any, prodid: any){
    const headers = new HttpHeaders({
      "Content-type" : "application/json", 
      "x-api-key":"12345" 
    })
    return this.http.get(this.baseUrl + "delete_item?user_id=" + id + '&' + "product_id=" + prodid,{headers:headers});
  }

  getRecommended(){
    const headers = new HttpHeaders({
      "Content-type" : "application/json", 
      "x-api-key":"12345" 
    })
    return this.http.get(this.baseUrl + "get_recommended_products", {headers:headers});
  }

  getFavourites(id: any){
    const headers = new HttpHeaders({
      "Content-type" : "application/json", 
      "x-api-key":"12345" 
    })
    return this.http.get(this.baseUrl + "favourites_details?user_id" + id, {headers:headers});
  }

  getOrders(id: any){
    const headers = new HttpHeaders({
      "Content-type" : "application/json", 
      "x-api-key":"12345" 
    })
    return this.http.get(this.baseUrl + "user_orders?user_id=" + id, {headers:headers});
  }

  getOrderDetailsByID(id: any){
    const headers = new HttpHeaders({
      "Content-type" : "application/json", 
      "x-api-key":"12345" 
    })
    return this.http.get(this.baseUrl + "user_order_products?order_id=" + id, {headers:headers});
  }

  search(search: any){
    const headers = new HttpHeaders({
      "Content-type" : "application/json", 
      "x-api-key":"12345" 
    })
    return this.http.get(this.baseUrl + "search_products?search=" + search, {headers:headers});
  }
} 
