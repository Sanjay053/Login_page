import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authToken: string | null = localStorage.getItem('authToken');

  constructor(private http: HttpClient, private router: Router) {}
  

  // login
  login(username_or_email: string, password: string): Observable<any> {
    const body = { username_or_email, password };
    return this.http.post('https://logintask-deployment.onrender.com/login', body, {observe: 'response'}).pipe(
      tap((response: any)=> {
        this.authToken = response.token;
        localStorage.setItem('authToken', this.authToken ?? '');
      })
    );
  }

  // register
  signup(registrationData: any){
    return this.http.post('https://logintask-deployment.onrender.com/register', registrationData, { observe: 'response'})
  }

  // logout
  logout(){ 
    this.authToken = null;
    // return this.http.post('https://logintask-deployment.onrender.com/logout',{observe: 'response'})
    
  }

  //forgetpassword
  forgetpassword(userdata: any){
    return this.http.put('https://final-vy64.onrender.com/forget_password', userdata)

  }


  isAuthenticated() {
    return this.authToken !== null;
  }
}
