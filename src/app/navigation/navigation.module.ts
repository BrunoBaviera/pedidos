import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartComponent } from './cart/cart.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    HomeComponent,
    FooterComponent,
    MenuComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatPaginatorModule,
    MatCardModule,
    RouterModule,
    NgbModule,
    MatDialogModule
  ],
  exports: [
    HomeComponent,
    FooterComponent,
    MenuComponent
  ]
})
export class NavigationModule { }
