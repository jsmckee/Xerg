
import { RouterOutlet } from '@angular/router';
import { Component, ViewChild, ElementRef } from '@angular/core';
import * as THREE from 'three'
import { Cannon } from '../models/cannon/cannon';
import { Zombie } from '../models/zombie/zombie';
import { IZombie } from '../models/izombie';
import { IWeapon } from '../models/iweapon';
import { Observable } from 'rxjs';

@Component({
   selector: 'app-tanks-and-zombies',
  imports: [],
  templateUrl: './tanks-and-zombies.component.html',
  styleUrl: './tanks-and-zombies.component.sass'
})
export class TanksAndZombiesComponent {
  @ViewChild('rendererContainer') rendererContainer: ElementRef = {} as ElementRef;
  public rendering: Boolean = true;
  public Zombies: Array<IZombie>;
  public kills = 0;
  public playAudio: boolean;
  public GameEngineRenderer = new THREE.WebGLRenderer();
  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;
  public SceneLight: any;
  public JSONLoader: any;
  public player: any;
  public totalZombies: number;
  public raycaster = new THREE.Raycaster();
  public mouse = new THREE.Vector2();

  constructor() {
    this.playAudio = true;
    this.Zombies = new Array<IZombie>();
    this.totalZombies = 5;
    this.scene = new THREE.Scene();
    // this.ViewPortArea.add(new THREE.AmbientLight(0x000000));

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

    let t = this;
    setTimeout(() => {
      setInterval(() => {
        for (const z of t.Zombies) {
          z.MoveForward();
        }
        t.GameEngineRenderer.render(t.scene, t.camera);
      }, 10);
    }, 10);

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
    this.player = new Cannon((r) => t.scene.add(r));
}

AddZombieToScene(offset: number) {
  const t = this;

  const z = new Zombie(offset, (r) => {

    t.scene.add(r);
  });

  this.Zombies.push(z);
}

MouseClicked(e: any) {
  // console.log("Mouse clicked", e);
  if (this.playAudio) 
    (<IWeapon>this.player).PlayAttack();
  
  // Use normalized device coordinates for mouse
  this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

  this.raycaster.setFromCamera(this.mouse, this.camera);

  let zs = [];
  for (const z of this.Zombies) {
    // console.log(z.model);
    zs.push(z.model);
  }
  var intersects = this.raycaster.intersectObjects(zs);
  console.log(intersects);
  // if (intersects.length) {
  //   console.log(intersects);
  // } else {
  //   console.log(intersects);
  // }
  let deadZombie = false;
  for (const i of intersects) {
    console.log("Intersected with: ", i.object.uuid);
    let index = 0;
    for (const z of this.Zombies) {
      console
      if (z.model.uuid == i.object.uuid) {
        const damage = (<IWeapon>this.player).damage;

        const stillAlive = (<IZombie>z).TakeDamage(damage);
        console.log(`Zombie health after hit: ${(<IZombie>z).GetHealth()}`);
        (<IWeapon>this.player).PlayHit();
        if (!stillAlive) {
          this.scene.remove(i.object);

          if (this.playAudio) {
            (<IZombie>z).PlayDie();
          }
          deadZombie = true;

          this.kills++;
          this.Zombies.splice(index, 1);
        }

        break;
      }
      index++;
    }
  }
}

  MoveMouse(e: any) {
    this.player.Target(e);

    // if (!this.rendering) {
    //   this.rendering = true;

    //   this.GameEngineRenderer.render(this.ViewPortArea, this.GameCamera);
    //   this.rendering = false;
    // }
  }

  ngAfterViewInit() {
    let t = this;
    this.rendererContainer.nativeElement.appendChild(this.GameEngineRenderer.domElement);

    this.GameEngineRenderer.render(this.scene, this.camera);
    this.GameEngineRenderer.domElement.onmousemove = function (e: any) { t.MoveMouse(e); };

    this.GameEngineRenderer.domElement.onclick = function (e: any) { t.MouseClicked(e); };
  }
}
