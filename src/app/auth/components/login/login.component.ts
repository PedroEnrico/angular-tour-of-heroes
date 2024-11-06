import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form = this.fb.group({
    email: [{value: 'tour@of.heroes', disabled: true},
      [Validators.email, Validators.required]
    ],
    password: ['', [Validators.required, Validators.minLength(10)]]
  })

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  onSubmit(): void {
    // Formulario está valido? 
    if (this.form.valid) {
      // value = email e password
      this.authService.login(this.form.value);
    }
  }
}
