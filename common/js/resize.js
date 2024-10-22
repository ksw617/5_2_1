let SCALE = 1.0;
let TOP_MARGIN = 0;
let LEFT_MARGIN = 0;
document.addEventListener('DOMContentLoaded', (event) => {
    const box = document.getElementById('base_container');
    const baseWidth = 1920;
    const baseHeight = 1000;

    function adjustScale() {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        const scaleX = windowWidth / baseWidth;
        const scaleY = windowHeight / baseHeight;

        SCALE = Math.min(scaleX, scaleY);

        box.style.transform = `scale(${SCALE})`;

        let width = box.offsetWidth * SCALE;

        LEFT_MARGIN = 0;

        if(width < windowWidth) {
            LEFT_MARGIN = (windowWidth - width)/2;
        }
        box.style.left = LEFT_MARGIN + "px";

        let height = box.offsetHeight * SCALE;

        TOP_MARGIN = 0;

        if(height < windowHeight) {
            TOP_MARGIN = (windowHeight - height)/2;

        }

        box.style.top = TOP_MARGIN + "px";

        if(document.body.offsetHeight < (height+TOP_MARGIN)) {
            document.body.style.height = (height+TOP_MARGIN) + "px";
        }
    }

    // 페이지 로드 시 및 창 크기가 변경될 때마다 스케일링 적용
    adjustScale();
    window.addEventListener('resize', adjustScale);
});
