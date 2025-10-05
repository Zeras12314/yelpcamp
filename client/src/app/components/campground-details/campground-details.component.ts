import { Component, inject } from '@angular/core';
import { Campground } from '../../models/campground.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CampgroundsService } from '../../services/campgrounds.service';
import { Observable, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-campground-details',
  imports: [AsyncPipe],
  templateUrl: './campground-details.component.html',
  styleUrl: './campground-details.component.scss',
})
export class CampgroundDetailsComponent {
  campground?: Campground;
  private activatedRoute = inject(ActivatedRoute);
  private campGroundService = inject(CampgroundsService);
  private router = inject(Router)
  campground$: Observable<Campground> = this.activatedRoute.paramMap.pipe(
    switchMap((params) =>
      this.campGroundService.getCampground(params.get('id')!)
    )
  );

  ngOnInit() {}

  editCampground(id: string) {
    this.router.navigate(['/campgrounds', id, 'edit']);
  }
}
