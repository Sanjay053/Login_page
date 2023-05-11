import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service'


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  logout() {
    console.log("logout")
    this.authService.logout();
  }

}
