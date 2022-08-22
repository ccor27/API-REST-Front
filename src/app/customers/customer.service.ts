import { Injectable } from '@angular/core';
import { CUSTOMERS } from './customers.json';
import { Customer } from './customer';
import { of,Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class CustomerService {

private urlEnpointCustomers: string = 'http://localhost:8080/api/customers';
private urlEnpointCustomer: string = 'http://localhost:8080/api/customer';
//private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<Customer[]>{
    //return of(CUSTOMERS);
    return this.http.get<Customer[]>(this.urlEnpointCustomers);
  }

  create(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.urlEnpointCustomer,customer,{headers: this.getCommonHeaders()})
  }

  private getCommonHeaders(){
    const headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    headers.append('Access-Control-Allow-Origin','*');
    headers.append('Access-Control-Allow-Credentials','true');
    return headers;
  }

  getCustomer(id): Observable<Customer>{
    return this.http.get<Customer>(`${this.urlEnpointCustomer}/${id}`)
  }
}
