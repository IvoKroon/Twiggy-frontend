import Socket = SocketIOClient.Socket;
module Twiggy {
    export class RunningState extends Phaser.State {
        textStyle: Object;
        //resourses
        water: Water;

        diamond: number;
        speed: number = 1;

        //buttons
        menubutton: ButtonObject;
        button: ButtonObject;
        button2: ButtonObject;
        button3: ButtonObject;
        // button4: ButtonObject;
        shopButton: ButtonObject;
        waterWarning:ButtonObject;
        waterWarningState:Number;

        // growbutton: GrowButton;

        menuGroup: Phaser.Group; // maakt var van groep phaser..

        curTreeLevel: number = 1;

        clouds: Array<Cloud>;

        startGame: boolean = false;

        startTree: GameSprite;
        seed: Phaser.Sprite;

        tree: Phaser.Sprite;
        growButton: Phaser.Sprite;
        counter: number = 0;

        energy:Energy;
        coin:Coin;

        treeName:TextObject;
        energyNeeded:TextObject;

        quest:QuestObject;

        //popup
        buttonpopup:ButtonObject;
        popup:Phaser.Sprite;
        closewidth: number;
        closeheight:number;
        closebutton: ButtonObject;

        popupText:TextObject = null;



        constructor() {
            super();
        }

        preload() {
            console.log(TwiggyGame.userData.seed);
            // this.game.scale.pageAlignVertically = true;
            // this.game.scale.pageAlignHorizontally = true;
            // this.game.scale.setShowAll();
            // this.game.scale.refresh();
            //keep the game active all the time
            // this.game.stage.disableVisibilityChange = true;

            this.menuGroup = new GroupObject(this.game);
            this.game.load.image('water', "assets/images/waterdrop.png");
            this.game.load.image('energy', "assets/images/light.png");

            this.game.load.image('button', "assets/images/button.png");
            this.game.load.image('appleAttr', "assets/images/apple.png");
            this.game.load.image('pearattr', "assets/images/pearattr.png");
            this.game.load.image('coin', "assets/images/coin.png");
            this.game.load.image('button1', "assets/images/sun.png");
            this.game.load.image('button2', "assets/images/sun.png");
            this.game.load.image('button3', "assets/images/sun.png");
            this.game.load.image('shopButton', "assets/images/market.png");
            this.game.load.image('buttontoshop', "assets/images/dog.png");
            this.game.load.image('growbutton', 'assets/images/growbutton.png');
            this.game.load.image('waterwarning1', 'assets/images/waterwarning.png');
            this.game.load.image('waterwarning2', 'assets/images/waterwarning1.png');
            this.game.load.image('waterwarning3', 'assets/images/waterwarning2.png');
            this.game.load.image('popup', 'assets/images/popup.png');
            this.game.load.image('close', 'assets/images/close.png');
            //trees growing.

            // //Pear growing.
            this.game.load.image('pear1', 'assets/images/pear/tree-01.png');
            this.game.load.image('pear2', 'assets/images/pear/tree-02.png');
            this.game.load.image('pear3', 'assets/images/pear/tree-03.png');
            this.game.load.image('pear4', 'assets/images/pear/tree-04.png');

            this.game.load.image('cloud', 'assets/images/cloud2.png');
            this.game.load.image('startTree', 'assets/images/startground.png');
            // this.game.load.spritesheet('gb', 'assets/images/growbutton/sprites.png', 30, 43, 3);
            this.game.load.atlasJSONHash('gb', 'assets/images/growbutton/growButton.png', 'assets/images/growbutton/growButton.json');
            this.game.load.atlasJSONHash('appleTreeState1', 'assets/images/trees/apple/appleState1.png', 'assets/images/trees/apple/appleState1.json');
            this.game.load.atlasJSONHash('appleTreeState2', 'assets/images/trees/apple/appleState2.png', 'assets/images/trees/apple/appleState2.json');
            this.game.load.atlasJSONHash('appleTreeState3', 'assets/images/trees/apple/appleState3.png', 'assets/images/trees/apple/appleState3.json');
            this.game.load.atlasJSONHash('appleTreeState4', 'assets/images/trees/apple/appleState4.png', 'assets/images/trees/apple/appleState4.json');
            this.game.load.atlasJSONHash('appleTreeState5', 'assets/images/trees/apple/appleTreeState5.png', 'assets/images/trees/apple/appleTreeState5.json');
            this.game.load.atlasJSONHash('appleTreeState6', 'assets/images/trees/apple/appleTreeState6.png', 'assets/images/trees/apple/appleTreeState6.json');
            this.game.load.atlasJSONHash('appleTreeState7', 'assets/images/trees/apple/appleTreeState7.png', 'assets/images/trees/apple/appleTreeState7.json');

            this.game.load.image('mountain1', 'assets/images/moutain1.png');
            this.game.load.image('mountain2', 'assets/images/mountain2.png');
            this.game.load.image('mountain3', 'assets/images/mountain3.png');
            this.game.load.image('mountain4', 'assets/images/moutain3.png');

            this.game.load.image('dutchmountain', 'assets/images/dutchmountain.png');
            this.game.load.image('grass', 'assets/images/grass1.png');

            this.game.load.image('menuparts-01', 'assets/images/menuparts-01.png');
            this.game.load.image('menuparts-02', 'assets/images/menuparts-02.png');
            this.game.load.image('menuparts-03', 'assets/images/menuparts-03.png');
            this.game.load.image('menuparts-04', 'assets/images/menuparts-04.png');
            this.game.load.image('menuparts-05', 'assets/images/menuparts-05.png');

            this.game.load.image('firstseed', 'assets/images/firstSeed.png');
        }

