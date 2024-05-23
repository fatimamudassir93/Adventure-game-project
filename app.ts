#! /usr/bin/env node
import inquirer from "inquirer";

class Player {
    name: string;
    health: number;

    constructor(name: string) {
        this.name = name;
        this.health = 100;
    }

    decreaseHealth() {
        this.health -= 20;
    }

    increaseHealth() {
        this.health = 100;
    }
}

// for opponent.
class Opponent {
    name: string;
    health: number;

    constructor(name: string) {
        this.name = name;
        this.health = 100;
    }
    decreaseHealth() {
        this.health -= 20;
    }

    increaseHealth() {
        this.health = 100;
    }
}
    async function main() {
        const { playerName } = await inquirer.prompt([
            {
                type: "input",
                name: "playerName",
                message: "Enter your Player Name:"
            }
        ]);
    
        const { opponentType } = await inquirer.prompt([
            {
                type: "list",
                name: "opponentType",
                choices: ["alien", "zoombie", "monster", "witch"],
                message: "select the opponent you want to fight with:"
            }
        ]);
    
        const player = new Player(playerName);
        const opponent = new Opponent(opponentType);
        console.log(`${opponent.name} v/s ${player.name}`);
    
        while (player.health > 0 && opponent.health > 0) {
            const { action } = await inquirer.prompt([
                {
                    type: "list",
                    name: "action",
                    choices: ["attack", "range target", "defend", "run"],
                    message: "choose the attack type to perform action",
                }
            ]);
    
            switch (action) {
                case "attack":
                    const playerAttack = Math.random() > 0.5;
                    const opponentAttack = Math.random() > 0.5;
    
                    if (playerAttack) {
                        opponent.decreaseHealth();
                        console.log(`${opponent.name} health: ${opponent.health}`);
                    }
    
                    if (opponentAttack) {
                        player.decreaseHealth();
                        console.log(`${player.name} health: ${player.health}`);
                    }
    
                    break;
            }
    
            if (player.health <= 0) {
                console.log("you lost! try again");
                return;
            }
    
            if (opponent.health <= 0) {
                console.log("Congratulations! you won!");
                return;
            }
        }
    }
    
    main();
