import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { InputCustomEvent } from '@ionic/core';
import { map } from 'rxjs/operators';
import { BagService } from '../services/bag.service';
import { DataService, Product } from '../services/data.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.page.html',
  styleUrls: ['./view-product.page.scss'],
})
export class ViewProductPage implements OnInit {
  public product: Product;
  public amount!: number;
  public quantity!: number;

  constructor(
    private data: DataService,
    private bag: BagService,
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    const sku = this.activatedRoute.snapshot.paramMap.get('sku');
    this.data.products$.pipe(
      map(products => products.find(product => product.sku === Number(sku)))
    ).subscribe(resp => this.product = resp);
  }

  public getBackButtonText(): string {
    const win = window as any;
    const mode = win && win.Ionic && win.Ionic.mode;
    return mode === 'ios' ? 'Products' : '';
  }

  public caltulateQuantity(ev?: InputCustomEvent): void {
    const amount = ev?.target.value ? Number(ev.target.value) : this.amount;
    this.quantity = Math.floor(amount / this.product.price);
  }

  public caltulateAmount(ev?: InputCustomEvent): void {
    const quantity = ev?.target.value ? Number(ev.target.value) : this.quantity;
    this.amount = Number((quantity * this.product.price).toFixed(2));
  }

  async addToBag(): Promise<void> {
    this.bag.addItem({
      product: this.product,
      quantity: this.quantity
    });
    delete this.amount;
    delete this.quantity;
    const toast = await this.toastController.create({
      message: 'Product added to bag',
      duration: 1500,
      position: 'bottom',
      buttons: [
        {
          text: 'Go to Bag',
          role: 'info',
          handler: () => { this.router.navigate(['/'], { queryParams: { menu: true } }) }
        },
      ]
    });
    await toast.present();
  }
}
