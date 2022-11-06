import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { ProductComponentModule } from '../product/product.module';
import { BagItemComponentModule } from '../bag-item/bag-item.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductComponentModule,
    BagItemComponentModule,
    HomePageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
