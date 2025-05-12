import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isScrolled = false;
  isMenuOpen = false;
  cartCount = 0;
  showAddProductForm = false;
  newProduct = {
    id: 0,
    name: '',
    price: 0,
    description: '',
    imageUrl: '',
    category: ''
  };

  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) {
    this.cartService.getCartCount().subscribe(count => {
      this.cartCount = count;
    });
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  openAddProductForm() {
    this.showAddProductForm = true;
  }

  closeAddProductForm() {
    this.showAddProductForm = false;
    this.resetForm();
  }

  resetForm() {
    this.newProduct = {
      id: 0,
      name: '',
      price: 0,
      description: '',
      imageUrl: '',
      category: ''
    };
  }

  addProduct(event: Event) {
    event.preventDefault();
    this.productService.addProduct(this.newProduct);
    this.closeAddProductForm();
  }
}