import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment';


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
}
