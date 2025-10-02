import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { CampgroundsComponent } from '../campgrounds/campgrounds.component';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, FooterComponent, CampgroundsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
