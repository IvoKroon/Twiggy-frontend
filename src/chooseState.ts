module Twiggy {
    export class ChooseState extends Phaser.State {
        pearButton:ButtonObject;
        appleButton:ButtonObject;
        appleSeedButton:ButtonObject;
        pearSeedButton:ButtonObject;

        preload() {
            this.game.load.image('pearbutton', "assets/images/pearbutton.png");
            this.game.load.image('applebutton', "assets/images/applebutton.png");
            this.game.load.image('seed', "assets/images/firstSeed.png");
        }

        createGradient() {
            this.game.stage.backgroundColor = "#FFF";
            let myBitmap = this.game.add.bitmapData(this.game.width, this.game.height);
            let grd = myBitmap.context.createLinearGradient(0, 0, 0, 500);
            grd.addColorStop(1, "#cbe0f4");
            grd.addColorStop(0, "#0e87ca");
            myBitmap.context.fillStyle = grd;
            myBitmap.context.fillRect(0, 0, this.game.width, this.game.height);

            //naaw no animation we use this
            this.game.add.sprite(0,0, myBitmap);

            //load the animation
            // let anim = this.game.add.sprite(0, 0, myBitmap);
            // anim.alpha = 0;
            // this.game.add.tween(anim).to({alpha: 1}, 2000).start();
        }

        create(){
            this.createGradient();
            let centerY = this.game.height / 2;
            let centerX = this.game.cache.getImage('applebutton').width;
            let padding = 40;
            //buttons
            this.pearButton = new ButtonObject(this.game,this.game.width / 2 - centerX,centerY,'pearbutton', ChooseState.prototype.choosePear);
            this.appleButton = new ButtonObject(this.game,this.game.width / 2 + padding,centerY,'applebutton', ChooseState.prototype.chooseApple);
            //seeds
            let seedHeight = 40;
            let seedWidth = 25;
            this.appleSeedButton = new ButtonObject(this.game,this.pearButton.x + this.pearButton.width / 2 - seedWidth / 2,this.pearButton.y - this.pearButton.height,'seed', ChooseState.prototype.chooseApple);
            this.pearSeedButton = new ButtonObject(this.game,this.appleButton.x + this.appleButton.width / 2 - seedWidth / 2,this.pearButton.y - this.pearButton.height,'seed', ChooseState.prototype.choosePear);
            this.appleSeedButton.setSizes(seedWidth, seedHeight);
            this.pearSeedButton.setSizes(seedWidth, seedHeight);
            
            this.pearButton.render();
            this.appleButton.render();
            this.appleSeedButton.render();
            this.pearSeedButton.render();
        }

        chooseApple(){
            TwiggyGame.userData.seed = 1;
            console.log("APPLE");
            console.log(TwiggyGame.userData);
            this.game.state.start('RunningState', true, true);
        }

        choosePear(){
            TwiggyGame.userData.seed = 2;
            this.game.state.start('RunningState', true, true);
        }

    }
}