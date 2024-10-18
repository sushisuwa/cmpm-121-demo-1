import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;
let lastUpdateTime = performance.now();

const gameName = "Count the lemons";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const body = document.createElement("p");
app.append(body);

let num_lemon = 0;
function incrementLemon(amount: number) {
  num_lemon += amount;
  body.innerHTML = `you have ${Math.floor(num_lemon)} 🍋 in your basket`;
}

function animate(time: number){
  const deltaTime = (time - lastUpdateTime) / 1000;
  incrementLemon(deltaTime);
  lastUpdateTime = time;
  requestAnimationFrame(animate);
}

const button = document.createElement("button");
button.innerHTML = "Click to count the lemons 🍋";
button.addEventListener("click", () => incrementLemon(1));

app.append(button);

requestAnimationFrame(animate);
