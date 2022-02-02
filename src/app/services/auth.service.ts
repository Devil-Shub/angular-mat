import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
  ) { }


  login(loginRequest: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, loginRequest);
  }

  logout() {
    //remove user info
    localStorage.removeItem("user");
    //remove user token
    localStorage.removeItem("user-token");
    return true
  }

  isLoggedIn$():boolean  {
    let getUserToken = localStorage.getItem("user-token");
    if(getUserToken == undefined || getUserToken == null) {
      return false;
    }
    return true;
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, data);
  }

}
