import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authToken: string | null = localStorage.getItem('authToken');

  constructor(private http: HttpClient, private router: Router) {}
  

  // signup
//   signup(first_name: string,last_name: string, username: string, password: string,
//     reg_no: string, email: string, gender : string, address: string,dob: string,phonenumber: string) {
// const inside = {first_name, last_name,username,password,reg_no,email,gender,address,dob,phonenumber}
//     return this.http.post('https://final-vy64.onrender.com/register',inside, {observe: 'response'} ).pipe(
//       tap((response: any) => 
//       console.log(response))
//     )
     
//   }

  // login
  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post('https://final-vy64.onrender.com/token', body, {observe: 'response'}).pipe(
      tap((response: any)=> {
        this.authToken = response.token;
        // localStorage.setItem('authToken', this.authToken ?? '');
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

// AuthGuard

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isAuthenticated = this.authService.isAuthenticated();
    if (isAuthenticated) {
      
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}