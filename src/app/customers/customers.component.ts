import { Component, OnInit } from '@angular/core';
import { Customer } from './customer';
import { CustomerService } from './customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html'
})
export class CustomersComponent implements OnInit {

customers : Customer[];
  constructor(private customerService: CustomerService) { }

  ngOnInit() {
   this.customerService.getCustomers().subscribe(
     customers => this.customers = customers
   );
  }

}
