import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
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

  constructor(private routesService: RoutesService, private element: ElementRef) {
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
        const div = this.element.nativeElement.querySelector('.map');
        console.info({ div });
        this.routesService.getGpx(routeInfo['info']['id'])
          .subscribe(gpx => {
            console.info({ gpx });

            this.routesService.drawMap(div, gpx['gpx']);
            this.stepOneReady = true;
          });

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
