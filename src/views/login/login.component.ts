import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  credentials: Credentials = {
    email: '',
    password: '',
  };

  private auth = inject(AuthService);
  private router = inject(Router);

  onSubmit = (form: HTMLFormElement) => {
    if (form.checkValidity()) {
      this.auth.login(this.credentials).subscribe({
        next: () => this.router.navigate(['/home']),
        error: (error) => console.log(error),
      });
      form.reset();
    }
  };
}

export interface Credentials {
  email: string;
  password: string;
}