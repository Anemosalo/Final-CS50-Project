console.log("Loaded Content Side");

slider.addEventListener('input', ()=> {
    const value= slider.value;
    slider.Value.textContent = value;
    sliderContainer.style.setProperty('--progress',`$(value)$`);
    sliderValue.style.left= `$(value)$`
})