        //create background
        createGradient() {
            this.game.stage.backgroundColor = "#FFF";
            let myBitmap = this.game.add.bitmapData(this.game.width, this.game.height);
            let grd = myBitmap.context.createLinearGradient(0, 0, 0, 500);
            grd.addColorStop(1, "#cbe0f4");
            grd.addColorStop(0, "#0e87ca");
            myBitmap.context.fillStyle = grd;
            myBitmap.context.fillRect(0, 0, this.game.width, this.game.height);

            //naaw no animation we use this
            // this.game.add.sprite(0,0, myBitmap);

            //load the animation
            let anim = this.game.add.sprite(0, 0, myBitmap);
            anim.alpha = 0;
            this.game.add.tween(anim).to({alpha: 1}, 2000).start();
        }

        create() {
            // console.log("Test");
            // this.quest = new QuestObject(TwiggyGame.userData);
            this.createGradient();
            //load the background
            let dutchMountain = this.game.add.sprite(-3, this.game.height - 300, 'dutchmountain');
            dutchMountain.width = (this.game.width + 3) / 2;

            this.game.add.sprite(0, this.game.height - 100, 'mountain2');
            let mountainBack = this.game.add.sprite(-150, this.game.height - 180, 'mountain4');
            mountainBack.width = this.game.width + 300;

            let mountain = this.game.add.sprite(-2, this.game.height - 150, 'mountain1');
            mountain.width = this.game.width + 4;

            this.button2 = new ButtonObject(this.game, this.game.width - 40, this.game.height + 20, "menuparts-02", this.button2Click);
            this.button2.setSizes(80, 40);
            this.button2.anchor.set(0.5);
            this.menuGroup.add(this.button2);

            this.button3 = new ButtonObject(this.game, this.game.width - 40, this.game.height + 60, "menuparts-03", this.button3Click);
            this.button3.setSizes(80, 40);
            this.button3.anchor.set(0.5);
            this.menuGroup.add(this.button3);

            this.shopButton = new ButtonObject(this.game, this.game.width - 40, this.game.height + 100, "menuparts-04", this.shopButtonCliced);
            this.shopButton.setSizes(80, 40);
            this.shopButton.anchor.set(0.5);
            this.menuGroup.add(this.shopButton);

            //first button
            this.menubutton = new ButtonObject(this.game, this.game.width - 110, this.game.height - 60, "menuparts-05", this.toggleMenu.bind(this)); // bind zorgt ervoor dat je in de functie nog bij je menugroep item kan.
            this.menubutton.setSizes(100, 50);
            this.menuGroup.add(this.menubutton);  // voeg zo alle knopjes in de array.
            this.game.world.bringToTop(this.menuGroup);

            if (TwiggyGame.userData.plot.plant) {
            }

            this.clouds = [
                new Cloud(this.game, 'cloud'),
                new Cloud(this.game, 'cloud'),
                new Cloud(this.game, 'cloud'),
                new Cloud(this.game, 'cloud'),
            ];

            this.game.physics.startSystem(Phaser.Physics.ARCADE);

            this.energy = new Energy(20, 20, Math.floor(TwiggyGame.userData.energy), Energy.prototype.action, this.game);
            this.energy.setSizes(15, 20);
            this.energy.render();

            if (!TwiggyGame.userData.plot.plant) {
                console.log('load water');
                this.seed = this.game.add.sprite(this.game.width / 2 - 10, 0, 'firstseed');
                this.seed.width = 40;
                this.seed.height = 50;
                this.seed.inputEnabled = true;
                this.seed.input.enableDrag();
                this.seed.input.allowHorizontalDrag = false;
                //load the plant
            }

            this.startTree = new GameSprite(this.game,
                this.game.width / 2 - 100,
                this.game.height - 200
                , "startTree");
            this.startTree.width = 200;
            this.startTree.height = 100;
            this.startTree.render();
            if (!TwiggyGame.userData.plot.plant) {
                this.game.physics.enable([this.startTree, this.seed], Phaser.Physics.ARCADE);
            }

            if (TwiggyGame.userData.plot.plant) {
                this.loadNewState();
            }

            // tell Phaser how you want it to handle scaling when you go full screen
            this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
            // and this causes it to actually do it
            this.game.scale.refresh();
            //this lines will build the resourse objects.
            // this.shopButton = new ButtonObject(this.game, this.game.width / 2, 200, "buttonshop", RunningState.prototype.goToShopState);

            this.water = new Water(20, 80, Math.floor(TwiggyGame.userData.water), Water.prototype.action, this.game);
            this.water.setSizes(20, 20);
            this.water.render();

            this.coin = new Coin(this.game.width - 200, 20, 200, Coin.prototype.action, this.game);
            this.coin.setSizes(20, 20);
            this.coin.render();

            var fourth = this.game.width / 4; // een vierde van de game grote
            var eigth = this.game.height / 8; // 1/8
            

            this.popup = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'popup');
            this.popup.anchor.set(0.5);
            this.popup.inputEnabled = true;
            this.popup.input.enableDrag();
            this.closewidth =( this.popup.width / 2) -30
            this.closeheight =( this.popup.height / 2) -8
            this.closebutton = new ButtonObject(this.game, this.closewidth, this.closeheight,'close',this.closePopup.bind(this));
            this.popup.addChild(this.closebutton);
            this.popup.scale.set(0);
            this.game.world.bringToTop(this.popup);
            this.openPopup.bind(this);

