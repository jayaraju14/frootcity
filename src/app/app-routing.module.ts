import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { AppleAndPearsComponent } from './components/apple-and-pears/apple-and-pears.component';
import { AvacadoStoneFruitsComponent } from './components/avacado-stone-fruits/avacado-stone-fruits.component';
import { BerriesComponent } from './components/berries/berries.component';
import { BestSellerComponent } from './components/best-seller/best-seller.component';
import { BlogComponent } from './components/blog/blog.component';
import { CartComponent } from './components/cart/cart.component';
import { CitrusComponent } from './components/citrus/citrus.component';
import { FirstnavComponent } from './components/common/firstnav/firstnav.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { FaqsComponent } from './components/faqs/faqs.component';
import { HelpComponent } from './components/help/help.component';
import { HomeComponent } from './components/home/home.component';
import { LandingComponent } from './components/landing/landing.component';
import { MainMenuCategoriesComponent } from './components/main-menu-categories/main-menu-categories.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { NewsComponent } from './components/news/news.component';
import { OffersComponent } from './components/offers/offers.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { ProductdetailsComponent } from './components/productdetails/productdetails.component';
import { ProductsComponent } from './components/products/products.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RecommendedProductsComponent } from './components/recommended-products/recommended-products.component';
import { SupportComponent } from './components/support/support.component';
import { TermsComponent } from './components/terms/terms.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';


const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', component: LandingComponent },
  { path: 'home', component: HomeComponent },
  { path: 'Best-seller', component: BestSellerComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'productdetails', component: ProductdetailsComponent },
  { path: 'firstnav', component: FirstnavComponent },
  { path: 'footer', component:FooterComponent },
  { path: 'cart', component:CartComponent },
  { path: 'my-orders', component:MyOrdersComponent },
  { path: 'products', component:ProductsComponent },
  // { path: 'product', component:ProductsComponent },
  // { path: 'search/:search', component:ProductsComponent },
  { path: 'all', component:MainMenuCategoriesComponent },
  { path: 'avacado-stone-fruits', component:AvacadoStoneFruitsComponent },
  { path: 'apple-and-pears', component:AppleAndPearsComponent },
  { path: 'berries', component:BerriesComponent },
  { path: 'citrus', component:CitrusComponent },
  { path: 'recommended-products', component:RecommendedProductsComponent },
  { path: 'profile', component:ProfileComponent },
  { path: 'terms', component:TermsComponent },
  { path: 'aboutus', component:AboutusComponent },
  { path: 'blog', component:BlogComponent },
  { path: 'news', component:NewsComponent },
  { path: 'help', component:HelpComponent },
  { path: 'faqs', component:FaqsComponent },
  { path: 'support', component:SupportComponent},
  { path: 'contactus', component:ContactusComponent },
  { path: 'privacy-policy', component:PrivacyPolicyComponent },
  { path: 'offers', component:OffersComponent},










];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
