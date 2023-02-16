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

// function expression
var fight = function(enemy) {
  // debugger;

    //execute a while loop as long as enemy robot is alive
    while (enemy.health > 0 && playerInfo.health > 0) {
        var promptFight = window.prompt(
            "Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose."
        );

        //if user picks skip confirm and then stop the loop
        if (promptFight === "skip" || promptFight === "SKIP") {
            //confirm the user wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");
            
            //if yes (true), leave the fight
            if (confirmSkip) {
                window.alert(playerInfo.name + " has decided to quit this fight. Goodbye");
                //subtract money from player
                playerInfo.money = Math.max(0, playerInfo.money - 10);
                console.log('playerInfo.money', playerInfo.money);
                // Would you like to refill, upgrade or leave the store?
                // Prompt user to input one of the above options
                break;
            } // if no (false), ask question agin about running fight()
        }

        //remove enemy.health from playerAttach
        // generate random damage value based on player's attack power
        var damage = randomNumber(playerInfo.attack-3, playerInfo.attack);
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
            break;
        } else {
            window.alert(enemy.name + " still has " + enemy.health + " health left.");
        }
        
        // remove player's health by subtracting the amount set in the enemy.attack variable
        var damage = randomNumber(enemy.attack - 3, enemy.attack);
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
            break;
        } else {
            window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
        }
        // Would you like to play another round?
    }
};

var playerInfo = {
  name: window.prompt("What is your robot's name?"),
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

            // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
            fight(pickedEnemyName);

           // if player is still alive and we're not at the last enemy in the array
           if (playerHealth > 0 && i < enemyNames.length - 1) {
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
    "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
  );
  // use switch to carry out action
  switch (shopOptionPrompt) {
    case "REFILL":  //new case
    case "refill":
      if (playerMoney >= 7) {
        window.alert("Refilling player's health by 20 for 7 dollars.");
    
        // increase health and decrease money
        playerHealth = playerHealth + 20;
        playerMoney = playerMoney - 7;
      }
      else {
        window.alert("You don't have enough money!");
      }
    
      break;
    
    case "UPGRADE": //new case
    case "upgrade":
      if (playerMoney >= 7) {
        window.alert("Upgrading player's attack by 6 for 7 dollars.");
    
       // increase attack and decrease money
        playerAttack = playerAttack + 6;
        playerMoney = playerMoney - 7;
      }
      else {
        window.alert("You don't have enough money!");
      }
    
      break;
    case "LEAVE":
    case "leave":
      window.alert("Leaving the store.");

      // do nothing, so function will end
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