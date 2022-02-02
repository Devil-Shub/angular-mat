import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms'
import { AuthService } from '../../services/auth.service';
import { SplashService } from '../../services/splash.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm:any = FormGroup;
  submitForm = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private splashService: SplashService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required]
    });
  }

  // get f() { return this.registerForm.controls; }

  register() {
    this.submitForm = true;
    try {
      this.authService.register(this.registerForm.value).subscribe(response => {
        console.log(response);
        let respMsg = response['message'];
        if (response && response['success']) {
          this.splashService.flashMessage(respMsg);
          this.router.navigate(['/auth/login']);
        } else {
          this.splashService.flashMessage(respMsg);
        }
        this.submitForm = false;
      })
    } catch {
      this.submitForm = false;
      this.splashService.flashMessage("Internal Server Error!");
    }
  }

}
