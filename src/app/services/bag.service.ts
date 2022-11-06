import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './data.service';
import { StorageService } from './storage.service';

export interface BagItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class BagService {
  public bag$: BehaviorSubject<BagItem[]> = new BehaviorSubject([]);

  constructor(
    private storage: StorageService,
  ) {
    this.init();
  }

  private async init(): Promise<void> {
    this.bag$.next(await this.storage.get('bag') || []);
  }

  public addItem(bagItem: BagItem): void {
    const bag = this.bag$.getValue();
    const sameItem = bag.find(b => b.product.sku === bagItem.product.sku)
    if (sameItem) sameItem.quantity += bagItem.quantity;
    else bag.push(bagItem);
    this.bag$.next(bag);
    this.storage.set('bag', bag);
  }
  
  public removeItem(index: number): void {
    const bag = this.bag$.getValue();
    bag.splice(index, 1);
    this.bag$.next(bag);
    this.storage.set('bag', bag);
  }
}
