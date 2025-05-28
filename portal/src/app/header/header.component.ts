import { Component } from '@angular/core';
import { TabOptionComponent } from '../tab-option/tab-option.component';

@Component({
  selector: 'app-header',
  imports: [TabOptionComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass'
})
export class HeaderComponent {

}
