- Game starts (6 guesses)
- User can select one option from dropdown, and click submit to use that as an answer
- Submit conditionals
  - [x] cannot submit a blank answer? 
  - [x] cannot submit the same answer twice (might need a seperate arrray)
  - [x] disable submit button after 6 total guesses 
  - on incorrect submit:
    - [x] their selection will be added to "answers" array 
    - [x] decrease "guesses" remaining by 1
    - [x] if guesses remaining = 0 game ends

  - on correct submit:
    - [x] their selection will be added to "answers" array 
    - [x] game ends

- Skip conditionals
  - 

- Game will end when
  - [x] turns left = 0
  - [x] submitted answer = correct answer


THINGS TO DO:

# Primary

  - [x] button condition, change to pause when song is playing
  - [x] game modal styling (confetti)
  - [] guess box styling (responsive design)
  - [x] song intervals
  - [] logo
  - [x] settings drop down change to just display username
  - [x] stats modal display stats (total games, win percentage, win streak, max win streak)
  - [x] fix broken queries and create stats queries (including streaks, max streaks)
  - [x] expose API endpoint on backend to access stats  
  - [x] expand playlist/guess list
  - [x] game changed to games
  - [] recording of demo 
  - [x] on click of play button, some icon to show that music is playing
  - [x] alerts on guess box for (duplicate answers)
  - [] leader board
  
## Secondary
  - [] dark mode
  - [x] erase drop down in top left
  - [] deployment to web
  - [x] hard mode
  - [x] useContext
  - [x] refactored api calls 
  - [] spinner for loading player
  - [] Graphs for stats
  - [] progress bar
  - [] updated help modal to include hard mode