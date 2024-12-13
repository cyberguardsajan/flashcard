let words = [];
let currentIndex = 0;

function fetchWords() {
    const setNumber = localStorage.getItem('selectedSet'); // retrieve selected set number from localStorage
    const fileName = `set${setNumber}.json`; // construct the filename dynamically
    
    fetch(fileName)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            words = data; // Set the words array to the data from the selected set
            displayWord(currentIndex); 
        })
        .catch(error => {
            document.getElementById("wordContainer").innerHTML = `<p>Error fetching words: ${error.message}</p>`;
        });
}

function displayWord(index) {
    const wordDisplay = document.getElementById("wordDisplay");
    const wordDisplayBack = document.getElementById("wordDisplayBack"); // Reference for the back display
    const meaningDisplay = document.getElementById("meaningDisplay");
    const meaningNepaliDisplay = document.getElementById("meaningNepaliDisplay");
    const sentenceDisplay = document.getElementById("sentenceDisplay");
    const pronunciationDisplay = document.getElementById("pronunciationDisplay");
    const partOfSpeechDisplay = document.getElementById("partOfSpeechDisplay");
    const detailsTable = document.getElementById("detailsTable");
    const cardInner = document.querySelector('.card-inner');
    const wordCount = document.getElementById("wordCount");

    wordDisplay.textContent = words[index].word;
    wordDisplayBack.textContent = words[index].word; // Set word on the back as well
    meaningDisplay.textContent = words[index].meaning;
    meaningNepaliDisplay.textContent = words[index].meaningNepali;
    sentenceDisplay.textContent = words[index].sentence;
    pronunciationDisplay.textContent = words[index].pronunciation;
    partOfSpeechDisplay.textContent = words[index].partOfSpeech;

    wordCount.textContent = `Word ${index + 1} of ${words.length}`;

    detailsTable.style.display = 'none'; 

    cardInner.style.transform = 'rotateY(0deg)';
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

document.addEventListener('keydown', (event) => {
    if (event.key === "ArrowLeft") {
        if (currentIndex > 0) {
            currentIndex--;
            displayWord(currentIndex);
        }
    } else if (event.key === "ArrowRight") {
        if (currentIndex < words.length - 1) {
            currentIndex++;
            displayWord(currentIndex);
        }
    }
});

document.getElementById("wordCard").addEventListener("click", () => {
    const cardInner = document.querySelector('.card-inner');
    cardInner.style.transform = cardInner.style.transform === 'rotateY(180deg)' ? 'rotateY(0deg)' : 'rotateY(180deg)';
});

document.getElementById("readMoreButton").addEventListener("click", (event) => {
    event.stopPropagation();
    const detailsTable = document.getElementById("detailsTable");
    detailsTable.style.display = detailsTable.style.display === 'table' ? 'none' : 'table';
});

document.getElementById("Pronounce").addEventListener("click", () => {
    const currentWord = words[currentIndex].word;
    const utterance = new SpeechSynthesisUtterance(currentWord);
    utterance.lang = 'en-US'; 
    utterance.rate = 0.9; 
    utterance.pitch = 1;
    utterance.volume = 1;

    speechSynthesis.speak(utterance);
});


fetchWords();
