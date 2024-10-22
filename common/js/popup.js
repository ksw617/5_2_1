function showDisquisitionPopup(callback= null, src= './resources/images/popup_notice.png') {
    if(commonSound !== null && firstTutorialFlag !== true) {
        commonSound.click();
    }
    showPopupTypeA(callback, src);
}

function showResetPopup(callback = resetCallback) {
    if(commonSound !== null) {
        commonSound.reset();
    }
    showPopupTypeB(callback)
}

function showPopupTypeA(callback = null, src) {
    // 지금 시간 기준으로 id 생성
    let id =  'popup_'+ new Date().getTime();

    // 팝업 Div 생성
    let popup = document.createElement('div');
    popup.classList.add(...['popup_area', 'event-de-active']);
    popup.id = id;

    // dim div 추가
    let dim = document.createElement('div');
    dim.classList.add('dim_black');
    popup.appendChild(dim);

    // 팝업 div 이미지 영역 div 추가
    let imgArea = document.createElement('div');
    imgArea.classList.add('img_area');
    popup.appendChild(imgArea);

    //imgArea 이미지 추가
    let img = document.createElement('img');
    img.src = src;
    imgArea.appendChild(img);

    // imgArea 닫기 버튼(div) 추가
    let closeBtn = document.createElement('div');
    closeBtn.classList.add(...['close_btn_area', 'event-active-pointer']);
    imgArea.appendChild(closeBtn);

    //closeBtn 닫기 이미지 추가
    let closeImg = document.createElement('img');
    closeImg.src = '../common/images/btn_x.png';
    // 드레그 못하게 설정
    closeImg.draggable = false;
    closeBtn.appendChild(closeImg);

    //closeBtn click event 추가
    closeBtn.addEventListener('click', () => {
        if(commonSound !== null) {
            commonSound.click();
        }

        if(callback!== null) {
            callback();
        }

        // div 선택
        let popup = document.getElementById(id);

        // base_container popup 제거
        document.getElementById('base_container').removeChild(popup);

        if(firstTutorialFlag) {
            firstTutorialFlag = false;
            tutorial.show();
        }
    });

    //base_container에 popup 추가
    document.getElementById('base_container').appendChild(popup);
}

function showPopupTypeB(callback) {
    let id =  'popup_reset_'+ new Date().getTime();

    // 팝업 Div 생성
    let popup = document.createElement('div');
    popup.classList.add(...['popup_reset_area', 'event-de-active']);
    popup.id = id;

    // dim div 추가
    let dim = document.createElement('div');
    dim.classList.add('dim_black');
    popup.appendChild(dim);

    // 팝업 div 이미지 영역 div 추가
    let imgArea = document.createElement('div');
    imgArea.classList.add('img_area');
    popup.appendChild(imgArea);

    //imgArea 이미지 추가
    let img = document.createElement('img');
    img.src = '../common/images/popup_reset.png';
    imgArea.appendChild(img);

    // imgArea 아니오 버튼(div) 추가
    let noBtn = document.createElement('div');
    noBtn.classList.add(...['no_btn_area', 'event-active-pointer']);
    imgArea.appendChild(noBtn);

    //noBtn click event 추가
    noBtn.addEventListener('click', () => {
        if(commonSound !== null) {
            commonSound.click();
        }
        let popup = document.getElementById(id);
        document.getElementById('base_container').removeChild(popup);
    });

    // imgArea 예 버튼(div) 추가
    let yesBtn = document.createElement('div');
    yesBtn.classList.add(...['yes_btn_area', 'event-active-pointer']);
    imgArea.appendChild(yesBtn);
    //yesBtn click event 추가
    yesBtn.addEventListener('click', () => {
        if(commonSound !== null) {
            commonSound.click();
        }
        let popup = document.getElementById(id);
        document.getElementById('base_container').removeChild(popup);
        // callback가 null이 아니면 실행
        if(callback !== null) {
            callback();
        }
    });

    //base_container에 popup 추가
    document.getElementById('base_container').appendChild(popup);
}