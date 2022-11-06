import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BagItemComponent } from './bag-item.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';



@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule, RouterModule],
  declarations: [BagItemComponent],
  exports: [BagItemComponent]
})
export class BagItemComponentModule { }
