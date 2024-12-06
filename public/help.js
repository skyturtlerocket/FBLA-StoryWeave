//import buttons
const q1 = document.getElementById("btn1");
const q2 = document.getElementById("btn2");
const q3 = document.getElementById("btn3");
const q4 = document.getElementById("btn4");
const q5 = document.getElementById("btn5");
const q6 = document.getElementById("btn6");
const q7 = document.getElementById("btn7");
const other = document.getElementById("btn8");
const clear = document.getElementById("btnClear");
clear.style.display="none";
const questions = [q1, q2, q3, q4, q5, q6, q7, other];

//add the event listeners for all the buttons
questions.forEach((button, index) => {
    button.addEventListener("click", () => {
        add_text(index);
        button.disabled = true; //disables after a click so questions can't be spammed
        button.classList.add("pressed-button"); //changes the border to indicate that it's been pressed already
    });
});

//text box in which the Q & A will happen
const textbox = document.getElementById("text_box");
textbox.style.display="none"; //hides it on default because there is padding and different background color

clear.addEventListener("click", function(){
    //clears all of the finished questions
    textbox.innerHTML = "";
    textbox.style.display="none";
    clear.style.display="none";
    //re-enables all of the buttons
    questions.forEach(button => {
        button.disabled = false; //allows the button to be pressed again
        button.classList.remove("pressed-button"); //changes all buttons to the default border color
        button.classList.add("unpressed-button");
    });
});

function add_text(ID) {
    fetch('./questions.json') //import JSON
    //successfully imported JSON
        .then(response => response.json())
        .then(data => {
            //shows the textbox and clear text button
            textbox.style.display="block";
            clear.style.display="inline-block";
            //extracts the question data from the JSON
            const question_data = data[ID];
            const question = question_data["question"];
            const answer = question_data["answer"];
            //adds the question in bold, line breaks, and the answer into the text box.
            textbox.innerHTML += "<strong>" + question + "</strong> <br />" + "<br />" + answer+ "<br />" + "<br />";
        });
}
