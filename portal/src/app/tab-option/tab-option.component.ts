import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab-option',
  imports: [],
  templateUrl: './tab-option.component.html',
  styleUrl: './tab-option.component.sass'
})
export class TabOptionComponent {
  @Input() public id: string = '';

  constructor(public router: Router) {
    // if (this.id === 'tanks') {
    // }
  }

  public onClick(event: MouseEvent): void {
    this.router.navigate([this.id], { queryParams: { tab: this.id } });
    console.log('onClick', this.id);
    // this.router.navigate([this.id], { queryParams: { tab: this.id } });
  }
}
