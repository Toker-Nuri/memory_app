import { State } from './state';
import { generateCards, handleCardClick } from './gameLogic';

export function setupEvents() {
    document.getElementById("btn-play")!.onclick = () => showView("settings");
    document.getElementById("btn-start")!.onclick = onStartGame;
    document.getElementById("btn-exit")!.onclick = showModal;
    document.getElementById("btn-resume")!.onclick = hideModal;
    document.getElementById("btn-quit")!.onclick = onQuitGame;
    document.getElementById("btn-result-home")!.onclick = () => showView("home");
    setupBreadcrumbListeners();
}

export function setupBreadcrumbListeners() {
    let themeRadios = document.querySelectorAll('input[name="theme"]');
    let playerRadios = document.querySelectorAll('input[name="player"]');
    let gridRadios = document.querySelectorAll('input[name="grid"]');
    themeRadios.forEach(r => r.addEventListener("change", updateBreadcrumbs));
    playerRadios.forEach(r => r.addEventListener("change", updateBreadcrumbs));
    gridRadios.forEach(r => r.addEventListener("change", updateBreadcrumbs));
    updateBreadcrumbs();
}

export function updateBreadcrumbs() {
    let themeEl = document.querySelector('input[name="theme"]:checked') as HTMLInputElement;
    let playerEl = document.querySelector('input[name="player"]:checked') as HTMLInputElement;
    let gridEl = document.querySelector('input[name="grid"]:checked') as HTMLInputElement;
    let themeName = themeEl ? getThemeLabel(themeEl.value) : "Theme";
    let playerName = playerEl ? getPlayerLabel(playerEl.value) : "Player";
    let gridName = gridEl ? "Board-" + gridEl.value + " Cards" : "Board size";
    document.getElementById("bc-theme")!.innerText = themeName;
    document.getElementById("bc-player")!.innerText = playerName;
    document.getElementById("bc-grid")!.innerText = gridName;
}

export function getThemeLabel(value: string) {
    if (value === "coding") return "Code vibes theme";
    if (value === "gaming") return "Gaming theme";
    return "Theme";
}

export function getPlayerLabel(value: string) {
    if (value === "blue") return "Blue Player";
    if (value === "orange") return "Orange Player";
    return "Player";
}

export function showView(viewId: string) {
    let allViews = ["home", "settings", "game", "gameover", "winner"];
    for (let v of allViews) {
        document.getElementById("view-" + v)!.classList.add("d-none");
    }
    document.getElementById("view-" + viewId)!.classList.remove("d-none");
    State.currentView = viewId;
}

export function showModal() {
    document.getElementById("modal-container")!.classList.remove("d-none");
}

export function hideModal() {
    document.getElementById("modal-container")!.classList.add("d-none");
}

export function onQuitGame() {
    hideModal();
    showView("home");
}

export function onStartGame() {
    readSettings();
    applyTheme();
    generateCards();
    renderCards();
    updateScoreUI();
    showView("game");
}

export function readSettings() {
    let t = document.querySelector('input[name="theme"]:checked') as HTMLInputElement;
    if (t) State.theme = t.value;
    let p = document.querySelector('input[name="player"]:checked') as HTMLInputElement;
    if (p) State.player1Color = p.value;
    let g = document.querySelector('input[name="grid"]:checked') as HTMLInputElement;
    if (g) State.gridSize = parseInt(g.value);
}

export function applyTheme() {
    let themeViews = ["view-game", "view-gameover", "view-winner"];
    for (let viewId of themeViews) {
        let el = document.getElementById(viewId)!;
        el.classList.remove("theme-pink", "theme-coding");
        if (State.theme === "coding") {
            el.classList.add("theme-coding");
        } else {
            el.classList.add("theme-pink");
        }
    }
}

export function renderCards() {
    let board = document.getElementById("game-board")!;
    board.innerHTML = "";
    setupGridStyle(board);
    for (let i = 0; i < State.cards.length; i++) {
        board.appendChild(createCardElement(i));
    }
}

export function setupGridStyle(board: HTMLElement) {
    if (State.gridSize === 16) {
        board.style.gridTemplateColumns = "repeat(4, 1fr)";
    } else if (State.gridSize === 24) {
        board.style.gridTemplateColumns = "repeat(6, 1fr)";
    } else {
        board.style.gridTemplateColumns = "repeat(6, 1fr)";
    }
}

export function createCardElement(index: number) {
    let card = document.createElement("button");
    card.className = "card";
    card.id = "card-" + index;
    card.onclick = () => onCardClickUI(index);
    let inner = document.createElement("div");
    inner.className = "card-inner";
    let front = document.createElement("div");
    front.className = "card-front";
    let back = document.createElement("div");
    back.className = "card-back";
    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(inner);
    return card;
}

