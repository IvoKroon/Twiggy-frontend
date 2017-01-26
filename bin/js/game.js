var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CookieHandler = (function () {
    function CookieHandler(cookie) {
        this.cookie = cookie;
        if (!localStorage.getItem(this.cookie)) {
            localStorage.setItem(this.cookie, "0");
        }
        // this.delete();
    }
    CookieHandler.prototype.delete = function () {
        localStorage.setItem(this.cookie, "0");
    };
    CookieHandler.prototype.add = function (amount) {
        var cookieAmount = this.getInt();
        // cookieAmount += amount;
        this.set(cookieAmount);
    };
    CookieHandler.prototype.set = function (add) {
        var cookieAmount = String(add);
        localStorage.setItem(this.cookie, cookieAmount);
    };
    CookieHandler.prototype.getInt = function () {
        if (localStorage.getItem(this.cookie)) {
            return parseInt(localStorage.getItem(this.cookie));
        }
        else {
            return false;
        }
    };
    return CookieHandler;
}());
var MenuScreenState = (function (_super) {
    __extends(MenuScreenState, _super);
    function MenuScreenState() {
        _super.call(this);
        this.count = 0;
    }
    MenuScreenState.prototype.preload = function () {
        this.load.image("title", "assets/images/dog.png");
    };
    MenuScreenState.prototype.create = function () {
        this.titleScreenImage = this.add.sprite(0, 0, "title");
        this.input.onTap.addOnce(this.titleClicked, this); // <-- that um, this is extremely important
    };
    MenuScreenState.prototype.titleClicked = function () {
        this.game.state.start("ShopState");
    };
    return MenuScreenState;
}(Phaser.State));
var Twiggy;
(function (Twiggy) {
    var RunningState = (function (_super) {
        __extends(RunningState, _super);
        function RunningState() {
            _super.call(this);
            this.speed = 1;
            this.curTreeLevel = 1;
            this.startGame = false;
            this.counter = 0;
            this.popupText = null;
        }
        RunningState.prototype.preload = function () {
            console.log(Twiggy.TwiggyGame.userData.seed);
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
        };
        //create background
        RunningState.prototype.createGradient = function () {
            this.game.stage.backgroundColor = "#FFF";
            var myBitmap = this.game.add.bitmapData(this.game.width, this.game.height);
            var grd = myBitmap.context.createLinearGradient(0, 0, 0, 500);
            grd.addColorStop(1, "#cbe0f4");
            grd.addColorStop(0, "#0e87ca");
            myBitmap.context.fillStyle = grd;
            myBitmap.context.fillRect(0, 0, this.game.width, this.game.height);
            //naaw no animation we use this
            // this.game.add.sprite(0,0, myBitmap);
            //load the animation
            var anim = this.game.add.sprite(0, 0, myBitmap);
            anim.alpha = 0;
            this.game.add.tween(anim).to({ alpha: 1 }, 2000).start();
        };
        RunningState.prototype.create = function () {
            // console.log("Test");
            // this.quest = new QuestObject(TwiggyGame.userData);
            this.createGradient();
            //load the background
            var dutchMountain = this.game.add.sprite(-3, this.game.height - 300, 'dutchmountain');
            dutchMountain.width = (this.game.width + 3) / 2;
            this.game.add.sprite(0, this.game.height - 100, 'mountain2');
            var mountainBack = this.game.add.sprite(-150, this.game.height - 180, 'mountain4');
            mountainBack.width = this.game.width + 300;
            var mountain = this.game.add.sprite(-2, this.game.height - 150, 'mountain1');
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
            this.menuGroup.add(this.menubutton); // voeg zo alle knopjes in de array.
            this.game.world.bringToTop(this.menuGroup);
            if (Twiggy.TwiggyGame.userData.plot.plant) {
            }
            this.clouds = [
                new Cloud(this.game, 'cloud'),
                new Cloud(this.game, 'cloud'),
                new Cloud(this.game, 'cloud'),
                new Cloud(this.game, 'cloud'),
            ];
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.energy = new Energy(20, 20, Math.floor(Twiggy.TwiggyGame.userData.energy), Energy.prototype.action, this.game);
            this.energy.setSizes(15, 20);
            this.energy.render();
            if (!Twiggy.TwiggyGame.userData.plot.plant) {
                console.log('load water');
                this.seed = this.game.add.sprite(this.game.width / 2 - 10, 0, 'firstseed');
                this.seed.width = 40;
                this.seed.height = 50;
                this.seed.inputEnabled = true;
                this.seed.input.enableDrag();
                this.seed.input.allowHorizontalDrag = false;
            }
            this.startTree = new GameSprite(this.game, this.game.width / 2 - 100, this.game.height - 200, "startTree");
            this.startTree.width = 200;
            this.startTree.height = 100;
            this.startTree.render();
            if (!Twiggy.TwiggyGame.userData.plot.plant) {
                this.game.physics.enable([this.startTree, this.seed], Phaser.Physics.ARCADE);
            }
            if (Twiggy.TwiggyGame.userData.plot.plant) {
                this.loadNewState();
            }
            // tell Phaser how you want it to handle scaling when you go full screen
            this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
            // and this causes it to actually do it
            this.game.scale.refresh();
            //this lines will build the resourse objects.
            // this.shopButton = new ButtonObject(this.game, this.game.width / 2, 200, "buttonshop", RunningState.prototype.goToShopState);
            this.water = new Water(20, 80, Math.floor(Twiggy.TwiggyGame.userData.water), Water.prototype.action, this.game);
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
            this.closewidth = (this.popup.width / 2) - 30;
            this.closeheight = (this.popup.height / 2) - 8;
            this.closebutton = new ButtonObject(this.game, this.closewidth, this.closeheight, 'close', this.closePopup.bind(this));
            this.popup.addChild(this.closebutton);
            this.popup.scale.set(0);
            this.game.world.bringToTop(this.popup);
            this.openPopup.bind(this);
            // this.game.time.events.loop(Phaser.Timer.SECOND, this.loop.bind(this), this);
        };
        RunningState.prototype.closePopup = function () {
            this.game.add.tween(this.popup.scale).to({ x: 0, y: 0 }, 500, Phaser.Easing.Elastic.Out, true).start();
            console.log("closing");
        };
        RunningState.prototype.openPopup = function () {
            var weirdtween = this.game.add.tween(this.popup.scale).to({ x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
        };
        //THIS IS FOR UPDATING THE TREE STATE
        RunningState.prototype.loadNewState = function () {
            if (this.tree) {
                this.tree.destroy();
            }
            if (Twiggy.TwiggyGame.userData.plot.plant) {
                var growButtonHeight = this.game.cache.getImage('gb').height / 1.5;
                var growButtonWidth = this.game.cache.getImage('gb').width / 1.5;
                this.growButton = this.game.add.sprite(this.game.width / 2 - growButtonWidth / 2, this.game.height - 80, 'gb');
                if (!this.energyNeeded) {
                    this.energyNeeded = new TextObject(this.game, this.game.width / 2 - growButtonWidth / 2
                        + 80, this.game.height - 80, this.treeCoast().toString(), 30, "#000");
                    console.log(this.energyNeeded);
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
            var treeState = 'appleTreeState1';
            var appleTreeWidth = 150;
            var appleTreeHeight = 150;
            switch (Twiggy.TwiggyGame.userData.plot.plant.state_id) {
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
            this.tree = this.game.add.sprite(this.game.width / 2 - appleTreeWidth / 2, this.game.height - appleTreeHeight - 130, treeState);
            this.tree.animations.add('tree');
            this.tree.animations.play('tree', 8, true);
            this.tree.inputEnabled = true;
            this.tree.width = appleTreeWidth;
            this.tree.height = appleTreeHeight;
            this.game.world.bringToTop(this.startTree);
            if (!this.treeName) {
                this.treeName = new TextObject(this.game, 0, 50, Twiggy.TwiggyGame.userData.plot.plant.title, 30, "#000");
                this.treeName.x = this.game.width / 2 - this.treeName.width / 2;
            }
            this.energyNeeded.text = this.treeCoast().toString() + " energie nodig om te groeien";
            this.game.world.bringToTop(this.treeName);
            this.game.world.bringToTop(this.popup);
        };
        RunningState.prototype.growButtonHandler = function () {
            console.log(Twiggy.TwiggyGame.userData);
            //check data
            var updateCost = this.treeCoast();
            if (Twiggy.TwiggyGame.userData.energy >= updateCost) {
                if (Twiggy.TwiggyGame.userData.plot.plant.state_id < 7) {
                    Twiggy.TwiggyGame.userData.energy -= updateCost;
                    this.energy.amount = Twiggy.TwiggyGame.userData.energy;
                    Twiggy.TwiggyGame.userData.plot.plant.state_id += 1;
                    this.loadNewState();
                }
                else {
                    console.log("Your plant is now max level");
                }
            }
            else {
                console.log("Not possible yet");
            }
        };
        RunningState.prototype.treeCoast = function () {
            var coast = 0;
            switch (Twiggy.TwiggyGame.userData.plot.plant.state_id) {
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
        };
        RunningState.prototype.update = function () {
            var _this = this;
            // this.quest.update(TwiggyGame.userData);
            Twiggy.TwiggyGame.userData.update();
            if (Twiggy.TwiggyGame.energyQuest) {
                if (this.popupText) {
                    this.popup.removeChild(this.popupText);
                }
                //add text
                this.popupText = new TextObject(this.game, 0, 0, "Je hebt 600 energy!", 20, "#000");
                // text.re
                this.popup.addChild(this.popupText);
                this.popup.reset;
                this.openPopup();
                Twiggy.TwiggyGame.energyQuest = false;
            }
            if (Twiggy.TwiggyGame.stateQuest) {
                if (this.popupText) {
                    this.popup.removeChild(this.popupText);
                }
                this.popupText = new TextObject(this.game, 0, 0, "Whooew, state 3!", 20, "#000");
                // text.re
                this.popup.addChild(this.popupText);
                this.openPopup();
                Twiggy.TwiggyGame.stateQuest = false;
            }
            if (Twiggy.TwiggyGame.appleQuest) {
                if (this.popupText) {
                    this.popup.removeChild(this.popupText);
                }
                this.popupText = new TextObject(this.game, 0, 0, "7 appels geplukt!", 20, "#000");
                // text.re
                this.popup.addChild(this.popupText);
                this.openPopup();
                Twiggy.TwiggyGame.appleQuest = false;
            }
            //do something every second
            //TODO make it every second..... maybe there is an error
            if (Twiggy.TwiggyGame.userData.plot.plant) {
                if (this.counter % 180 == 0) {
                    //give water
                    Twiggy.TwiggyGame.userData.water++;
                }
                if (this.counter % 360 == 0) {
                    //show water WARNING
                    var waterSprite = 'waterwarning1';
                    //TODO SHOW DIFFERENT WARNINGS.
                    //TODO Destroy the tree.
                    if (!this.waterWarning) {
                        if (this.waterWarningState == 1) {
                            waterSprite = 'waterwarning1';
                        }
                        else if (this.waterWarningState == 2) {
                            // this.waterWarning.destroy();
                            waterSprite = 'waterwarning2';
                        }
                        else {
                            // this.waterWarning.destroy();
                            waterSprite = 'waterwarning3';
                        }
                    }
                    if (!this.waterWarning) {
                        console.log("SHOW WATER WARNING");
                        this.waterWarning = new ButtonObject(this.game, 80, 80, waterSprite, function () {
                            console.log("TEST");
                            Twiggy.TwiggyGame.userData.water--;
                            _this.water.amount = Twiggy.TwiggyGame.userData.water;
                            _this.waterWarning.destroy();
                            _this.waterWarning = null;
                        });
                        this.waterWarning.render();
                    }
                    else {
                    }
                }
            }
            if (this.counter % 60 == 0) {
                // console.log("SEC");
                Twiggy.TwiggyGame.userData.energy += 100;
                this.energy.amount = Twiggy.TwiggyGame.userData.energy;
                this.coin.amount = Twiggy.TwiggyGame.userData.coin;
                this.water.amount = Twiggy.TwiggyGame.userData.water;
            }
            if (Twiggy.TwiggyGame.userData.plot.plant) {
                if (Twiggy.TwiggyGame.userData.plot.plant.state_id > 6) {
                    if (this.counter % 180 == 0) {
                        //create new apple
                        //place apple on right place
                        var fruitreeWidth = 300;
                        var fruitTreeHeight = 500;
                        var maxFruitX = this.game.width / 2;
                        var minFruitX = this.game.width / 2 - 100;
                        var maxFruitY = this.game.height - fruitTreeHeight - 250;
                        var minFruitY = this.game.height - fruitTreeHeight - 100;
                        var fruitX = Math.floor((Math.random() * 180) + minFruitX);
                        var fruitY = Math.floor((Math.random() * 220) + minFruitY);
                        var fruit_1 = null;
                        if (Twiggy.TwiggyGame.userData.seed == 1) {
                            fruit_1 = new ButtonObject(this.game, fruitX, fruitY, 'appleAttr', function () {
                                Twiggy.TwiggyGame.userData.apple++;
                                console.log(Twiggy.TwiggyGame.userData.apple);
                                fruit_1.destroy();
                            });
                        }
                        else {
                            fruit_1 = new ButtonObject(this.game, fruitX, fruitY, 'pearattr', function () {
                                Twiggy.TwiggyGame.userData.pear++;
                                console.log(Twiggy.TwiggyGame.userData.pear);
                                fruit_1.destroy();
                            });
                        }
                        fruit_1.width = 30;
                        fruit_1.height = 30;
                        fruit_1.render();
                    }
                }
            }
            this.counter++;
            for (var i = 0; i < this.clouds.length; i++) {
                this.clouds[i].move();
            }
            if (!Twiggy.TwiggyGame.userData.plot.plant) {
                // console.log("There is a plot");
                // }else{
                this.game.physics.arcade.overlap(this.startTree, this.seed, this.collisionHandler, null, this); // this.socket.on('energy', function (data: any) {
            }
        };
        RunningState.prototype.getApple = function () {
        };
        RunningState.prototype.collisionHandler = function () {
            this.seed.destroy();
            var plantObject = null;
            if (Twiggy.TwiggyGame.userData.seed == 1) {
                plantObject = new PlantData("1", "Appel boom", 0, 1, 1);
            }
            else {
                plantObject = new PlantData("1", "Peren boom", 0, 1, 1);
            }
            Twiggy.TwiggyGame.userData.plot.plant = plantObject;
            console.log(Twiggy.TwiggyGame.userData.plot.plant);
            this.loadNewState();
        };
        RunningState.prototype.toggleMenu = function () {
            if (this.menuGroup.y == 0) {
                var menuTween = this.game.add.tween(this.menuGroup).to({
                    y: -130
                }, 400, Phaser.Easing.Bounce.Out, true);
            }
            if (this.menuGroup.y == -130) {
                var menuTween = this.game.add.tween(this.menuGroup).to({
                    y: 0
                }, 400, Phaser.Easing.Bounce.Out, true);
            }
        };
        RunningState.prototype.button1Click = function () {
            this.game.stage.backgroundColor = "#ff0000";
            // stage change naar menu state. nieuw .ts bestand. shop. opt. ect.
        };
        RunningState.prototype.button2Click = function () {
            this.game.stage.backgroundColor = "#21ff00";
        };
        RunningState.prototype.button3Click = function () {
            this.game.stage.backgroundColor = "#0043ff";
        };
        RunningState.prototype.shopButtonCliced = function () {
            this.game.state.start("ShopState", true, true);
        };
        return RunningState;
    }(Phaser.State));
    Twiggy.RunningState = RunningState;
})(Twiggy || (Twiggy = {}));
var Twiggy;
(function (Twiggy) {
    var ShopState = (function (_super) {
        __extends(ShopState, _super);
        function ShopState() {
            _super.call(this);
            this.rowcount = 0; // houd bij welke rij je zit / hoeveel er dus zijn
            this.placement = 0; // houd bij bij welk item in de rij je zit.
        }
        ShopState.prototype.preload = function () {
            this.load.image("apple", "assets/images/apple.png");
            // this.load.image("apple", "assets/images/apple.png");
            console.log('preload');
            //loading the resourses
            //load the sprite of the resourses
            this.load.image('coin', "assets/images/dog.png");
            this.load.image('diamond', "assets/images/dog.png");
            this.load.image('water', "assets/images/dog.png");
            this.load.image('earth', "assets/images/sun.png");
            this.load.image('sun', "assets/images/sun.png");
            this.game.stage.backgroundColor = "#0000FF";
            //load button sprite
            this.game.load.image('menuparts-04', 'assets/images/menuparts-04.png');
        };
        ShopState.prototype.create = function () {
            //inputs
            this.cursors = this.game.input.keyboard.createCursorKeys();
            this.game.input.addPointer();
            //Set title of screen
            var shopTitle = new TextObject(this.game, this.game.width / 2, 50, "Shop", 50, "#000000");
            shopTitle.anchor.set(0.5);
            //set coin and diamods
            this.coins = new Coin(this.game.width / 2 - 100, 90, 200, Coin.prototype.action, this.game);
            this.coins.setSizes(20, 20);
            this.coins.render();
            this.diamonds = new Diamond(this.game.width / 2 + 50, 90, 210, Coin.prototype.action, this.game);
            this.diamonds.setSizes(20, 20);
            this.diamonds.render();
            //set line for decoration
            //set the list of items in list
            this.itemArray = [];
            for (var i = 0; i < 100; i++) {
                this.itemArray.push(new AppleItem(this.game, 0, 0, ShopState.prototype.action));
            }
            for (var _i = 0, _a = this.itemArray; _i < _a.length; _i++) {
                var item = _a[_i];
                item.x = this.placement * 100;
                item.y = this.rowcount * 100 + 120;
                item.setSizes(50, 50);
                item.render();
                this.placement++;
                if (this.placement == 6) {
                    this.rowcount++;
                    this.placement = 0;
                }
            }
            console.log("created");
            this.scrollHeight = this.rowcount * 100 + 250;
            this.game.world.setBounds(0, 0, 320 * this.game.width, this.scrollHeight);
            this.game.input.onDown.add(this.locationPointer, this);
            this.backButton = new ButtonObject(this.game, 100, 100, "menuparts-04", this.backButtonClicked);
            this.backButton.setSizes(100, 100);
            this.backButton.anchor.set(0.5);
            this.backButton.bringToTop();
            console.log(this.backButton.x + "plus" + this.backButton.y + "plus" + this.backButton.z);
            this.backButton.render;
        };
        ShopState.prototype.locationPointer = function () {
            this.fromHeight = this.game.input.activePointer.y;
            console.log(this.fromHeight);
        };
        ShopState.prototype.action = function () {
            // aangeroepen bij elke shop item apple
            this.game.state.start("RunningState", true, true);
        };
        ShopState.prototype.backButtonClicked = function () {
            this.game.state.start("RunningState");
        };
        //user this for rendering
        ShopState.prototype.render = function () {
            //
        };
        ShopState.prototype.update = function () {
            if (this.cursors.up.isDown) {
                this.game.camera.y -= 10;
            }
            else if (this.cursors.down.isDown) {
                this.game.camera.y += 10;
            }
            else if (this.game.input.mouse.wheelDelta === Phaser.Mouse.WHEEL_UP) {
                this.game.camera.y -= 50;
                this.game.input.mouse.wheelDelta = null;
            }
            else if (this.game.input.mouse.wheelDelta === Phaser.Mouse.WHEEL_DOWN) {
                this.game.camera.y += 50;
                this.game.input.mouse.wheelDelta = null;
            }
            if (this.game.input.activePointer.isDown) {
                if (this.game.input.y > this.fromHeight) {
                    this.game.camera.y += 15;
                }
                else if (this.game.input.y < this.fromHeight) {
                    this.game.camera.y -= 15;
                }
            }
        };
        return ShopState;
    }(Phaser.State));
    Twiggy.ShopState = ShopState;
})(Twiggy || (Twiggy = {}));
var Twiggy;
(function (Twiggy) {
    var ChooseState = (function (_super) {
        __extends(ChooseState, _super);
        function ChooseState() {
            _super.apply(this, arguments);
        }
        ChooseState.prototype.preload = function () {
            this.game.load.image('pearbutton', "assets/images/pearbutton.png");
            this.game.load.image('applebutton', "assets/images/applebutton.png");
            this.game.load.image('seed', "assets/images/firstSeed.png");
        };
        ChooseState.prototype.createGradient = function () {
            this.game.stage.backgroundColor = "#FFF";
            var myBitmap = this.game.add.bitmapData(this.game.width, this.game.height);
            var grd = myBitmap.context.createLinearGradient(0, 0, 0, 500);
            grd.addColorStop(1, "#cbe0f4");
            grd.addColorStop(0, "#0e87ca");
            myBitmap.context.fillStyle = grd;
            myBitmap.context.fillRect(0, 0, this.game.width, this.game.height);
            //naaw no animation we use this
            this.game.add.sprite(0, 0, myBitmap);
            //load the animation
            // let anim = this.game.add.sprite(0, 0, myBitmap);
            // anim.alpha = 0;
            // this.game.add.tween(anim).to({alpha: 1}, 2000).start();
        };
        ChooseState.prototype.create = function () {
            this.createGradient();
            var centerY = this.game.height / 2;
            var centerX = this.game.cache.getImage('applebutton').width;
            var padding = 40;
            //buttons
            this.pearButton = new ButtonObject(this.game, this.game.width / 2 - centerX, centerY, 'pearbutton', ChooseState.prototype.choosePear);
            this.appleButton = new ButtonObject(this.game, this.game.width / 2 + padding, centerY, 'applebutton', ChooseState.prototype.chooseApple);
            //seeds
            var seedHeight = 40;
            var seedWidth = 25;
            this.appleSeedButton = new ButtonObject(this.game, this.pearButton.x + this.pearButton.width / 2 - seedWidth / 2, this.pearButton.y - this.pearButton.height, 'seed', ChooseState.prototype.chooseApple);
            this.pearSeedButton = new ButtonObject(this.game, this.appleButton.x + this.appleButton.width / 2 - seedWidth / 2, this.pearButton.y - this.pearButton.height, 'seed', ChooseState.prototype.choosePear);
            this.appleSeedButton.setSizes(seedWidth, seedHeight);
            this.pearSeedButton.setSizes(seedWidth, seedHeight);
            this.pearButton.render();
            this.appleButton.render();
            this.appleSeedButton.render();
            this.pearSeedButton.render();
        };
        ChooseState.prototype.chooseApple = function () {
            Twiggy.TwiggyGame.userData.seed = 1;
            console.log("APPLE");
            console.log(Twiggy.TwiggyGame.userData);
            this.game.state.start('RunningState', true, true);
        };
        ChooseState.prototype.choosePear = function () {
            Twiggy.TwiggyGame.userData.seed = 2;
            this.game.state.start('RunningState', true, true);
        };
        return ChooseState;
    }(Phaser.State));
    Twiggy.ChooseState = ChooseState;
})(Twiggy || (Twiggy = {}));
/// <reference path="../tsDefinitions/phaser.d.ts" />
/// <reference path="./RunningState.ts" />
var Twiggy;
(function (Twiggy) {
    var TwiggyGame = (function () {
        // static growButtonExist : boolean = false;
        function TwiggyGame() {
            //setup the game
            this.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'content');
            this.game.state.add("MenuScreenState", MenuScreenState, false);
            this.game.state.add("RunningState", Twiggy.RunningState, false);
            this.game.state.add("ShopState", Twiggy.ShopState, false);
            this.game.state.add("ChooseState", Twiggy.ChooseState, false);
            this.game.state.start("ChooseState", true, true);
            var userObject = new UserObject("Ivo", "Kroon", "BLA");
            var plantData = null;
            var plot = new Plot("1", "First", 1, 1, plantData);
            TwiggyGame.userData = new Twiggy.UserData(100, 0, 0, 0, plot, userObject);
        }
        TwiggyGame.appleQuest = false;
        TwiggyGame.energyQuest = false;
        TwiggyGame.stateQuest = false;
        return TwiggyGame;
    }());
    Twiggy.TwiggyGame = TwiggyGame;
    // when the page has finished loading, create our game
    window.onload = function () {
        new TwiggyGame();
    };
})(Twiggy || (Twiggy = {}));
var Cloud = (function (_super) {
    __extends(Cloud, _super);
    function Cloud(game, image) {
        _super.call(this, game, (Math.random() * (game.width - 50)) + 50, Math.random() * (game.height / 2.5) + 1, image);
        this.sizes = [2, 1.2, 1.5, 1.8, 2.0, 2.2];
        this.game = game;
        this.image = image;
        this.speed = (Math.random() / 3) + 0.05;
        this.render();
    }
    Cloud.prototype.render = function () {
        var randomNumber = Math.floor(Math.random() * this.sizes.length) + 1;
        var size = this.sizes[randomNumber];
        this.width = this.game.cache.getImage(this.image).width / size;
        this.height = this.game.cache.getImage(this.image).height / size;
        this.game.add.existing(this);
    };
    Cloud.prototype.move = function () {
        if (this.x > this.game.width) {
            this.x = -this.width;
        }
        else {
            this.x += this.speed;
        }
    };
    return Cloud;
}(Phaser.Sprite));
var ButtonObject = (function (_super) {
    __extends(ButtonObject, _super);
    function ButtonObject(game, x, y, key, callback) {
        _super.call(this, game, x, y, key, callback);
        this.keyString = key;
    }
    ButtonObject.prototype.setSizes = function (width, height) {
        this.width = width;
        this.height = height;
    };
    ButtonObject.prototype.render = function () {
        this.game.add.existing(this);
    };
    ButtonObject.prototype.action = function () { };
    return ButtonObject;
}(Phaser.Button));
/// <reference path="../objects/ButtonObject.ts" />
var GrowButton = (function (_super) {
    __extends(GrowButton, _super);
    function GrowButton(game, x, y, callback) {
        _super.call(this, game, x, y, "growbutton", callback);
    }
    GrowButton.prototype.action = function () {
        console.log("test");
    };
    return GrowButton;
}(ButtonObject));
/// <reference path="../objects/ButtonObject.ts" />
var ItemObject = (function (_super) {
    __extends(ItemObject, _super);
    function ItemObject(name, desc, game, x, y, key, callback) {
        _super.call(this, game, x, y, key, callback);
        this.name = name;
        this.desc = desc;
    }
    return ItemObject;
}(ButtonObject));
/// <reference path="./ItemObject.ts" />
var AppleItem = (function (_super) {
    __extends(AppleItem, _super);
    function AppleItem(game, x, y, callback) {
        var name = "Apple";
        var desc = "This is an apple";
        _super.call(this, name, desc, game, x, y, "apple", callback);
    }
    AppleItem.prototype.action = function () {
        console.log("Check money");
        console.log("Plus one Applle");
    };
    return AppleItem;
}(ItemObject));
/// <reference path="../../tsDefinitions/phaser.d.ts" />
var GameObject = (function () {
    function GameObject(x, y) {
        this.x = x;
        this.y = y;
    }
    return GameObject;
}());
var GameSprite = (function (_super) {
    __extends(GameSprite, _super);
    function GameSprite(game, x, y, key) {
        _super.call(this, game, x, y, key);
        this.keyString = key;
        this.x = x;
        this.y = y;
        this.game = game;
    }
    GameSprite.prototype.setSize = function (height, width) {
        this.height = height;
        this.width = width;
    };
    GameSprite.prototype.render = function () {
        this.game.add.existing(this);
    };
    return GameSprite;
}(Phaser.Sprite));
var GroupObject = (function (_super) {
    __extends(GroupObject, _super);
    function GroupObject() {
        _super.apply(this, arguments);
    }
    return GroupObject;
}(Phaser.Group));
/// <reference path="ButtonObject.ts" />
//here are all the functions for the resources.
var ResourcesObject = (function (_super) {
    __extends(ResourcesObject, _super);
    function ResourcesObject(game, x, y, amount, key, callback) {
        _super.call(this, game, x, y, key, callback);
        this._amount = amount;
        this.setValue(this.amount);
    }
    ResourcesObject.prototype.setValue = function (amount) {
        console.log("setting value");
        var x = this.x + 30;
        var y = this.y;
        var amountString = String(amount);
        this.text = new TextObject(this.game, x, y, amountString, 15, "#000000");
    };
    ResourcesObject.prototype.updateValue = function (amount) {
        var amountString = String(amount);
        this.text.setText(amountString);
    };
    Object.defineProperty(ResourcesObject.prototype, "amount", {
        get: function () {
            return this._amount;
        },
        set: function (amount) {
            this._amount = amount;
            //update the value
            this.updateValue(this._amount);
        },
        enumerable: true,
        configurable: true
    });
    return ResourcesObject;
}(ButtonObject));
var TextObject = (function (_super) {
    __extends(TextObject, _super);
    function TextObject(game, x, y, text, size, color) {
        if (color === void 0) { color = "#FFFFFF"; }
        var fontsize = size + "px";
        var fontstyle = "Arial";
        var font = fontsize + " " + fontstyle;
        _super.call(this, game, x, y, text, { font: font, fill: color });
        game.add.existing(this);
    }
    TextObject.prototype.remove = function () {
        this.remove;
    };
    return TextObject;
}(Phaser.Text));
var Tree = (function (_super) {
    __extends(Tree, _super);
    function Tree(game, x, y, currentLevel, keys, maxLevel, startEnergy) {
        _super.call(this, game, x, y, keys[currentLevel - 1]);
        this.keys = keys;
        this.startAmountEnergy = startEnergy;
        this.currentLevel = currentLevel;
        this.maxLevel = maxLevel;
        this.calcNeeded();
    }
    Tree.prototype.changeKey = function () {
        var key = this.keys[this.currentLevel - 1];
        this.loadTexture(key, 0);
    };
    Tree.prototype.calcNeeded = function () {
        this.energyNeeded = this.startAmountEnergy * (this.currentLevel + 1);
    };
    Tree.prototype.upgrade = function (energy) {
        console.log("Energy " + energy);
        if (this.currentLevel != this.maxLevel) {
            if (this.energyNeeded <= energy) {
                this.currentLevel += 1;
                console.log(this.currentLevel);
                this.calcNeeded();
                this.changeKey();
                return true;
            }
            else {
                return false;
            }
        }
        else {
            console.log("You Have reached max level!");
            return false;
        }
    };
    return Tree;
}(GameSprite));
var wBar = (function (_super) {
    __extends(wBar, _super);
    function wBar(game, x, y, currentLevel, keys, maxLevel, startWater) {
        _super.call(this, game, x, y, keys[currentLevel - 1]);
        this.keys = keys;
        this.startAmountWater = startWater;
        this.currentLevel = currentLevel;
        this.maxLevel = maxLevel;
        this.calcNeeded();
    }
    wBar.prototype.calcNeeded = function () {
        this.WaterNeeded = this.startAmountWater * (this.currentLevel + 1);
    };
    wBar.prototype.upgrade = function (Water) {
        console.log("Water " + Water);
        if (this.currentLevel != this.maxLevel) {
            if (this.WaterNeeded <= Water) {
                this.currentLevel += 1;
                console.log(this.currentLevel);
                this.calcNeeded();
                return true;
            }
            else {
                return false;
            }
        }
        else {
            console.log("Maxed!");
            return false;
        }
    };
    return wBar;
}(GameSprite));
/// <reference path="../objects/ResourcesObject.ts" />
var Coin = (function (_super) {
    __extends(Coin, _super);
    function Coin(x, y, amount, callback, game) {
        _super.call(this, game, x, y, amount, 'coin', callback);
        this.game = game;
    }
    Coin.prototype.action = function () {
        console.log(this.amount);
    };
    return Coin;
}(ResourcesObject));
/// <reference path="../objects/ResourcesObject.ts" />
var Diamond = (function (_super) {
    __extends(Diamond, _super);
    function Diamond(x, y, amount, callback, game) {
        _super.call(this, game, x, y, amount, 'diamond', callback);
        this.game = game;
    }
    Diamond.prototype.action = function () {
        console.log(this.amount);
    };
    return Diamond;
}(ResourcesObject));
/// <reference path="../objects/ResourcesObject.ts" />
var Energy = (function (_super) {
    __extends(Energy, _super);
    function Energy(x, y, amount, callback, game) {
        _super.call(this, game, x, y, amount, 'energy', callback);
        this.game = game;
    }
    Energy.prototype.action = function () {
        console.log("Sun Clicked");
    };
    return Energy;
}(ResourcesObject));
/// <reference path="../objects/ResourcesObject.ts" />
var Water = (function (_super) {
    __extends(Water, _super);
    function Water(x, y, amount, callback, game) {
        var keys = ["wBar1", "wBar2", "wBar3", "wBar4"];
        _super.call(this, game, x, y, amount, 'water', callback);
        var maxLevel = 10;
        this.game = game;
    }
    Water.prototype.action = function () {
        console.log("Water Clicked");
    };
    return Water;
}(ResourcesObject));
var AppleTree = (function (_super) {
    __extends(AppleTree, _super);
    function AppleTree(game, x, y, level) {
        var keys = ["apple1", "apple2", "apple3", "apple4"];
        var maxLevel = 4;
        var energy = 20;
        _super.call(this, game, x, y, level, keys, maxLevel, energy);
    }
    return AppleTree;
}(Tree));
// /// <reference path="../objects/Tree.ts" />
var PearTree = (function (_super) {
    __extends(PearTree, _super);
    function PearTree(game, x, y, level) {
        var keys = ["pear1", "pear2", "pear3", "pear4"];
        var maxLevel = 4;
        var energy = 10;
        _super.call(this, game, x, y, level, keys, maxLevel, energy);
    }
    return PearTree;
}(Tree));
var PlantData = (function () {
    function PlantData(id, title, exp, state_id, species_id) {
        console.log(id);
        this._id = id;
        this.title = title;
        this.exp = exp;
        this.state_id = state_id;
        this.species_id = species_id;
    }
    return PlantData;
}());
var Plot = (function () {
    function Plot(id, title, location, region, plant) {
        this.id = id;
        this.location = location;
        this.title = title;
        this.region = region;
        if (plant) {
            this.plant = new PlantData(plant._id, plant.title, plant.exp, plant.state_id, plant.species_id);
        }
        else {
            this.plant = null;
        }
        // constructor(title:string, exp:number, state_id:number, species_id:number){
    }
    return Plot;
}());
var QuestObject = (function () {
    function QuestObject(userDate) {
        this.someData = "some data";
        this.energyQuestBool = false;
        this.stateQuest = false;
        this.gatherQuest = false;
        this.userData = userDate;
    }
    QuestObject.prototype.update = function (userData) {
        this.userData = userData;
    };
    QuestObject.prototype.energyQuest = function () {
        if (!this.energyQuestBool) {
            if (this.userData.energy > 600) {
                this.energyQuestBool = true;
                return true;
            }
        }
        return false;
    };
    QuestObject.prototype.stateChecker = function () {
        if (!this.stateQuest) {
            if (this.userData.plot.plant) {
                if (this.userData.plot.plant.state_id > 3) {
                    this.stateQuest = true;
                    return true;
                }
            }
        }
        return false;
    };
    QuestObject.prototype.gatherApple = function () {
        if (!this.gatherQuest) {
            if (this.userData.plot.plant) {
                if (this.userData.apple > 5) {
                    this.gatherQuest = true;
                    return true;
                }
            }
        }
        return false;
    };
    return QuestObject;
}());
/**
 * Created by ivokroon on 02/01/2017.
 */
var Twiggy;
(function (Twiggy) {
    var UserData = (function () {
        function UserData(energy, water, coin, diamond, plot, user) {
            this.apple = 0;
            this.pear = 0;
            //set the resources
            this.energy = energy;
            this.water = water;
            this.coin = coin;
            this.diamond = diamond;
            this.plot = plot;
            this.user = user;
            this.quest = new QuestObject(this);
        }
        UserData.prototype.update = function () {
            // console.log(game.state.states);
            // console.log(TwiggyGame.appleQuest);
            this.quest.update(this);
            if (this.quest.energyQuest()) {
                Twiggy.TwiggyGame.energyQuest = true;
                //show message
                console.log("energy quest done");
                // game.state.states[]
                this.energy += 200;
            }
            if (this.quest.stateChecker()) {
                //show message
                Twiggy.TwiggyGame.stateQuest = true;
                console.log("State");
                this.coin += 200;
            }
            if (this.quest.gatherApple()) {
                //show message
                Twiggy.TwiggyGame.appleQuest = true;
                console.log("gather");
                this.coin += 200;
            }
        };
        return UserData;
    }());
    Twiggy.UserData = UserData;
})(Twiggy || (Twiggy = {}));
var UserObject = (function () {
    function UserObject(firstname, lastname, username) {
        this.firstName = firstname;
        this.lastName = lastname;
        this.userName = username;
    }
    return UserObject;
}());
//# sourceMappingURL=game.js.map