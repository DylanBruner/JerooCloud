
<h1>How it actually works.</h1>
<br>
The website acts as a proxy for the real Jeroo site, when it first started it forwarded almost all requests to the Jeroo website. Now almost all of the files are stored locally because of the heavy modification I've done to them. The custom code is added by rapidly checking the HTML, getting the active line and then running Javascript based on the results. The speed modifier which was implemented terribly overwrites the setTimeout function with a custom one that changes any delays of '2' to the specified delay. The dark theme is just a javascript file which modifies all the HTML when it's loaded, I do want to just modify the main HTML file eventually.
<br><br>
NOTE: The compiler hasn't really been modified but I'm working on renaming variables and exposing classes for possible better ways to run custom functions in the future.
<br><br>
That should be most of the important stuff

<br>
<h1>Note(s)</h1>
<br>
<a>playing sounds doesn't currently work, i'll fix it whenever I'm interested in sounds again</a>
<br><br>

<br><br>
When I started this project my only goal was to add custom sound effects since then I've added tons of new features (some implemented better than others) so
I didn't really think about long-term code organization and upkeep so it's somewhat scattered/not well done if you find a issue you can report it and I might fix it
But since I will no longer be using this website I wont be updating it any more

<a>when speedup.js is loaded JerooFeatures no longer reads html to detect the active line, it instead patches the highlightLine function,</a>
<a>this means it can be ran at whatever speed you want</a>

<br>
<h1>speedup.js</h1>
<br>
<a>When loaded this will disable the default line highlight code giving speed boosts of around 33%</a>
<a>scroll down to find out how to enable it</a>
<br>

<br>
<h1>Documentation</h1>
<br>

```javascript
Documentation
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

Builtin Code Modifications
Jeroo.isNet(HERE) Returns a random value, True/False

UI
 - (near) Full page dark theme
 - Disable active line highlighting
 - Add two new tabs 'Jeroo Features' and 'Jeroo Cloud'
 - Disable automatic editor tab switching when code is running
 - Remove jeroo image
 - Speed defaults to 6
 - Added a 7th speed that has a 0ms delay vs the 2ms delay at speed 6
 - Other small touchups
 - Better syntax highlighting

Jeroo Features
 the help command will list all the features and what they do as some aren't worth documenting here
 - All inline features listed above
 - speed-modifier,
   - When enabled and the speed slider is set to '6' the delay per action can be set to
     whatever you like for example 1000ms
 - toggle-speedup - toggle the loading of speedup.js which can provide a 33%ish increase in speeds
 - toggle-board - hide the board
 - copy-helpers - a few usefull methods that are used a lot
 - copy-blank   - needed for running Jeroo Features inline code at higher speed, documented above
 - toggle       - disable or enable all JF Features

Jeroo Cloud
 - list - list all files saved in the cloud
 - save - save a open file (including the board)
 - load - load a saved (program/board/both) from the cloud
```