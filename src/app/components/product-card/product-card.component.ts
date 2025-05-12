import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<Product>();
  isAdded = false;

  getDisplayPrice(): number {
    if (this.product.onSale && this.product.discountPercentage) {
      const discountAmount = this.product.price * (this.product.discountPercentage / 100);
      return parseFloat((this.product.price - discountAmount).toFixed(2));
    }
    return this.product.price;
  }

  onAddToCart(): void {
    this.addToCart.emit(this.product);
    this.isAdded = true;
    setTimeout(() => {
      this.isAdded = false;
    }, 2000);
  }
}