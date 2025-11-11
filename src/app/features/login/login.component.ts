import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  mobileId: string = '9cb2fcb2de1c71e8';

  constructor(private loginService: LoginService, private router: Router) { }

  onLogin(form: NgForm) {
    if (form.invalid) return;

    this.loginService.login(this.username, this.password, this.mobileId)
      .subscribe({
        next: (res) => {
          console.log('Login successful', res);

          if (res && res.access_token) {
            localStorage.setItem('token', res.access_token);
            this.router.navigate(['/seafarers']);
          } else {
            alert('Login failed: invalid response from server');
          }
        },
        error: (err) => {
          console.error('Login error', err);
          alert('Login failed: ' + (err.error?.error_description || err.statusText));
        }
      });
  }
}
