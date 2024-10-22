// function showGoal() {
//     $('#goalContainer').addClass('show_pop_up');
// }
//
// function closeGoal() {
//     $('#goalContainer').removeClass('show_pop_up');
// }
//
// function showResetPopup() {
//     $('#resetContainer').addClass('show_pop_up');
// }
//
function closeResetPopup() {
    $('#resetContainer').removeClass('show_pop_up');
}

function clickResetPopupBtn(flag) {

    if(commonSound !== null) {
        commonSound.click();
    }

    if(flag) {
        sideHintHide();
        initValue();
        updateView();
    }

    closeResetPopup();
}

function showDetailPopup(index) {

    if(commonSound !== null) {
        commonSound.click();
    }

    let targetDataIndex = state.mainNode[index];
    let textValue = textList[targetDataIndex];
    let imgUrl = imageList[targetDataIndex];

    $('#detailContainer').find('.image_info_area > img').remove();

    const newImg = $('<img>', {
        src: imgUrl,
        alt: '',
        draggable: false,
    });

    $('#detailContainer').find('.image_info_area').append(newImg);
    $('#detailContainer').find('.text_info_area').text(textValue);

    $('#detailContainer').addClass('show_pop_up');
}

function closeDetailPopup() {

    if(commonSound !== null) {
        commonSound.click();
    }

    $('#detailContainer').removeClass('show_pop_up');
}