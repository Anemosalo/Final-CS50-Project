console.log("Loaded Content Side");
const slider = document.getElementById("slider");
slider.addEventListener('input', ()=> {
    const value= slider.value;
    slider.Value.textContent = value;
    sliderContainer.style.setProperty('--progress',`$(value)$`);
    sliderValue.style.left= `$(value)$`
})


