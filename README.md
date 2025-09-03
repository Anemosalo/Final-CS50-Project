# Probability Extesion!

### Video Demo: <https://youtu.be/MsR7dD2XExg>

### Description:

This project was heavily inspired by my favorite youtube chanell 3Blue1Brown on Yt which explores a variaty of intersting and complex math fenomenons.
I was lost on what project to create and after watching a few of his videos on probability distributions and convolution i was inspired to make my project have that theme.
What the project basically does is let you create your own normal distribution and generate number samples from it.
It contains two sliders that let you adjust the Mean and Standard Deviation of the Distrubition that update their values dynamicly.
Three buttons one for a simple 1 sample generation a button for an automatic generation making hundreds of samples per second and a reset button reseting the samples collected to 0.
There is also a chart built in that shows 3 things. 1. The actual PDF(probability density function) in a line form. 2. A histogram chart that corisponds to the samples collected 3. A forming PDF that depends on the samples collected.
All of those three are dynamicly updated in real time with the samples being collected and the slider values changing.

Popup.html: Contains all the popup page text/boxes/sliders/containers etc.
Style.css: All the styling that was done for popup.html.
contents.js: It is where all the dynamic part of the extension is handled. From the dynamic sliders that show their values chaning in real time to the PDF being displayed in real time.
manifest.json: Neccesary file for google extesions that lets it get handled correctly.

# Citing:

    Google-Extensions:
        Yt Name: The Coding Train
        Video Series: "Proggraming with text" 11. series
    Sliders:
        Yt Name: GreatStack
        Video: "How To Make Range Slider Using HTML and CSS | Create Slider Selector For HTML CSS Website"
    Charts:
        Read documentation online
        The coding train: 1.3: Graphing with Chart.js - Working With Data & APIs in JavaScript
    Math:
        The entier idea was heavily inspired from 3blue1brown videos about convolutions and probability.
        Had get some help for the box-muller formula from Google/ChatGPT and how it works exactly cause i couldnt find nice videos that explain it.
        Mapping logic: JavaScript map() method in 7 minutes!
        Rest was pretty basic
    Auto Generate button:
        YT: JavaScript setTimeout & setInterval In 90 Seconds
    Styling:
        Yt: Learn CSS Flexbox in 20 Minutes (Course)
        Yt: HTML CSS TUTORIAL FOR BEGINNERS - multiple pages
        Yt: CSS SELECTORS MADE EASY - HTML CSS Tutorial for Beginners
    AI:
        - help me to seperate y axis on the actual PDF line cause i could not find an anwser online nor documantation
        - Guided me to understand the logic behind return Factor * Math.exp(exp)*totalSamples;
