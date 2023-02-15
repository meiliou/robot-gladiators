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

var enemyNames = ["Roberto", "Android", "Blackberry", "iOS"];
var enemyAttack = 10;
var enemyHealth = 50;

// function expression
var fight = function(enemyName) {

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
                playerMoney = playerMoney - 10;
                console.log('playerMoney', playerMoney);
                // Would you like to refill, upgrade or leave the store?
                // Prompt user to input one of the above options
                break;
            } // if no (false), ask question agin about running fight()
        }

        //remove enemyHealth from playerAttach
        enemyHealth = enemyHealth - playerAttack;
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
            break;
        } else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }
        
        // remove player's health by subtracting the amount set in the enemyAttack variable
        playerHealth = playerHealth - enemyAttack;
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
            break;
        } else {
            window.alert(playerName + " still has " + playerHealth + " health left.");
        }
        // Would you like to play another round?
    }
};

//function to start a new game
var startGame = function() {
    //reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

    for (var i = 0; i < enemyNames.length; i++) {
        if (playerHealth > 0) {
            //let user know what round they are in
            window.alert("Welcome to Robot Gladiators! Round " + (1 + i));

            //pick the enemy to fight based on the index of the enemyNames array
            var pickedEnemyName = enemyNames[i];

            // reset the enemyHealth to 50
            enemyHealth = 50;

            // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
            fight(pickedEnemyName);
        } else {
            window.alert("You have lost your robot player in battle! Game Over!");
            break;
        }
    }
    endGame();
};

// Add endGame() function
var endGame = function() {
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

startGame();



// Finalize MVP and switch branches
// add shop() function 
// save our progress by using Git