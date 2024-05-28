import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  create_news_url: string = 'http://localhost:5000/api/news/create_news'
  get_news_url: string = 'http://localhost:5000/api/news/get_news'
  delete_news_url: string = 'http://localhost:5000/api/news/delete_news'
  update_news_url: string = 'http://localhost:5000/api/news/update_news'

  createNews(data: any): Observable<any> {
    return this.http.post(this.create_news_url, data)
  }

  getNews(): Observable<any> {
    return this.http.get(this.get_news_url)
  }

  deleteNews(id: any): Observable<any> {
    const httpParams = new HttpParams().set('id', id)
    const options = {params: httpParams}
    return this.http.delete(this.delete_news_url, options)
  }

  editNews(data: any): Observable<any> {
    return this.http.put(this.update_news_url, data)
  }
}
