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
    this.youtubeService.buscarVideos(this.query).subscribe({  //llamamos al servicio para que haga get al backend
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
    const videoId = video?.id?.videoId || video?.videoId;
    return this.favoritos.some(v => v.videoId === videoId);
  }  

  //cargar favoritos previamente guardados
  ngOnInit(): void {
    const user_name = localStorage.getItem('user_name');
    if (user_name) {
      this.youtubeService.getFavoritos(user_name).subscribe({
        next: (data) => {
          this.favoritos = data;
          console.log('Favoritos cargados:', this.favoritos);
        },
        error: (err) => {
          console.error('Error al cargar favoritos:', err);
        }
      });
    }
  }
  
  
  //Agregar favoritos
  agregarAFavoritos(video: any): void {
    const user_name = localStorage.getItem('user_name');
    if (!user_name) return;
  
    const videoId = video.id?.videoId || video.videoId;
  
    if (this.esFavorito(video)) {
      this.favoritos = this.favoritos.filter(v => v.videoId !== videoId);
  
      this.youtubeService.eliminarFavorito(user_name, videoId).subscribe({
        next: () => console.log('Favorito eliminado en backend'),
        error: err => console.error('Error al eliminar favorito:', err)
      });
    } else {
      const videoFavorito = {
        videoId,
        title: video.snippet?.title || video.title,
        thumbnail: video.snippet?.thumbnails?.medium?.url || video.thumbnail,
        channel: video.snippet?.channelTitle || video.channel
      };
  
      this.favoritos.push(videoFavorito);
  
      this.youtubeService.addFavorito(user_name, videoFavorito).subscribe({
        next: () => console.log('Favorito guardado en backend'),
        error: err => console.error('Error al guardar favorito:', err)
      });
    }
  }
  
  
  trackByVideoId(index: number, video: any): string {
    return video?.id?.videoId || video?.videoId || index.toString();
  }
}
