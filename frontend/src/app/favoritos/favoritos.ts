import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { YoutubeService } from '../services/youtube.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-favoritos',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './favoritos.html',
  styleUrl: './favoritos.css'
})
export class Favoritos implements OnInit {
  favoritos: any[] = [];

  constructor(private youtubeService: YoutubeService) {}

  ngOnInit(): void {
    const user_name = localStorage.getItem('user_name');
    if (user_name) {
      this.youtubeService.getFavoritos(user_name).subscribe({
        next: (data) => {
          this.favoritos = data;
        },
        error: (err) => {
          console.error('Error al obtener favoritos:', err);
        }
      });
    }
  }

  eliminarFavorito(videoId: string): void {
    const user_name = localStorage.getItem('user_name');
    if (!user_name) return;
  
    this.youtubeService.eliminarFavorito(user_name, videoId).subscribe({
      next: () => {
        this.favoritos = this.favoritos.filter(v => v.videoId !== videoId);
        console.log('Eliminado de favoritos');
      },
      error: (err) => {
        console.error('Error al eliminar favorito:', err);
      }
    });
  }
  
}
