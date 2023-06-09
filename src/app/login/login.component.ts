import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { EncryptionService } from './encryptionservice';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoggingIn = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private encryptionService: EncryptionService
  ) {}

  ngOnInit(): void {
    const storedUsername_or_email = localStorage.getItem('username_or_email');
    const storedPassword = localStorage.getItem('encryptedPassword');

    if (storedUsername_or_email && storedPassword) 
      this.loginForm = this.fb.group({
        username_or_email: [storedUsername_or_email, Validators.required],
        password: ['', Validators.required],
        rememberMe: [true]
      });
      if (storedPassword) {
        const decryptedPassword = this.encryptionService.decryptData(storedPassword);
        this.loginForm.get('password')?.setValue(decryptedPassword);
      }
     else {
      this.loginForm = this.fb.group({
        username_or_email: ['', Validators.required],
        password: ['', Validators.required],
        rememberMe: [false]
      });
    }
  }

  login() {
    if (this.loginForm.valid) {
      const username_or_email = this.loginForm.get('username_or_email')?.value;
      const password = this.loginForm.get('password')?.value;
      const rememberMe = this.loginForm.get('rememberMe')?.value;

      const encryptedPassword = this.encryptionService.encryptPassword(password);

      this.isLoggingIn = true;

      // console.log("username_or_email : ", username_or_email);
      // console.log("password : ", encryptedPassword);

      if (rememberMe) {
        localStorage.setItem('username_or_email', username_or_email);
        localStorage.setItem('encryptedPassword', encryptedPassword);
      } else {
        localStorage.removeItem('username_or_email');
        localStorage.removeItem('encryptedPassword');
      }

      this.authService.login(username_or_email, encryptedPassword).subscribe(
        (response: HttpResponse<any>) => {
          console.log(response);
          this.isLoggingIn = false;
          sessionStorage.setItem('authToken', response.body.access_token);
          localStorage.setItem('authToken', response.body.access_token);
          this.router.navigate(['/dashboard']);
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
