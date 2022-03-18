# Nerdle - a wordle clone 

### Description
A wordle spin off game where the answers are only selected from themed 5 letter words. Users have 6 chances to guess. The UI informs the user how accurate their guess was so they have a better idea on how to proceed with their future guesses. A Yellow tile appears when the user guess a letter that is in the word. A Green tle appears if the users guess is in the correct tile. A keyboard records the users guesses as they are made to let them easily visualize which letters to use. I use a dictionary API to verify that the words submitted are legitimate, and a manual array of themed 5 letter words that are randomly chosen from.

![nerdleFinal](https://user-images.githubusercontent.com/97360775/159096087-2b100735-c844-4b01-a185-3fc9e3391606.gif)

### Technologies used
 - JavaScript
 - CSS 
 - HTML
 - The dictionary API found at: https://www.wordsapi.com/ 

### MVP Goals
 - [x] As a player I want the game to let me enter a five letter word in 5 boxes.
 
 - [x] As a player I want the game to let me type the word out and fill in the five boxes.

 - [x] As a player I want the game to not let me submit if all five boxes aren't full.
 
 - [x] As a player I want the game to verify my word against the target word.
 
 - [x] As a player I want the game to verify my five entries are 5 letters.
 
 - [x] As a player I want the game to flip the boxes to green if the letter matches the target word, yellow if it's in the word, or grey if it doesnt appear.
 
 - [x] As a player I want the game to only pull from nerdy words.
 
 - [x] As a player I want the game to give me 6 attempts before displaying the target word and rotating to a new word.

### Stretch Goals
 - [x] As a player I want the game to verify the 5 letters are a legitimate word with a dictionary API.
 
 - [x] As a player I want the game to display an animation when the color changes.
 
 - [x] As a player I want the game to display an animation when the word is guessed.
 
 - [ ] As a player I want the game to give out a peggle style victory sound when the word is guessed.
 
 - [x] As a player I want the game to display an onscreen keyboard and turn the letters the color of the best result you have guessed.
 
 - [ ] As a player I want the game to give me a slick way to share the results to social media platforms.


### Unresolved Problems and Major Hurdles
I struggled a little with double letter words and guesses, but in the end that struggle just forced me to dry out my code as I was sick of rewriting it over and over. I obviously was unable to make it to adding sound or a social share button into the game. That was more due to wanting to use my time to fine tune the product I had over adding in new untested features. So I never really tried to create either and just pushed it off for a future itteration. 

### Wire Frame 
![nerdleWireFrame](https://user-images.githubusercontent.com/97360775/159097283-61bdc743-5956-4080-923b-fff70ef34a2f.png)
