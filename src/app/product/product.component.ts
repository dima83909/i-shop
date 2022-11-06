import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Product } from '../services/data.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit {
  @Input() mode: string;
  @Input() product: Product;

  constructor() { }

  ngOnInit() {}
  
}
