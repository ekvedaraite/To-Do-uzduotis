const form = document.querySelector("form");
const input = document.querySelector("input[type='text']");
const list = document.querySelector("ul");
let listArray = [];

const populate = (item) => {
    const newLi = document.createElement("li");
    newLi.innerHTML = 
         `<span class="task-text">${item}</span>
         <img class="trash-icon" src="svg/garbage.svg" alt="">
           `;

    // Insert newLi at the beginning of the list
    list.insertBefore(newLi, list.firstChild);

    // Remove element
    const trashIcon = newLi.querySelector(".trash-icon");
    trashIcon.addEventListener("click", () => {
        deleteItem(newLi);
    });
};

const deleteItem = (item) => {
    const taskText = item.querySelector(".task-text").textContent;

    // Remove element from DOM
    item.remove();

    // Remove item from localStorage
    listArray = listArray.filter(item => item !== taskText);
    localStorage.setItem("listArray", JSON.stringify(listArray));
};

form.addEventListener("submit", (e) => {
    e.preventDefault();
    // Add to DOM
    populate(input.value);

    // Save to local storage
    listArray.push(input.value);
    localStorage.setItem("listArray", JSON.stringify(listArray));

    // Clear input
    input.value = "";
});

// Check and retrieve from localStorage
let getItem = localStorage.getItem("listArray");
if (getItem) {
    // Parse the JSON string to get the array
    listArray = JSON.parse(getItem);

    // Load to DOM
    listArray.forEach(item => {
        populate(item);
    });
}

// Add event listeners for items added in HTML
const trashIcons = document.querySelectorAll(".trash-icon");
trashIcons.forEach(trashIcon => {
    trashIcon.addEventListener("click", () => {
        const listItem = trashIcon.parentNode;
        deleteItem(listItem);
    });
});
