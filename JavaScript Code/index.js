function openPopup() {
    document.getElementById("athleteForm").style.display = "flex";
}

TL_button.addEventListener("click", function(){
    window.open("/HTMLCode/TrainingLog.html");
})

const VV_button = document.getElementById("VB");

VV_button.addEventListener("click", function(){
    window.open("/HTMLCode/VideoVault.html");
})
function closePopup() {
    document.getElementById("athleteForm").style.display = "none";

}
