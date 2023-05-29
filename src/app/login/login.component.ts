import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  username!: string;
  password!: string;
  loginForm!: FormGroup;
  isLoggingIn = false;


  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    const storeusername =  localStorage.getItem('username');
    const storepassword =  localStorage.getItem('password');

    if(storeusername && storepassword) {
      this.loginForm = this.fb.group({
        username: [storeusername, Validators.required],
        password: [storepassword, Validators.required],
        rememberMe: [true]
      });
    } else {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });  
  }
} 

  login() {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;
      const rememberMe = this.loginForm.get('rememberMe')?.value;
  
      this.isLoggingIn = true;
      this.authService.login(username, password).subscribe(
        (response: HttpResponse<any>) => {
          console.log(response);
          this.isLoggingIn = false;
  
          // Store the auth token in localStorage if "Remember Me" is checked
          sessionStorage.setItem('authToken', response.body.access_token);  

          if (rememberMe) {
            console.log('remember me ?')
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
          }else{
            localStorage.removeItem('username');
            localStorage.removeItem('password');
          }
  
          this.router.navigate(['']);
        },
        (error) => {
          this.isLoggingIn = false;
          console.error(error);
          // handle failed login here
        }
      );
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
  
}
   