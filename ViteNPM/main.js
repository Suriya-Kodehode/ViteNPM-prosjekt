const collapses = document.querySelectorAll(".itemCategoryCollapse");

function toggleCollapse(event) {
  const collapse = event.target;
  const itemContainer = collapse
    .closest(".itemCategory")
    .querySelector(".itemContainer");

  const isHidden = itemContainer.style.display === "none";

  itemContainer.style.display = isHidden ? "flex" : "none";
  collapse.textContent = isHidden ? "[Collapse]" : "[Expand]";
}

// Add event listeners to all collapse elements
collapses.forEach((collapse) => {
  collapse.addEventListener("click", toggleCollapse);
});

const popupOverlay = document.getElementById("popupOverlay");
const closePopupButton = document.getElementById("closePopup");
const popupContent = document.getElementById("popupContent");
const itemNames = document.querySelectorAll(".itemName");

// Add event listener to item names to show the popup
itemNames.forEach((item) => {
  item.addEventListener("click", (e) => {
    // Prevent the click from propagating to the overlay
    e.stopPropagation();

    // Set the popup content dynamically based on the clicked item
    popupContent.textContent = `More information about: ${item.textContent}`;

    // Show the popup
    popupOverlay.style.display = "flex";
  });
});

// Add event listener to the overlay to close the popup
popupOverlay.addEventListener("click", () => {
  popupOverlay.style.display = "none"; // Hide the popup
});

// Prevent clicks inside the popup from closing it
document.querySelector(".popup").addEventListener("click", (e) => {
  e.stopPropagation();
});

// Add event listener to the close button to hide the popup
closePopupButton.addEventListener("click", () => {
  popupOverlay.style.display = "none"; // Hide the popup
});
