'use strict';

let originalText = "";
let interval;

const speeds = {
    true: 50,
    false: 250
};

const fonts = {
    Tiny: '7pt',
    Small: '10pt',
    Medium: '12pt',
    Large: '16pt',
    'Extra Large': '24pt',
    XXL: '32pt'
};

const separator = "=====\n";

function start () {
    const speed = getSpeed();
    const frames = document.getElementById("text-area").value.split(separator);
    let index = 0;
    interval = setInterval(function() {
        if(index > (frames.length - 1)) index = 0;
        document.getElementById("text-area").value = frames[index];
        index ++;
    }, speed);

    afterStart();
}

function resetInterval() {
    if(isAnimationWorking()) {
        clearInterval(interval);
        interval = undefined;
    }
}

function stop () {
    resetInterval();
    document.getElementById("text-area").value = originalText;
    afterStop();
}

function animationChanged() {
    document.getElementById("text-area").value = getAnimation();
    originalText = getAnimation();
}

function getAnimation() {
    const elt = document.getElementById('animation');
    const animation = elt.options[elt.selectedIndex].text;
    return ANIMATIONS[animation.toUpperCase()];
}

function getSize() {
    const elt = document.getElementById('fontsize');
    const value = elt.options[elt.selectedIndex].text
    return fonts[value];
}

function getSpeed() {
    const isChecked = document.getElementById("turbo").checked;
    return speeds[isChecked];
}

function isAnimationWorking() {
    return interval;
}

function textChanged() {
    if(!isAnimationWorking()) {
        originalText = document.getElementById("text-area").value;
    }
}

function afterStart() {
    document.getElementById("stop").disabled = false;
    document.getElementById("start").disabled = true;
    document.getElementById("animation").disabled = true;
    document.getElementById("text-area").style.fontSize = getSize();
}

function afterStop() {
    document.getElementById("stop").disabled = true;
    document.getElementById("start").disabled = false;
    document.getElementById("animation").disabled = false;
    document.getElementById("text-area").style.fontSize = '12pt';
}

function animationPropertyChanged() {
    if(isAnimationWorking()) {
        resetInterval();
        document.getElementById("text-area").value = originalText;
        start();
    }
}


window.onload=()=>{
    document.getElementById("text-area").onchange=textChanged;
    document.getElementById("start").onclick=start;
    document.getElementById("stop").onclick=stop;
    document.getElementById("animation").onchange=animationChanged;
    document.getElementById("fontsize").onchange=animationPropertyChanged;
    document.getElementById("turbo").onchange=animationPropertyChanged;

};