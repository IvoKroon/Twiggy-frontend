var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
        //loading the resourses
        //load the sprite of the resourses
        this.load.image('coin', "assets/images/dog.png");
        this.load.image('diamond', "assets/images/dog.png");
        this.load.image('water', "assets/images/dog.png");
        this.load.image('earth', "assets/images/sun.png");
        this.load.image('sun', "assets/images/sun.png");
        this.game.stage.backgroundColor = "#0000FF";
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
        this.scrollHeight = this.rowcount * 100 + 250;
        this.game.world.setBounds(0, 0, 320 * this.game.width, this.scrollHeight);
        this.game.input.onDown.add(this.locationPointer, this);
    };
    ShopState.prototype.locationPointer = function () {
        this.fromHeight = this.game.input.activePointer.y;
        console.log(this.fromHeight);
    };
    ShopState.prototype.action = function () {
        // aangeroepen bij elke shop item apple
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
