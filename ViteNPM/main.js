

const collapse = document.querySelector('.itemCategoryCollapse');
function toggleCollapse() {
    const itemContainer = document.querySelector('.itemContainer')
    itemContainer.style.display = itemContainer.style.display === 'none' ? 'flex' : 'none';
    collapse.textContent = itemContainer.style.display === 'none' ? '[Expand]' : '[Collapse]';
}

collapse.addEventListener('click', toggleCollapse);