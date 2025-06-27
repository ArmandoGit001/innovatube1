import { Component } from '@angular/core';
import { YoutubeService } from '../services/youtube.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-youtubesearch',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    NgIf,
    NgFor
  ],
  templateUrl: './youtubesearch.html',
  styleUrl: './youtubesearch.css'
})
export class Youtubesearch {
  query: string = '';
  resultados: any[] = [];

  constructor(private youtubeService: YoutubeService) {}

  buscar() {
    if (!this.query.trim()) return;

    console.log('Buscando:', this.query); // TESTING: Comment para verificación (buscando)
    this.youtubeService.buscarVideos(this.query).subscribe({
      next: (res) => {
        console.log('Resultados:', res);  // TESTING: Comment para verificación de resultados
        this.resultados = res.items;
      },
      error: (err) => {
        console.error('Error al buscar:', err);
      }
    });
  }
  
}
