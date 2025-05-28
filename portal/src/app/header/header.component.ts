import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MatTabsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass'
})
export class HeaderComponent {
  constructor(private router: Router) {}

  onTabChange(index: number) {
    // Map tab index to route
    const routes = ['/home', '/tanks', '/grid'];
    this.router.navigate([routes[index]]);
  }
}
