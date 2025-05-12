import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Casque Audio Sans Fil Premium',
      price: 199.99,
      description: 'Profitez d\'un son cristallin avec notre casque audio sans fil premium.',
      imageUrl: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      category: 'Électronique',
      onSale: true,
      discountPercentage: 15
    },
    {
      id: 2,
      name: 'Montre Connectée Élégante',
      price: 249.99,
      description: 'Suivez votre forme physique et restez connecté avec cette montre connectée élégante.',
      imageUrl: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      category: 'Électronique'
    },
    {
      id: 3,
      name: 'Enceinte Bluetooth Portable',
      price: 79.99,
      description: 'Emportez votre musique partout avec cette enceinte portable puissante.',
      imageUrl: 'https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      category: 'Électronique'
    },
    {
      id: 4,
      name: 'Kit Appareil Photo Professionnel',
      price: 899.99,
      description: 'Capturez des photos époustouflantes avec ce kit appareil photo professionnel.',
      imageUrl: 'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      category: 'Électronique',
      onSale: true,
      discountPercentage: 10
    },
    {
      id: 5,
      name: 'Sac à Dos pour Ordinateur',
      price: 59.99,
      description: 'Sac à dos élégant et fonctionnel avec compartiment dédié pour ordinateur.',
      imageUrl: 'https://images.pexels.com/photos/1546003/pexels-photo-1546003.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      category: 'Accessoires'
    },
    {
      id: 6,
      name: 'Chargeur Sans Fil',
      price: 39.99,
      description: 'Chargez vos appareils sans fil avec ce chargeur élégant.',
      imageUrl: 'https://images.pexels.com/photos/4526407/pexels-photo-4526407.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      category: 'Électronique'
    }
  ];

  private featuredProducts: Product[] = [
    {
      id: 7,
      name: 'Pack TV Smart Ultra HD',
      price: 1299.99,
      description: 'Transformez votre salon avec cet incroyable pack TV Smart Ultra HD 65".',
      imageUrl: 'https://images.pexels.com/photos/6976103/pexels-photo-6976103.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      category: 'Électronique',
      onSale: true,
      discountPercentage: 20
    },
    {
      id: 8,
      name: 'Système Home Cinéma Premium',
      price: 899.99,
      description: 'Profitez d\'un son de qualité cinéma avec notre système home cinéma premium.',
      imageUrl: 'https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      category: 'Électronique',
      onSale: true,
      discountPercentage: 15
    }
  ];

  private productsSubject = new BehaviorSubject<Product[]>(this.products);
  private cartItems = new BehaviorSubject<{ product: Product, quantity: number }[]>([]);

  constructor() {}

  getProducts(): Product[] {
    return this.productsSubject.value;
  }

  getFeaturedProducts(): Product[] {
    return this.featuredProducts;
  }

  addProduct(product: Product): void {
    this.products = [...this.products, product];
    this.productsSubject.next(this.products);
  }

  getCartItems(): Observable<{ product: Product, quantity: number }[]> {
    return this.cartItems.asObservable();
  }

  addToCart(product: Product): void {
    const currentItems = this.cartItems.value;
    const existingItem = currentItems.find(item => item.product.id === product.id);
    
    if (existingItem) {
      existingItem.quantity++;
      this.cartItems.next([...currentItems]);
    } else {
      this.cartItems.next([...currentItems, { product, quantity: 1 }]);
    }
  }

  getCartCount(): Observable<number> {
    return new Observable<number>(observer => {
      this.cartItems.subscribe(items => {
        const count = items.reduce((total, item) => total + item.quantity, 0);
        observer.next(count);
      });
    });
  }
}