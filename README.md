```javascript
\Documentation
Note if running at speed 4+ a 'blank' method may be needed to prefix these functions, usage ex below
The blank function can be aquired from the 'Jeroo Features' menu by typing 'copy-helpers' or 'copy-blank'
jeroo1.blank();//tts(Hello!)

jeroo_id = the order you created them starting at 0
To execute any of the functions below the following syntax is required,
testJeroo.<anyMethod>;//<function>

teleportById(<jeroo_id>, <x>, <y>)
pathfindTo(<jeroo_id, <x>, <y>) [Notice when pathfinding the code will pause and resume after it has finished, as of now do NOT pause/restart the program manually,
								   when pathfinding as it will make duplicate jeroos that are buggy]
teleport(<target_x>, <target_y>, <to_x>, <to_y>)
ghost(<true/false>) disable collisions and rendering of the jeroo
playBoomSound()
playSound(<url>)
tts(<text>)
log(<text>)
RJS: <javascript> //Run javascript from jeroo

Feature/modification list
UI
 - (near) Full page dark theme
 - Disable active line highlighting
 - Add two new tabs 'Jeroo Features' and 'Jeroo Cloud'
 - Disable automatic editor tab switching when code is running
 - Remove jeroo image
 - Speed defaults to 6
 - Added a 7th speed that has a 0ms delay vs the 2ms delay at speed 6
 - Other small touchups

Jeroo Features
 the help command will list all the features and what they do as some aren't worth documenting here
 - All inline features listed above
 - speed-modifier,
   - When enabled and the speed slider is set to '6' the delay per action can be set to
     whatever you like for example 1000ms
 - toggle-board - hide the board
 - copy-helpers - a few usefull methods that are used a lot
 - copy-blank   - needed for running Jeroo Features inline code at higher speed, documented above
 - toggle       - disable or enable all JF Features

Jeroo Cloud
 - list - list all files saved in the cloud
 - save - save a open file (including the board)
 - load - load a saved (program/board/both) from the cloud
```
