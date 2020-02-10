import { Component, OnInit } from '@angular/core';
import {AuthService} from "./shared/auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client';
  isAuthenticated: boolean;

  constructor(public authService: AuthService) {
  }

  async ngOnInit() {

  }
}
