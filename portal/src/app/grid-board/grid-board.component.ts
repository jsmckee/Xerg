import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-grid-board',
  imports: [],
  template: `<canvas #hexCanvas width="1700" height="1200" style="border:1px solid #ccc;"></canvas>`
})
export class GridBoardComponent implements AfterViewInit {
  @ViewChild('hexCanvas', { static: true }) hexCanvas!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit() {
    const canvas = this.hexCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const hexRadius = 60;
    const hexHeight = Math.sqrt(3) * hexRadius;
    const cols = 20;
    const rows = 15;
    const xOffset = hexRadius * 1.5;
    const yOffset = hexHeight;

    for (let col = 0; col < cols; col++) {
      for (let row = 0; row < rows; row++) {
        const x = col * xOffset + hexRadius;
        const y = row * hexHeight + ((col % 2) * (hexHeight / 2)) + hexRadius;
        this.drawHex(ctx, x, y, hexRadius);
      }
    }
  }

  drawHex(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number) {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = Math.PI / 3 * i;
      const px = x + radius * Math.cos(angle);
      const py = y + radius * Math.sin(angle);
      if (i === 0) 
        ctx.moveTo(px, py);
      else 
      ctx.lineTo(px, py);
    }
    
    ctx.closePath();
    ctx.strokeStyle = '#333';
    ctx.stroke();
    ctx.fillStyle = '#e0e0e0';
    ctx.fill();
  }
}
