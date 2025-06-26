import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './navigation.html',
  styleUrl: './navigation.css'
})
export class NavigationComponent {
  router = inject(Router);
  userName: string | null = '';

  ngOnInit(){
    this.userName = localStorage.getItem('user_name');
    if (!this.userName) {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
