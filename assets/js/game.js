// Game States
// "WIN" - Player robot has defeated all enemy robots
// * Fight all ennemy robots
// * Defeat each enemy robot
// "LOSE" - Player robot's health is zero or less

var playerName = window.prompt("What is your robot's name");
var playerHealth = 20;
var playerAttack = 10;
var playerMoney = 10;

// You can also log multiple values at onnce like this:
console.log(playerName, playerAttack, playerHealth);

var enemyNames = ["Roberto", "Amy Android", "R2D2"];
var enemyAttack = 10;
var enemyHealth = 50;

// function to generate a random numeric value
var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max - min +1) + min);
  return value;
};

// function expression
var fight = function(enemyName) {
// debugger;

    //execute a while loop as long as enemy robot is alive
    while (enemyHealth > 0 && playerHealth > 0) {
        var promptFight = window.prompt(
            "Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose."
        );

        //if user picks skip confirm and then stop the loop
        if (promptFight === "skip" || promptFight === "SKIP") {
            //confirm the user wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");
            
            //if yes (true), leave the fight
            if (confirmSkip) {
                window.alert(playerName + " has decided to quit this fight. Goodbye");
                //subtract money from player
                playerMoney = Math.max(0, playerMoney - 10);
                console.log('playerMoney', playerMoney);
                // Would you like to refill, upgrade or leave the store?
                // Prompt user to input one of the above options
                break;
            } // if no (false), ask question agin about running fight()
        }

        //remove enemyHealth from playerAttach
        // generate random damage value based on player's attack power
        var damage = randomNumber(playerAttack-3, playerAttack);
        enemyHealth = Math.max(0, enemyHealth - damage);
        console.log(
            playerName +
            " attacked " +
            enemyName +
            ". " +
            enemyName +
            " now has " +
            enemyHealth +
            " health remaining."
        );

        // check enemy's health
        if (enemyHealth <= 0) {
            window.alert(enemyName + " has died!");
            
            // award player money for winning
            playerMoney = playerMoney + 20;

            // leave while() loop since enemy is dead
            break;
        } else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }
        
        // remove player's health by subtracting the amount set in the enemyAttack variable
        var damage = randomNumber(enemyAttack - 3, enemyAttack);
        playerHealth = Math.max(0, playerHealth - damage);
        console.log(
            enemyName +
            " attacked " +
            playerName +
            ". " +
            playerName +
            " now has " +
            playerHealth +
            " health remaining."
        );
        
        // check player's health
        if (playerHealth <= 0) {
            window.alert(playerName + " has died!");
            // leave while() loop if player is dead
            break;
        } else {
            window.alert(playerName + " still has " + playerHealth + " health left.");
        }
    } //end of while loop
}; //end of fight function

//function to start a new game
var startGame = function() {
    //reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

    // fight each enemy robot by looping over them and fighting them one at a time
    for (var i = 0; i < enemyNames.length; i++) {
      // if player is still alive, keep fighting
      if (playerHealth > 0) {
            //let user know what round they are in
            window.alert("Welcome to Robot Gladiators! Round " + (1 + i));

            //pick the enemy to fight based on the index of the enemyNames array
            var pickedEnemyName = enemyNames[i];

            // reset the enemyHealth to 50
            enemyHealth = randomNumber(40, 60);

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
  if (playerHealth > 0) {
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