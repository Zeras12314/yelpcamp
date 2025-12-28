import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StoreService } from '../../store/store.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  storeService = inject(StoreService);
  showWelcomeNote = true;

  ngOnInit() {
    this.storeService.showNote$.subscribe((value) => {
      this.showWelcomeNote = value;
    });
  }

  // When user closes the note
  closeNote() {
    this.storeService.setShowNote(false);
  }

  // When user clicks the floating button to show it
  showNote() {
    this.storeService.setShowNote(true);
  }
}
