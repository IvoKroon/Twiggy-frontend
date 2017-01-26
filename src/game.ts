/// <reference path="../tsDefinitions/phaser.d.ts" />
/// <reference path="./RunningState.ts" />

module Twiggy{
     export class TwiggyGame
{
	game:Phaser.Game;
	// static coin: Coin;
	// static energy: Energy;
	static userData: UserData;
	static appleQuest:boolean = false;
	static energyQuest:boolean = false;
	static stateQuest:boolean = false;
	// static growButtonExist : boolean = false;



	constructor()
	{
		//setup the game

		this.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'content');

		this.game.state.add("MenuScreenState", MenuScreenState , false);
		this.game.state.add("RunningState", RunningState , false);
		this.game.state.add("ShopState", ShopState , false);
		this.game.state.add("ChooseState", ChooseState , false);
		this.game.state.start("ChooseState",true,true);


		let userObject = new UserObject("Ivo", "Kroon", "BLA");
		let plantData:PlantData = null;
		let plot = new Plot("1", "First", 1, 1, plantData);

		  TwiggyGame.userData = new UserData(100, 0, 0, 0,
            plot,
            userObject
        );
	}
}


// when the page has finished loading, create our game
window.onload = () => {
	new TwiggyGame();
}
}