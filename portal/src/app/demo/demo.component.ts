import { Component } from '@angular/core';
//import init from '../../easter_egg_data'; // Import the init function from the WASM module
import init, { InitOutput } from '../../assets/easter_egg_data'; // Import InitOutput for better typing


@Component({
  selector: 'app-demo',
  imports: [],
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.sass'
})
export class DemoComponent {

  public asciiArt: string = '';
  public wasmModule: InitOutput | null = null;
// public asciiArt2: string = `

// _________     ________________        _________________    ____ ___  _____ _____________________________
// \\_   ___ \   /  _  \__    ___/       /   _____/\_____  \ |    |   \/  _  \\______   \_   _____/\______ \
// /    \  \/  /  /_\  \|    |  ______  \_____   \  /  / \  \|    |   /  /_\  \|       _/|    __)_  |    |  \
// \     \____ /    |    \   | /_____/   /        \/   \_/.  \    |  /    |    \    |   \|        \ |    `   \
//  \______  /\____|__  /____|          /_______  /\_____\\_/______/\____|__  /____|_  /_______  //_______  /
//          \/         \/                       \/         \__>               \/       \/        \/         \/

// -------------------------------------------------------------------------------------------------------------

//                    ________                       .___.___
//                  /  _____/  ____   ____           |   |   |
//                 /   \  ____/ __ \ /    \   ______ |   |   |
//                 \    \_\  \  ___/|   |  \ /_____/ |   |   |
//                  \______  /\___  >___|  /         |___|___|
//                         \/     \/     \/
// 2018
// Joe H.
// Corey W.
// Jeremy M.

// 2019
// Casey C.
// Ethan M.
// 2020
// Remington H.
// 2021
// Jeremy G.
// 2022
// Jason S.
// 2023
// Evan R.
// Ashruti P.
// 2024
// Gustavo L.
// 2025 

                        
                        
                        
//                         `;


constructor() {
    this.loadWasmModule();
  }

  private async loadWasmModule(): Promise<void> {
    try {
      this.wasmModule = await init('assets/easter_egg_data_bg.wasm');// Initialize the WASM module
      this.asciiArt = this.wasmModule.get_ascii_art(); // Get the ASCII art from the WASM module
    } catch (error) {
      console.error('Error loading WASM module:', error);
    }
  }
}
