import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
constructor(private authService: AuthService) {}

  title = 'news-mouse';
  userEmail: string = '';
  userPass: string = '';
  userAuthenticated: boolean = false;

  ngOnInit() {
    this.authService.userAuthenticated$.subscribe(isAuthenticated => {
      this.userAuthenticated = isAuthenticated;
    })
  }

  loginUser() {
    this.authService.loginUser(this.userEmail, this.userPass, (response) => {
      if (response.success) {
        console.log("SUCCESS:", response);
      } else {
        console.log("FAILURE:", response);
      }
    })
  }
}
