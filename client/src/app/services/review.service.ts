import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../models/campground.model';
import { env } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private http = inject(HttpClient);
  private apiUrl = env.apiUrl

  constructor() {}

  createReview(id: string, review: Review): Observable<Review> {
    return this.http.post<Review>(`${this.apiUrl}/${id}/reviews`, review);
  }

  deleteReview(campId: string, reviewId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${campId}/reviews/${reviewId}`);
  }
}
