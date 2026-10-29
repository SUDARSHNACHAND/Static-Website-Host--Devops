
const milestones = document.querySelectorAll(".milestone");
const progressText = document.getElementById("progress-text");
const progressBar = document.getElementById("progress-bar");

const STORAGE_KEY = "devops-roadmap-2027";

function updateProgress() {
    const completed = [...milestones].filter(item => item.checked).length;
    const total = milestones.length;
    const percentage = total ? Math.round((completed / total) * 100) : 0;

    progressText.textContent = `${percentage}% completed`;
    progressBar.style.width = `${percentage}%`;

    const saved = [...milestones].map(item => item.checked);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
}

try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");

    if (Array.isArray(saved)) {
        milestones.forEach((item, index) => {
            item.checked = saved[index] === true;
        });
    }
} catch {
    localStorage.removeItem(STORAGE_KEY);
}

milestones.forEach(item => {
    item.addEventListener("change", updateProgress);
});

updateProgress();
