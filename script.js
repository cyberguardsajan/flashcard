let words = [];
let currentIndex = 0;

function fetchWords() {
    fetch('words.json')
        .then(response => response.json())
        .then(data => {
            words = data;
            displayWord(currentIndex);
        })
        .catch(error => console.error('Error fetching the words:', error));
}

function displayWord(index) {
    const wordDisplay = document.getElementById("wordDisplay");
    const meaningDisplay = document.getElementById("meaningDisplay");
    const meaningNepaliDisplay = document.getElementById("meaningNepaliDisplay");
    const sentenceDisplay = document.getElementById("sentenceDisplay");
    const pronunciationDisplay = document.getElementById("pronunciationDisplay");
    const cardInner = document.querySelector('.card-inner');

    wordDisplay.textContent = words[index].word;
    meaningDisplay.textContent = words[index].meaning;
    meaningNepaliDisplay.textContent = words[index].meaningNepali;
    sentenceDisplay.textContent = words[index].sentence;
    pronunciationDisplay.textContent = words[index].pronunciation;

    cardInner.style.transform = 'rotateY(0deg)'; // Reset rotation on new word
}

// Event listeners
document.getElementById("prevButton").addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        displayWord(currentIndex);
    }
});

document.getElementById("nextButton").addEventListener("click", () => {
    if (currentIndex < words.length - 1) {
        currentIndex++;
        displayWord(currentIndex);
    }
});

document.getElementById("wordCard").addEventListener("click", () => {
    const cardInner = document.querySelector('.card-inner');
    cardInner.style.transform = cardInner.style.transform === 'rotateY(180deg)' ? 'rotateY(0deg)' : 'rotateY(180deg)';
});

// Prevent flip on Read More button click
document.getElementById("readMoreButton").addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent the event from bubbling up
    const detailsTable = document.getElementById("detailsTable");
    detailsTable.style.display = detailsTable.style.display === 'table' ? 'none' : 'table';
});

// Fetch words on page load
fetchWords();
