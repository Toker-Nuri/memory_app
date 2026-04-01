import './styles/style.scss';

function init() {
    console.log("Memory App Initialized");
    // Show home view for now
    const homeView = document.getElementById("view-home");
    if (homeView) homeView.classList.remove("d-none");
}

init();
