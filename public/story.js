fetch('./stories.json') //import JSON
    //bad response
    .then(response => {
        if (!response.ok) {
            throw new Error('bad network response');
        }
        return response.json();
    })
    //successfully imported JSON
    .then(data => {
        //get the story ID parameter
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const storyID = urlParams.get("id");
        //import data in JSON
        const story = data[storyID];
        const storyTitle = story.name;
        const storyText = story["story-text"];
        const storyOptions = story.options;
        const storyReports = story.reports;
        //import name of story
        const storyName = document.getElementById("title_story");
        const websiteTitle = document.getElementById("website-title");
        storyName.innerHTML = storyTitle;
        websiteTitle.innerHTML = storyTitle;
        //import the text box div
        const storyBox = document.getElementById("txt0");
        //import buttons from story.html
        const btnStart = document.getElementById("btnStart");
        const option1 = document.getElementById("storyOption1");
        const option2 = document.getElementById("storyOption2");
        const btnStop = document.getElementById("stopBtn");
        const btnSkip = document.getElementById("skipBtn");
        //set default values for the buttons
        option1.style.display = "none";
        option2.style.display = "none";
        btnStop.style.display = "none";
        btnSkip.style.display = "none";
        //adds event to start the story
        btnStart.addEventListener("click", start_story);
        //variables used across functions
        let running = true;
        let animating = true;
        let first_run = true;
        let last_text = false;
        let inputs = [];
        let report="";
        let tracker = 0;
        let text = storyText[0][0];
        //starts the story after the start button is pressed
        function start_story() {
            //setting displays for buttons after story has been started
            btnStart.style.display="none";
            btnStop.style.display = "inline-block";
            btnSkip.style.display = "inline-block";
            //start introduction text animation
            var intro_text = document.getElementById("txt0");
            typing_animation(intro_text, storyText[0][0]);
            //activate option buttons
            option1.addEventListener("click", () => run_change()(0));
            option2.addEventListener("click", () => run_change()(1));
            //when user wants to stop interacting with the story
            btnStop.addEventListener("click", function() {
                running = false; //stops the story
                option1.style.display="none"; //hides buttons
                option2.style.display="none";
                btnSkip.style.display="none";
                btnStop.innerHTML = "Back to Explore"; //changes the display so the user knows they can go back to Explore page
                //when user clicks on the button now, it will take them back to explore.
                btnStop.addEventListener("click", function() {
                    window.location.href = "/explore";
                });
            });
            //skips animations
            btnSkip.addEventListener("click", function(){
                animating = false;
            });
        }
        //derives next options from JSON
        function set_options() {
            let len = inputs.length;
            if (len===0) { //first set of inputs
                option1.innerHTML = storyOptions[len][len];
                option2.innerHTML = storyOptions[len+1][len];
            }
            else if (len===1) {
                option1.innerHTML = storyOptions[inputs[len-1]][len];
                option2.innerHTML = storyOptions[inputs[len-1]][len+1];
            }
        }
        function set_report() {
            let sum = inputs[0] + inputs[1];
            if (sum===0) {
                report = storyReports[0];
            }
            else if (sum===2) {
                report = storyReports[3];
            }
            else if (inputs[0] === 1 && inputs[1] === 0) {
                report = storyReports[2];
            }
            else {
                report = storyReports[1];
            }
        }
        //initiates the start of the animation + controls the progress through the story
        function run_change() {
            return function(id) {
                inputs.push(id);
                //hides the option buttons and displays the skip animation button
                option1.style.display = "none";
                option2.style.display = "none";
                btnSkip.style.display = "inline-block";
                //increments the tracker up to control the progress
                if (tracker < storyText.length) {
                    tracker += 1;
                }
                //displays the div where the story will be contained
                storyBox.style.display="block";
                
                //extracts story text from the JSON
                if (inputs.length===1) {
                    text = storyText[id+1][0];
                }
                else if(inputs.length===2) {
                    text = storyText[inputs[0]+1][id+1];
                }
                //sets animations to true as default
                animating = true;
                //animates story
                typing_animation(storyBox, text); 
                // Check if at the end
                if (tracker >= storyOptions.length) { 
                    //hide the option and skip buttons
                    option1.style.display = "none";
                    option2.style.display = "none";
                    //indicates it is the last paragraph of the story
                    last_text = true;
                }
            }
        }
        //animates the text
        function typing_animation(storyBox, text) {
            //checks if it is the first time text is being animatd
            //if yes, don't add line breaks and clear the default texts
            //if no, add line breaks between paragraphs
            if (first_run) {
                storyBox.innerHTML = "";
                first_run = false;
            }
            else {
                storyBox.innerHTML +="<br />" + "<br />";
            }
            let index = 0; //checks the position in the text
            let animation_speed = 30; //speed in ms of each character being added to the story
            function typeletter() {
                //if 1) haven't reached end of story 2) story is still running 3) story is being animated
                if (index < text.length && running && animating) {
                    let char = text.charAt(index);
                    storyBox.innerHTML += char;
                    //increments the index and pauses the function for animation_speed milliseconds
                    index++;
                    setTimeout(typeletter, animation_speed);
                }
                //if 1) haven't reached end of story 2) story is still running 3) story is NOT being animated
                else if (index < text.length && running && animating === false) {
                    //add the remaining characters in the text to the text box
                    storyBox.innerHTML += text.slice(index);
                    //display option buttons and hide skip button
                    //checks to not display options if it's the last paragraph, which means it's end of story.
                    if (last_text === false) {
                        option1.style.display = "inline-block";
                        option2.style.display = "inline-block";
                    }
                    btnSkip.style.display = "none";
                    //set the options
                    set_options();

                }
                // check to make sure story hasn't ended
                else if (tracker < storyText.length-1 && running) {
                    //display option buttons and hide skip button
                    option1.style.display = "inline-block";
                    option2.style.display = "inline-block";
                    btnSkip.style.display = "none";
                    //set the options
                    set_options();
                }
                //end of story
                //first set of comparators checks if it has reached the ending with the animation
                //second set of comparators checks if it has reached the ending by skipping the animation
                if ((index === text.length && last_text) || (animating === false && last_text)) {
                    btnStop.innerHTML = "Back to Explore";
                    btnStop.addEventListener("click", function() {
                        window.location.href = "/explore";
                    });
                    btnSkip.style.display="none";
                    set_report();
                    storyBox.innerHTML += "<br>" + "<br>" + report;

                }
            }
            typeletter();
        }
    })
    //catches JSON import error, happens when the storyID parameter is out of range
    .catch(error => {
        console.error("could not import JSON: ", error);
        const btnStart = document.getElementById("btnStart");
        btnStart.style.display="none";
        const storyBox = document.getElementById("txt0");
        storyBox.innerHTML = "Story not found, make sure the ID is valid." + "<br />" + "<a href='/explore'>Back to Explore</a>";
    });
