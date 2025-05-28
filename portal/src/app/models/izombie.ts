export interface IZombie {
    model: any;
    baseHealth: number;
    dead: boolean;
    MoveForward(): void;
    Attack(): void;
    TakeDamage(amount: number): Boolean;
    GetHealth(): number;
    PlayDie(): void;
}
