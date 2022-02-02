import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms'
import { AuthService } from '../../services/auth.service';
import { SplashService } from '../../services/splash.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm:any = FormGroup;
  submitForm = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private splashService: SplashService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.email],
      password: ['', Validators.required]
    });
  }

  // get f() { return this.loginForm.controls; }

  login() {
    this.submitForm = true;
    try {
      this.authService.login(this.loginForm.value).subscribe(response => {
        console.log(response);
        if (response && response['success']) {
          //set local profile
          localStorage.setItem('user', JSON.stringify(response['data']));
          //  between page refreshes
          const accessToken = response['token'];
          localStorage.setItem('user-token', accessToken);
          this.splashService.flashMessage(response['message']);
          this.router.navigate(['/user/dashboard']);
        } else {
          this.splashService.flashMessage(response['message']);
        }
        this.submitForm = false;
      })
    } catch {
      this.submitForm = false;
      this.splashService.flashMessage("Internal Server Error!");
    }
  }

}
