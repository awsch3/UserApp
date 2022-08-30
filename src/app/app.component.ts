import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'userApp';
  baseUrl = 'http://localhost:8080/';
  users:Observable<any>;
  
  constructor(private http: HttpClient) {
    this.users = new Observable();
    this.getUsers();
  }

  getUsers() {
    this.users = this.http.get(`${this.baseUrl}users`);
  }

  onSubmit(input:NgForm) {
    this.http.post(`${this.baseUrl}user`, input.value, {
      responseType: 'text'
    }).subscribe(response=>{
      if(response) {
        console.log(response)
        this.getUsers();
        input.reset();
      }
    });
  }

}
