import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {PrimaryStarCategory} from "./primary-star-category";
import {LoggerService} from "../logger.service";
import {RollService} from "../roll.service";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatDivider} from "@angular/material/divider";
import {MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

export interface PrimaryStarMassForm {
  primaryStarCategory: FormControl<string>
}

@Component({
  selector: 'app-primary-star-mass',
  standalone: true,
  imports: [
    MatFormField,
    MatIcon,
    MatLabel,
    MatSelect,
    MatOption,
    MatDivider,
    MatFabButton,
    ReactiveFormsModule
  ],
  templateUrl: './primary-star-mass.component.html',
  styleUrl: './primary-star-mass.component.css'
})
export class PrimaryStarMassComponent implements OnInit {
  primaryStarCategory: PrimaryStarCategory;
  starCategories: string[];

  form!: FormGroup<PrimaryStarMassForm>;

  @Output()
  formReady: EventEmitter<FormGroup<PrimaryStarMassForm>> = new EventEmitter<FormGroup<PrimaryStarMassForm>>();

  constructor(
    private fb: FormBuilder,
    @Inject(LoggerService) logger: LoggerService,
    @Inject(RollService) roller: RollService
  ) {
    this.primaryStarCategory = new PrimaryStarCategory(logger, roller);
    this.starCategories = this.primaryStarCategory.starCategories;
  }

  ngOnInit(): void {
    this.form = this.fb.nonNullable.group({
      primaryStarCategory: ['', [Validators.required]]
    });
  }
}
