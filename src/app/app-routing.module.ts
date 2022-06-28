import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookcommentComponent } from './component/bookcomment/bookcomment.component';
import { BookdetailsComponent } from './component/bookdetails/bookdetails.component';
import { ExchangeComponent } from './component/exchange/exchange.component';
import { FooterComponent } from './component/footer/footer.component';
import { HomeComponent } from './component/home/home.component';
import { LoanComponent } from './component/loan/loan.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { ProfileuserComponent } from './component/profileuser/profileuser.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { SidebarandcontentComponent } from './component/sidebarandcontent/sidebarandcontent.component';
import { SidebarhomeComponent } from './component/sidebarhome/sidebarhome.component';
import { SigninComponent } from './component/signin/signin.component';
import { SignupComponent } from './component/signup/signup.component';
import { ValueComponent } from './component/value/value.component';

const routes: Routes = [
  {path:'bookcomment',component: BookcommentComponent},
  {path:'bookdetails/:id',component: BookdetailsComponent},
  {path:'exchange',component: ExchangeComponent},
  {path:'footer',component: FooterComponent},
  {path:'home',component: HomeComponent},
  {path:'loan',component: LoanComponent},
  {path:'navbar',component: NavbarComponent},
  {path:'profileuser',component: ProfileuserComponent},
  {path:'sidebar',component: SidebarComponent},
  {path:'signin',component: SigninComponent},
  {path:'signup',component: SignupComponent},
  {path:'value',component: ValueComponent},
  {path:'sidebarandcontent', component: SidebarandcontentComponent},
  {path:'sidebarhome', component: SidebarhomeComponent},
  {path:'', component: HomeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
