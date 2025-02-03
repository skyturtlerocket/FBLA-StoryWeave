# FBLA-StoryWeave
My submission for the FBLA Introduction to Programming SLC.
Project Name: StoryWeave
Developed By: Timothy Ha

NOTE: The link in the description does not work anymore as I was using Vercel to only test it.

MOTIVATION AND DEVELOPMENT

Interactive stories allows users to have a more immersive experience while reading, but sometimes interactive stories can be hard to find.
StoryWeave is a hosting platform that aims to make interactive stories more accessible as a form of reading and entertainment.
This platform has a collection of interactive stories that a user can choose from to interact with.

The biggest challenge I've faced while making this is that I had almost no prior web development experience, 
so I had to learn what and how to use the main packages (refer to Packages Used) I used to develop StoryWeave.
While developing StoryWeave, I loved learning about how web development works and the basics of UX design.

HOW STORIES WORK

From the Explore page, the story ID is passed into story.html through a URL parameter.
story.js extracts the story ID from the url and uses it to extract the specific story data from the JSON.
story.js inserts story data into the blank divs and buttons in story.html by animation on default, but this can be changed by pressing “Skip Animation”.

story.js contains over 190 lines of code, so here’s the big picture of how it works.
Importing JSON - imports the JSON needed for the story and makes sure user input is valid by making sure that the story exists.
Importing story elements from story.html - imports elements such as text boxes, buttons, and headers so they can be “filled in” with the imported JSON data
Functions used to “fill in” story.html:
start_story() - starts the story and adds event listeners for the buttons
set_options() - sets the option buttons for users to choose from
run_change() - processes the option button the user chooses and controls progress through the story
typing_animation()  and typeletter() - used to “animate” the text when being added to the textbox, to give a typewriter effect.


HOW TO RUN STORYWEAVE

Once you have downloaded the source code, navigate to the directory that contains the file:

server.js

If you can't find it, it is inside the same folder as the README (the file you are reading right now!).
Once you have navigated to this directory, type the following command into the terminal:

node server.js

Once you have done this, go to:

localhost:3000

in a browser of your choice.
You should be all set from here!

PACKAGES/LIBRARIES/FRAMEWORKS USED

Node.JS - Framework used to make StoryWeave
Express - Used for routing URLs
HTML - Used to structure StoryWeave
CSS - Used to style the HTML
JavaScript - Used to make the interactive story and interactive help menu
JSON - Used to store data used in stories and in the interactive help menu
Looka - Used to make the logo and favicon
Visual Studio Code - IDE used to develop StoryWeave

