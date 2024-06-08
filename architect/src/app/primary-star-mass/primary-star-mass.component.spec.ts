import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PrimaryStarMassComponent, PrimaryStarMassForm} from './primary-star-mass.component';
import {HarnessLoader} from "@angular/cdk/testing";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {TestbedHarnessEnvironment} from "@angular/cdk/testing/testbed";
import {MatFormFieldHarness} from "@angular/material/form-field/testing";
import {MatSelectHarness} from "@angular/material/select/testing";
import {MatIcon} from "@angular/material/icon";
import {MatButtonHarness} from "@angular/material/button/testing";

describe('PrimaryStarMassComponent', () => {
  let fixture: ComponentFixture<PrimaryStarMassComponent>;
  let component: PrimaryStarMassComponent;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PrimaryStarMassComponent,
        MatFormFieldModule,
        MatIcon,
        MatSelectModule,
        NoopAnimationsModule,
        ReactiveFormsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PrimaryStarMassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form', () => {
    component.formReady.subscribe(val => expect(val).toBeInstanceOf(FormGroup<PrimaryStarMassForm>));
  });

  describe('Primary Star Category select', () => {
    let formFieldHarness: MatFormFieldHarness;
    let selectHarness: MatSelectHarness;

    beforeEach(async () => {
      formFieldHarness = await loader.getHarness(MatFormFieldHarness.with({selector: '#primaryStarCategoryFormField'}));
      selectHarness = await loader.getHarness(MatSelectHarness.with({selector: '#primaryStarCategorySelect'}));
    });

    it('should have a form field element', () => {
      expect(formFieldHarness).toBeTruthy();
    });

    it('should have a label', async () => {
      expect(await formFieldHarness.getLabel()).toEqual('Primary Star Category');
    });

    it('should have a select element', () => {
      expect(selectHarness).toBeTruthy();
    });

    it('should only allow a single select', async () => {
      expect(await selectHarness.isMultiple()).toBeFalsy();
    });

    it('should update the form with the selected value', async () => {
      component.form.controls.primaryStarCategory.setValue('');

      await selectHarness.open();
      const options = await selectHarness.getOptions();
      const optionIndex = Math.floor(Math.random() * options.length);
      const expected = await options[optionIndex].getText();
      await options[optionIndex].click();

      expect(await selectHarness.getValueText()).toEqual(expected);
      expect(component.form.controls.primaryStarCategory.value).toEqual(expected);
    });
  });

  describe('Primary Star Category random button', () => {
    let buttonHarness: MatButtonHarness;

    beforeEach(async () => {
      buttonHarness = await loader.getHarness(MatButtonHarness.with({selector: '#primaryStarCategoryRandomButton'}));
    });

    it('should be a mat-fab button', async () => {
      expect(await buttonHarness.getVariant()).toEqual('fab');
    });

    it('should update the form with the random value', async () => {
      component.form.controls.primaryStarCategory.setValue('');

      await buttonHarness.click();

      expect(component.form.controls.primaryStarCategory.value).not.toEqual('');
    });
  });
});
