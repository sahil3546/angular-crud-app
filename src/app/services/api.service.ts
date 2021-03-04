import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url = 'https://json-server-3546.herokuapp.com/users'; 
  constructor(public http: HttpClient) { }

  private extractData(res) {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.log(error);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };
  
  postService(params){
    return this.http
      .post(this.url, params)
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      )
  }

  getService(){
    return this.http.get(this.url).pipe( map(this.extractData), catchError(this.handleError) )
  }
 
  deleteUser(id){
    return this.http.delete(this.url+"/"+ id).pipe( map(this.extractData), catchError(this.handleError) )
  }
}
