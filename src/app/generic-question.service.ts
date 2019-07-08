import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenericQuestionService {

  constructor(private http:HttpClient) { }

  getGenericQuestions() : Observable<any> {
     return this.http.get('http://localhost:8080/rest/getQuestions');
     
   }
 
}
