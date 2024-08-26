import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LinkRoutingModule } from './link-routing.module';
import { LinkComponent } from './link.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    LinkComponent,
  ],
  imports: [
    CommonModule,
    LinkRoutingModule,
    SharedModule,
    NgbModule
  ]
})
export class LinkModule { }
