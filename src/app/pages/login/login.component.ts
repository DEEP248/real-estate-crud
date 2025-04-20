import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userForm : FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });
  router = inject(Router);

  onLogin() {
    const formsvalue = this.userForm.value;
    if (formsvalue.username == 'sa' && formsvalue.password == 'admin') {
      this.router.navigateByUrl('dashboard');
    }
    else {
      alert("Access denied. Your credentials were too shy to show up.");
    }
  }
  onForgotPassword() {
    alert("Wow... forgetting your password already? Impressive. 👏");
  }

  onSignUP() {
    alert("Sign up? Nah bro, this is VIP — members only. 🚫🕶️");
  }
}
