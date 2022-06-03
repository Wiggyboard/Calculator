const appHeight = () => document.body.style.setProperty('--app-height', `${window.innerHeight}px`);
window.addEventListener("resize", appHeight);
appHeight();

let operandA = "0";
let operandB = "";
let operandAReady = false;
let answerGiven = false;
let chainAnswerGiven = false;
let selectedOperator = "";
let nextOperator = "";
let operator = {
  "+": function(a, b) { return a + b },
  "-": function(a, b) { return a - b },
  "x": function(a, b) { return a * b },
  "/": function(a, b) { return a / b },
}

function numPress(event) {
  let num = event.currentTarget.innerText;
  chainAnswerGiven = false;
  if (answerGiven === true) {
    operandA = "0";
    operandB = "";
    operandAReady = false;
    answerGiven = false;
  }
  if (operandAReady === false) {
    document.getElementById("screen").innerText = operandA;
    resetKeyColor();
    if ((num === ".") && (operandA === "0")) {
      operandA = 0 + num;
      document.getElementById("screen").innerText = operandA.toString();
    }
    else {
      if (operandA === "0") {
        operandA = "";
        operandA += num;
        document.getElementById("screen").innerText = operandA.toString();
      }
      else {
        operandA += num;
        document.getElementById("screen").innerText = operandA.toString();
        if (document.getElementById("screen").innerText.includes(".")) {
          let decSplit = document.getElementById("screen").innerText.split(".");
          decSplit[1].replace(",", "");
          document.getElementById("screen").innerText = decSplit[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "." + decSplit[1];
        }
        else {
          document.getElementById("screen").innerText = operandA.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
      }      
    }
  }
  else if ((num === "0") && (operandB === "")) {
    operandB += num;
    document.getElementById("screen").innerText = "0";
  }
  else if (operandAReady === true) {
    resetKeyColor();
    if ((num === ".") && (operandB === "")) {
      operandB = 0 + num;
      document.getElementById("screen").innerText = operandB.toString();
    }
    else {
      if (operandB === "0") {
        operandB = "";
        document.getElementById("screen").innerText = operandB.toString()
      }
      operandB += num;
      document.getElementById("screen").innerText = operandB.toString();
      if (document.getElementById("screen").innerText.includes(".")) {
        let decSplit = document.getElementById("screen").innerText.split(".");
        decSplit[1].replace(",", "");
        document.getElementById("screen").innerText = decSplit[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "." + decSplit[1];
      }
      else {
        document.getElementById("screen").innerText = operandB.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    }
  }
}

document.getElementById("decimal").addEventListener("click", function() {
  document.getElementById("decimal").setAttribute("onclick", null);
});

function operatorPress(event) {
  resetKeyColor();
  applyKeyColor();
  if (answerGiven === true) {
    operandB = "";
    operandAReady = false;
    answerGiven = false;
  }
  if ((operandAReady === false)) {
    selectedOperator = event.currentTarget;
    operandAReady = true;
    document.getElementById("decimal").setAttribute("onclick", "numPress(event)");
  }
  else if ((operandAReady === true) && (operandB === "")) {
    selectedOperator = event.currentTarget;
  }
  else if ((operandAReady === true) && (operandB !== "")) {
    if ((selectedOperator.innerText === "/") && (operandB === "0")) {
      operandA = "0";
      operandB = "";
      operandAReady = false;
      answerGiven = false;
      chainAnswerGiven = false;
      document.getElementById("decimal").setAttribute("onclick", "numPress(event)");
      document.getElementById("screen").innerText = "Kaboom!";
      resetKeyColor();
      selectedOperator = "";
      nextOperator = "";
    }
    else {
      nextOperator = event.currentTarget;
      operandA = operator[selectedOperator.innerText](+operandA, +operandB);
      operandA = Number(operandA).toFixed(4);
      operandA = Number(operandA);
      document.getElementById("screen").innerText = operandA.toString();
      if (document.getElementById("screen").innerText.includes(".")) {
        let decSplit = document.getElementById("screen").innerText.split(".");
        decSplit[1].replace(",", "");
        document.getElementById("screen").innerText = decSplit[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "." + decSplit[1];
      }
      else {
        document.getElementById("screen").innerText = operandA.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
      selectedOperator = nextOperator;
      operandB = "";
      chainAnswerGiven = true;
      document.getElementById("decimal").setAttribute("onclick", "numPress(event)");
    }
    
  }
}

function equalsPress() {
  resetKeyColor();
  if ((operandB !== "")) {
    if ((selectedOperator.innerText === "/") && (operandB === "0")) {
      operandA = "0";
      operandB = "";
      operandAReady = false;
      answerGiven = false;
      chainAnswerGiven = false;
      document.getElementById("decimal").setAttribute("onclick", "numPress(event)");
      document.getElementById("screen").innerText = "Kaboom!";
      resetKeyColor();
      selectedOperator = "";
      nextOperator = "";
    }
    else {
      operandA = operator[selectedOperator.innerText](+operandA, +operandB);
      operandA = Number(operandA).toFixed(4);
      operandA = Number(operandA);
      document.getElementById("screen").innerText = operandA.toString();
      if (document.getElementById("screen").innerText.includes(".")) {
        let decSplit = document.getElementById("screen").innerText.split(".");
        decSplit[1].replace(",", "");
        document.getElementById("screen").innerText = decSplit[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "." + decSplit[1];
      }
      else {
        document.getElementById("screen").innerText = operandA.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
      answerGiven = true;
    }
  }
}

function delPress() {
  if ((answerGiven === true) || (chainAnswerGiven === true)) {
    //do nothing
  }
  else if ((operandAReady === false) && (operandA !== "0") && (operandB === "")) {
    operandAReady = false;
    operandA = operandA.slice(0, -1);
    document.getElementById("screen").innerText = operandA.toString();
    if (document.getElementById("screen").innerText.includes(".")) {
      let decSplit = document.getElementById("screen").innerText.split(".");
      decSplit[1].replace(",", "");
      document.getElementById("screen").innerText = decSplit[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "." + decSplit[1];
    }
    else {
      document.getElementById("screen").innerText = operandA.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      document.getElementById("decimal").setAttribute("onclick", "numPress(event)");
    }
    if (document.getElementById("screen").innerText.length === 0) {
      document.getElementById("screen").innerText = "0";
    }
  }
  else if ((operandB !== "0") && (operandAReady === true)) {
    operandB = operandB.slice(0, -1);
    document.getElementById("screen").innerText = operandB.toString();
    if (document.getElementById("screen").innerText.includes(".")) {
      let decSplit = document.getElementById("screen").innerText.split(".");
      decSplit[1].replace(",", "");
      document.getElementById("screen").innerText = decSplit[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "." + decSplit[1];
    }
    else {
      document.getElementById("screen").innerText = operandB.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      document.getElementById("decimal").setAttribute("onclick", "numPress(event)");
    }
    if (document.getElementById("screen").innerText.length === 0) {
      document.getElementById("screen").innerText = "0";
      operandB = 0;
    }
  }
}

function resetPress() {
  operandA = "0";
  operandB = "";
  operandAReady = false;
  answerGiven = false;
  chainAnswerGiven = false;
  document.getElementById("decimal").setAttribute("onclick", "numPress(event)");
  document.getElementById("screen").innerText = "0";
  resetKeyColor();
  selectedOperator = "";
  nextOperator = "";
}

function applyKeyColor() {
  if (document.getElementById("switch-bg").style.justifyContent === "flex-start") {
    event.currentTarget.style.background = "white";
  }
  if (document.getElementById("switch-bg").style.justifyContent === "center") {
    event.currentTarget.style.background = "white";
  }
  if (document.getElementById("switch-bg").style.justifyContent === "flex-end") {
    event.currentTarget.style.background = "hsl(268, 27%, 38%)";
  }
}

function resetKeyColor() {
  if (document.getElementById("switch-bg").style.justifyContent === "flex-start") {
    document.getElementById("add").style.background = "hsl(30, 25%, 89%)";
    document.getElementById("subtract").style.background = "hsl(30, 25%, 89%)";
    document.getElementById("multiply").style.background = "hsl(30, 25%, 89%)";
    document.getElementById("divide").style.background = "hsl(30, 25%, 89%)";
  }
  if (document.getElementById("switch-bg").style.justifyContent === "center") {
    document.getElementById("add").style.background = "hsl(135, 7%, 89%)";
    document.getElementById("subtract").style.background = "hsl(135, 7%, 89%)";
    document.getElementById("multiply").style.background = "hsl(135, 7%, 89%)";
    document.getElementById("divide").style.background = "hsl(135, 7%, 89%)";
  }
  if (document.getElementById("switch-bg").style.justifyContent === "flex-end") {
    document.getElementById("add").style.background = "hsl(268, 47%, 21%)";
    document.getElementById("subtract").style.background = "hsl(268, 47%, 21%)";
    document.getElementById("multiply").style.background = "hsl(268, 47%, 21%)";
    document.getElementById("divide").style.background = "hsl(268, 47%, 21%)";
  }
}

document.getElementById("switch-bg").style.justifyContent = "flex-start";

function toggleTheme1() {
  document.getElementById("switch-bg").style.justifyContent = "flex-start";
  document.getElementById("switch-bg").setAttribute("onclick", "toggleTheme2()");
  resetKeyColor();

  $("body").removeClass("theme-3-body");
  $("body").addClass("body");

  $("header").removeClass("theme-3-header");
  $("header").addClass("header");

  $("#switch-bg").removeClass("theme-3-switch-bg");
  $("#switch-bg").addClass("switch-bg");

  $("#switch-indicator").removeClass("theme-3-switch-indicator");
  $("#switch-indicator").addClass("switch-indicator");

  $(".screen").removeClass("theme-3-screen");
  $(".screen").addClass("#screen");

  $("#keypad").removeClass("theme-3-keypad");
  $("#keypad").addClass("#keypad");

  $(".small-key").removeClass("theme-3-small-key");
  $(".small-key").addClass("small-key");

  $("#del").removeClass("theme-3-del");
  $("#del").addClass("#del");

  $("#reset").removeClass("theme-3-reset");
  $("#reset").addClass("#reset");

  $("#equals").removeClass("theme-3-equals");
  $("#equals").addClass("#equals");

  if (selectedOperator !== "") {
    selectedOperator.style.background = "white";
  }
  else if (nextOperator !== "") {
    nextOperator.style.background = "white";
  }

  localStorage.setItem("theme", "theme1");
}

function toggleTheme2() {
  document.getElementById("switch-bg").style.justifyContent = "center";
  document.getElementById("switch-bg").setAttribute("onclick", "toggleTheme3()");
  resetKeyColor();

  $("body").removeClass("body");
  $("body").addClass("theme-2-body");

  $("header").removeClass("header");
  $("header").addClass("theme-2-header");

  $("#switch-bg").removeClass("#switch-bg");
  $("#switch-bg").addClass("theme-2-switch-bg");

  $("#switch-indicator").removeClass("#switch-indicator");
  $("#switch-indicator").addClass("theme-2-switch-indicator");

  $(".screen").removeClass("#screen");
  $(".screen").addClass("theme-2-screen");

  $("#keypad").removeClass("#keypad");
  $("#keypad").addClass("theme-2-keypad");

  $("small-key").removeClass("small-key");
  $(".small-key").addClass("theme-2-small-key");

  $("#del").removeClass("#del");
  $("#del").addClass("theme-2-del");

  $("#reset").removeClass("#reset");
  $("#reset").addClass("theme-2-reset");

  $("#equals").removeClass("#equals");
  $("#equals").addClass("theme-2-equals");

  if (selectedOperator !== "") {
    selectedOperator.style.background = "white";
  }
  else if (nextOperator !== "") {
    nextOperator.style.background = "white";
  }

  localStorage.setItem("theme", "theme2");
}
  
function toggleTheme3() {
  document.getElementById("switch-bg").style.justifyContent = "flex-end";
  document.getElementById("switch-bg").setAttribute("onclick", "toggleTheme1()");
  resetKeyColor();

  $("body").removeClass("theme-2-body");
  $("body").addClass("theme-3-body");

  $("header").removeClass("theme-2-header");
  $("header").addClass("theme-3-header");

  $("#switch-bg").removeClass("theme-2-switch-bg");
  $("#switch-bg").addClass("theme-3-switch-bg");

  $("#switch-indicator").removeClass("theme-2-switch-indicator");
  $("#switch-indicator").addClass("theme-3-switch-indicator");

  $(".screen").removeClass("theme-2-screen");
  $(".screen").addClass("theme-3-screen");

  $("#keypad").removeClass("theme-2-keypad");
  $("#keypad").addClass("theme-3-keypad");

  $(".small-key").removeClass("theme-2-small-key");
  $(".small-key").addClass("theme-3-small-key");

  $("#del").removeClass("theme-2-del");
  $("#del").addClass("theme-3-del");

  $("#reset").removeClass("theme-2-reset");
  $("#reset").addClass("theme-3-reset");

  $("#equals").removeClass("theme-2-equals");
  $("#equals").addClass("theme-3-equals");

  if (selectedOperator !== "") {
    selectedOperator.style.background = "hsl(268, 27%, 38%)";
  }
  else if (nextOperator !== "") {
    nextOperator.style.background = "hsl(268, 27%, 38%)";
  }

  localStorage.setItem("theme", "theme3");
}

if (localStorage.getItem("theme") === "theme1") {
  toggleTheme1()
}
if (localStorage.getItem("theme") === "theme2") {
  toggleTheme2()
}
if (localStorage.getItem("theme") === "theme3") {
  toggleTheme3()
}