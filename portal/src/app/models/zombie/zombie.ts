import { ThreeModel } from "../three-model";
import * as THREE from 'three';
import { IZombie } from "../izombie";
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';

export class Zombie extends ThreeModel implements IZombie {
    public model!: THREE.Object3D;
    public baseHealth: number;
    public remainingHealth: number;
    public dieAudio: any;
    public dead: boolean;

    constructor(offset: number, callback: (r: any) => void) {
        super();
        this.baseHealth = 15;
        this.dead = true;
        this.remainingHealth = this.baseHealth;
        const cb = callback;
        const offSet = offset;
        const t = this;

        // Use GLTFLoader for .glb files
        const loader = new GLTFLoader();
        loader.load('assets/crate.glb', (gltf: GLTF) => {
            t.model = gltf.scene;
            t.model.scale.set(0.5, 0.5, 0.5);
            t.model.rotation.y = 9.4;
            t.model.position.x = offSet;
            t.model.position.z = -20;
            cb(t.model);
        });

        this.dieAudio = new Audio();
        this.dieAudio.src = "../../assets/explosion.mp3";
        this.dieAudio.load();


    }

    MoveForward(): void {
        if (this.model) {
            this.model.position.z += 0.01;
        }
    }

    Attack(): void {

    }

    TakeDamage(amount: number): Boolean {
        this.remainingHealth -= amount;
        console.log(`Zombie took ${amount} damage, remaining health: ${this.remainingHealth}`);
        return this.remainingHealth > 0;
    }

    GetHealth(): number {
        return this.remainingHealth;
    }

    //   public  Target(event: any): void {
    //         var screenWidth = window.innerWidth - 60;
    //         var mousePercentage = (event.clientX / screenWidth);

    //         if (mousePercentage > 1) {
    //             mousePercentage = 1;
    //         }

    //         var leftSide = 10.2;
    //         var rightSide = 8.6;
    //         var fullRange = leftSide - rightSide;
    //         var targetPoint = fullRange * mousePercentage;

    //         this.model.rotation.y = leftSide - targetPoint;
    //     }

    PlayAttack(): void {

    }

    PlayMove(): void {

    }

    PlayDie(): void {
        this.dieAudio.play();
    }
}
