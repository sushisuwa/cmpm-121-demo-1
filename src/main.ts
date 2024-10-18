import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;
let lastUpdateTime = performance.now();
let autoClick = true;
let autoClick1 = true;
let autoClick2  = true;
let upgradeModifier = 0;
let item1 = 0; 
let item2 = 0;
let item3 = 0;

const gameName = "Count the lemons";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const body = document.createElement("p");
app.append(body);

const growthRate = document.createElement("p");
app.append(growthRate);

const autoClickerPurchased = document.createElement("p");
app.append(autoClickerPurchased);

const superPurchased = document.createElement("p");
app.append(superPurchased);

const ultraPurchased = document.createElement("p");
app.append(ultraPurchased);

let num_lemon = 0;
function incrementLemon(amount: number) {
  num_lemon += amount;
  if (num_lemon >= 10) {
    autoClick = false;
    upgrade.disabled = autoClick;
  }else{
    autoClick = true;
    upgrade.disabled = autoClick;
  }

  if(num_lemon >= 100) {
    autoClick1 = false;
    upgradeSuper.disabled = autoClick1;
  }else{
    autoClick1 = true;
    upgradeSuper.disabled = autoClick1;
  }

  if(num_lemon >= 1000){
    autoClick2 = false;
    upgradeUltra.disabled = autoClick2;
  }else{
    autoClick2 = true;
    upgradeUltra.disabled = autoClick2;
  }

  body.innerHTML = `you have ${Math.floor(num_lemon)} 🍋 in your basket`;
  autoClickerPurchased.innerHTML = `${item1} : 🕓🍋 Auto Clickers`;
  superPurchased.innerHTML = `${item2} : ➕🍋 Super Auto Clickers`;
  ultraPurchased.innerHTML = `${item3} : 💥🍋 Ultra Clickers`;
  growthRate.innerHTML = `${upgradeModifier.toFixed(1)}🍋/s`;
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
upgrade.innerHTML = "Purchase Auto 🕓🍋 Clicker";
upgrade.addEventListener("click", () => {
  num_lemon = num_lemon - 10;
  upgradeModifier += 0.1;
  item1 += 1;
});
app.append(upgrade)

const upgradeSuper = document.createElement("button");
upgradeSuper.innerHTML = "Purchase Super Auto ➕🍋 Clicker";
upgradeSuper.addEventListener("click", () => {
  num_lemon = num_lemon - 100;
  upgradeModifier += 1;
  item2 += 1;
});
app.append(upgradeSuper);

const upgradeUltra = document.createElement("button");
upgradeUltra.innerHTML = "Purchase Ultra Auto 💥🍋 Clicker";
upgradeUltra.addEventListener("click", () => {
  num_lemon = num_lemon - 1000;
  upgradeModifier += 50;
  item3 += 1;
});
app.append(upgradeUltra);


console.log(autoClick);
upgrade.disabled = autoClick;
upgradeSuper.disabled = autoClick1;
upgradeUltra.disabled = autoClick2;

requestAnimationFrame(animate);
