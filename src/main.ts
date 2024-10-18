import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;
let lastUpdateTime = performance.now();
let autoClick = true;
let autoClick1 = true;
let autoClick2 = true;
let upgradeModifier = 0;
let item1 = 0,
  item2 = 0,
  item3 = 0;
let priceAuto = 10,
  priceSuper = 100,
  priceUltra = 1000;
const priceMod = 1.15;
const gameName = "Zesty Quest: Count of the Lemons";
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

const buttonContainer = document.createElement("div");
buttonContainer.className = "button-container";
app.append(buttonContainer);

let num_lemon = 0;
function incrementLemon(amount: number) {
  num_lemon += amount;
  if (num_lemon >= priceAuto) {
    autoClick = false;
    upgrade.disabled = autoClick;
  } else {
    autoClick = true;
    upgrade.disabled = autoClick;
  }

  if (num_lemon >= priceSuper) {
    autoClick1 = false;
    upgradeSuper.disabled = autoClick1;
  } else {
    autoClick1 = true;
    upgradeSuper.disabled = autoClick1;
  }

  if (num_lemon >= priceUltra) {
    autoClick2 = false;
    upgradeUltra.disabled = autoClick2;
  } else {
    autoClick2 = true;
    upgradeUltra.disabled = autoClick2;
  }

  body.innerHTML = `you have ${Math.floor(num_lemon)} 🍋 in your basket`;
  autoClickerPurchased.innerHTML = `${item1} : 🥼 Lemon Experts`;
  superPurchased.innerHTML = `${item2} : 🫙 Lemonade Stands`;
  ultraPurchased.innerHTML = `${item3} : 👩‍👩‍👧‍👦 Lemon Unions `;
  growthRate.innerHTML = `${upgradeModifier.toFixed(1)}🍋/s`;
}

function animate(time: number) {
  const deltaTime = (time - lastUpdateTime) / 1000;
  incrementLemon(upgradeModifier * deltaTime);
  lastUpdateTime = time;
  requestAnimationFrame(animate);
}

const button = document.createElement("button");
button.innerHTML = "🍋";
button.addEventListener("click", () => incrementLemon(1));

buttonContainer.append(button);

const upgrade = document.createElement("button");
upgrade.innerHTML = "Purchase Lemon Expert 🥼";
upgrade.addEventListener("click", () => {
  num_lemon = num_lemon - priceAuto;
  upgradeModifier += 0.1;
  item1 += 1;
  priceAuto = priceAuto * priceMod;
});
app.append(upgrade);

const upgradeSuper = document.createElement("button");
upgradeSuper.innerHTML = "Purchase 🫙 Lemonade Stand";
upgradeSuper.addEventListener("click", () => {
  num_lemon = num_lemon - priceSuper;
  upgradeModifier += 1;
  item2 += 1;
  priceSuper = priceSuper * priceMod;
});
app.append(upgradeSuper);

const upgradeUltra = document.createElement("button");
upgradeUltra.innerHTML = "Purchase Lemon Union 👩‍👩‍👧‍👦";
upgradeUltra.addEventListener("click", () => {
  num_lemon = num_lemon - priceUltra;
  upgradeModifier += 50;
  item3 += 1;
  priceUltra = priceUltra * priceMod;
});
app.append(upgradeUltra);

console.log(autoClick);
upgrade.disabled = autoClick;
upgradeSuper.disabled = autoClick1;
upgradeUltra.disabled = autoClick2;

requestAnimationFrame(animate);
