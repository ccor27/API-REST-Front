import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import{ HeaderComponent} from './header/header.component';
import{ FooterComponent} from './footer/footer.component';
import { DirectiveComponent } from './directive/directive.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomerService } from './customers/customer.service';
import { RouterModule, Routes} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './customers/form.component';
import { FormsModule } from '@angular/forms'

const routes: Routes = [
  {path:'',redirectTo:'/customers',pathMatch:'full'},
  {path:'directives',component: DirectiveComponent},
  {path:'customers',component: CustomersComponent},
  {path:'customer/form',component: FormComponent},
  {path:'customer/form/:id',component: FormComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectiveComponent,
    CustomersComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [CustomerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
