import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;
let lastUpdateTime = performance.now();
let autoClick = true;
let upgradeModifier = 1;

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
  if(num_lemon >= 10){
    autoClick = false;
    upgrade.disabled = autoClick;
  }else{
    autoClick = true;
    upgrade.disabled = autoClick;
  }
  body.innerHTML = `you have ${Math.floor(num_lemon)} 🍋 in your basket`;
}

function animate(time: number) {
  const deltaTime = (time - lastUpdateTime) / 1000;
  incrementLemon(upgradeModifier * deltaTime);
  lastUpdateTime = time;
  requestAnimationFrame(animate);
}

const button = document.createElement("button");
button.innerHTML = "Click to count the lemons 🍋";
button.addEventListener("click", () => incrementLemon(1));

app.append(button);

const upgrade = document.createElement("button");
upgrade.innerHTML = "Purchase Auto 🍋 Clicker";
upgrade.addEventListener("click", () => {
      num_lemon = num_lemon - 10;
      upgradeModifier += 1;
    }
  );
app.append(upgrade);

console.log(autoClick);
upgrade.disabled = autoClick;

requestAnimationFrame(animate);
