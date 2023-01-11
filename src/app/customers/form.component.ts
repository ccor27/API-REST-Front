import { Component, OnInit } from '@angular/core';
import { Customer } from './customer';
import { CustomerService } from './customer.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public  customer: Customer = new Customer();
  public title: string = "Create customer";
  public errors: string[];

  constructor(private customerService: CustomerService,
    private router: Router,
    private activatedRoute :ActivatedRoute) { }

  ngOnInit(): void{
  this.loadCustomer();
  }

  loadCustomer(): void{
    this.activatedRoute.params.subscribe(params => {
          let id = params['id']
          if ( id ) {
            this.customerService.getCustomer(id).subscribe( (customer) => this.customer = customer);
          }
        });
  }

   create(): void{
  this.customerService.create(this.customer).subscribe(
    customer =>{
       this.router.navigate(['/customers'])
       swal('New Customer',`Customer ${customer.name} created successfuly`,'success')
    },
    err =>{
      this.errors = err.error.errors as string[];
    }
  );
  }

  update(): void{
    this.customerService.update(this.customer)
    .subscribe( customer => {
      this.router.navigate(['/customers'])
      swal('Customer updated',`Customer ${customer.name} updated successfully`,'success')
    },
    err =>{
      this.errors = err.error.errors as string[];
    }   )
  }

}
