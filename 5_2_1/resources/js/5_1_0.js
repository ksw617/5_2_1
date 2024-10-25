let sideState = false;
let sideStep = 0;
let state  = {
    hor: [-1,-1,-1,-1],
    ver: [-1,-1,-1,-1],
    topNode:[0,0,0,0],
    leftNode:[0,0,0,0],
    mainNode:[
        0,0,0,0,
        0,0,0,0,
        0,0,0,0,
        0,0,0,0
    ]
}

let imageList = [];
let bigImageList = [];
let textList = [];

let horDrag = [];
let verDrag = [];

initImageList();

function initImageList() {
    imageList[1] = './resources/images/node/node_base.png';
    imageList[2] = './resources/images/node/node_base.png';
    imageList[3] = './resources/images/node/node_base.png';
    imageList[4] = './resources/images/node/node_base.png';

    imageList[41] = './resources/images/node/big/node_litmus_blue_1.png';
    imageList[42] = './resources/images/node/big/node_litmus_blue_2.png';
    imageList[43] = './resources/images/node/big/node_litmus_blue_3.png';
    imageList[44] = './resources/images/node/big/node_litmus_blue_4.png';

    imageList[31] = './resources/images/node/big/node_litmus_red_1.png';
    imageList[32] = './resources/images/node/big/node_litmus_red_2.png';
    imageList[33] = './resources/images/node/big/node_litmus_red_3.png';
    imageList[34] = './resources/images/node/big/node_litmus_red_4.png';

    imageList[11] = './resources/images/node/big/node_3_1.png';
    imageList[12] = './resources/images/node/big/node_3_2.png';
    imageList[13] = './resources/images/node/big/node_3_3.png';
    imageList[14] = './resources/images/node/big/node_3_4.png';

    imageList[21] = './resources/images/node/big/node_4_1.png';
    imageList[22] = './resources/images/node/big/node_4_2.png';
    imageList[23] = './resources/images/node/big/node_4_3.png';
    imageList[24] = './resources/images/node/big/node_4_4.png';

    textList[41] = '푸른색 리트머스 시험지 + 묽은 염산';
    textList[42] = '푸른색 리트머스 시험지 + 묽은 수산화 나트륨 용액';
    textList[43] = '푸른색 리트머스 시험지 + 제빵 소다 용액';
    textList[44] = '푸른색 리트머스 시험지 + 구연산 용액';

    textList[31] = '붉은색 리트머스 시험지 + 묽은 염산';
    textList[32] = '붉은색 리트머스 시험지 + 묽은 수산화 나트륨 용액';
    textList[33] = '붉은색 리트머스 시험지 + 제빵 소다 용액';
    textList[34] = '붉은색 리트머스 시험지 + 구연산 용액';

    textList[11] = '페놀프탈레인 용액 + 묽은 염산';
    textList[12] = '페놀프탈레인 용액 + 묽은 수산화 나트륨 용액';
    textList[13] = '페놀프탈레인 용액 + 제빵 소다 용액';
    textList[14] = '페놀프탈레인 용액 + 구연산 용액';

    textList[21] = '자주색 양배추 지시약 + 묽은 염산';
    textList[22] = '자주색 양배추 지시약 + 묽은 수산화 나트륨 용액';
    textList[23] = '자주색 양배추 지시약 + 제빵 소다 용액';
    textList[24] = '자주색 양배추 지시약 + 구연산 용액';



}

function resetCallback() {
    sideHintHide();
    initValue();
    updateView();
}


function initValue() {
    // sideState = false;
    sideStep = 0;
    state  = {
        hor: [-1,-1,-1,-1],
        ver: [-1,-1,-1,-1],
        topNode:[0,0,0,0],
        leftNode:[0,0,0,0],
        mainNode:[
            0,0,0,0,
            0,0,0,0,
            0,0,0,0,
            0,0,0,0
        ]
    }
}

function updateView() {
    updateMainView();
    updateSideView();
}

function updateMainView() {
    updateTopNod();
    updateLeftNod();
    updateMainNode();
    updateOther();
}

function updateOther() {
    // topNode, leftNode에 있는 값들이 모두 0인지 확인

    let isAllZero = true;
    for(let i = 0; i<4; i++) {
        if(state.topNode[i] !== 0) {
            isAllZero = false;
            break;
        }
    }

    if(!isAllZero) {
        // $('.main_area .reset_btn_area').addClass('active');
        activeResetButton();
    }
    else {
        // $('.main_area .reset_btn_area').removeClass('active');
        deActiveResetButton();
    }
}

function updateTopNod() {
    $('.top_node').removeClass(['select1', 'select2', 'select3', 'select4']);
    for(let index = 0; index<4; index++) {
        let targetValue = state.topNode[index];
        if(targetValue !== 0) {
            $('.top_node').eq(index).addClass('select' + targetValue);
        }
    }

}

function updateLeftNod() {
    $('.left_node').removeClass(['select1', 'select2', 'select3', 'select4']);
    for(let index = 0; index<4; index++) {
        let targetValue = state.leftNode[index];
        if(targetValue !== 0) {
            $('.left_node').eq(index).addClass('select' + targetValue);
        }
    }
}

function checkSideStep() {
    // horNode에 0이 하나라도 있으면
    if(sideStep === 0 && state.ver.indexOf(-1) === -1) {
        sideStep = 1;
        sideHintShow();
    }
}

function updateSideView() {
    checkSideStep();
    updateSideStep();
    updateDragNode();
}

