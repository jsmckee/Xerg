import { Component } from '@angular/core';
//import init from '../../easter_egg_data'; // Import the init function from the WASM module
import init, { InitOutput } from '../../assets/wasm/easter_egg_data'; // Import InitOutput for better typing


@Component({
  selector: 'app-demo',
  imports: [],
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.sass'
})
export class DemoComponent {

  public asciiArt: string = '';
  public wasmModule: InitOutput | null = null;


constructor() {
    this.loadWasmModule();
  }

  private async loadWasmModule(): Promise<void> {
    try {
      this.wasmModule = await init('assets/wasm/easter_egg_data_bg.wasm');
      this.asciiArt = this.wasmModule.get_ascii_art(); 
    } catch (error) {
      console.error('Error loading WASM module:', error);
    }
  }
}
