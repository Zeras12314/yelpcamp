import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../models/campground.model';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/campgrounds'; 

  constructor() {}

  createReview(id: string, review: Review): Observable<Review> {
    return this.http.post<Review>(`${this.apiUrl}/${id}/reviews`, review);
  }
}
