let aMode = "cpu";
let aPendingChoice = "";
let aP1Score = 0;
let aP2Score = 0;
let aTies = 0;

//--------------------------------- API Congif --------------------------
const aCpuApiUrl ="https://blue-flower-0df9f551e.1.azurestaticapps.net/";



///------------------------------- DOM References --------------------------------------///


const aBtnModeCpu = document.getElementById("btnModeCpu");
const aBtnModePvp = document.getElementById("btnModePvp");
const aModeHint = document.getElementById("modeHint");


const aP1PickEl = document.getElementById("p1Pick");
const aP2PickEl = document.getElementById("p2Pick");
const aRoundResultEl = document.getElementById("roundResult");


const aP2Section = document.getElementById("p2Section");
const aP2Hint = document.getElementById("p2Hint");


const aP1ScoreEl = document.getElementById("p1Score");
const aP2ScoreEl = document.getElementById("p2Score");
const aTiesEl = document.getElementById("ties");


const aBtnPlayAgain = document.getElementById("btnPlayAgain");
const aBtnReset = document.getElementById("btnReset");

// Player 1 choice buttons
const aBtnP1Rock = document.getElementById("btnP1Rock");
const aBtnP1Paper = document.getElementById("btnP1Paper");
const aBtnP1Scissors = document.getElementById("btnP1Scissors");
const aBtnP1Lizard = document.getElementById("btnP1Lizard");
const aBtnP1Spock  = document.getElementById("btnP1Spock");

// Player 2 choice buttons (only used in PVP mode)
const aBtnP2Rock = document.getElementById("btnP2Rock");
const aBtnP2Paper = document.getElementById("btnP2Paper");
const aBtnP2Scissors = document.getElementById("btnP2Scissors");
const aBtnP2Lizard = document.getElementById("btnP2Lizard");
const aBtnP2Spock  = document.getElementById("btnP2Spock");

// ------------------ MODE ----------------------------------

function aSetMode(aNewMode){
    aMode = aNewMode;
    aPendingChoice = "";
    aClearPicksUI();

    
    if( aMode === "cpu"){
        aBtnModeCpu.classList.add("active");
        aBtnModePvp.classList.remove("active");
        aP2Section.style.display = "none";
        aModeHint.textContent = "Pick your move. The CPU will pick automatically."
    }
    else{
    aBtnModePvp.classList.add("active");
    aBtnModeCpu.classList.remove("active");
    aP2Section.style.display = "block";
    aModeHint.textContent = "Player 1 picks first, then Player 2 picks.";
    aP2Hint.textContent = "Waiting for Player 1...";
    }
}


  //---------------- UI HELPERS ----------------------------

    function aClearPicksUI(){
        aP1PickEl.textContent = "-";
        aP2PickEl.textContent = "-";
        aRoundResultEl.textContent = "Make a pick to start";
    }

    

    function aUpdateScoreUI(){
        aP1ScoreEl.textContent = aP1Score;
        aP2ScoreEl.textContent = aP2Score;
        aTiesEl.textContent = aTies;
    }


//------------------CPU LOGIC--------------------------
    function aRandomCpuChoice(){
        const choices = ["rock", "paper", "scissors", "lizard", "spock"];
        return choices[Math.floor(Math.random() * choices.length)];
      }

//----------------- WINNER LOGIC (RPSLS)---------------------------
    function aGetWinner(aP1, aP2){
        if(aP1 === aP2) return "tie"; 

        const aBeats = {
          rock: ["scissors", "lizard"],
          paper: ["rock", 'spock'],
          scissors: ["paper", "lizard"],
          lizard: ["spock", "paper"],
          spock: ["scissors", "rock"]
        };

        if (aBeats[aP1] && aBeats[aP1].includes(aP2)){
          return "p1";
        }
        return "p2";
      };

//-------------------- ROUND ----------------------------------------

    
    function aPlayRound(aP1Choice, aP2Choice){
        aP1PickEl.textContent = aP1Choice;
        aP2PickEl.textContent = aP2Choice;

        const aWinner = aGetWinner(aP1Choice, aP2Choice);

       
        if(aWinner === "tie")
        {
            aTies++;
            aRoundResultEl.textContent = "Tie!";
        }
        else if(aWinner === "p1"){
            aP1Score++;
            aRoundResultEl.textContent = "Player 1 wins the round";
        }
        else{
            aP2Score++;

            if(aMode === "cpu"){
                aRoundResultEl.textContent = "CPU wins the round!";

            }
            else{
                aRoundResultEl.textContent = "Player 2 wins the round";
            }
        }
        
        aUpdateScoreUI();

    }

//--------------------------- PLAYER HANDLERS ----------------------------------

    function aHandleP1Pick(aChoice) {
  if (aMode === "cpu") {
    const cpuChoice = aRandomCpuChoice();
    aPlayRound(aChoice, cpuChoice);
    return; 
  }

  // ----- PVP MODE LOGIC -----  
  aPendingChoice = aChoice;
  aP1PickEl.textContent = aChoice;
  aP2PickEl.textContent = "?";
  aRoundResultEl.textContent = "Player 2, make your pick!";
  aP2Hint.textContent = "Your turn!";
}


function aHandleP2Pick(aChoice) {
  
  if (aPendingChoice === "") {
    return;
  }

  aPlayRound(aPendingChoice, aChoice);

  aPendingChoice = "";

  if (aMode === "pvp") {
    aP2Hint.textContent = "Waiting for Player 1...";
  }
}

//------------------- Event Listeners ------------------//


aUpdateScoreUI();
aSetMode("cpu");


aBtnModeCpu.addEventListener("click", function () {
  aSetMode("cpu");
});


aBtnModePvp.addEventListener("click", function () {
  aSetMode("pvp");
});


// ----- Player 1 buttons -----


aBtnP1Rock.addEventListener("click", function () {
  aHandleP1Pick("rock");
});

aBtnP1Paper.addEventListener("click", function () {
  aHandleP1Pick("paper");
});

aBtnP1Scissors.addEventListener("click", function () {
  aHandleP1Pick("scissors");
});

aBtnP1Lizard.addEventListener("click", function (){
  aHandleP1Pick("lizard");
})

aBtnP1Spock.addEventListener("click", function (){
  aHandleP1Pick("spock");
})


// ----- Player 2 buttons -----

aBtnP2Rock.addEventListener("click", function () {
  aHandleP2Pick("rock");
});


aBtnP2Paper.addEventListener("click", function () {
  aHandleP2Pick("paper");
});


aBtnP2Scissors.addEventListener("click", function () {
  aHandleP2Pick("scissors");
});

aBtnP2Lizard.addEventListener("click", function (){
  aHandleP2Pick("lizard");
});

aBtnP2Spock.addEventListener("click", function(){
  aHandleP2Pick("spock");
});


// ----- Play again button -----

aBtnPlayAgain.addEventListener("click", function () {
  aPendingChoice = "";
  aClearPicksUI();


  if (aMode === "pvp") {
    aP2Hint.textContent = "Waiting for Player 1...";
  }
});


// ----- Reset game button -----

aBtnReset.addEventListener("click", function () {
  aP1Score = 0;
  aP2Score = 0;
  aTies = 0;
  aPendingChoice = "";

  
  aClearPicksUI();
  aUpdateScoreUI();

  
  if (aMode === "pvp") {
    aP2Hint.textContent = "Waiting for Player 1...";
  }
});