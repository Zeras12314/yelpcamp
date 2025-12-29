import { Component, inject, ViewEncapsulation } from '@angular/core';
import { MaterialElementsModule } from '../../material/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import {
  deleteCampground,
  deleteCampgroundSuccess,
} from '../../../../store/actions/camp.action';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'app-dialog-pop',
  imports: [MaterialElementsModule],
  templateUrl: './dialog-pop.component.html',
  styleUrl: './dialog-pop.component.scss',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
})
export class DialogPopComponent {
  matData = inject(MAT_DIALOG_DATA);
  store = inject(Store);
  actions$ = inject(Actions);
  dialogRef = inject(MatDialogRef);

  ngOnInit() {}

  confirmDelete() {
    const dataToDelete = this.matData;
    if (dataToDelete.action === 'delete' && dataToDelete.id) {
      this.store.dispatch(deleteCampground({ id: dataToDelete.id }));

      // Listen for success action
      this.actions$.pipe(ofType(deleteCampgroundSuccess)).subscribe(() => {
        this.dialogRef.close(); // Close dialog after success
      });
    }
  }
}
