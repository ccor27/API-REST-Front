import { Component, OnInit } from '@angular/core';
import { Customer } from './customer';
import { CustomerService } from './customer.service';
import swal from 'sweetalert2';

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

  delete(customer: Customer):void{

    (swal as any).fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.customerService.delete(customer.id).subscribe(
          response =>{
            this.customers = this.customers.filter(cus => cus !== customer)
            swal(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          }
        )
       
      }
    })
  }
}
