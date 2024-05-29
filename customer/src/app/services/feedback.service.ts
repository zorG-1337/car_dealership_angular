import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  create_feedback_url: string = "http://localhost:5000/api/feedbacks/create_feedback"

  constructor(private http: HttpClient) { }

  createFeedback(data: any): Observable<any> {
    return this.http.post(this.create_feedback_url, data)
  }
}
