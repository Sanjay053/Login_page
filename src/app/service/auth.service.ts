import { AuthGuardGuard } from './../authguard/auth-guard.guard';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { LoginGuardGuard } from '../loginguard/login-guard.guard';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authToken: string | null = localStorage.getItem('authToken');

  constructor(private http: HttpClient, private router: Router) {}
  

  // login
  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post('https://final-vy64.onrender.com/token', body, {observe: 'response'}).pipe(
      tap((response: any)=> {
        this.authToken = response.token;
        localStorage.setItem('authToken', this.authToken ?? '');
        this.router.navigate(['']);
      })
    );
  }

  logout() {
    this.authToken = null;
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  isAuthenticated() {
    return this.authToken !== null;
  }
}
