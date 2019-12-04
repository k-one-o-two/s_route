import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges, Output, EventEmitter } from '@angular/core';
import { ClrWizard } from '@clr/angular';
import { FormGroup, FormControl, Validator, ValidatorFn, ValidationErrors } from '@angular/forms';
import { RoutesService } from '../../services/route-service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class CreateComponent implements OnInit, OnChanges {
  stepOneForm = new FormGroup({
    stravaLink: new FormControl('')
  });

  stepTwoForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    stravaId: new FormControl()
  });

  stepOneReady = false;
  stepOneSubmitted = false;

  routeInfo;

  @Input() isOpen: boolean;
  @Output() onClose = new EventEmitter();
  @ViewChild('wizard', { static: false }) wizard: ClrWizard;

  constructor(private routesService: RoutesService, private element: ElementRef) {
    this.stepOneForm.setValidators(this.isValidUrl());
  }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    console.info({ changes })
  }

  stepOneSubmit() {
    this.stepOneSubmitted = true;
    this.routesService.getRouteByUrl(this.stepOneForm.value.stravaLink)
      .subscribe(routeInfo => {
        console.info({ routeInfo });
        const div = this.element.nativeElement.querySelector('.map');
        this.routeInfo = routeInfo;
        this.routesService.getGpx(routeInfo['id'])
          .subscribe(gpx => {
            this.routesService.drawMap(div, gpx['gpx']);
            this.stepOneReady = true;

            this.stepTwoForm.patchValue({
              title: this.routeInfo.name,
              stravaId: routeInfo['id']
            });
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

  doFinish() {
    console.info(this.stepTwoForm.value);
    this.routesService.save({ ...this.stepTwoForm.value, info: this.routeInfo })
      .subscribe((done) => { console.info({ done }) })
  }

  onCloseHandler() {
    console.info('onClose');
    this.onClose.emit();
    // this.isOpen = false;
  }
}
