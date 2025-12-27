import { Component, inject, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadCampGrounds } from '../../../store/actions/camp.action';

@Component({
  selector: 'app-loading',
  imports: [],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
})
export class LoadingComponent {
  @Input() loading: boolean | null = false;
  @Input() errorLoading: boolean | null = false;
  store = inject(Store);
}
