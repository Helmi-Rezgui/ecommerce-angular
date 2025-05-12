import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-special-offers',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="special-offers">
      <div class="container">
        <h2 class="section-title">Offres Spéciales</h2>
        <div class="offers-container">
          <div class="offer" *ngFor="let product of featuredProducts; let i = index">
            <div class="offer-content" [class.reverse]="i % 2 !== 0">
              <div class="offer-image">
                <img [src]="product.imageUrl" [alt]="product.name" />
              </div>
              <div class="offer-details">
                <div class="offer-badge">OFFRE SPÉCIALE</div>
                <h3>{{ product.name }}</h3>
                <p class="offer-description">{{ product.description }}</p>
                <div class="offer-price">
                  <p class="current-price">{{ getDisplayPrice(product) }} TND</p>
                  <p class="original-price">{{ product.price }} TND</p>
                  <p class="saving">Économisez {{ getSavingsAmount(product) }} TND</p>
                </div>
                <button class="btn btn-accent" (click)="addToCart(product)">
                  Ajouter au panier
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .special-offers {
      padding: 80px 0;
      background-color: #f0f2f5;
    }

    .offers-container {
      display: flex;
      flex-direction: column;
      gap: 40px;
    }

    .offer {
      background-color: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }

    .offer-content {
      display: flex;
      flex-direction: row;
    }

    .offer-content.reverse {
      flex-direction: row-reverse;
    }

    .offer-image {
      flex: 1;
      min-height: 300px;
    }

    .offer-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .offer-details {
      flex: 1;
      padding: 40px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .offer-badge {
      display: inline-block;
      background-color: var(--accent-color);
      color: white;
      padding: 5px 15px;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: bold;
      margin-bottom: 15px;
    }

    h3 {
      font-size: 2rem;
      margin-bottom: 15px;
      color: var(--text-primary);
    }

    .offer-description {
      color: var(--text-secondary);
      margin-bottom: 20px;
      line-height: 1.6;
    }

    .offer-price {
      margin-bottom: 25px;
    }

    .current-price {
      font-size: 2rem;
      font-weight: 700;
      color: var(--accent-color);
    }

    .original-price {
      text-decoration: line-through;
      color: var(--text-secondary);
      font-size: 1.2rem;
      margin-bottom: 5px;
    }

    .saving {
      font-weight: 500;
      color: var(--success-color);
    }

    .btn {
      align-self: flex-start;
      padding: 12px 30px;
      font-size: 1rem;
    }

    @media (max-width: 992px) {
      .offer-content,
      .offer-content.reverse {
        flex-direction: column;
      }

      .offer-image {
        min-height: 200px;
      }

      .offer-details {
        padding: 20px;
      }

      h3 {
        font-size: 1.5rem;
      }

      .current-price {
        font-size: 1.5rem;
      }
    }
  `]
})
export class SpecialOffersComponent implements OnInit {
  featuredProducts: Product[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.featuredProducts = this.productService.getFeaturedProducts();
  }

  getDisplayPrice(product: Product): number {
    if (product.onSale && product.discountPercentage) {
      const discountAmount = product.price * (product.discountPercentage / 100);
      return parseFloat((product.price - discountAmount).toFixed(2));
    }
    return product.price;
  }

  getSavingsAmount(product: Product): number {
    if (product.onSale && product.discountPercentage) {
      const discountAmount = product.price * (product.discountPercentage / 100);
      return parseFloat(discountAmount.toFixed(2));
    }
    return 0;
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }
}