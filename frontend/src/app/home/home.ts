import { Component } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [NavigationComponent,RouterOutlet],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
