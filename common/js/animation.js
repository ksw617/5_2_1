function commonSideShow(div, length, after = null,before = null) {

    div.style.setProperty('--side-size', length + 'px');

    let animationList = ['animate__animated', 'animate__common_side_on', 'animate__faster'];
    runAnimation(div, animationList, () => {
        if(after !== null && after !== undefined) {
            after();
        }},
        () => {
            if(before !== null && before !== undefined) {
                before();
            }}
    );
}

function commonSideHide(div, length, after = null,before = null) {

    div.style.setProperty('--side-size', length + 'px');

    let animationList = ['animate__animated', 'animate__common_side_off', 'animate__faster'];
    runAnimation(div, animationList, () => {
        if(after !== null && after !== undefined) {
            after();
        }},
    () => {
        if(before !== null && before !== undefined) {
            before();
        }}
    );
}

