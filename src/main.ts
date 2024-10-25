import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;
interface Item {
  name: string;
  cost: number;
  rate: number;
  purchased: number;
}

const availableItems: Item[] = [
  { name: "Lemon Expert", cost: 10, rate: 0.1, purchased: 0 },
  { name: "Lemonade Stand", cost: 100, rate: 2, purchased: 0 },
  { name: "Lemon Union", cost: 1000, rate: 50, purchased: 0 },
];

let lastUpdateTime = performance.now();
//let autoClick = true;
//let autoClick1 = true;
//let autoClick2 = true;
let upgradeModifier = 0;
/*let item1 = 0,
  item2 = 0,
  item3 = 0;
let priceAuto = 10,
  priceSuper = 100,
  priceUltra = 1000;
  */
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

  body.innerHTML = `you have ${Math.floor(num_lemon)} 🍋 in your basket`;
  availableItems.forEach((item) => {
    const item_purchased = document.createElement("p");
    item_purchased.innerHTML = `${item.purchased} : ${item.name}s`;
  });
  //autoClickerPurchased.innerHTML = `${item1} : 🥼 Lemon Experts`;
  //superPurchased.innerHTML = `${item2} : 🫙 Lemonade Stands`;
  //ultraPurchased.innerHTML = `${item3} : 👩‍👩‍👧‍👦 Lemon Unions `;
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

availableItems.forEach((item) => {
  const button = document.createElement("button");
  button.innerHTML = `Purchase ${item.name}`;

  button.addEventListener("click", () => {
    num_lemon -= item.cost;
    item.rate += item.rate;
    upgradeModifier += item.rate;

    item.purchased += 1;
    item.cost = item.cost * priceMod;
  });

  app.append(button);
});
requestAnimationFrame(animate);

/*
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
*/
