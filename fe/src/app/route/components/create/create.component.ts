import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ClrWizard } from '@clr/angular';
import { FormGroup, FormControl, Validator, ValidatorFn, ValidationErrors } from '@angular/forms';
import { RoutesService } from '../../services/route-service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit {
  stepOneForm = new FormGroup({
    stravaLink: new FormControl('')
  });

  stepOneReady = false;

  @Input() isOpen: boolean;
  @ViewChild('wizard') wizard: ClrWizard;

  constructor(private routesService: RoutesService) {
    this.stepOneForm.setValidators(this.isValidUrl());
  }

  ngOnInit() {
    console.info(this.wizard);
  }

  stepOneSubmit() {
    console.info(this.stepOneForm);
    this.routesService.getRouteByUrl(this.stepOneForm.value.stravaLink)
      .subscribe(routeInfo => {
        console.info({ routeInfo });
        this.stepOneReady = true;
      });
  }

  isValidUrl(): ValidatorFn {
    return (form: FormGroup): ValidationErrors => {
      const stravaLink = form.get('stravaLink');
      if (!this.routesService.checkRouteUrl(stravaLink.value)) {
        stravaLink.setErrors({ invalid: true });
      }
      return;
    }
  }
}
