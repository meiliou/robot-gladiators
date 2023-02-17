// Game States
// "WIN" - Player robot has defeated all enemy robots
// * Fight all ennemy robots
// * Defeat each enemy robot
// "LOSE" - Player robot's health is zero or less


// function to generate a random numeric value
var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max - min +1) + min);
  return value;
};

// recursive test for "" or null responses
var fightOrSkip = function() {
  // ask user if they'd like to fight or skip using  function
  var promptFight = window.prompt('Would you like FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

  // Conditional Recursive Function Call
  if (promptFight === "" || promptFight === null) {
    window.alert("You need to provide a valid answer! Please try again.");
    return fightOrSkip();
  }
  // if user picks "skip" confirm and then stop the loop
  promptFight = promptFight.toLowerCase();

  if (promptFight === "skip") {
    // confirm user wants to skip
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");

    // if yes (true), leave fight
    if (confirmSkip) {
      window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
      // subtract money from playerMoney for skipping
      playerInfo.playerMoney = playerInfo.money - 10;
      
      // return value if user wants to leave
      return true;

      // shop(); *******************??
    }
  }
};




// fight function
var fight = function(enemy) {
  // keep track of who goes first
  var isPlayerTurn = true;

  // randomly change turn order
  if (Math.random() > 0.5) {
    isPlayerTurn = false;
  }

  while (playerInfo.health > 0 && enemy.health > 0) {
    if (isPlayerTurn) {
      // ask user if they'd like to fight or skip using fightOrSkip function
      if (fightOrSkip()) {
        // if true, leave fight by breaking loop
        break;
      }

      var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

      // remove enemy's health by subtracting the amount we set in the damage variable
      enemy.health = Math.max(0, enemy.health - damage);
      console.log(
        playerInfo.name +
          " attacked " +
          enemy.name +
          ". " +
          enemy.name +
          " now has " +
          enemy.health +
          " health remaining."
      );

      // check enemy's health
      if (enemy.health <= 0) {
        window.alert(enemy.name + " has died!");

        // award player money for winning
        playerInfo.money = playerInfo.money + 20;

        // leave while() loop since enemy is dead
        break;
      } else {
        window.alert(enemy.name + " still has " + enemy.health + " health left.");
      }
      // player gets attacked first
    } else {
      var damage = randomNumber(enemy.attack - 3, enemy.attack);

      // remove enemy's health by subtracting the amount we set in the damage variable
      playerInfo.health = Math.max(0, playerInfo.health - damage);
      console.log(
        enemy.name +
          " attacked " +
          playerInfo.name +
          ". " +
          playerInfo.name +
          " now has " +
          playerInfo.health +
          " health remaining."
      );

      // check player's health
      if (playerInfo.health <= 0) {
        window.alert(playerInfo.name + " has died!");
        // leave while() loop if player is dead
        break;
      } else {
        window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
      }
    }
    // switch turn order for next round
    isPlayerTurn = !isPlayerTurn;
  }
};


// function to set name
var getPlayerName = function() {
  var name = "";
  while (name === "" ||name === null) {
    name = prompt("What is your robot's name?");
  }
  console.log("Your robot's name is" + name);
  return name;
};


var playerInfo = {
  name: getPlayerName(),
  health: 100,
  attack: 10,
  money: 10,
  reset: function() {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  }, //comma!
  refillHealth: function() {
    if (this.money >= 7) {
      window.alert("Refilling player's health by 20 for 7 dollars.");
      this.health += 20;
      this.money -= 7;
    }
    else {
      window.alert("You don't have enough money!");     
    }
  },
  upgradeAttack: function() {
    if (this.money >= 7) {
      window.alert("Upgrading player's attack by 6 for 7 dollars.");
      this.attack += 6;
      this.money -= 7;
    }
    else {
      window.alert("You don't have enough money!"); 
    }
  }
};

// You can also log multiple values at onnce like this:
console.log(playerInfo.name, playerInfo.attack, playerInfo.health);

var enemyInfo = [
  {
    name: "Roberto",
    attack: randomNumber(10, 14)
  },
  {
    name: "Amy Android",
    attack: randomNumber(10, 14)
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(10, 14)
  }
];

//function to start a new game
var startGame = function() {
    //reset player stats
    playerInfo.reset();
    
    for (var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            //let user know what round they are in
            window.alert("Welcome to Robot Gladiators! Round " + (1 + i));
            //pick the enemy to fight based on the index of the enemy.names array
            var pickedEnemyObj = enemyInfo[i];

            // reset the enemy.health to 50
            pickedEnemyObj.health = randomNumber(40, 60);

            // pass the enemyInfo variable's value into the fight function, where it will assume the value of the enemy.name parameter
            fight(pickedEnemyObj);

           // if player is still alive and we're not at the last enemy in the array
           if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
              shop();
            }

        } else {
            window.alert("You have lost your robot player in battle! Game Over!");
            break;
        }
    }
    endGame();
};

// Add endGame() function
var endGame = function() {
  window.alert("The game has now ended. Let's see how you did!");
 
  // if player is still alive, player wins
  if (playerInfo.health > 0) {
      window.alert("Player is alive. Great Job, you've survived the game!")
  } else {
      window.alert("You've lost all your health, your robot lost the battle")
  }

  //ask if the player would like to play again
  var playAgainConfirm = window.confirm("Would you like to play again?");

  if (playAgainConfirm) {
      startGame();
  } else {
      window.alert("Thank you for playing Robot Gladiators! Come back soon!")
  }
};


var shop = function() {
  // ask player what they'd like to do
  var shopOptionPrompt = window.prompt(
    "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE."
  );
  // use switch to carry out action
  shopOptionPrompt = parseInt(shopOptionPrompt);
  switch (shopOptionPrompt) {
    case 1:  
      playerInfo.refillHealth();
      break;  
    case 2:
      playerInfo.upgradeAttack();
      break;
    case 3:
      window.alert("Leaving the store.");
      break;
    default:
      window.alert("You did not pick a valid option. Try again.");
      // call shop() again to force player to pick a valid option
      shop();
      break;
  } //end of switch

}; //end of shop function

startGame();



// Finalize MVP and switch branches
// add shop() function 
// save our progress by using Git