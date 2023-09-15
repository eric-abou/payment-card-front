import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment.development';
import { PaymentDetail } from './payment-detail';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {

  url: string = environment.apiBaseUrl + '/PaymentDetails';

  list: PaymentDetail[] = [];

  formData: PaymentDetail = new PaymentDetail();
  formSubmitted: boolean = false;

  constructor(private http: HttpClient) { }

  refreshList() {
    this.http.get(this.url).subscribe(
      {
        next: res => {
          this.list = res as PaymentDetail[];
        },
        error: err => {
          console.log(err);
        }
      }
    )
  }

  postPayment() {
    return this.http.post(this.url, this.formData)
  }

  putPayment() {
    return this.http.put(this.url + '/' + this.formData.paymentId, this.formData);
  }

  deletePayment(id: number) {
    return this.http.delete(this.url + '/' + id);
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.formData = new PaymentDetail();
    this.formSubmitted = false;
  }

}
