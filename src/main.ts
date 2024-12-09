import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;
interface Item {
  name: string;
  cost: number;
  rate: number;
  purchased: number;
  description: string;
}

//item cost constants
const ITEM_COST_LEMON_EXPERT = 10;
const ITEM_COST_LEMONADE_STAND = 100;
const ITEM_COST_LEMON_UNION = 1000;
const ITEM_COST_LEMONADE_ALCHEMIST = 5000;
const ITEM_COST_ZEST_ZEN_MASTER = 15000;

//item rate constants
const ITEM_RATE_LEMON_EXPERT = 0.1; // Autoclick rate
const ITEM_RATE_LEMONADE_STAND = 2;
const ITEM_RATE_LEMON_UNION = 50;
const ITEM_RATE_LEMONADE_ALCHEMIST = 200;
const ITEM_RATE_ZEST_ZEN_MASTER = 1000;

const PRICE_MODIFIER = 1.15;

const availableItems: Item[] = [
  { name: "🍋🥼 Lemon Expert", cost: ITEM_COST_LEMON_EXPERT, rate: ITEM_RATE_LEMON_EXPERT, purchased: 0, description: "Autoclicks once every 10 seconds"},
  { name: "🍋🏠 Lemonade Stand", cost: ITEM_COST_LEMONADE_STAND, rate: ITEM_RATE_LEMONADE_STAND, purchased: 0, description: "Boost production with fresh lemonade sales."},
  { name: "🍋👥 Lemon Union", cost: ITEM_COST_LEMON_UNION, rate: ITEM_RATE_LEMON_UNION, purchased: 0, description: "Join forces to multiply lemon output."},
  { name: "🍋🧙 Lemonade Alchemist", cost: ITEM_COST_LEMONADE_ALCHEMIST, rate: ITEM_RATE_LEMONADE_ALCHEMIST, purchased: 0, description: "Blends ancient alchemy with modern science to distill the essence of lemons into unprecedented productivity boosts."},
  { name: "🍋🧘 Zest Zen Master", cost: ITEM_COST_ZEST_ZEN_MASTER, rate: ITEM_RATE_ZEST_ZEN_MASTER, purchased: 0, description: "Harnesses the zen-like focus of citrus enlightenment to enhance your lemon operations manifold."}
];

const itemElements: HTMLParagraphElement[] = [];
const itemButtonElements: HTMLButtonElement[] = [];

let lastUpdateTime = performance.now();
let upgradeModifier = 0;
const gameName = "Zesty Quest: Count of the Lemons";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const body = document.createElement("p");
app.append(body);

const growthRate = document.createElement("p");
app.append(growthRate);

availableItems.forEach((item) => {
  const itemPurchasedElement = document.createElement("p");
  itemPurchasedElement.innerHTML = `${item.purchased} : ${item.name}s`;
  app.append(itemPurchasedElement);

  itemElements.push(itemPurchasedElement);
});

const buttonContainer = document.createElement("div");
buttonContainer.className = "button-container";
app.append(buttonContainer);

const tooltipStyle = document.createElement("style");
document.head.append(tooltipStyle);

let numberOfLemons = 0;
function incrementLemon(amount: number) {
  numberOfLemons += amount;
  body.innerHTML = `you have ${Math.floor(numberOfLemons)} 🍋 in your basket`;
  availableItems.forEach((item, index) => {
    itemElements[index].innerHTML = `${item.purchased} : ${item.name}s`;

    if (numberOfLemons >= item.cost) {
      itemButtonElements[index].disabled = false;
    } else {
      itemButtonElements[index].disabled = true;
    }

    itemButtonElements[index].innerHTML =
      `Purchase ${item.name}, Cost: ${Math.floor(item.cost)}`;
  });
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
  button.innerHTML = `Purchase ${item.name}, Cost: ${item.cost}`;

  const tooltip = document.createElement("span");
  tooltip.className = "tooltiptext";
  tooltip.innerHTML = item.description;
  
  const tooltipContainer = document.createElement("span");
  tooltipContainer.className = "tooltip";
  tooltipContainer.appendChild(button);
  tooltipContainer.appendChild(tooltip);

  button.addEventListener("click", () => {
    numberOfLemons -= item.cost;
    upgradeModifier += item.rate;

    item.purchased += 1;
    item.cost = item.cost * PRICE_MODIFIER;
  });

  itemButtonElements.push(button);
  app.append(tooltipContainer);
  button.disabled = true;
});
requestAnimationFrame(animate);
