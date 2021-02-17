import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { BestSellerComponent } from './components/best-seller/best-seller.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { ProductdetailsComponent } from './components/productdetails/productdetails.component';
import { FirstnavComponent } from './components/common/firstnav/firstnav.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { CartComponent } from './components/cart/cart.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgOtpInputModule } from 'ng-otp-input';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ToastrModule } from 'ng6-toastr-notifications';
import { ProductsComponent } from './components/products/products.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TermsComponent } from './components/terms/terms.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { HomeComponent } from './components/home/home.component';
import { MainMenuCategoriesComponent } from './components/main-menu-categories/main-menu-categories.component';
import { CitrusComponent } from './components/citrus/citrus.component';
import { BerriesComponent } from './components/berries/berries.component';
import { AvacadoStoneFruitsComponent } from './components/avacado-stone-fruits/avacado-stone-fruits.component';
import { AppleAndPearsComponent } from './components/apple-and-pears/apple-and-pears.component';
import { RecommendedProductsComponent } from './components/recommended-products/recommended-products.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { DataTablesModule } from 'angular-datatables';
import { BlogComponent } from './components/blog/blog.component';
import { NewsComponent } from './components/news/news.component';
import { HelpComponent } from './components/help/help.component';
import { FaqsComponent } from './components/faqs/faqs.component';
import { SupportComponent } from './components/support/support.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { OffersComponent } from './components/offers/offers.component';
import { FileUploadModule } from 'ng2-file-upload';
// import { NgxStripeModule } from 'ngx-stripe';


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    BestSellerComponent,
    WishlistComponent,
    ProductdetailsComponent,
    FirstnavComponent,
    FooterComponent,
    CartComponent,
    ProductsComponent,
    ProfileComponent,
    TermsComponent,
    AboutusComponent,
    HomeComponent,
    MainMenuCategoriesComponent,
    CitrusComponent,
    BerriesComponent,
    AvacadoStoneFruitsComponent,
    AppleAndPearsComponent,
    RecommendedProductsComponent,
    MyOrdersComponent,
    BlogComponent,
    NewsComponent,
    HelpComponent,
    FaqsComponent,
    SupportComponent,
    ContactusComponent,
    PrivacyPolicyComponent,
    OffersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CarouselModule,
    DataTablesModule,
    FileUploadModule,
    // NgxStripeModule,
    NgOtpInputModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
