import { Component, OnInit, Input } from '@angular/core';
import { ClrWizard } from '@clr/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RoutesService } from '../../services/route-service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit {
  stepOneForm = new FormGroup({
    stravaLink: new FormControl('')
  })

  @Input() isOpen: boolean;
  constructor(private routesService: RoutesService) { }

  ngOnInit() {
  }
}
