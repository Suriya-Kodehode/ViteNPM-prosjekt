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

