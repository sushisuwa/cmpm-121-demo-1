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

const streamOfLemon = setInterval(incrementLemon, 1000);
function stopLemonStream() {
  clearInterval(streamOfLemon);
}

const button = document.createElement("button");
button.innerHTML = "Click to count the lemons 🍋";
button.addEventListener("click", incrementLemon);


const stopButton = document.createElement("button");
stopButton.innerHTML = "stop stream of lemons...";
stopButton.addEventListener("click", stopLemonStream);

app.append(button);
app.append(stopButton);
