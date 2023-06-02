// import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../service/auth.service';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { HttpResponse } from '@angular/common/http';
// import { AES, enc } from 'crypto-js';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {
//   loginForm!: FormGroup;
//   isLoggingIn = false;
//   secretKey = '206c10c99d6246f784005331e384df6d13e2056b2d0037bef81de611efb62e03';


//   constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {}

//   ngOnInit(): void {
//     const storedUsername_or_email = localStorage.getItem('encryptedUsername');
//     const storedPassword = localStorage.getItem('encryptedPassword');

//     if (storedUsername_or_email && storedPassword) {
//       const decryptedUsername_or_email = this.decryptData(storedUsername_or_email);
//       const decryptedPassword = this.decryptData(storedPassword);

//       this.loginForm = this.fb.group({
//         username_or_email: [decryptedUsername_or_email, Validators.required],
//         password: [decryptedPassword, Validators.required],
//         rememberMe: [true]
//       });
//     } else {
//       this.loginForm = this.fb.group({
//         username_or_email: ['', [Validators.required]],
//         password: ['', [Validators.required]],
//         rememberMe: [false]
//       });
//     }
//   }

//   login() {
//     if (this.loginForm.valid) {
//       const username_or_email = this.loginForm.get('username_or_email')?.value;
//       const password = this.loginForm.get('password')?.value;
//       const rememberMe = this.loginForm.get('rememberMe')?.value;

//       const encryptedUsername_or_email = this.encryptData(username_or_email);
//       const encryptedPassword = this.encryptData(password);
//       // const decryptedUsername_or_email = this.decryptData(username_or_email);

//       this.isLoggingIn = true;

//       console.log("username_or_email : ", encryptedUsername_or_email);
//       console.log("password : ", encryptedPassword);
//       console.log("username : ",this.decryptData(username_or_email));

//        if (rememberMe) {
//             localStorage.setItem('encryptedUsername', encryptedUsername_or_email);
//             localStorage.setItem('encryptedPassword', encryptedPassword);
//           } else {
//             localStorage.removeItem('encryptedUsername');
//             localStorage.removeItem('encryptedPassword');
//           }
      
//       this.authService.login(encryptedUsername_or_email, encryptedPassword).subscribe(
//         (response: HttpResponse<any>) => {
//           console.log(response);
//           this.isLoggingIn = false;
//           sessionStorage.setItem('authToken', response.body.access_token);

//           this.router.navigate(['']);
//         },
//         (error) => {
//           this.isLoggingIn = false;
//           console.error(error);
//           // handle failed login here
//         }
//       );
//     } else {
//       this.loginForm.markAllAsTouched();
//     }
//   }

//   encryptData(data: string): string {
//     return AES.encrypt(data, this.secretKey).toString();
//   }

//   decryptData(data: string): string {
//     const decryptedData = AES.decrypt(data, this.secretKey).toString(enc.Utf8);
//     return decryptedData;
//   }  
// }


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

      console.log("username_or_email : ", username_or_email);
      console.log("password : ", encryptedPassword);

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
