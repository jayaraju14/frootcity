export class signupM {
    // name: any;
    // email: any;
    // password: any;
    mobile_number_login: any;
  }

  export class signupOtp {
    mobile_number_register: any;
    session_otp: any;
    otp: any;
  }

  export class loginM {
    mobile_number_login: any;
  }

  export class loginOtp {
    mobile_number_login: any;
    session_otp_login: any;
    otp_login: any;
  }

  export class profileU {
    user_id: any;
    first_name: any;
    last_name: any;
    email: any;
    gender: any;
    profilepic: any;
  }

  export class addressU {
    user_id: any;
    address: any;
    landmark: any;
    state: any;
    pin_code: any;
  }

  export class addcart {
    user_id: any;
    product_id: any;
    quantity: any;
  }

  export class confirmP {
    user_id: any;
    total_price_input: any;
    product_id: any;
    product_qty: any;
    order_array_input: any;
  }

  export class paymentC {
    user_id: any;
    razorpay_payment_id: any;
    TXN_AMOUNT: any;
    ORDER_ID: any;
  }

  export class favourite {
    user_id: any;
    product_id: any;
    favourite: any;
  }

  export class rating {
    user_id: any;
    product_id: any;
    rating: any;
  }
