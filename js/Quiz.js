class Quiz {
  constructor(){
    // this.greeting = createElement("h2");
    // this.greeting.position(width / 2 - 300, height / 2 - 100);
    // this.greeting.class("greeting");
  }


  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
    question.hide();
    //write code to change the background color here
    background("purple")
    //write code to show a heading for showing the result of Quiz
    
    //call getContestantInfo( ) here
    Contestant.getPlayerInfo();

    //write condition to check if contestantInfor is not undefined
    if (allContestants !== undefined){
      fill ("Blue");
      textSize(20);
      text("NOTE: Contestant who answered correct are highlighted in green color!", 130, 230);
    }

    var posY = 300;
    

    //write code to add a note here

    //write code to highlight contest who answered correctly
    for (var plr in allContestants){
      var correctAns = "2";
      if (correctAns === allContestants[plr].answer){
        fill("Green")
      }else{
        fill("red")
      }
      posY += 300
      text(allContestants[plr].name + " : " + allContestants[plr].answer, 250, posY)
    }
  }

}
