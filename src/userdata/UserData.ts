module Twiggy{
export class UserData{
    //TODO Energy, Water, Diamonds, Coins and Plot->Plant
    energy:number;
    water:number;
    coin:number;
    diamond:number;
    plot:Plot;
    user:UserObject;
    seed:number;
    quest:QuestObject;
    apple:number = 0;
    pear:number = 0;

    constructor(energy:number, water:number, coin:number, diamond:number, plot:Plot, user:UserObject){
        //set the resources
        this.energy = energy;
        this.water = water;
        this.coin = coin;
        this.diamond = diamond;
        this.plot = plot;
        this.user = user;
        this.quest = new QuestObject(this);
    }

    update(){
        // console.log(game.state.states);
        // console.log(TwiggyGame.appleQuest);
        this.quest.update(this);
        if(this.quest.energyQuest()){
            TwiggyGame.energyQuest = true;
            //show message
            console.log("energy quest done")
            // game.state.states[]
            this.energy += 200;
        }
        if(this.quest.stateChecker()){
            //show message
            TwiggyGame.stateQuest = true;
            console.log("State")
            this.coin += 200;
        }
        if(this.quest.gatherApple()){
            //show message
            TwiggyGame.appleQuest = true;
            console.log("gather")
            this.coin += 200;
        }
    }
}
}