import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Campground } from '../../models/campground.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CampgroundsService } from '../../services/campgrounds.service';
import { Observable, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MaterialElementsModule } from '../shared/material/material.module';
import { MatDialog } from '@angular/material/dialog';
import { DialogPopComponent } from '../shared/components/dialog-pop/dialog-pop.component';

@Component({
  selector: 'app-campground-details',
  imports: [AsyncPipe, MaterialElementsModule],
  templateUrl: './campground-details.component.html',
  styleUrl: './campground-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CampgroundDetailsComponent {
  campground?: Campground;
  private activatedRoute = inject(ActivatedRoute);
  private campGroundService = inject(CampgroundsService);
  private router = inject(Router);
  readonly dialog = inject(MatDialog);
  campground$: Observable<Campground> = this.activatedRoute.paramMap.pipe(
    switchMap((params) =>
      this.campGroundService.getCampground(params.get('id')!)
    )
  );

  ngOnInit() {}

  openDialog(id: string) {
    this.dialog.open(DialogPopComponent, {
      data: {
        id: id,
        action: 'delete',
      },
    });
  }

  editCampground(id: string) {
    this.router.navigate(['/campgrounds', id, 'edit']);
  }
}
