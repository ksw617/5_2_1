// Initial States and Constants
let stateInfo = {
    intro: { value: 0, animationInfo: [0, 1] },
    step1: { value: 1, animationInfo: [1, 133] },
    step2: { value: 2, animationInfo: [132, 133] },
    step3: { value: 3, animationInfo: [134, 220] }
};

// Initial states
let sideState = false;
let state = {
    stateStep: stateInfo.intro.value,
    ver: [-1, -1]
};

let verDrag = [];

// Callback to reset view and state
function resetCallback() {
    initValue(true);
    updateView();
}

// Initialize state values
function initValue(flag = false) {
    state = {
        stateStep: stateInfo.intro.value,
        ver: [-1, -1]
    };

    if (flag) {
        animationPlay.intro();
    }
}

// Update the main and side views
function updateView() {
    updateMainView();
    updateSideView();
}

// Update main view based on the state
function updateMainView() {
    let activeFlag = (state.stateStep !== stateInfo.intro.value) || (state.ver[0] !== -1 || state.ver[1] !== -1);

    if (state.stateStep === stateInfo.step2.value) {
        showActionButton();
    } else {
        hideActionButton();
    }

    activeFlag ? activeResetButton() : deActiveResetButton();
}

// Update side view based on the state
function updateSideView() {
    updateSideStep();
    updateDragNode();
}

// Update drag node visuals based on state.ver values
function updateDragNode() {
    for (let i = 0; i < 2; i++) {
        let verDiv = document.querySelector('#verDrag0' + (i + 1));
        verDiv.classList.toggle('off', state.ver[i] !== -1);
    }
}

// Update side step class
function updateSideStep() {
    let sideDiv = document.querySelector('.side_area');
    sideDiv.classList.add('step1');
}


// Toggle visibility of the side panel
function toggleSide() {
    if (commonSound !== null) {
        commonSound.click();
    }
    sideState ? sideHide() : sideShow();
}

// Show the side panel with animations and classes
function sideShow() {
    sideState = true;
    let sideDiv = document.querySelector('.side_area');
    commonSideShow(sideDiv, 413, () => {
        $(sideDiv).addClass('on').removeClass('freeze');
    }, () => {
        $(sideDiv).addClass('freeze').addClass('bg_on');
    });
}

// Hide the side panel with animations and class adjustments
function sideHide() {
    sideState = false;
    let sideDiv = document.querySelector('.side_area');
    commonSideHide(sideDiv, 413, () => {
        $(sideDiv).removeClass('freeze on bg_on');
    }, () => {
        $(sideDiv).addClass('freeze');
    });
}

// Initialize drag elements
function initDrag() {
    for (let i = 0; i < 2; i++) {
        let verDiv = document.querySelector('#verDrag0' + (i + 1));
        
        let verDragObject = new DragObject({
            div: verDiv,
            objectId: 'verDrag0' + (i + 1),
            targetIds: ['drop_area'],
            callback: verDragCallback
        });
        
        verDrag.push(verDragObject);
    }
}


function verDragCallback(id, targetId, info) {
    if (info === -1) return; 

    if (targetId === null) return; 

    let nodeIdIndex = parseInt(id.split('verDrag0')[1], 10) - 1;

    if (info === 1) return;

    state.ver[nodeIdIndex] = 0;

    if (nodeIdIndex === 1) {
        animationPlay.step1();
    } else {
        showInfoPopup();
    }

    updateView();
}

// Update main node based on index and value
function setMainNode(index, value) {
    let divEq = $('.main_node').eq(index);
    if (value === 0) {
        divEq.removeClass('active').find('> img').remove();
    }
}


let tutorial = null;

// Initialize tutorial scenes with specified parameters
function initTutorial() {
    tutorial = new Tutorial(3); 
    tutorial.scenes[1].setDrag(220, 385, 546, 167); 
}

// Initialize and configure the animation
function initAnimation() {
    animation = lottie.loadAnimation({
        container: document.getElementById('animation_area'),
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: 'resources/json/ani_mixture.json'
    });

    animation.addEventListener('DOMLoaded', () => {
        animation.playSegments(stateInfo.intro.animationInfo, true);
    });

    animation.onComplete = animationComplete;
}

// Handle animation completion and update state
function animationComplete() {
    if (state.stateStep === stateInfo.step1.value) {
        state.stateStep = stateInfo.step2.value;
        updateView();
    }
}

// Play specified animation segments based on the current state
let animationPlay = {
    intro: () => {
        state.stateStep = stateInfo.intro.value;
        animation.playSegments(stateInfo.intro.animationInfo, true);
    },
    step1: () => {
        state.stateStep = stateInfo.step1.value;
        animation.playSegments(stateInfo.step1.animationInfo, true);
        updateDragNode();
    },
    step3: () => {
        state.stateStep = stateInfo.step3.value;
        animation.playSegments(stateInfo.step3.animationInfo, true);
    }
};

// Show and hide information popup
function showInfoPopup() {
    $('#infoPopupContainer').addClass('show_pop_up');
}

function closeInfoPopup() {
    $('#infoPopupContainer').removeClass('show_pop_up');
}

// Show and hide action button
function showActionButton() {
    $('#actionButtonContainer').removeClass('off');
}

function hideActionButton() {
    $('#actionButtonContainer').addClass('off');
}

// Play ending animation and hide action button
function playEndingAnimation() {
    if (commonSound !== null) {
        commonSound.click();
    }
    hideActionButton();
    animationPlay.step3();
}
