import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClrIconModule } from '@clr/angular';

import { HeaderComponent } from './components/header.component';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [CommonModule, ClrIconModule],
  exports: [HeaderComponent]
})

export class CommonComponentsModule { }
