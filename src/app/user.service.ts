import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  saveUserProfile(formData:FormData) : Observable<any> {
   // return this.http.post('http://localhost:8080/user/upload',formData);
    return this.http.post('http://localhost:8080/user/genpdf',formData);
    
  }

}
