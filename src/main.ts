import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;
interface Item {
  name: string;
  cost: number;
  rate: number;
  purchased: number;
  description: string;
}

const availableItems: Item[] = [
  { name: "🍋🥼 Lemon Expert", cost: 10, rate: 0.1, purchased: 0, description: "Autoclicks once every 10 seconds"},
  { name: "🍋🏠 Lemonade Stand", cost: 100, rate: 2, purchased: 0, description: "Boost production with fresh lemonade sales."},
  { name: "🍋👥 Lemon Union", cost: 1000, rate: 50, purchased: 0, description: "Join forces to multiply lemon output."},
  { name: "🍋🧙 Lemonade Alchemist", cost: 5000, rate: 200, purchased: 0, description: "Blends ancient alchemy with modern science to distill the essence of lemons into unprecedented productivity boosts."},
  { name: "🍋🧘 Zest Zen Master", cost: 15000, rate: 1000, purchased: 0, description: "Harnesses the zen-like focus of citrus enlightenment to enhance your lemon operations manifold."}
];

const itemElements: HTMLParagraphElement[] = [];
const itemButtonElements: HTMLButtonElement[] = [];

let lastUpdateTime = performance.now();
let upgradeModifier = 0;
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

availableItems.forEach((item) => {
  const item_purchased = document.createElement("p");
  item_purchased.innerHTML = `${item.purchased} : ${item.name}s`;
  app.append(item_purchased);

  itemElements.push(item_purchased);
});

const buttonContainer = document.createElement("div");
buttonContainer.className = "button-container";
app.append(buttonContainer);

const tooltipStyle = document.createElement("style");
document.head.append(tooltipStyle);

let num_lemon = 0;
function incrementLemon(amount: number) {
  num_lemon += amount;
  body.innerHTML = `you have ${Math.floor(num_lemon)} 🍋 in your basket`;
  availableItems.forEach((item, index) => {
    itemElements[index].innerHTML = `${item.purchased} : ${item.name}s`;

    if (num_lemon >= item.cost) {
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
    num_lemon -= item.cost;
    upgradeModifier += item.rate;

    item.purchased += 1;
    item.cost = item.cost * priceMod;
  });

  itemButtonElements.push(button);
  app.append(tooltipContainer);
  button.disabled = true;
});
requestAnimationFrame(animate);
