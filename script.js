let itemsPerPage = 5;
const totalItems = 100;
let currentPage = 1;
let filteredItems = Array.from({length: totalItems}, (_, i) => `Item ${i + 1}`);

function displayItems() {
    const itemList = document.getElementById('itemList');
    itemList.innerHTML = '';
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredItems.length);

    for (let i = startIndex; i < endIndex; i++) {
        const li = document.createElement('li');
        li.textContent = filteredItems[i];
        itemList.appendChild(li);
    }

    updateTotalItems();
}

function setupPagination() {
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const paginationElement = document.getElementById('pagination');
    paginationElement.innerHTML = '';

    // Previous button
    const prevButton = document.createElement('button');
    prevButton.textContent = 'Previous';
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayItems();
            updatePaginationButtons();
        }
    });
    paginationElement.appendChild(prevButton);

    // Page buttons
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.addEventListener('click', () => {
            currentPage = i;
            displayItems();
            updatePaginationButtons();
        });
        paginationElement.appendChild(button);
    }

    // Next button
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayItems();
            updatePaginationButtons();
        }
    });
    paginationElement.appendChild(nextButton);
}

function updatePaginationButtons() {
    const buttons = document.querySelectorAll('#pagination button');
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    buttons.forEach((button, index) => {
        if (index === 0) { // Previous button
            button.disabled = currentPage === 1;
        } else if (index === buttons.length - 1) { // Next button
            button.disabled = currentPage === totalPages;
        } else if (index === currentPage) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

function updateItemsPerPage() {
    const dropdown = document.getElementById('itemsPerPageDropdown');
    itemsPerPage = parseInt(dropdown.value);
    currentPage = 1;
    displayItems();
    setupPagination();
    updatePaginationButtons();
}

function searchItems() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase();

    filteredItems = Array.from({length: totalItems}, (_, i) => `Item ${i + 1}`)
        .filter(item => item.toLowerCase().includes(searchTerm));

    currentPage = 1;
    displayItems();
    setupPagination();
    updatePaginationButtons();
}

function updateTotalItems() {
    const totalItemsElement = document.getElementById('totalItems');
    totalItemsElement.textContent = `Showing ${filteredItems.length} out of ${totalItems} items`;
}

// Event listeners
document.getElementById('itemsPerPageDropdown').addEventListener('change', updateItemsPerPage);
document.getElementById('searchInput').addEventListener('input', searchItems);

// Initial setup
displayItems();
setupPagination();
updatePaginationButtons();