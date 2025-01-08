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
    const itemDetails = `More information about ${itemTitle}.`;

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

