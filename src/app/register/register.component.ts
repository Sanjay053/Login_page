import { Component , OnInit } from '@angular/core';
import { FormBuilder, FormGroup, MaxValidator, MinLengthValidator, PatternValidator, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service'
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';


interface RegistrationResponse {
  token: string;
  access_token: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit{
  first_name!: string;
  last_name!: string;
  username!: string;
  reg_no!: string;
  password!: string;
  dob!:Date;
  gender!: string;
  email!: string;
  phonenumber!: number;
  registerForm!: FormGroup;

  showSpinner: boolean = false;

  constructor(private formBuilder: FormBuilder, 
    private authService: AuthService, 
    private router: Router,
    private http: HttpClient,
    private location: Location) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      first_name: ['', [Validators.required, Validators.minLength(4)]],
      last_name: [''],
      username: ['', [Validators.required, Validators.minLength(4)]],
      dob: ['', Validators.required],
      address: ['nagercoil'],
      gender: ['male'],
      email: ['', [Validators.required, Validators.email]],
      phonenumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      password: ['', [Validators.required]],
      reg_no: ['', [Validators.required, Validators.pattern(/^1100\d{2}$/)]],      
    });
  }

  signup(){
    if(this.registerForm.valid){
      const registrationData = {
        first_name: this.registerForm.get('first_name')?.value,
        last_name: this.registerForm.get('last_name')?.value,
        username: this.registerForm.get('username')?.value,
        gender: this.registerForm.get('gender')?.value,
        phonenumber: this.registerForm.get('phonenumber')?.value,
        password: this.registerForm.get('password')?.value,
        dob: this.registerForm.get('dob')?.value,
        address: this.registerForm.get('address')?.value,
        email: this.registerForm.get('email')?.value,
        reg_no: this.registerForm.get('reg_no')?.value
      };
      this.showSpinner = true;
      this.http.post<RegistrationResponse>('https://final-vy64.onrender.com/register', registrationData)
      .subscribe(
        (response) => {
          console.log('Registration successful', response);
            this.showSpinner = false;
            this.router.navigate(['/login']);
        },
        (error) => {
          console.log('Registration failed', error);
          console.log(error.error.detail);          
          // Handle the error (e.g., show error message, enable/disable form elements)
          this.showSpinner = false;
        }
      );
  }     
}

goBack(): void {
  this.location.back();
}

}
// https://final-vy64.onrender.com/register