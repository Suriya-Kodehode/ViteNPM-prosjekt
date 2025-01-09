import NProgress from "nprogress";
import "nprogress/nprogress.css";
import axios from 'axios';
import * as cheerio from 'cheerio';

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

const exceptions = {
  "Beast Claw": "https://eldenring.fandom.com/wiki/Beast_Claw_(weapon)"
};

// Add event listener to item names to show the popup
itemNames.forEach((item) => {
  item.addEventListener("click", (e) => {
    // Prevent the click from propagating to the overlay
    e.stopPropagation();

    const itemName = item.textContent.trim();
    let url;
    if (exceptions[itemName]) {
      url = exceptions[itemName];
    } else {
      url = `https://eldenring.fandom.com/wiki/${itemName.replace(/\s+/g, '_')}`
    }
    window.open(url, '_blank');

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

window.addEventListener("click", (event) => {
  if (event.target === infoPopup) {
    infoPopup.style.display = "none";
  }
});

// -------------------------------------------------------------------------------------------

// URL of the revision history page using All Origins proxy
const url = 'https://eldenring.fandom.com/wiki/Melee_Armaments?action=history';
const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;

axios.get(proxyUrl).then((response) => {
  // console.log('Data fetched successfully:', response.data);

  const $ = cheerio.load(response.data);
  // console.log('Data loaded into cheerio:', $.html());

  // Extract the edit information
  const edits = $('form#mw-history-compare');
  // console.log('Edits extracted:', edits.length);

  const editHistory = document.getElementById('edit-history');

  if (!editHistory) {
    console.error('Edit history not found');
    return;
  }

edits.find('.mw-history-compareselectedversions').remove();
edits.find('span:contains("cur"):contains("prev") a').remove();
edits.find('span:contains("prev")').remove();
edits.find('span:contains("cur")').remove();
edits.find('span:has(a:contains("→‎top"))').remove();
const filteredContent = edits.html();

  const listItem = document.createElement('li');
  listItem.innerHTML = filteredContent;
  editHistory.appendChild(listItem);
}).catch((error) => {
  console.error(`Error fetching the page: ${error}`);
});
// /------------------------------------------------------------------------------------------

