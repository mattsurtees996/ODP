let totalClicks = 0;
let maxClicks = 5;

function Product(name, src) {
  this.name = name;
  this.src = src;
  this.clicks = 0;
  this.views = 0;
  Product.allProducts.push(this);
}

Product.allProducts = [];

const productNames = [
  "bag",
  "banana",
  "bathroom",
  "boots",
  "breakfast",
  "bubblegum",
  "chair",
  "cthulhu",
  "dog-duck",
  "dragon",
  "pen",
  "pet-sweep",
  "scissors",
  "shark",
  "tauntaun",
  "unicorn",
  "water-can",
  "wine-glass",
];

for (let i = 0; i < productNames.length; i++) {
  new Product(productNames[i], `images/${productNames[i]}.jpeg`);
}

function randomProductIndex() {
  return Math.floor(Math.random() * Product.allProducts.length);
}

function renderImages() {
  let index1 = randomProductIndex();
  let index2 = randomProductIndex();
  let index3 = randomProductIndex();

  while (index1 === index2 || index1 === index3 || index2 === index3) {
    index2 = randomProductIndex();
    index3 = randomProductIndex();
  }
  let img1 = document.getElementById("img1");
  let img2 = document.getElementById("img2");
  let img3 = document.getElementById("img3");

  img1.src = Product.allProducts[index1].src;
  img2.src = Product.allProducts[index2].src;
  img3.src = Product.allProducts[index3].src;

  img1.alt = Product.allProducts[index1].name;
  img2.alt = Product.allProducts[index2].name;
  img3.alt = Product.allProducts[index3].name;

  Product.allProducts[index1].views++;
  Product.allProducts[index2].views++;
  Product.allProducts[index3].views++;
}

function handleClick(event) {
  if (event.target === imgContainer) {
    alert("Please click one of the images, not inbetween the images");
    return;
  }
  for (let i = 0; i < Product.allProducts.length; i++) {
    if (event.target.alt === Product.allProducts[i].name) {
      Product.allProducts[i].clicks++;
      break;
    }
  }

  totalClicks++;
  if (totalClicks === maxClicks) {
    alert("Thank you for playing, lets see what the votes say!");
    imgContainer.removeEventListener("click", handleClick);
    renderChart();
    return; // end the function
  }

  renderImages();
}

const imgContainer = document.getElementById("img-container");
imgContainer.addEventListener("click", handleClick);

function renderChart() {
  const theChart = document.getElementById("chart");
  let labels = [];
  let viewsData = [];
  let clicksData = [];

  for (let i = 0; i < Product.allProducts.length; i++) {
    labels.push(Product.allProducts[i].name);
    viewsData.push(Product.allProducts[i].views);
    clicksData.push(Product.allProducts[i].clicks);
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: "# of Views",
        data: viewsData,
        borderWidth: 1,
      },
      {
        label: "# of Votes",
        data: clicksData,
        borderWidth: 1,
      },
    ],
  };
  const config = {
    type: "pie",
    data: data,
  };
  new Chart(theChart, config);
}

renderImages();