export function onCardClickUI(index: number) {
    if (State.isBoardLocked) return;
    let clickedCard = State.cards[index];
    if (clickedCard.isFlipped || clickedCard.isMatched) return;
    handleCardClick(index);
    updateCardUI(index);
}

export function updateCardUI(index: number) {
    let cardData = State.cards[index];
    let cardEl = document.getElementById("card-" + index)!;
    if (cardData.isFlipped) {
        cardEl.classList.add("flipped");
        let backEl = cardEl.querySelector(".card-back") as HTMLElement;
        backEl.style.backgroundImage = `url('${cardData.image}')`;
    } else {
        cardEl.classList.remove("flipped");
    }
    if (cardData.isMatched) {
        cardEl.classList.add("matched");
    }
}

export function updateScoreUI() {
    let p1Icon = State.theme === "coding" ? "/public/assets/system-img/label (1).png" : "/public/assets/system-img/Player (1).png";
    let p2Icon = State.theme === "coding" ? "/public/assets/system-img/label.png" : "/public/assets/system-img/Player.png";

    let icon1 = document.getElementById("score-icon-blue") as HTMLImageElement;
    if (icon1) icon1.src = p1Icon;
    let icon2 = document.getElementById("score-icon-orange") as HTMLImageElement;
    if (icon2) icon2.src = p2Icon;

    document.getElementById("score-p1")!.innerText = State.score1.toString();
    document.getElementById("score-p2")!.innerText = State.score2.toString();

    let turnIcon = document.getElementById("turn-icon") as HTMLImageElement;
    if (turnIcon) {
        if (State.currentPlayer === 1) {
            turnIcon.src = p1Icon;
        } else {
            turnIcon.src = p2Icon;
        }
    }
}

export function endGame() {
    showGameOverScreen();
    setTimeout(showWinnerScreen, 3000);
}

export function showGameOverScreen() {
    let p1Icon = State.theme === "coding" ? "/public/assets/system-img/label (1).png" : "/public/assets/system-img/Player (1).png";
    let p2Icon = State.theme === "coding" ? "/public/assets/system-img/label.png" : "/public/assets/system-img/Player.png";

    let icon1 = document.getElementById("gameover-icon-blue") as HTMLImageElement;
    if (icon1) icon1.src = p1Icon;
    let icon2 = document.getElementById("gameover-icon-orange") as HTMLImageElement;
    if (icon2) icon2.src = p2Icon;

    document.getElementById("gameover-score-p1")!.innerText = State.score1.toString();
    document.getElementById("gameover-score-p2")!.innerText = State.score2.toString();

    let title = document.getElementById("gameover-title")!;
    if (State.theme === "gaming") {
        title.innerText = "GAME OVER";
        title.className = "gameover-title gameover-title-pink";
    } else {
        title.innerText = "Game over";
        title.className = "gameover-title gameover-title-coding";
    }
    showView("gameover");
}

export function showWinnerScreen() {
    let title = document.getElementById("winner-title")!;
    let icon = document.getElementById("winner-icon") as HTMLImageElement;
    let trophy = document.getElementById("winner-trophy")!;
    let confetti = document.getElementById("winner-confetti")!;
    let homeBtn = document.getElementById("btn-result-home")!;
    let blueWins = State.score1 > State.score2;

    if (State.score1 === State.score2) {
        showView("home");
        return;
    }

    setupWinnerTitle(title, blueWins);
    setupWinnerAssets(icon, trophy, confetti, homeBtn, blueWins);
    showView("winner");
}

export function setupWinnerTitle(title: HTMLElement, blueWins: boolean) {
    if (State.theme === "coding") {
        title.innerText = blueWins ? "BLUE PLAYER" : "ORANGE PLAYER";
        title.className = "winner-title winner-title-coding";
        title.style.color = blueWins ? "#1dafed" : "#ff7100";
    } else {
        title.innerText = blueWins ? "Blue Player" : "Orange Player";
        title.className = "winner-title winner-title-pink";
        title.style.color = blueWins ? "#1dafed" : "#ff7100";
    }
}

export function setupWinnerAssets(
    icon: HTMLImageElement, trophy: HTMLElement,
    confetti: HTMLElement, homeBtn: HTMLElement, blueWins: boolean
) {
    if (State.theme === "coding") {
        icon.src = blueWins
            ? "/public/assets/system-img/label (1).png"
            : "/public/assets/system-img/label.png";
        icon.classList.remove("d-none");
        icon.className = "winner-player-icon " + (blueWins ? "icon-blue-big" : "icon-orange-big");
        trophy.classList.add("d-none");
        confetti.classList.remove("d-none");
        homeBtn.innerText = "Back to start";
        homeBtn.className = "btn-result-home btn-result-coding";
    } else {
        icon.classList.add("d-none");
        trophy.classList.remove("d-none");
        confetti.classList.add("d-none");
        homeBtn.innerText = "Home";
        homeBtn.className = "btn-result-home btn-result-pink";
    }
}
