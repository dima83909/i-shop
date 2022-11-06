import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonMenu } from '@ionic/angular';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { first, map, startWith, tap } from 'rxjs/operators';
import { BagItem, BagService } from '../services/bag.service';
import { DataService, Product } from '../services/data.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage implements OnInit, AfterViewInit {
  public mode!: string;
  public bag$!: BehaviorSubject<BagItem[]>;
  public products$!: Observable<Product[]>;
  private searchField = new FormControl('');
  @ViewChild('bagMenu') bagMenu: IonMenu;
  
  constructor(
    private bagService: BagService,
    private data: DataService,
    private storage: StorageService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getListMode();
    this.getSearch();
    this.getBag();
    this.getProducts();
  }
  
  ngAfterViewInit(): void {
    this.subscribeMenu();
  }

  private subscribeMenu(): void {
    this.activatedRoute.queryParams
      .subscribe(params => {
        if (params.menu) {
          this.bagMenu.open();
        }
      });
  }

  public menuClosed(): void {
    this.router.navigate([], { relativeTo: this.activatedRoute })
  }

  public refresh(ev): void {
    this.data.getProducts().pipe(first()).subscribe(() => {
      ev.detail.complete();
    });
  }

  private async getSearch(): Promise<void> {
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

  private async getListMode(): Promise<void> {
    this.mode = await this.storage.get('mode') || 'list';
  }

  public setListMode(mode: string): void {
    if (this.mode === mode) return;
    this.mode = mode;
    this.storage.set('mode', this.mode);
  }

  private getBag(): void {
    this.bag$ = this.bagService.bag$;
  }

  public removeFromBag(index: number): void {
    this.bagService.removeItem(index);
  }
}
