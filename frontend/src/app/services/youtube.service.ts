import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private apiUrl = `${environment.apiUrl}/api/search`;

  constructor(private http: HttpClient) {}

  buscarVideos(query: string): Observable<any> {
    const params = new HttpParams().set('q', query);
    return this.http.get(this.apiUrl, { params });
  }

  addFavorito(user_name: string, video: any) {
    return this.http.post(`${environment.apiUrl}/api/favoritos`, { user_name, video });
  }
  
  getFavoritos(user_name: string) {
    return this.http.get<any[]>(`${environment.apiUrl}/api/favoritos/${user_name}`);
  }

  eliminarFavorito(user_name: string, videoId: string) {
    return this.http.request('delete', `${environment.apiUrl}/api/favoritos`, {
      body: { user_name, videoId }
    });
  }
  
}
