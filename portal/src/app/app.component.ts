import { RouterOutlet } from '@angular/router';
import { Component, ViewChild, ElementRef } from '@angular/core';
import * as THREE from 'three'
import { Cannon } from './models/cannon/cannon';
import { Zombie } from './models/zombie/zombie';
import { IZombie } from './models/izombie';
import { IWeapon } from './models/iweapon';
import { Observable } from 'rxjs';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
// import init from '../engine/easter_egg_data';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  

  constructor() {
     // Instantiate our wasm module
  // const helloWorld = init("../engine/easter-egg-data_bg.wasm").then(r => console.log(r.get_ascii_art()));

  }
}
