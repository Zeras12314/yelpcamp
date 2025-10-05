import { Component } from '@angular/core';
import { CampgroundsComponent } from '../campgrounds/campgrounds.component';

@Component({
  selector: 'app-home',
  imports: [CampgroundsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
