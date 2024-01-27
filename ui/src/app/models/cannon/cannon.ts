import { IWeapon } from "../iweapon";
import { ThreeModel } from "../three-model";
import * as THREE from 'three';

export class Cannon extends ThreeModel implements IWeapon {
    public JSONLoader: any;
    public model: any;
    public damage: number;

    private fireAudio: any;
    private moveAudio: any;
    private hitAudio: any;

    constructor(callback: (r) => void) {
        super();
        this.damage = 5;
        const cb = callback;
        const t = this;
        this.JSONLoader = new THREE.JSONLoader();
        this.JSONLoader.load('./assets/cannon.model.json', (g, m) => {
            t.model = new THREE.Mesh(g, m);
            t.model.scale.set(.5, .5, .5);
            t.model.rotation.y = 9.4;
            t.model.position.x = 5.5;
            t.model.position.z = 2.5;
            cb(t.model);
        });


        this.fireAudio = new Audio();
        this.fireAudio.src = "../../assets/cannon.fire.mp3";
        this.fireAudio.load();

        this.moveAudio = new Audio();
        this.moveAudio.src = "../../assets/cannon.hit.mp3";
        this.moveAudio.load();

        this.hitAudio = new Audio();
        this.hitAudio.src = "../../assets/cannon.hit.mp3";
        this.hitAudio.load();
    }

    public Target(event: any): void {
        var screenWidth = window.innerWidth - 60;
        var mousePercentage = (event.clientX / screenWidth);

        if (mousePercentage > 1) {
            mousePercentage = 1;
        }

        var leftSide = 10.2;
        var rightSide = 8.6;
        var fullRange = leftSide - rightSide;
        var targetPoint = fullRange * mousePercentage;

        if (this.model) {

            this.model.rotation.y = leftSide - targetPoint;

        }
    }

    PlayAttack(): void {
        this.fireAudio.play();
    }

    PlayHit(): void {
        this.hitAudio.play();
    }

    PlayMove(): void {

    }
}
