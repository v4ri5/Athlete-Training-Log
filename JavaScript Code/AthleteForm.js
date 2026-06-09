document.getElementById('AthleteForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const entry = {
        date: new Date().toLocaleDateString(),
        event: document.getElementById('athleteEvent').value,
        description: document.getElementById('Description').value,
        keyTakeaways: document.getElementById('keyTakeaways').value,
        feel: document.getElementById('feel').value,
        sleep: document.getElementById('sleep').value,
        food: document.getElementById('food').value,
        injuries: document.getElementById('injuries').value
    };

    const existing = JSON.parse(localStorage.getItem('trainingLog')) || [];
    existing.push(entry);
    localStorage.setItem('trainingLog', JSON.stringify(existing));

    alert('Entry Saved');
    this.reset();

    // calls closePopup() from the parent (main) page
    window.parent.closePopup();
});