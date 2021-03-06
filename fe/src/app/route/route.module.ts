import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { ClrWizardModule, ClrFormsModule, ClrIconModule } from '@clr/angular'

import { RouteComponent } from './components/route/route-component';
import { RouteListComponent } from './components/list/route-list.component';
import { RouteViewComponent } from './components/route-view/route-view.component';
import { CreateComponent } from './components/create/create.component';
import { CommentsListComponent } from './components/comments/comments-list.component';
import { CommentComponent } from './components/comment/comment.component';
import { AddCommentComponent } from './components/add-comment/add-comment.component';

import { RoutesService } from './services/route-service';

@NgModule({
  declarations: [
    RouteComponent,
    RouteListComponent,
    CreateComponent,
    RouteViewComponent,
    CommentsListComponent,
    AddCommentComponent,
    CommentComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClrWizardModule,
    ClrFormsModule,
    ClrIconModule
  ],
  exports: [
    RouteListComponent,
    RouteViewComponent,
    CreateComponent
  ],
  providers: [RoutesService]
})
export class RouteModule { }
