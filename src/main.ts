import './styles/style.scss';

let currentView: string = "home";
let theme: string = "coding";
let gridSize: number = 16;
let player1Color: string = "blue";
let player2Color: string = "orange";

let currentPlayer: number = 1;
let score1: number = 0;
let score2: number = 0;

let cards: any[] = [];
let firstFlippedCard: any = null;
let secondFlippedCard: any = null;
let isBoardLocked: boolean = false;
let matchedPairs: number = 0;

let pinkImages: string[] = [
    "Property 1=Component 2.png",
    "Property 1=Component 2 (1).png",
    "Property 1=Component 2 (2).png",
    "Property 1=Component 2 (3).png",
    "Property 1=Component 2 (4).png",
    "Property 1=Component 2 (5).png",
    "Property 1=Component 2 (6).png",
    "Property 1=Component 2 (7).png",
    "Property 1=Component 2 (8).png",
    "Property 1=Component 2 (9).png",
    "Property 1=Component 2 (10).png",
    "Property 1=Component 2 (11).png",
    "Property 1=Component 2 (12).png",
    "Property 1=Component 2 (13).png",
    "Property 1=Component 2 (14).png",
    "Property 1=Component 2 (15).png",
    "Property 1=Component 2 (16).png",
    "Property 1=Component 2 (17).png"
];

let turquoiseImages: string[] = [
    "Property 1=Component 22.png",
    "Property 1=Component 22 (1).png",
    "Property 1=Component 22 (2).png",
    "Property 1=Component 22 (3).png",
    "Property 1=Component 22 (4).png",
    "Property 1=Component 22 (5).png",
    "Property 1=Component 22 (6).png",
    "Property 1=Component 22 (7).png",
    "Property 1=Component 22 (8).png",
    "Property 1=Component 22 (9).png",
    "Property 1=Component 22 (10).png",
    "Property 1=Component 22 (11).png",
    "Property 1=Component 22 (12).png",
    "Property 1=Component 22 (13).png",
    "Property 1=Component 22 (14).png",
    "Property 1=Component 22 (15).png",
    "Property 1=Component 22 (16).png",
    "Property 1=Component 22 (18).png"
];

export function resetGameState() {
    currentPlayer = 1;
    score1 = 0;
    score2 = 0;
    cards = [];
    firstFlippedCard = null;
    secondFlippedCard = null;
    isBoardLocked = false;
    matchedPairs = 0;
}

export function generateCards() {
    resetGameState();
    let pool: string[] = getCardPool();
    shuffleArray(pool);
    let selectedImages: string[] = selectImages(pool);
    shuffleArray(selectedImages);
    createCardObjects(selectedImages);
}

export function getCardPool() {
    if (theme === "coding") {
        return [...turquoiseImages];
    }
    return [...pinkImages];
}

export function selectImages(pool: string[]) {
    let images: string[] = [];
    let pairsCount = gridSize / 2;
    for (let i = 0; i < pairsCount; i++) {
        images.push(pool[i]);
        images.push(pool[i]);
    }
    return images;
}

export function shuffleArray(array: any[]) {
    array.sort(() => Math.random() - 0.5);
}

export function createCardObjects(images: string[]) {
    for (let i = 0; i < images.length; i++) {
        cards.push({
            id: i,
            image: images[i],
            isFlipped: false,
            isMatched: false
        });
    }
}

export function handleCardClick(cardIndex: number) {
    if (isBoardLocked) return;
    let clickedCard = cards[cardIndex];
    if (clickedCard.isFlipped || clickedCard.isMatched) return;
    
    clickedCard.isFlipped = true;
    
    if (firstFlippedCard === null) {
        firstFlippedCard = clickedCard;
    } else {
        secondFlippedCard = clickedCard;
        checkMatch();
    }
}

export function checkMatch() {
    isBoardLocked = true;
    if (firstFlippedCard.image === secondFlippedCard.image) {
        handleMatch();
    } else {
        setTimeout(handleMismatch, 1000);
    }
}

export function handleMatch() {
    firstFlippedCard.isMatched = true;
    secondFlippedCard.isMatched = true;
    matchedPairs = matchedPairs + 1;
    addScore();
    resetFlippedCards();
    if (matchedPairs === gridSize / 2) {
        endGame();
    }
}

export function handleMismatch() {
    firstFlippedCard.isFlipped = false;
    secondFlippedCard.isFlipped = false;
    swapPlayer();
    resetFlippedCards();
}

export function addScore() {
    if (currentPlayer === 1) {
        score1 = score1 + 1;
    } else {
        score2 = score2 + 1;
    }
}

export function swapPlayer() {
    if (currentPlayer === 1) {
        currentPlayer = 2;
    } else {
        currentPlayer = 1;
    }
}

export function resetFlippedCards() {
    firstFlippedCard = null;
    secondFlippedCard = null;
    isBoardLocked = false;
}

export function endGame() {
    currentView = "result";
}
