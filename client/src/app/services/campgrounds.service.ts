import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Campground } from '../models/campground.model';

@Injectable({
  providedIn: 'root',
})
export class CampgroundsService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/campgrounds'; // 🔹 replace with your backend URL

  constructor() {}

  // Get all campgrounds
  getCampgrounds(): Observable<Campground[]> {
    console.log('campgrounds are now updated')
    return this.http.get<Campground[]>(this.apiUrl);
  }

  // Get single campground by ID
  getCampground(id: string): Observable<Campground> {
    return this.http.get<Campground>(`${this.apiUrl}/${id}`);
  }

  // Create a new campground
  createCampground(campground: Campground): Observable<Campground> {
    return this.http.post<Campground>(this.apiUrl, campground);
  }

  // Update an existing campground
  updateCampground(id: string, campground: Campground): Observable<Campground> {
    return this.http.put<Campground>(`${this.apiUrl}/${id}`, campground);
  }

  // Delete a campground
  deleteCampground(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
