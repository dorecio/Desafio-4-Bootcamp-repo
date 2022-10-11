var startButton = document.querySelector(".start");
var questionLine1 = document.getElementById("parrafo1");
var questionLine2 = document.getElementById("parrafo2");
var mainContainer = document.querySelector(".padre");
var opcionesContainer = document.getElementById("opciones");
var display = document.querySelector(".check");
var timer = document.querySelector(".font-timer");
let textButtonsArray = [];
let buttonsArray = [];
var score = 0;
var questionsArray = ["Commonly used data types DO Not included : ",
    "The condition in an if / else statement is enclosed with : _____________.",
    "Arrays in JavaScript ca be used to store : ______________.",
    "String values must be enclosed within ____________ when being assigned to variables.",
    "A very useful tool used during development and debugging for printing content to the debugger is : "];
var correctAnswer = [2, 2, 3, 0, 3];
var localStorageArray = [];
/* Guarda datos del estudiante en un arreglo */
function guardar(initials) {
    console.log("GUARDAR" + initials);
    let item = {
        initialsName: initials,
        puntaje: score
    };
    localStorageArray.push(item);
    return (item);
}
/* guarda elarreglo de estudiantes en localStorage*/
function putInLocalStorage(){
    localStorage.setItem("item", JSON.stringify(localStorageArray));
}
/* Desplegar LocalStorage en pantalla */
function storage() { 
    opcionesContainer.innerHTML = '';
    localStorageArray = JSON.parse(localStorage.getItem('item'));
    if (localStorageArray === null) {
        localStorageArray = [];
    } else {
        for (var i = 0; i < localStorageArray.length; i++) {
            var lista = localStorageArray[i];

            var li = document.createElement("li");
            li.textContent = lista;
            li.setAttribute("data-index", i);

           

            li.appendChild(opcionesContainer);
          
        }
    }
}
 /*Despliega preguntas y opciones de respuestas */ 

function optionsButtons(j) {
    var optionQuestCero = ["strings", "booleans", "alerts", "numbers"];
    var optionQuestOne = ["quotes", "curly brackets", "parenthesis", "square brackets"];
    var optionQuestTwo = ["numbers and strings", "other arrays", "booleans", "all of the above"];
    var optionQuestThree = ["commas", "cuarly brackets", "quotes", "parenthesis"];
    var optionQuestFour = ["JavaScript", "terminal/bash", "for loops", "console.log"];

    if (j == 0) {
        startButton.parentNode.removeChild(startButton);
    }
    if (j < questionsArray.length) {
        console.log(" =====> j  :  " + j);
        console.log(" =====> questionsArray.length  : " + questionsArray.length);
    
        opcionesContainer.innerHTML = "";
        var button1 = document.createElement("button");
        var textoOpc1 = document.createTextNode("");
        var texto1 = button1.appendChild(textoOpc1);
        var button2 = document.createElement("button");
        var textoOpc2 = document.createTextNode("");
        var texto2 = button2.appendChild(textoOpc2);
        var button3 = document.createElement("button");
        var textoOpc3 = document.createTextNode("");
        var texto3 = button3.appendChild(textoOpc3);
        var button4 = document.createElement("button");
        var textoOpc4 = document.createTextNode("");
        var texto4 = button4.appendChild(textoOpc4);
        opcionesContainer.appendChild(button1);
        opcionesContainer.appendChild(button2);
        opcionesContainer.appendChild(button3);
        opcionesContainer.appendChild(button4);
        opcionesContainer.setAttribute("style", "flex-direction:column", "text-align :center;");
        opcionesContainer.setAttribute("style", "font - size: 1.2rem");
 
        textButtonsArray = [texto1, texto2, texto3, texto4];
        buttonsArray = [button1, button2, button3, button4];
        var opcionesArray = [optionQuestCero, optionQuestOne, optionQuestTwo, optionQuestThree, optionQuestFour];
           
        for (var z = 0; z < 4; z++) {
            console.log(buttonsArray[z]);
            buttonsArray[z].textContent = opcionesArray[j][z];
        }
           
        console.log("aqui si llega 1");
        for (var jj = 0; jj < buttonsArray.length; jj++) {
            buttonsArray[jj].addEventListener("click", function (event) {
                console.log("aqui si llega 2");
                event.preventDefault();
                var element = event.target;
                console.log(element.textContent);
                if (element.textContent == (opcionesArray[j][correctAnswer[j]])) {
                    console.log("======> correcto");
                    display.textContent = "Correct!!!";
                    score += 1;
                } else {
                    display.textContent = "Wrong!";
                    secondsLeft = secondsLeft - 10;
                    console.log("======> INcorrecto");
                }
                numuqest++;
                if (numuqest < questionsArray.length) {
                    questionLine1.textContent = questionsArray[numuqest];
                    optionsButtons(numuqest);
                } else {
                    termina();
                    console.log("=======>RETURN");
                    return;
                }
            });

        }        
    }        
    
} 
/*Funcion que cierra el custionario y pide datos para almacenar*/     
function termina() {
   if (numuqest !== 0) {
        for (var i = 0; i < 4; i++) {
            buttonsArray[i].parentNode.removeChild(buttonsArray[i]);
        } 
        timer.textContent = "All done!";
        questionLine1.textContent = "Your final score is : " + score;
        questionLine2.textContent = "Enter initials : ";
        var initials = document.createElement("input");
        opcionesContainer.appendChild(initials);
        initials.type = "text";
        initials.value = initials.placeholder;
        console.log("INICIALES ==========>  " + initials);
        var submit = document.createElement("button");
        mainContainer.appendChild(submit);
        submit.textContent = "Submit";
        submit.addEventListener("click", function (event) {
            event.preventDefault();
            var element = event.target;
            if (element == submit) {
                var nombre = initials.value.trim();
                console.log("NOMBRE  =======> "+ nombre);
                guardar(nombre);
                putInLocalStorage();
                initials.parentNode.removeChild(initials);
                submit.parentNode.removeChild(submit);
                questionLine2.textContent = "";
                highScores();
            }
        });
    }
}    
/* Despliega estudiantes y sus puntajes */
function highScores() {
    questionLine1.textContent = "High scores";
    storage(); 

}

var secondsLeft = 75;
/* Cuenta el tiempo de la actividad */
function setTime() {
    var timerInterval = setInterval(function () {
      secondsLeft--;
      timer.textContent = secondsLeft;
      if (secondsLeft === 0 || numuqest == questionsArray.length) {
         clearInterval(timerInterval);
         if (secondsLeft === 0) {
           timer.textContent = "Time out!";
         }
         if (numuqest == questionsArray.length) {
            questionLine2.textContent = "Enter initials : ";
         }
      }
    }, 1000);
}

var numuqest = 0;
/* Inicia el cuestionario */
function startQuestionary() {
    setTime();
    questionLine2.textContent = "";
    questionLine1.textContent = questionsArray[numuqest];
    optionsButtons(numuqest);
    console.log("si regresa===============");
}

startButton.addEventListener("click", startQuestionary);