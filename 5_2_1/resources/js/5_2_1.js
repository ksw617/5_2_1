
let stateInfo = {
    intro: {
        value:0,
        animationInfo:[0,1]
    },
    step1: {
        value:1,
        animationInfo:[1,133]
    },
    step2: {
        value:2,
        animationInfo:[132,133]
    },
    step3: {
        value:3,
        animationInfo:[134,220]
    }
}

let sideState = false;
let state  = {
    stateStep: stateInfo.intro.value,
    ver: [-1,-1],
}

let verDrag = [];

function resetCallback() {
    //sideHintHide();
    initValue();
    updateView();
}

function resetCallback() {
    initValue(true);
    updateView();

}
function initValue(flag = false) {
    state  = {
        stateStep: stateInfo.intro.value,
        ver: [-1,-1],
    }

    if(flag) {
        animationPlay.intro();
    }
}

function updateView() {
    updateMainView();
    updateSideView();
}

function updateMainView() {
    updateMainNode();
    updateOther();

   
}

function updateOther() {
    let activeFlag = false;
    if(state.stateStep !== stateInfo.intro.value) {
        activeFlag = true;
    }

    if(state.ver[0] !== -1 || state.ver[1] !== -1) {
        activeFlag = true;
    }

    if(state.stateStep === stateInfo.step2.value) {
        showActionButton();
    } else {
        hideActionButton();
    }

    if(activeFlag) {
        activeResetButton();
    }
    else {
        deActiveResetButton();
    }
}


function updateSideView() {

    updateSideStep();
    updateDragNode();
}

function updateDragNode() {
    for(let i = 0; i<2; i++) {
        let verDiv = document.querySelector('#verDrag0' + (i+1));

        if(state.ver[i] === -1) {
            verDiv.classList.remove('off');
        }
        else {
            verDiv.classList.add('off');
        }
    }
}
function updateSideStep() {

    let sideDiv = document.querySelector('.side_area');
    sideDiv.classList.add('step' + (1));

}

function toggleSide() {
    if(commonSound !== null) {
        commonSound.click();
    }
    if(sideState) {
        sideHide();
    }
    else {
        sideShow();
    }
}


function sideShow() {

    sideState = true;

    let sideDiv = document.querySelector('.side_area');
    commonSideShow(sideDiv, 413, () =>{
        $(sideDiv).addClass('on');
        $(sideDiv).removeClass('freeze')
    },
    () => {
        $(sideDiv).addClass('freeze')
        $(sideDiv).addClass('bg_on')
    })
}

function sideHide() {
    //sideHintHide();
    sideState = false;

    let sideDiv = document.querySelector('.side_area');
    commonSideHide(sideDiv, 413, () =>{
            $(sideDiv).removeClass('freeze')
            $(sideDiv).removeClass('on')
            $(sideDiv).removeClass('bg_on')
    },
    () => {
        $(sideDiv).addClass('freeze')
    })
}


function initDrag() {
    for(let i =0; i<2; i++) {

        let verDiv = document.querySelector('#verDrag0' + (i+1));


        let verDragObject = new DragObject({
            div: verDiv,
            objectId: 'verDrag0' + (i+1),
            targetIds: ['drop_area'],
            callback: verDragCallback
        });

        verDrag.push(verDragObject);
    }
}

function verDragCallback(id, targetId, info) {

    if(info === -1) {
        // sideHide();
    }

    if(targetId === null) {
        return;
    }

    let nodeIdIndex = id.split('verDrag0')[1] - 0;

    if(info === 1)
    {
    }
    else
    {
        
            state.ver[nodeIdIndex - 1] = 0;
            
            if(nodeIdIndex === 2)
            {
                animationPlay.step1();

            }else
            {
                showCustomPopup();
            }
            
            updateView();
       
    }
}

function updateMainNode() {
  
}
function setMainNode(index, value) {
    let divEq= $('.main_node').eq(index);

    if(value === 0 ) {
        divEq.removeClass('active');
        divEq.find('> img').remove();
    }

}

let tutorial = null;

function initTutorial() {
    //튜토리얼 화면 개수 만큼 숫자 지정해서 생성
    tutorial = new Tutorial(3);

    //드래그 가이드가 있는 경우
    tutorial.scenes[1].setDrag(220,385,546,167);

}

function initAnimation() {
    animation = lottie.loadAnimation({
        container: document.getElementById('animation_area'), // Required
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: 'resources/json/ani_mixture.json' // the path to the animation json
    });

    animation.addEventListener('DOMLoaded', () => {
        animation.playSegments(stateInfo.intro.animationInfo, true);
    });

    animation.onComplete = animationComplete;
}

function animationComplete(e) {
    if(state.stateStep === stateInfo.step1.value) {
        state.stateStep = stateInfo.step2.value;
        updateView();  
    }
}

let animationPlay  = {
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
    },
}

function showCustomPopup(){
    $('#customPopupContainer').addClass('show_pop_up');
}
function closeCustomPopup() {
    $('#customPopupContainer').removeClass('show_pop_up');
}


function showActionButton() {
    $('#actionButtonContainer').removeClass('off');
}

function hideActionButton() {
    $('#actionButtonContainer').addClass('off');
}

function playEndingAnimation() {
    if(commonSound !== null) {
        commonSound.click();
    }
    hideActionButton();
    animationPlay.step3();
}