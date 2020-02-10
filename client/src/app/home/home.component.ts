import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from "../shared/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isAuthenticated: boolean;
  loginForm: FormGroup;
  errorMessage = '';

  constructor(public authService: AuthService,
              private router: Router,
              private fb: FormBuilder) {
  }

  async ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  tryLogin(value) {
    this.authService.doLogin(value)
      .then(res => {
        // this.router.navigate(['/car-list']);
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
      });
  }
}
