import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Home } from './home/home';
import { Youtubesearch } from './youtubesearch/youtubesearch';
import { Favoritos } from './favoritos/favoritos';
import { Bienvenida } from './bienvenida/bienvenida';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: Home,
    children:[
      { path: '', component: Bienvenida },
      {path: 'buscar', component: Youtubesearch},
      {path: 'favoritos', component: Favoritos}
    ]
   }, 
];