            // this.game.time.events.loop(Phaser.Timer.SECOND, this.loop.bind(this), this);
        }

        closePopup(){
            this.game.add.tween(this.popup.scale).to({x:0, y:0}, 500 ,Phaser.Easing.Elastic.Out, true).start();
            console.log("closing");
        }

        openPopup(){
            let weirdtween = this.game.add.tween(this.popup.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out,true);
        }

        //THIS IS FOR UPDATING THE TREE STATE
        loadNewState() {
            if (this.tree) {
                this.tree.destroy();
            }

            if (TwiggyGame.userData.plot.plant) {
                let growButtonHeight = this.game.cache.getImage('gb').height / 1.5;
                let growButtonWidth = this.game.cache.getImage('gb').width / 1.5;

                this.growButton = this.game.add.sprite(
                    this.game.width / 2 - growButtonWidth / 2
                    , this.game.height - 80
                    , 'gb');
               if(!this.energyNeeded) {
                this.energyNeeded = new TextObject(this.game,   this.game.width / 2 - growButtonWidth / 2
                    + 80, this.game.height - 80, this.treeCoast().toString(), 30, "#000");
                console.log( this.energyNeeded ) ;
                this.game.world.bringToTop(this.energyNeeded);
            }
                this.growButton.animations.add('growButton');
                this.growButton.animations.play('growButton', 4, true);
                this.growButton.inputEnabled = true;
                this.growButton.events.onInputDown.add(this.growButtonHandler.bind(this), this);
                this.growButton.width = growButtonWidth;
                this.growButton.height = growButtonHeight;
            }
            console.log('loading new state');
            let treeState = 'appleTreeState1';
            let appleTreeWidth = 150;
            let appleTreeHeight = 150;

            switch (TwiggyGame.userData.plot.plant.state_id) {
                case 1:
                    treeState = 'appleTreeState1';
                    break;
                case 2:
                    appleTreeWidth = 200;
                    appleTreeHeight = 200;
                    treeState = 'appleTreeState2';
                    break;
                case 3:
                    appleTreeWidth = 250;
                    appleTreeHeight = 350;
                    treeState = 'appleTreeState3';
                    break;
                case 4:
                    appleTreeWidth = 250;
                    appleTreeHeight = 350;
                    treeState = 'appleTreeState4';
                    break;
                case 5:
                    appleTreeWidth = 250;
                    appleTreeHeight = 350;
                    treeState = 'appleTreeState5';
                    break;
                case 6:
                    appleTreeWidth = 250;
                    appleTreeHeight = 350;
                    treeState = 'appleTreeState6';
                    break;
                case 7:
                    appleTreeWidth = 300;
                    appleTreeHeight = 500;
                    treeState = 'appleTreeState7';
                    break;

                default:
                    treeState = 'appleTreeState1';
            }

            this.tree = this.game.add.sprite(
                this.game.width / 2 - appleTreeWidth / 2
                , this.game.height - appleTreeHeight - 130
                , treeState);

            this.tree.animations.add('tree');
            this.tree.animations.play('tree', 8, true);
            this.tree.inputEnabled = true;
            this.tree.width = appleTreeWidth;
            this.tree.height = appleTreeHeight;
            this.game.world.bringToTop(this.startTree);
            if(!this.treeName) {
                this.treeName = new TextObject(this.game, 0, 50, TwiggyGame.userData.plot.plant.title, 30, "#000");
                this.treeName.x = this.game.width / 2 - this.treeName.width / 2;
            }
            this.energyNeeded.text =  this.treeCoast().toString() + " energie nodig om te groeien";
            this.game.world.bringToTop(this.treeName);
            this.game.world.bringToTop(this.popup);
        }

