import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BagItem } from '../services/bag.service';

@Component({
  selector: 'app-bag-item',
  templateUrl: './bag-item.component.html',
  styleUrls: ['./bag-item.component.scss'],
})
export class BagItemComponent implements OnInit {
  @Input() bagItem: BagItem;
  @Output() removeClicked = new EventEmitter();
  constructor() { }

  ngOnInit() {}

  removeFromBag(): void {
    this.removeClicked.emit();
  }

}
