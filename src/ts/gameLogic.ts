import { State, Images, resetGameState } from './state';
import { updateScoreUI, updateCardUI, endGame } from './ui';

export function generateCards() {
    resetGameState();
    let pool: string[] = getCardPool();
    shuffleArray(pool);
    let selectedImages: string[] = selectImages(pool);
    shuffleArray(selectedImages);
    createCardObjects(selectedImages);
}

export function getCardPool() {
    if (State.theme === "coding") {
        return [...Images.turquoise];
    }
    return [...Images.pink];
}

export function selectImages(pool: string[]) {
    let images: string[] = [];
    let pairsCount = State.gridSize / 2;
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
        State.cards.push({
            id: i,
            image: `/public/assets/${State.theme === 'coding' ? 'memory_turquoise' : 'memory_pink'}/${images[i]}`,
            isFlipped: false,
            isMatched: false
        });
    }
}

export function handleCardClick(cardIndex: number) {
    if (State.isBoardLocked) return;
    let clickedCard = State.cards[cardIndex];
    if (clickedCard.isFlipped || clickedCard.isMatched) return;
    
    clickedCard.isFlipped = true;
    
    if (State.firstFlippedCard === null) {
        State.firstFlippedCard = clickedCard;
    } else {
        State.secondFlippedCard = clickedCard;
        checkMatch();
    }
}

export function checkMatch() {
    State.isBoardLocked = true;
    if (State.firstFlippedCard.image === State.secondFlippedCard.image) {
        handleMatch();
    } else {
        setTimeout(handleMismatch, 1000);
    }
}

export function handleMatch() {
    State.firstFlippedCard.isMatched = true;
    State.secondFlippedCard.isMatched = true;
    State.matchedPairs = State.matchedPairs + 1;
    addScore();
    updateScoreUI();
    resetFlippedCards();
    if (State.matchedPairs === State.gridSize / 2) {
        endGame();
    }
}

export function handleMismatch() {
    State.firstFlippedCard.isFlipped = false;
    State.secondFlippedCard.isFlipped = false;
    updateCardUI(State.firstFlippedCard.id);
    updateCardUI(State.secondFlippedCard.id);
    swapPlayer();
    updateScoreUI();
    resetFlippedCards();
}

export function addScore() {
    if (State.currentPlayer === 1) {
        State.score1 = State.score1 + 1;
    } else {
        State.score2 = State.score2 + 1;
    }
}

export function swapPlayer() {
    if (State.currentPlayer === 1) {
        State.currentPlayer = 2;
    } else {
        State.currentPlayer = 1;
    }
}

export function resetFlippedCards() {
    State.firstFlippedCard = null;
    State.secondFlippedCard = null;
    State.isBoardLocked = false;
}
