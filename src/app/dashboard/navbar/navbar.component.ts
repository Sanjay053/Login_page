import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private authService: AuthService,
    private router: Router) {}

  ngOnInit(): void {}

  logout() {
    // this.authService.logout().subscribe(
    //   response =>{
    //     console.log(response);
        
    //     localStorage.removeItem('authToken');
    //     this.router.navigate(['/login']);
    //   },
    //   error => console.log(error)
    // )
    
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
        this.router.navigate(['']);
        console.log("logout")
    this.authService.logout();
  }

}
