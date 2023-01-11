import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import { CUSTOMERS } from './customers.json';
import { Customer } from './customer';
import { of,Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import swal from 'sweetalert2';

import { Router } from '@angular/router';

@Injectable()
export class CustomerService {

private urlEnpointCustomers: string = 'http://localhost:8080/api/customers';
private urlEnpointCustomer: string = 'http://localhost:8080/api/customer';
private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient, private router: Router) { }

  getCustomers(): Observable<Customer[]>{
    //return of(CUSTOMERS);
    return this.http.get<Customer[]>(this.urlEnpointCustomers)
    .pipe(
      map(response => {
      let customers =  response as Customer[];
      return customers.map(customer =>{
        customer.name = customer.name.toUpperCase();
        customer.createAt = formatDate(customer.createAt,'dd-MM-yyyy','en-US');
        return customer;
      });
      })
    );
  }

  create(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.urlEnpointCustomer,customer,{headers: this.getCommonHeaders()})
    .pipe(
      catchError(e=>{

        if(e.status==400){
          return throwError(() => e);
        }

        console.error(e.error.Message);
          swal('Create error',e.error.Message,'error');
          return throwError(() => e);
      })
    );
  }

  private getCommonHeaders(){
    const headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    headers.append('Access-Control-Allow-Origin','*');
    headers.append('Access-Control-Allow-Credentials','true');
    return headers;
  }

  getCustomer(id): Observable<Customer>{
    return this.http.get<Customer>(`${this.urlEnpointCustomer}/${id}`).pipe(
      catchError(e =>{
          this.router.navigate(['/customers']);
          console.error(e.error.Message);
          swal('Edit error',e.error.Message,'error');
          return throwError(() => e);
       })
    );
  }

  update(customer : Customer): Observable<Customer>{
    return this.http.put<Customer>(`${this.urlEnpointCustomer}/${customer.id}`,customer,{headers: this.httpHeaders})
    .pipe(
      catchError(e=>{

        if(e.status==400){
          return throwError(() => e);
        } 

        console.error(e.error.Message);
          swal('Update error',e.error.Message,'error');
          return throwError(() => e);
      })
    );
  }
  delete(id : number){
    return this.http.delete<Customer>(`${this.urlEnpointCustomer}/${id}`,{headers: this.httpHeaders})
    .pipe(
      catchError(e=>{
        console.error(e.error.Message);
          swal('Delete error',e.error.Message,'error');
          return throwError(() => e);
      })
      );
  }
}
