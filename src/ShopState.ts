module Twiggy{
     export class ShopState extends Phaser.State{
	//resourses
	water:Water;

	coins:Coin; 
	diamonds:Diamond;

	// menuGroup:Phaser.Group; // maakt var van groep phaser..
	itemArray:Array<ItemObject>;
	// maakt keys item
	cursors: Phaser.CursorKeys;

	//buttons
	x:ButtonObject;
	verkoop:ButtonObject;
	verkoop1:ButtonObject;
	verkoop2:ButtonObject
	rowcount: number = 0; // houd bij welke rij je zit / hoeveel er dus zijn
	placement: number = 0; // houd bij bij welk item in de rij je zit.
	scrollHeight: number; // berekend hoogte van scrollen max.
	fromHeight: number; // hoogte in Y van laatst ondekte input.
	appleprize:TextObject;
	pearprize:TextObject;
	
	constructor() {
		super();
	}

    preload()
	{
		this.load.image("apple", "assets/images/apple.png");
		// this.load.image("apple", "assets/images/apple.png");
		
		console.log('preload');
		//loading the resourses
		//load the sprite of the resourses
		//loading the resourses
		//load the sprite of the resourses
		this.load.image( 'coin', "assets/images/coin.png" );
		this.load.image( 'diamond', "assets/images/diamond.png" );
		this.load.image('x',"assets/images/X.png");
		this.load.image('maal',"assets/images/maal.png");
		this.load.image( 'water', "assets/images/coin.png" );
		this.load.image( 'earth', "assets/images/zon.png" );
		this.load.image( 'back', "assets/images/back.png" );
		this.load.image( 'verkoop', "assets/images/verkoopbutton.png" );
		this.game.stage.backgroundColor = "#663300";
		this.load.image( 'peer', "assets/images/pearattr1.png" );
		this.game.stage.backgroundColor = "#d2691e";

		//load button sprite
		      this.game.load.image('menuparts-04', 'assets/images/menuparts-04.png');
	}
	
	create()
	{
		//inputs
		this.cursors = this.game.input.keyboard.createCursorKeys();
		this.game.input.addPointer();


		//Set title of screen
			var shopTitle = new TextObject(this.game,this.game.width / 2, 50,"Shop", 50, "#000000")
		shopTitle.anchor.set(0.5);
		var sdifTitle = new TextObject(this.game,680, 153,"X", 30, "#000000");
		sdifTitle.anchor.set(0.5);
		var sdifTitle = new TextObject(this.game,680, 243,"X", 30, "#000000");
		sdifTitle.anchor.set(0.5);


		this.coins = new Coin(this.game.width / 2 - 100, 90, TwiggyGame.userData.coin,Coin.prototype.action, this.game);
		this.coins.setSizes(20,20);
		this.coins.render();

		this.diamonds = new Diamond(this.game.width / 2 + 50, 90,TwiggyGame.userData.diamond,Coin.prototype.action, this.game);
		this.diamonds.setSizes(20,20);
		this.diamonds.render();

		//set line for decoration

		//set the list of items in list
		this.itemArray = [		]
		for(let i=0; i < 100; i++) 	{
				this.itemArray.push(new AppleItem(this.game,0,0, ShopState.prototype.action));
		}
	
		

		console.log("created");

		this.scrollHeight = this.rowcount * 100 + 250;
		this.game.world.setBounds(0, 0, 320 * this.game.width, this.scrollHeight);
		this.game.input.onDown.add(this.locationPointer, this);


	    this.x = new ButtonObject(this.game,1100,45, "x", this.xClick);
        this.x.setSizes(20, 20);
        this.x.anchor.set(0.5);
		this.x.render();
		this.verkoop = new ButtonObject(this.game,980,150, "verkoop", this.verkoopClicked);
        this.verkoop.setSizes(100, 50);
        this.verkoop.anchor.set(0.5);
		this.verkoop.render();

		this.verkoop = new ButtonObject(this.game,980,240, "verkoop", this.verkoop1Clicked);
        this.verkoop.setSizes(100, 50);
        this.verkoop.anchor.set(0.5);
		this.verkoop.render();

		this.game.add.sprite(340,120,'apple');
		this.game.add.sprite(340,205,'peer');
		
		//set line for decoration
new Phaser.Rectangle(0, 0,0,0);
		var barBlack,maxWidth,tween; 
		barBlack = this.game.add.graphics(0,115);  
        barBlack.beginFill(0x000000);    barBlack.drawRect(0,0,25,2);
		maxWidth = 1366;    barBlack.width=0;   
                   tween = this.game.add.tween(barBlack);   
                    tween.to({width:maxWidth},100);  
                      tween.start();
		this.appleprize = new TextObject(this.game,640, 128,TwiggyGame.userData.apple, 40, "#000000");
		this.pearprize = new TextObject(this.game,640, 218,TwiggyGame.userData.pear, 40, "#000000");
			
	} 

	locationPointer(){
		this.fromHeight = this.game.input.activePointer.y;
		console.log(this.fromHeight);
	}

	action(){
		// aangeroepen bij elke shop item apple
			this.game.state.start("RunningState",true,true);
	}

	xClick(){
		this.game.state.start("RunningState");

	}
		verkoopClicked = function() {
        if(TwiggyGame.userData.apple > 0){
			TwiggyGame.userData.apple --;
			TwiggyGame.userData.coin = TwiggyGame.userData.coin + 100;
			this.game.add.sprite(620, 118,'back');
			this.game.add.sprite(600, 65,'back');
			this.game.add.sprite(560, 65,'back');
			this.appleprize = new TextObject(this.game,640, 128,TwiggyGame.userData.apple, 40, "#000000");
			this.coins = new Coin(this.game.width / 2 - 100, 90, TwiggyGame.userData.coin,Coin.prototype.action, this.game);
			this.coins.setSizes(20,20);
			this.coins.render();
			
	};};
		verkoop1Clicked = function() {
        if(TwiggyGame.userData.pear >0){
			TwiggyGame.userData.pear--;
			TwiggyGame.userData.coin = TwiggyGame.userData.coin + 100;
			this.game.add.sprite(620, 148,'back');
			this.game.add.sprite(600, 65,'back');
			this.game.add.sprite(560, 65,'back');
			this.pearprize = new TextObject(this.game,640, 128,TwiggyGame.userData.apple, 40, "#000000");
			this.coins = new Coin(this.game.width / 2 - 100, 90, TwiggyGame.userData.coin,Coin.prototype.action, this.game);
			this.coins.setSizes(20,20);
			this.coins.render();
		};};
		
	//user this for rendering
	render(){
		//
	}
	update(){
		
		  if (this.cursors.up.isDown)
			{
				this.game.camera.y -= 10;
			}
			else if (this.cursors.down.isDown)
			{
				this.game.camera.y += 10;
			}
			else if (this.game.input.mouse.wheelDelta === Phaser.Mouse.WHEEL_UP) {
				this.game.camera.y -= 50;
				this.game.input.mouse.wheelDelta = null;
			} 
			else if(this.game.input.mouse.wheelDelta === Phaser.Mouse.WHEEL_DOWN) {
				this.game.camera.y += 50;
				this.game.input.mouse.wheelDelta = null;
			}

			if (this.game.input.activePointer.isDown)
			{
				if (this.game.input.y > this.fromHeight)
					{
						this.game.camera.y += 15;
					}
				else if  (this.game.input.y < this.fromHeight)
					{
						this.game.camera.y -= 15;	
					}
			}
	}

}
}