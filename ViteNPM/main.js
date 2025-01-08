const collapse = document.querySelector(".itemCategoryCollapse");
function toggleCollapse() {
  const itemContainer = document.querySelector(".itemContainer");
  itemContainer.style.display =
    itemContainer.style.display === "none" ? "flex" : "none";
  collapse.textContent =
    itemContainer.style.display === "none" ? "[Expand]" : "[Collapse]";
}

collapse.addEventListener("click", toggleCollapse);

const itemNames = document.querySelectorAll(".itemName");
const infoPopup = document.getElementById("infoPopup");
const closePopup = document.getElementById("closePopup");

itemNames.forEach((itemName) => {
  itemName.addEventListener("click", () => {
    const itemTitle = itemName.textContent;
    const itemDetails = `This is more information about ${itemTitle}.`;

    const popupContent = document.querySelector(".popup-content p");
    popupContent.textContent = itemDetails;

    infoPopup.style.display = "flex";
  });
});

closePopup.addEventListener("click", () => {
  infoPopup.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === infoPopup) {
    infoPopup.style.display = "none";
  }
});