        growButtonHandler() {
            console.log(TwiggyGame.userData);
            //check data
            let updateCost = this.treeCoast();
            if (TwiggyGame.userData.energy >= updateCost) {
                if (TwiggyGame.userData.plot.plant.state_id < 7) {
                    TwiggyGame.userData.energy -= updateCost;
                    this.energy.amount = TwiggyGame.userData.energy;
                    TwiggyGame.userData.plot.plant.state_id += 1;
                    this.loadNewState();

                } else {
                    console.log("Your plant is now max level");
                }

            } else {
                console.log("Not possible yet");
            }
        }

        treeCoast():number {
            let coast:number = 0;

            switch(TwiggyGame.userData.plot.plant.state_id){
                case 1:
                    coast = 200;
                    break;
                case 2:
                    coast = 220;
                    break;
                case 3:
                    coast = 240;
                    break;
                case 4:
                    coast = 260;
                    break;
                case 5:
                    coast = 280;
                    break;
                case 6:
                    coast = 300;
                    break;
                case 7:
                    coast = 320;
                    break;
                default:
                    coast = 320;
                    console.log("Switch Error");
            }

            return coast;
        }



        update() {
            // this.quest.update(TwiggyGame.userData);
            TwiggyGame.userData.update();
            if(TwiggyGame.energyQuest){
                if(this.popupText){
                    this.popup.removeChild(this.popupText)
                }
                //add text
                this.popupText = new TextObject(this.game,0,0,"Je hebt 600 energy!",20,"#000");
                // text.re
                this.popup.addChild(this.popupText);
                this.popup.reset;
                this.openPopup();
                TwiggyGame.energyQuest = false;
                // console.log("DONE");
            }

             if(TwiggyGame.stateQuest){
                 if(this.popupText){
                    this.popup.removeChild(this.popupText)
                }
                this.popupText = new TextObject(this.game,0,0,"Whooew, state 3!",20,"#000");
                // text.re
                this.popup.addChild(this.popupText);
                this.openPopup();
                TwiggyGame.stateQuest = false;
                // console.log("DONE");
            }

             if(TwiggyGame.appleQuest){
                 if(this.popupText){
                    this.popup.removeChild(this.popupText)
                }
                this.popupText = new TextObject(this.game,0,0,"7 appels geplukt!",20,"#000");
                // text.re
                this.popup.addChild(this.popupText);
                this.openPopup();
                TwiggyGame.appleQuest = false;
                // console.log("DONE");
            }
            //do something every second
            //TODO make it every second..... maybe there is an error
            if(TwiggyGame.userData.plot.plant){
                if(this.counter % 180 == 0){
                    //give water
                    TwiggyGame.userData.water ++;
                }
                if(this.counter % 360 == 0){
                    //show water WARNING
                    let waterSprite = 'waterwarning1';
                    //TODO SHOW DIFFERENT WARNINGS.
                    //TODO Destroy the tree.
                    if(!this.waterWarning){
                        if(this.waterWarningState == 1){
                            waterSprite = 'waterwarning1';
                        }else if(this.waterWarningState == 2){
                            // this.waterWarning.destroy();
                            waterSprite = 'waterwarning2';
                        }else{
                            // this.waterWarning.destroy();
                            waterSprite = 'waterwarning3';
                        }
                    }
                    if(!this.waterWarning){
                        console.log("SHOW WATER WARNING");
                        this.waterWarning = new ButtonObject(this.game,80,80,waterSprite, () =>{
                            console.log("TEST");
                            TwiggyGame.userData.water --;
                            this.water.amount = TwiggyGame.userData.water;
                            this.waterWarning.destroy();
                            this.waterWarning = null;
                        });
                        this.waterWarning.render();
                    }else{

                    }

                }
            }
            if (this.counter % 60 == 0) {
                // console.log("SEC");
                TwiggyGame.userData.energy += 100;
                this.energy.amount = TwiggyGame.userData.energy;
                this.coin.amount = TwiggyGame.userData.coin;
                this.water.amount = TwiggyGame.userData.water;

                // this.counter = 0;
            }
            if(TwiggyGame.userData.plot.plant){
                if(TwiggyGame.userData.plot.plant.state_id > 6){
                    if(this.counter % 180 == 0){
                        //create new apple
                        //place apple on right place
                        let fruitreeWidth = 300;
                        let fruitTreeHeight = 500;
                        let maxFruitX = this.game.width / 2;
                        let minFruitX = this.game.width / 2 - 100;
                        let maxFruitY = this.game.height - fruitTreeHeight - 250;
                        let minFruitY = this.game.height - fruitTreeHeight - 100;

                        let fruitX = Math.floor((Math.random() * 180) + minFruitX);

                        let fruitY = Math.floor((Math.random() * 220) + minFruitY);
                        let fruit = null;
                        if(TwiggyGame.userData.seed == 1){
                            fruit = new ButtonObject(this.game,fruitX,fruitY,'appleAttr', () => 
                            {
                                TwiggyGame.userData.apple++; 
                                console.log(TwiggyGame.userData.apple);
                                fruit.destroy();
                            });
                        }else{
                            fruit = new ButtonObject(this.game,fruitX,fruitY,'pearattr', () => 
                            {
                                TwiggyGame.userData.pear++; 
                                console.log(TwiggyGame.userData.pear);
                                fruit.destroy();
                            });
                        }

                        fruit.width = 30;
                        fruit.height = 30;
                        fruit.render();
                    }
                }

            }
            this.counter++;

            for (let i = 0; i < this.clouds.length; i++) {
                this.clouds[i].move();
            }
            if (!TwiggyGame.userData.plot.plant) {
                // console.log("There is a plot");
                // }else{
                this.game.physics.arcade.overlap(this.startTree, this.seed, this.collisionHandler, null, this);// this.socket.on('energy', function (data: any) {
            }

        }

