import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

export interface Product {
  sku: number;
  name: string;
  type: string;
  price: number;
  upc: string;
  category: Array<Category>,
  shipping: number;
  description: string;
  manufacturer: string;
  model: string;
  url: string;
  image: string;
}

export interface Category {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public products$ = new ReplaySubject<Product[]>();
  
  constructor(
    private httpClient: HttpClient
  ) {
    this.getProducts().subscribe();
  }

  public getProducts(): Observable<Product[]> {
    return this.httpClient.get('/assets/data.json').pipe(
      delay(Math.floor(Math.random() * 7000) + 3000),
      tap((products: Product[]) => this.products$.next(products))
    );
  }
}
