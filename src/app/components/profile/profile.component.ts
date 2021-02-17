import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { addressU, profileU } from 'src/app/models/user';
import { DataService } from 'src/app/service/data.service';
import { environment } from 'src/environments/environment';

declare const $: any;


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: any;
  addressForm: FormGroup;
  male: boolean;
  female: boolean;
  profileObj: profileU = new profileU();
  addressObj: addressU = new addressU();
  profile: any;
  edit = false;
  id: string;
  address: any;
  fileToUpload: any;


  constructor(private service:DataService, private router: Router,private toastr: ToastrManager, private http: HttpClient) { }
  private baseUrl = environment.baseUrl;

  ngOnInit(){
    this.getUserProfile();
    this.getUserAddress();
    this.profileForm = new FormGroup({
      first_name: new FormControl(''),
      last_name: new FormControl(''),
      email: new FormControl(''),
      profilepic: new FormControl(''),
      });

      this.addressForm = new FormGroup({
        address: new FormControl(''),
        landmark: new FormControl(''),
        state: new FormControl(''),
        pin_code: new FormControl(''),
        });
  }

  gender(type: number) {
    // debugger
    if(type == 1){
      this.profileObj.gender = 'Female';
    }
    this.profileObj.gender = 'Male';
  }

  upload(files: FileList) {
    debugger
    this.profileObj.profilepic = files.item(0);
    return false;
  }

profileUpdate(){
  // debugger
  this.profileObj.user_id = localStorage.getItem('userId');
  let fData = new FormData();
  fData.append("user_id", this.profileObj.user_id);  
  fData.append("first_name", this.profileObj.first_name);          
  fData.append("last_name", this.profileObj.last_name); 
  fData.append("email", this.profileObj.email);          
  fData.append("gender", this.profileObj.gender); 
  fData.append("profilepic", this.profileObj.profilepic);          
         
         
  const headers = new HttpHeaders({ 
    "x-api-key":"12345" ,
  })
  const profile = "update_profile";
  this.http.post(this.baseUrl + profile, fData, {headers}).subscribe((data:any) => {
    // debugger
    if (data.status === false){
      this.toastr.errorToastr(data.data.error, 'Oops!', {position: 'bottom-center', toastTimeout:1000});
      // alert(data.message)
      this.profileForm.reset();
      // location.reload()
    } else {
      this.toastr.successToastr(data.message, 'Success!', {position: 'bottom-center', toastTimeout:1000});
      this.profileObj = new profileU;
      this.profileForm.reset();
      $('#editmodal').modal('hide');
      setTimeout(function () {
        window.location.reload();
      }, 500);
      this.getUserProfile();
      // localStorage.setItem("Authorization", data);
      // localStorage.setItem("userId", data.user._id);

    }
},
err => {
  //debugger
  if (err && err.error && err.error){
    const errorMesg = err.error.message;
      this.toastr.errorToastr(errorMesg, 'Oops!', {position: 'bottom-center', toastTimeout:1000})
      this.profileForm.reset();

  }
      else {
        this.toastr.errorToastr('Something went wrong', 'Oops!', {position: 'bottom-center', toastTimeout:1000});
      }
}
);

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
      this.getUserAddress();
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

getUserProfile(){
  // debugger
  this.id = localStorage.getItem('userId')
  this.service.getUserProfile(this.id).subscribe(
    (data:any)=> {
      // //debugger
    this.profile= [data.data.users];
    localStorage.setItem('firstname', data.data.users.first_name);
    localStorage.setItem('lastname', data.data.users.last_name);
    this.profileObj = Object.assign({}, this.profile.users);

  })
}


editProfile(value) {
    this.profileObj = new profileU;
    this.profileObj.first_name = value.first_name;
    this.profileObj.last_name = value.last_name;
    this.profileObj.email = value.email;
    this.profileObj.gender = value.referenceId;
    this.profileObj.user_id = value.user_id;
}

editAddress(value) {
  this.addressObj = new addressU;
  this.addressObj.address = value.address;
  this.addressObj.landmark = value.Landmark;
  this.addressObj.state = value.state;
  this.addressObj.pin_code = value.pin_code;
  this.addressObj.user_id = value.user_id;
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



}
