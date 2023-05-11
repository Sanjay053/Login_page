import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit{
  resetPasswordForm!: FormGroup;
  showSpinner: boolean= false;
  showModal: boolean = false;
  modalMessage: string = '';
  modalSuccessMessage: boolean = false;
  modalErrorMessage: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private location: Location) { }

  ngOnInit() {
    this.resetPasswordForm = this.fb.group({
      username: ['', Validators.required],
      password: [null, [Validators.required, Validators.minLength(6), Validators.pattern(/^[a-zA-Z0-9]*$/)]],
      confirmPassword: [null, Validators.required]
    }, {
      validator: this.passwordsMatchValidator
    });
  }

  Update() {
    if (this.resetPasswordForm.valid) {
      console.log('Updating password')
      this.showSpinner = true;
      const userdata = {
        username: this.resetPasswordForm.get('username')?.value,
        password: this.resetPasswordForm.get('password')?.value,
        confirmPassword: this.resetPasswordForm.get('confirmPassword')?.value
      };
        
      if (userdata.password !== userdata.confirmPassword) {
        console.error("Passwords do not match.");
        return;
      }
  
      this.http.put('https://final-vy64.onrender.com/forget_password', userdata).subscribe(
      (response) => {
        console.log('Response ', response);
        // Password successfully updated. Add any additional logic here.
        this.showSpinner = false;
        this.showModal = true; // Show the modal
        this.modalSuccessMessage = true;
        this.modalMessage = 'Password updated successfully.';
      },
      (error) => {
        console.log('error',error.error.detail);
        // Handle error response. Add any additional error handling logic here.
        this.showSpinner = false;
        this.showModal = true; // Show the modal
        this.modalErrorMessage = true;
        this.modalMessage = 'An error occurred while updating the password.';
      }
      );
    }
  }

  goBack(): void {
    this.location.back();
  }

  closeModal(): void {
    this.showModal = false;
  }  

  // confirmPassword
  passwordsMatchValidator(formGroup: FormGroup) {
    const username = formGroup.get('username');
    const password = formGroup.get('newPassword');
    const confirmPassword = formGroup.get('confirmPassword');   
  
    if (password && confirmPassword) {
      const passwordValue = password.value;
      const confirmPasswordValue = confirmPassword.value;
  
      if (passwordValue !== confirmPasswordValue) {
        confirmPassword.setErrors({ 'mismatch': true });
      } else {
        confirmPassword.setErrors(null);
      }
    }
  }
}
