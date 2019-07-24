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

  stepTwoForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl('')
  });

  stepOneReady = false;
  stepOneSubmitted = false;

  routeInfo;

  @Input() isOpen: boolean;
  @ViewChild('wizard', { static: false }) wizard: ClrWizard;

  constructor(private routesService: RoutesService, private element: ElementRef) {
    this.stepOneForm.setValidators(this.isValidUrl());
  }

  ngOnInit() {
  }

  stepOneSubmit() {
    this.stepOneSubmitted = true;
    this.routesService.getRouteByUrl(this.stepOneForm.value.stravaLink)
      .subscribe(routeInfo => {
        const div = this.element.nativeElement.querySelector('.map');
        this.routeInfo = routeInfo;
        console.info({ routeInfo })
        this.routesService.getGpx(routeInfo['info']['id'])
          .subscribe(gpx => {
            this.routesService.drawMap(div, gpx['gpx']);
            this.stepOneReady = true;

            this.stepTwoForm.patchValue({
              title: this.routeInfo.info.name
            })
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
