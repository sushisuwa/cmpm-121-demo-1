import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Count the lemons";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let num_clicks = 0;
const button = document.createElement("button");
button.innerHTML = "Click to count the lemons";
button.onclick = () => {
  num_clicks += 1;
  button.innerHTML = `${num_clicks} 🍋 so far`;
};

app.append(button);
