
import { RouterOutlet } from '@angular/router';
import { Component, ViewChild, ElementRef } from '@angular/core';
import * as THREE from 'three'
import { Cannon } from '../models/cannon/cannon';
import { Zombie } from '../models/zombie/zombie';
import { IZombie } from '../models/izombie';
import { IWeapon } from '../models/iweapon';

@Component({
   selector: 'app-tanks-and-zombies',
  imports: [],
  templateUrl: './tanks-and-zombies.component.html',
  styleUrl: './tanks-and-zombies.component.sass'
})
export class TanksAndZombiesComponent {
  @ViewChild('rendererContainer') rendererContainer: ElementRef = {} as ElementRef;
  public Zombies: Array<IZombie>;
  public kills = 0;
  public playAudio: boolean;
  public GameEngineRenderer: THREE.WebGLRenderer;
  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;
  public SceneLight: THREE.PointLight;
  public player: Cannon | null = null;
  public totalZombies: number;
  private raycaster = new THREE.Raycaster();
  private mouse = new THREE.Vector2();
  private lastTimestamp: number = 0;

  constructor() {
    this.playAudio = true;
    this.Zombies = new Array<IZombie>();
    this.totalZombies = 5;
    this.scene = new THREE.Scene();
    // this.ViewPortArea.add(new THREE.AmbientLight(0x000000));
    this.GameEngineRenderer = new THREE.WebGLRenderer({ antialias: true });

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.x = 1;
    this.camera.position.z = 7;
    this.camera.position.y = 3;

    this.GameEngineRenderer.setSize(window.innerWidth - 35, window.innerHeight - 10);
    this.GameEngineRenderer.setClearColor(0x0000aa, 1.0);


    this.SceneLight = new THREE.PointLight(0xFFFFFF);
    this.SceneLight.position.set(-15, 10, 15);
    this.scene.add(this.SceneLight);

    this.AddPlayerToScene();
    this.Restart();
  }

  Restart() {
    let offset = -10;

    for (let x = 0; x < this.totalZombies; x++) {

      this.AddZombieToScene(offset);

      offset += 5;
    }
  }

  AddPlayerToScene() {
    const t = this;
    this.player = new Cannon((model: THREE.Object3D) => t.scene.add(model));
}

AddZombieToScene(offset: number) {
  const t = this;
  const z = new Zombie(offset, (model: THREE.Object3D) => {
    t.scene.add(model);
  });
  this.Zombies.push(z);
}

MouseClicked(event: MouseEvent) {
  if (this.playAudio && this.player) {
    (<IWeapon>this.player).PlayAttack();
  }
  
  // Use normalized device coordinates for mouse
  this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  this.raycaster.setFromCamera(this.mouse, this.camera);

  const zombieModels: THREE.Object3D[] = [];
  for (const z of this.Zombies) {
    if (z.model) { // Ensure model is loaded
      zombieModels.push(z.model);
    }
  }

  // Set recursive to true to intersect with children of the models
  const intersects = this.raycaster.intersectObjects(zombieModels, true);

  for (const i of intersects) {
    let index = 0;
    for (const z of this.Zombies) {
      if (!z.model) continue; // Skip if model not loaded

      // Check if the intersected object (i.object) is the zombie's model or a child of it
      let parent: THREE.Object3D | null = i.object;
      let foundMatch = false;
      while (parent) {
        if (parent.uuid === z.model.uuid) {
          foundMatch = true;
          break;
        }
        parent = parent.parent;
      }

      if (foundMatch) {
        const damage = (<IWeapon>this.player).damage;
        const stillAlive = (<IZombie>z).TakeDamage(damage);
        
        if (this.player) {
          (<IWeapon>this.player).PlayHit();
        }

        if (!stillAlive) {
          this.scene.remove(z.model); // Remove the whole model
          if (this.playAudio) {
            (<IZombie>z).PlayDie();
          }
          this.kills++;
          this.Zombies.splice(index, 1);
        }

        break;
      }
      index++;
    }
  }
}

  MoveMouse(event: MouseEvent) {
    if (this.player) {
      this.player.Target(event);
    }
  }

  ngAfterViewInit() {
    if (this.rendererContainer && this.rendererContainer.nativeElement) {
      this.rendererContainer.nativeElement.appendChild(this.GameEngineRenderer.domElement);
    } else {
      console.error("rendererContainer is not available");
      return;
    }

    this.GameEngineRenderer.domElement.onmousemove = (e: MouseEvent) => { this.MoveMouse(e); };
    this.GameEngineRenderer.domElement.onclick = (e: MouseEvent) => { this.MouseClicked(e); };

    // Start the animation loop
    this.animate(0);
  }

  private animate = (timestamp: number) => {
    requestAnimationFrame(this.animate);

    const deltaTime = (timestamp - this.lastTimestamp) / 1000; // Delta time in seconds
    this.lastTimestamp = timestamp;

    for (const z of this.Zombies) {
      z.MoveForward(); // Pass deltaTime, ensure it's not NaN on first frame
    }

    this.GameEngineRenderer.render(this.scene, this.camera);
  }
}
