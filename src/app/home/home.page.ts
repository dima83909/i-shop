import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { first, map, startWith, tap } from 'rxjs/operators';
import { DataService, Product } from '../services/data.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage implements OnInit {
  public mode!: string;
  public products$: Observable<Product[]>;
  private searchField = new FormControl('');
  
  constructor(
    private data: DataService,
    private storage: StorageService,
  ) { }

  ngOnInit(): void {
    this.getListMode();
    this.getSearch();
    this.getProducts();
  }

  async refresh(ev) {
    this.data.getProducts().pipe(first()).subscribe(() => {
      ev.detail.complete();
    });
  }

  async getSearch() {
    this.searchField.patchValue(await this.storage.get('search'));
  }

  private getProducts(): void {
    const searchTerm$ = this.searchField.valueChanges.pipe(
      startWith(this.searchField.value),
      tap(value => {
        this.storage.set('search', value);
      })
    );

    const products$ = this.data.products$;

    this.products$ = combineLatest([products$, searchTerm$]).pipe(
      map(([products, searchTerm]) =>
        products.filter(
          product =>
            !searchTerm ||
            product.name?.toLowerCase().includes(searchTerm?.toLowerCase())
        )
      )
    );
  }

  async getListMode() {
    this.mode = await this.storage.get('mode') || 'list';
  }

  public setListMode(mode: string): void {
    if (this.mode === mode) return;
    this.mode = mode;
    this.storage.set('mode', this.mode);
  }
}
