import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.start();
NProgress.inc();
NProgress.set(0.5);
NProgress.done();

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

<<<<<<< HEAD
itemNames.forEach((itemName) => {
  itemName.addEventListener("click", () => {
    const itemTitle = itemName.textContent;
    const itemDetails = `More information about ${itemTitle}.`;
=======
// Add event listener to item names to show the popup
itemNames.forEach((item) => {
  item.addEventListener("click", (e) => {
    // Prevent the click from propagating to the overlay
    e.stopPropagation();
>>>>>>> main

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

// -------------------------------------------------------------------------------------------
import axios from 'axios';
import * as cheerio from 'cheerio';

// URL of the revision history page using All Origins proxy
const url = 'https://eldenring.fandom.com/wiki/Melee_Armaments?action=history';
const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;

axios.get(proxyUrl).then((response) => {
  // console.log('Data fetched successfully:', response.data);

  const $ = cheerio.load(response.data);
  // console.log('Data loaded into cheerio:', $.html());

  // Extract the edit information
  const edits = $('li.mw-history-histlinks');
  // console.log('Edits extracted:', edits.length);

  const editHistory = document.getElementById('edit-history')

  edits.each((index, element) => {
    const timestamp = $(element).find('a.mw-changeslist-date').text();
    const user = $(element).find('a.mw-userlink').text();
    const summary = $(element).find('span.comment').text() || 'No summary';
    // console.log(`Timestamp: ${timestamp}\nUser: ${user}\nSummary: ${summary}\n`);

    const listItem = document.createElement('li');
    listItem.textContent = `Timestamp: ${timestamp}, User: ${user}, Summary: ${summary}`
    editHistory.appendChild(listItem);
  });
}).catch((error) => {
  console.error(`Error fetching the page: ${error}`);
});
// /------------------------------------------------------------------------------------------

