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

    it('should be able to select a value', async () => {
      await selectHarness.open();
      const options = await selectHarness.getOptions();
      const expected = await options[1].getText();
      await options[1].click();
      expect(await selectHarness.getValueText()).toEqual(expected);
    });
  });
});
