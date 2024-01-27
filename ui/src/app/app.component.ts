import { Component, ViewChild, ElementRef } from '@angular/core';
import * as THREE from 'three';
import { Cannon } from './models/cannon/cannon';
import { Zombie } from './models/zombie/zombie';
import { IZombie } from './models/izombie';
import { IWeapon } from './models/iweapon';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('rendererContainer') rendererContainer: ElementRef;
  public rendering: Boolean;
  public Zombies: Array<IZombie>;
  public kills = 0;
  public playAudio: boolean;
  public GameEngineRenderer = new THREE.WebGLRenderer();
  public Projector = new THREE.Projector();
  public ViewPortArea = null;
  public GameCamera = null;
  public SceneLight: any;
  public JSONLoader: any;
  public player: any;
  public totalZombies: number;

  constructor() {
    this.playAudio = true;
    this.Zombies = new Array<IZombie>();
    this.totalZombies = 5;
    this.ViewPortArea = new THREE.Scene();
    // this.ViewPortArea.add(new THREE.AmbientLight(0x000000));

    this.GameCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.GameCamera.position.x = 1;
    this.GameCamera.position.z = 7;
    this.GameCamera.position.y = 3;


    this.GameEngineRenderer.setSize(window.innerWidth - 35, window.innerHeight - 10);
    this.GameEngineRenderer.setClearColor(0x0000aa, 1.0);


    this.SceneLight = new THREE.PointLight(0xFFFFFF);
    this.SceneLight.position.set(-15, 10, 15);
    this.ViewPortArea.add(this.SceneLight);



    this.AddPlayerToScene();

    let t = this;
    let timer = Observable.timer(100, 100);
    timer.subscribe((r) => {
      for (const z of t.Zombies) {
        z.MoveForward();
      }
      t.GameEngineRenderer.render(t.ViewPortArea, t.GameCamera);
    });

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
    this.player = new Cannon((r) => {

      t.ViewPortArea.add(r);
    });

  }

  AddZombieToScene(offset: number) {
    const t = this;

    const z = new Zombie(offset, (r) => {

      t.ViewPortArea.add(r);
    });

    this.Zombies.push(z);
  }

  MouseClicked(event) {
    if (this.playAudio) {

      (<IWeapon>this.player).PlayAttack();
    }
    var mouse3D = new THREE.Vector3((event.clientX / window.innerWidth) * 2 - 1,   //x
      -(event.clientY / window.innerHeight) * 2 + 1,  //y
      0.5);                                            //z
    this.Projector.unprojectVector(mouse3D, this.GameCamera);
    mouse3D.sub(this.GameCamera.position);
    mouse3D.normalize();
    // mouse3D.unproject(this.GameCamera);
    var raycaster = new THREE.Raycaster(this.GameCamera.position, mouse3D);

    let zs = [];
    for (const z of this.Zombies) {
      zs.push(z.model);
    }
    var intersects = raycaster.intersectObjects(zs);
    if (intersects.length) {
      console.log(intersects);
    } else {
      console.log(intersects);
    }
    let deadZombie = false;
    for (const i of intersects) {

      let index = 0;
      for (const z of this.Zombies) {
        if (z.model.uuid == i.object.uuid) {
          const damage = (<IWeapon>this.player).damage;

          const stillAlive = (<IZombie>z).TakeDamage(damage);
          (<IWeapon>this.player).PlayHit();
          if (!stillAlive) {
            this.ViewPortArea.remove(i.object);

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


    // if (deadZombie) {
    //   let newZombies = new Array<IZombie>();

    //   for (const z of this.Zombies) {
    //     if (!z.dead) {
    //       newZombies.push(z);
    //     }
    //   }

    //   this.Zombies = newZombies;
    // }


  }

  MoveMouse(event) {
    this.player.Target(event);

    // if (!this.rendering) {
    //   this.rendering = true;

    //   this.GameEngineRenderer.render(this.ViewPortArea, this.GameCamera);
    //   this.rendering = false;
    // }
  }

  ngAfterViewInit() {
    let t = this;
    this.rendererContainer.nativeElement.appendChild(this.GameEngineRenderer.domElement);

    this.GameEngineRenderer.render(this.ViewPortArea, this.GameCamera);
    this.GameEngineRenderer.domElement.onmousemove = function (e) { t.MoveMouse(e); };

    this.GameEngineRenderer.domElement.onclick = function (e) { t.MouseClicked(e); };
  }
}
