import { Component, inject, OnInit } from '@angular/core';
import { createCampgroundForm } from '../../shared/forms/campground-form';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-edit-campground',
  imports: [ReactiveFormsModule],
  templateUrl: './add-edit-campground.component.html',
  styleUrl: './add-edit-campground.component.scss',
})
export class AddEditCampgroundComponent implements OnInit {
  route = inject(ActivatedRoute);
  campground = createCampgroundForm();

  ngOnInit(): void {}

  campGroundOnInit(){
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      
    }
  }
}
