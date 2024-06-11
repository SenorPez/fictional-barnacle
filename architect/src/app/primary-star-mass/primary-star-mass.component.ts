import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {PrimaryStarCategory} from "./primary-star-category";
import {LoggerService} from "../logger.service";
import {RollService} from "../roll.service";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatDivider} from "@angular/material/divider";
import {MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {StellarMass} from "./stellar-mass";

export interface PrimaryStarMassForm {
  primaryStarCategory: FormControl<string>
  primaryStarCategoryRoll: FormControl<number>
  primaryStarMass: FormControl<number>
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
    ReactiveFormsModule,
    MatInput,
    MatError
  ],
  templateUrl: './primary-star-mass.component.html',
  styleUrl: './primary-star-mass.component.css'
})
export class PrimaryStarMassComponent implements OnInit {
  primaryStarCategory: PrimaryStarCategory;
  primaryStarMass: StellarMass;

  starCategories: string[];

  form!: FormGroup<PrimaryStarMassForm>;
  locked!: boolean;

  primaryStarMassLowerBound!: number;
  primaryStarMassUpperBound!: number;

  @Output()
  formReady: EventEmitter<FormGroup<PrimaryStarMassForm>> = new EventEmitter<FormGroup<PrimaryStarMassForm>>();

  constructor(
    private fb: FormBuilder,
    @Inject(LoggerService) logger: LoggerService,
    @Inject(RollService) roller: RollService
  ) {
    this.primaryStarCategory = new PrimaryStarCategory(logger, roller);
    this.primaryStarMass = new StellarMass(logger, roller);
    this.starCategories = this.primaryStarCategory.starCategories;
  }

  ngOnInit(): void {
    this.locked = false;

    this.form = this.fb.nonNullable.group({
      primaryStarCategory: ['Brown Dwarf', [Validators.required]],
      primaryStarCategoryRoll: [1, [Validators.required, Validators.min(1), Validators.max(100)]],
      primaryStarMass: [0.015, [Validators.required]]
    });

    this.setPrimaryStarMassValidation();

    this.form.controls.primaryStarCategory.valueChanges.subscribe(category => {
      this.form.controls.primaryStarCategoryRoll.setValue(this.primaryStarCategory.lookupRoll(category), {emitEvent: false});
      this.setPrimaryStarMassValidation();
    });

    this.form.controls.primaryStarCategoryRoll.valueChanges.subscribe(roll => {
      this.form.controls.primaryStarCategory.setValue(this.primaryStarCategory.lookupCategory(roll), {emitEvent: false});
      this.setPrimaryStarMassValidation();
    });
  }

  private setPrimaryStarMassValidation() {
    [this.primaryStarMassLowerBound, this.primaryStarMassUpperBound] = this.primaryStarMass.getStellarMassBounds(this.form.controls.primaryStarCategory.value);
    this.form.controls.primaryStarMass.setValidators([Validators.required, Validators.min(this.primaryStarMassLowerBound), Validators.max(this.primaryStarMassUpperBound)]);
    this.form.controls.primaryStarMass.markAsTouched();
    this.form.controls.primaryStarMass.updateValueAndValidity();
  }

  randomPrimaryStarCategory(): void {
    const roll: number = this.primaryStarCategory.roll();
    this.form.controls.primaryStarCategoryRoll.setValue(roll);
  }

  lockPrimaryStarCategory(): void {
    this.locked = !this.locked;

    if (this.locked) {
      this.form.disable({emitEvent: false});
    } else {
      this.form.enable({emitEvent: false});
    }
  }
}
