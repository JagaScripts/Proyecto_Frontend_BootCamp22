import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoanComponent } from './component/loan/loan.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { SignupComponent } from './component/signup/signup.component';
import { SigninComponent } from './component/signin/signin.component';
import { BookdetailsComponent } from './component/bookdetails/bookdetails.component';
import { HomeComponent } from './component/home/home.component';
import { ValueComponent } from './component/value/value.component';
import { ProfileuserComponent } from './component/profileuser/profileuser.component';
import { ProfileadminComponent } from './component/profileadmin/profileadmin.component';
import { FooterComponent } from './component/footer/footer.component';
import { ExchangeComponent } from './component/exchange/exchange.component';
import { BookcommentComponent } from './component/bookcomment/bookcomment.component';
import { TableexchangeComponent } from './component/tableexchange/tableexchange.component';
import { TablevalueComponent } from './component/tablevalue/tablevalue.component';
import { TableloanComponent } from './component/tableloan/tableloan.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarandcontentComponent } from './component/sidebarandcontent/sidebarandcontent.component';
import { TablebooksComponent } from './component/tablebooks/tablebooks.component';
import { SidebarhomeComponent } from './component/sidebarhome/sidebarhome.component';
import { HttpClientModule, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './helpers/auth.interceptor';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './component/dialog/dialog.component';
import { DialogbookComponent } from './component/add/dialogbook/dialogbook.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { ModalfilaborradaComponent } from './component/add/modalfilaborrada/modalfilaborrada.component';
import { DialogintercambiarsolicitudComponent } from './component/add/dialogintercambiarsolicitud/dialogintercambiarsolicitud.component';
import { DialogintercambiargestionComponent } from './component/add/dialogintercambiargestion/dialogintercambiargestion.component';
import { DialogreservasolicitudComponent } from './component/add/dialogreservasolicitud/dialogreservasolicitud.component';
import { DialogreservagestionComponent } from './component/add/dialogreservagestion/dialogreservagestion.component';
import { DialogvalorarComponent } from './component/add/dialogvalorar/dialogvalorar.component';
@NgModule({
  declarations: [
    AppComponent,
    LoanComponent,
    SidebarComponent,
    NavbarComponent,
    SignupComponent,
    SigninComponent,
    BookdetailsComponent,
    HomeComponent,
    ValueComponent,
    ProfileuserComponent,
    ProfileadminComponent,
    FooterComponent,
    ExchangeComponent,
    BookcommentComponent,
    TableexchangeComponent,
    TablevalueComponent,
    TableloanComponent,
    SidebarandcontentComponent,
    TablebooksComponent,
    SidebarhomeComponent,
    DialogComponent,
    DialogbookComponent,
    ModalfilaborradaComponent,
    DialogintercambiarsolicitudComponent,
    DialogintercambiargestionComponent,
    DialogreservasolicitudComponent,
    DialogreservagestionComponent,
    DialogvalorarComponent,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], //necesario para las tablas
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSnackBarModule,


  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
