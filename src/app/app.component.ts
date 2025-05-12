import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { BannerComponent } from './components/banner/banner.component';
import { ProductsSectionComponent } from './components/products-section/products-section.component';
import { SpecialOffersComponent } from './components/special-offers/special-offers.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    BannerComponent,
    ProductsSectionComponent,
    SpecialOffersComponent,
    FooterComponent
  ],
  template: `
    <div class="app-container">
      <app-header></app-header>
      <main>
        <app-banner></app-banner>
        <app-products-section></app-products-section>
        <app-special-offers></app-special-offers>
      </main>
      <app-footer></app-footer>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    main {
      flex: 1;
    }
  `]
})
export class AppComponent {
  title = 'LuxeShop';
}