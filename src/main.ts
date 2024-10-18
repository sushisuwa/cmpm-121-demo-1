import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Count the lemons";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const body = document.createElement("p");
app.append(body);

let num_lemon = 0;
function incrementLemon() {
  num_lemon += 1;
  body.innerHTML = `you have ${num_lemon} 🍋 in your basket`;
}

const button = document.createElement("button");
button.innerHTML = "Click to count the lemons 🍋";
button.addEventListener("click",incrementLemon);
app.append(button);
