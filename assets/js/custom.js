// Total calculator
function pprice(price) {
  return `+ $${price}`;
}

function showPricesInDom() {
  document.querySelectorAll(".modal input[type=radio]").forEach((input) => {
    input.parentElement.lastElementChild.innerText = pprice(input.value);
  })
}

// Recalculate total to show at bottom
function computeTotal() {
  let basePrice = Number(
    document.querySelector("#totalPrice").dataset.baseprice
  );

  // Sum all selected input's values
  let total = basePrice;
  document.querySelectorAll("input[type=radio]:checked").forEach((input) => {
    total += Number(input.value);
  });

  // Set total price
  document.querySelector("#totalPrice").innerText = total;
}


function changeTileImage(input) {
  const newSrc = `images/${input.id}.jpg`
  console.log(newSrc)
  input.closest('article').querySelector(".image>img").src = newSrc;
}

function updatePriceInTileContent(input) {
  input.closest('article').querySelector(".content>p").innerText = pprice(input.value)
}


// Events
document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", handleModalOption);
});

function handleModalOption(event) {
  if (event.target.classList.contains("modal")) {
    event.target.classList.remove("open");
  }

  if (event.target.tagName == "INPUT") {
    let input = event.target;
    let label = input.nextElementSibling;
    let labelText = label.innerText;
    let title = input.closest("article").querySelector(".js-chosen-option");
    title.innerText = labelText;
    input.closest(".modal").classList.remove("open");
    changeTileImage(input);
    updatePriceInTileContent(input);
    computeTotal();
  }
}

computeTotal();
showPricesInDom();