        getApple(){

        }

        collisionHandler() {
            this.seed.destroy();
            let plantObject = null;
            if(TwiggyGame.userData.seed == 1){
                plantObject = new PlantData("1", "Appel boom", 0, 1, 1);
            }else{
                plantObject = new PlantData("1", "Peren boom", 0, 1, 1);
            }
            
            TwiggyGame.userData.plot.plant = plantObject;
            console.log(TwiggyGame.userData.plot.plant);
            this.loadNewState();
        }

        toggleMenu() {
            if (this.menuGroup.y == 0) {
                let menuTween = this.game.add.tween(this.menuGroup).to({
                    y: -130
                }, 400, Phaser.Easing.Bounce.Out, true);
            }
            if (this.menuGroup.y == -130) {
                let menuTween = this.game.add.tween(this.menuGroup).to({
                    y: 0
                }, 400, Phaser.Easing.Bounce.Out, true);
            }
        }

        button1Click() {
            this.game.stage.backgroundColor = "#ff0000";
            // stage change naar menu state. nieuw .ts bestand. shop. opt. ect.
        }

        button2Click() {
            this.game.stage.backgroundColor = "#21ff00";
        }

        button3Click() {
            this.game.stage.backgroundColor = "#0043ff";
        }

        shopButtonCliced() {
            this.game.state.start("ShopState", true, true);
        }
    }
}