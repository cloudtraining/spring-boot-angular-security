import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/auth/auth.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isAuthenticated: boolean;
  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(public authService: AuthService,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['',Validators.required]
    });
  }

  tryRegister(value){
    this.authService.doRegister(value)
        .then(res => {
          console.log(res);
          this.errorMessage = "";
          this.successMessage = "Your account has been created";
          this.router.navigate(['/home']);
        }, err => {
          console.log(err);
          this.errorMessage = err.message;
          this.successMessage = "";
        })
  }

}
