import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  sendData(data:any) : Observable<any> {

     let headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});

   //  return this.http.post('http://localhost:8080/rest/postData2',data,{headers:headers});
     return this.http.post('http://localhost:8080/rest/postData',data);

     
   }


  
}
