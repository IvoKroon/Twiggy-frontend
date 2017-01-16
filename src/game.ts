/// <reference path="../tsDefinitions/phaser.d.ts" />
/// <reference path="./RunningState.ts" />

module Twiggy{
     export class TwiggyGame
{
	game:Phaser.Game;
	static coin: Coin;
	static energy: Energy;
	static userData: UserData
	static growButtonExist : boolean = false;



	constructor()
	{
		//setup the game
		this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content');
		this.game.state.add("MenuScreenState", MenuScreenState , false);
		this.game.state.add("RunningState", RunningState , false);
		this.game.state.add("ShopState", ShopState , false);
		this.game.state.start("RunningState",true,true);

		let userObject = new UserObject("Ivo", "Kroon", "BLA");
		let plantObject = null;
		let plot = new Plot("1", "First", 1, 1, plantObject);

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