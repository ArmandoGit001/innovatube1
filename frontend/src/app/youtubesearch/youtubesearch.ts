import { Component } from '@angular/core';
import { YoutubeService } from '../services/youtube.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-youtubesearch',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './youtubesearch.html',
  styleUrl: './youtubesearch.css'
})
export class Youtubesearch {
  query: string = '';
  resultados: any[] = [];//lista de videos en resultados
  favoritos: any[] = [];  //guardaremos favoritos

  constructor(private youtubeService: YoutubeService) {}

  buscar() {
    if (!this.query.trim()) return;

    console.log('Buscando:', this.query); // TESTING: Comment para verificación (buscando)
    this.youtubeService.buscarVideos(this.query).subscribe({
      next: (res) => {
        console.log('Resultados:', res);  // TESTING:Comment para verificación de resultados
        this.resultados = res.items;
      },
      error: (err) => {
        console.error('Error al buscar:', err);
      }
    });
  }

  esFavorito(video: any): boolean {
    return this.favoritos.some(v => v.id.videoId === video.id.videoId);
  }
  
  agregarAFavoritos(video: any): void {
    if (this.esFavorito(video)) {
      // Si ya es favorito, lo quitamos
      this.favoritos = this.favoritos.filter(v => v.id.videoId !== video.id.videoId);
      console.log('Eliminado de favoritos:', video);
    } else {
      // Si no es favorito, lo agregamos
      this.favoritos.push(video);
      console.log('Agregado a favoritos:', video);
    }
  }
  
}
