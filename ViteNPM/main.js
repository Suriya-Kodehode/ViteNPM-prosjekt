const collapse = document.querySelector(".itemCategoryCollapse");
function toggleCollapse() {
  const itemContainer = document.querySelector(".itemContainer");
  itemContainer.style.display =
    itemContainer.style.display === "none" ? "flex" : "none";
  collapse.textContent =
    itemContainer.style.display === "none" ? "[Expand]" : "[Collapse]";
}

collapse.addEventListener("click", toggleCollapse);

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