function updateDragNode() {
    for(let i = 0; i<4; i++) {
        let horDiv = document.querySelector('#hovDrag0' + (i+1));
        let verDiv = document.querySelector('#verDrag0' + (i+1));

        if(state.hor[i] === -1) {
            horDiv.classList.remove('off');
        }
        else {
            horDiv.classList.add('off');
        }

        if(state.ver[i] === -1) {
            verDiv.classList.remove('off');
        }
        else {
            verDiv.classList.add('off');
        }
    }
}
function updateSideStep() {

    let targetStep = (sideStep===0) ? 1 : sideStep;
    let sideDiv = document.querySelector('.side_area');

    sideDiv.classList.remove(...['step1', 'step2']);
    sideDiv.classList.add('step' + (targetStep));

    if(targetStep === 1) {
        $('.side_area .step_info').text('STEP 01');
        $('.side_area .step_page_info span').text('1');
    }
    else {
        $('.side_area .step_info').text('STEP 02');
        $('.side_area .step_page_info span').text('2');
    }
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

function sideHintShow() {
    $('.side_area .next_btn_area').addClass('active');
    $('.side_area .hint_area').addClass('show');
}
function sideHintHide() {
    $('.side_area .next_btn_area').removeClass('active');
    $('.side_area .hint_area').removeClass('show');
}

function sideShow() {
    if(sideStep === 1) {
        sideHintShow();
    }
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
    sideHintHide();
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

function nextSideStep() {
    if(commonSound !== null) {
        commonSound.click();
    }
    sideStep = 2;
    sideHintHide();
    updateSideStep();
}

function initDrag() {
    for(let i =0; i<4; i++) {
        let horDiv = document.querySelector('#hovDrag0' + (i+1));
        let verDiv = document.querySelector('#verDrag0' + (i+1));

        let horDragObject = new DragObject({
            div: horDiv,
            objectId: 'hovDrag0' + (i+1),
            targetIds: ['hor1', 'hor2', 'hor3', 'hor4'],
            callback: horDragCallback
        });

        let verDragObject = new DragObject({
            div: verDiv,
            objectId: 'verDrag0' + (i+1),
            targetIds: ['ver1', 'ver2', 'ver3', 'ver4'],
            callback: verDragCallback
        });

        horDrag.push(horDragObject);
        verDrag.push(verDragObject);
    }
}

function horDragCallback(id, targetId, info) {

    let nodes = document.querySelectorAll('.horizontal_dim');

    nodes.forEach(node => {
        node.classList.remove('show1');
    });
    nodes.forEach(node => {
        node.classList.remove('show2');
    });

    if(info === -1) {
        // sideHide();
    }

    if(targetId === null) {
        return;
    }

    let idIndex = targetId.split('hor')[1] - 1;
    let nodeIdIndex = id.split('Drag0')[1] - 0;

    if(info === 1) {
        if( state.leftNode[idIndex] === 0) {
            let div = document.querySelector('#' + targetId);
            div.classList.add('show1');
        }
        else {
            let div = document.querySelector('#' + targetId);
            div.classList.add('show2');
        }
    }
    else {
        if( state.leftNode[idIndex] === 0) {
            state.hor[nodeIdIndex - 1] = 0;
            state.leftNode[idIndex] = nodeIdIndex;
            updateView();
        }
    }
}

function verDragCallback(id, targetId, info) {

    let nodes = document.querySelectorAll('.vertical_dim');

    nodes.forEach(node => {
        node.classList.remove('show1');
    });
    nodes.forEach(node => {
        node.classList.remove('show2');
    });

    if(info === -1) {
        // sideHide();
    }

    if(targetId === null) {
        return;
    }

    let idIndex = targetId.split('ver')[1] - 1;
    let nodeIdIndex = id.split('Drag0')[1] - 0;

    if(info === 1) {
        if( state.topNode[idIndex] === 0) {
            let div = document.querySelector('#' + targetId);
            div.classList.add('show1');
        }
        else {
            let div = document.querySelector('#' + targetId);
            div.classList.add('show2');
        }
    }
    else {
        if( state.topNode[idIndex] === 0) {
            state.ver[nodeIdIndex - 1] = 0;
            state.topNode[idIndex] = nodeIdIndex;
            updateView();
        }
    }
}

function updateMainNode() {
    for(let index1 = 0; index1<4; index1++) {
        for(let index2 = 0; index2<4; index2++) {
            let nodeValue = state.topNode[index1] +  state.leftNode[index2] * 10
            setMainNode(index2*4 + index1, nodeValue);
        }
    }
}
function setMainNode(index, value) {
    let divEq= $('.main_node').eq(index);

    if(value === 0 ) {
        divEq.removeClass('active');
        divEq.find('> img').remove();
    }
    else {
        if(state.mainNode[index] !== value) {
            if(value > 10) {
                divEq.addClass('active');
            }
            else {
                divEq.removeClass('active');
            }
            state.mainNode[index] = value;
            divEq.find('> img').remove();
            const newImg = $('<img>', {
                src: imageList[value],
                alt: '',
                draggable: false,
            });

            divEq.find('div').before(newImg);
        }
    }

    // let calcValue = value1 * 10 + value2;
    // divEq.find('> img').remove();
    // const newImg = $('<img>', {
    //     src: './resources/images/node/node_base.png',
    //     alt: '',
    //     draggable: false,
    // });
    //
    // divEq.find('div').before(newImg);
}

let tutorial = null;

function initTutorial() {
    //튜토리얼 화면 개수 만큼 숫자 지정해서 생성
    tutorial = new Tutorial(3);

    //드래그 가이드가 있는 경우
    tutorial.scenes[1].setDrag(220,385,546,167);
    //tutorial.scenes[2].setDrag(130,285,613,80);

    //클릭 유도 가이드가 있는 경우
    //tutorial.scenes[0].setBlink(300,300);
}