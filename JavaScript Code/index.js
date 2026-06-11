function openPopup() {
    document.getElementById("athleteForm").style.display = "flex";
}

function closePopup() {
    document.getElementById("athleteForm").style.display = "none";

}
const entries = JSON.parse(localStorage.getItem('trainingLog')) || [];
entries.forEach(entry => {
    console.log(entry);
});

let allEntries = [];
let newestFirst = true;

function openHistory() {
    const popup = document.getElementById('trainingHistory');
    allEntries = JSON.parse(localStorage.getItem('trainingLog'))||[];
    allEntries.reverse();
    document.getElementById('entryCount').textContent = allEntries.length + ' Entries';
    updateFlameColor(allEntries.length);
    renderEntries(allEntries);
    popup.style.display = 'flex'
}

function toggleSort(){
    newestFirst = !newestFirst
    document.getElementById('sortToggle').textContent = newestFirst ? 'Newest First' : 'Oldest First';
    filterHistory();
}
function filterHistory(){
    const search = document.getElementById('historyFilter').value.toLowerCase();
    const feelFilter = document.getElementById('sortByFeel').value;

    let filtered = allEntries.filter(entry => {
        const matchesEvent = (entry.event || '').toLowerCase().includes(search);
        const matchesFeel = feelFilter === '' || entry.feel === feelFilter;
        return matchesEvent && matchesFeel;
    });

    if(!newestFirst) filtered.reverse();
    renderEntries(filtered);
}

function deleteEntry(index){
    const stored = JSON.parse(localStorage.getItem('trainingLog')) || [];
    const entryToDelete = allEntries[index];

    const storedIndex = stored.findIndex(entry =>
        entry.date === entryToDelete.date &&
        entry.event === entryToDelete.event &&
        entry.description === entryToDelete.description 
    );

    if (storedIndex !== -1){
       stored.splice(storedIndex,1); 
       localStorage.setItem('trainingLog', JSON.stringify(stored));
        openHistory();
    }   
}
function renderEntries(entries) {
    const content = document.getElementById('historyContent');
    if (entries.length === 0) {
        content.innerHTML = '<p style="color:#999; text-align:center;">No entries found.</p>';
    } else {
        content.innerHTML = entries.map((entry, index) => `
            <div class="historyEntry">
                <h3>${entry.date} — ${entry.event}</h3>
                <p><strong>Description:</strong> ${entry.description}</p>
                <p><strong>Key Takeaways:</strong> ${entry.keyTakeaways}</p>
                <p><strong>Feel:</strong> ${entry.feel}</p>
                <p><strong>Sleep:</strong> ${entry.sleep} hrs</p>
                <p><strong>Ate:</strong> ${entry.food}</p>
                <p><strong>Injuries:</strong> ${entry.injuries || 'None'} </p>
                <button class="deleteBtn" onclick="deleteEntry(${index})">Delete</button>    
            </div>
        `).join('');
    }
}



function closeHistory() {
    document.getElementById('trainingHistory').style.display = 'none';
}



function getFlameColor(count) {
    if (count <= 5)  return '#8B0000';   // dark red
    if (count <= 10) return '#cc2200';   // deep red
    if (count <= 20) return '#ff4500';   // orange red
    if (count <= 30) return '#ff8c00';   // orange
    if (count <= 40) return '#ffd700';   // yellow
    if (count <= 60) return '#ffffff';   // white hot
    if (count <= 80) return '#00aaff';   // blue
    return '#8a2be2';                    // violet
}

function updateFlameColor(count) {
    const flames = document.querySelectorAll('.flame, .flame-main');
    const color = getFlameColor(count);
    flames.forEach(flame => {
        flame.style.fill = color;
    });
}