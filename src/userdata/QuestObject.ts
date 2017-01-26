class QuestObject{
    public quests:Array<any>;
    private userData:any;
    private someData = "some data";
    
    energyQuestBool:boolean = false;
    stateQuest:boolean = false;
    gatherQuest:boolean = false;

    constructor(userDate:any){
        this.userData = userDate;
    }

    update(userData:any){
        this.userData = userData;
    }

    energyQuest(){
        if(!this.energyQuestBool){
            if(this.userData.energy > 600){
                this.energyQuestBool = true;
                return true;
            }
        }
        return false;
    }

    stateChecker(){
        if(!this.stateQuest){
            if(this.userData.plot.plant){
                if(this.userData.plot.plant.state_id > 3){
                    this.stateQuest = true;
                    return true;
                }
            }
        }
        return false;
    }

    gatherApple(){
         if(!this.gatherQuest){
            if(this.userData.plot.plant){
                if(this.userData.apple > 5){
                    this.gatherQuest = true;
                    return true;
                }
            }
        }
        return false;
    }
}