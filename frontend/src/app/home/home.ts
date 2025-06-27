import { Component } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation';
import { Youtubesearch } from '../youtubesearch/youtubesearch';

@Component({
  selector: 'app-home',
  imports: [NavigationComponent,Youtubesearch],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
