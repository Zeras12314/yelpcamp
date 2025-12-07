// src/app/shared/material/material-elements.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  exports: [MatButtonModule, MatDialogModule],
})
export class MaterialElementsModule {}
