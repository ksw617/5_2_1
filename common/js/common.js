let commonSound = null;
let firstTutorialFlag = true;

function runAnimation(div, animationList, callback = null, before = null) {
    setTimeout(() => {
        if(before !== null && before !== undefined) {
            before();
        }
        div.classList.add(...animationList); // 엘리먼트에 애니메이션 클래스 부여
        div.addEventListener('animationend', () => {
            //택스트 제거
            div.classList.remove(...animationList);
            if(callback !== null && callback !== undefined) {
                callback();
            }
        }, { once : true });
    }, 1);
}

function activeResetButton() {
    $('#topContainer .reset_btn_area').addClass('active');
}
function deActiveResetButton() {
    $('#topContainer .reset_btn_area').removeClass('active');
}

document.addEventListener('DOMContentLoaded', function () {
    commonSound = new CommonSound();
});

class CommonSound {
    constructor(option = {
        poolSize: 5,
        soundPaths: {
            click: '../common/sound/click.mp3',
            drop: '../common/sound/drop.mp3',
            reset: '../common/sound/reset.mp3',
        }
    }) {
        this.poolSize = option.poolSize || 5;
        this.sound = null;
        this.soundPaths = option.soundPaths;
        this.init();
    }

    init() {


        let poolClick = [];
        for (let i = 0; i < this.poolSize; i++) {
            poolClick[i] = new Audio(this.soundPaths.click);
        }
        let poolDrop = [];
        for (let i = 0; i < this.poolSize; i++) {
            poolDrop[i] = new Audio(this.soundPaths.drop);
        }
        let poolReset = [];
        for (let i = 0; i < this.poolSize; i++) {
            poolReset[i] = new Audio(this.soundPaths.reset);
        }

        this.sound = {
            click: poolClick,
            drop: poolDrop,
            reset: poolReset,
        }
    }

    getSound(sounds) {
        let targetSounds = sounds;

        let targetSound = null;
        for (let i = 0; i < this.poolSize; i++) {
            if (targetSounds[i].ended || targetSounds[i].currentTime === 0) {
                targetSound = targetSounds[i]
                break;
            }
        }
        if (targetSound === null) {
            targetSound = sounds[0];
        }
        return targetSound;
    }

    playSound(target, callback) {
        target.onended = callback;
        target.play();
    }

    click(callback = () => {}) {
        let targetSound = this.getSound(this.sound.click);
        this.playSound(targetSound,  callback);
    }

    drop(callback = () => {}) {
        let targetSound = this.getSound(this.sound.drop);
        this.playSound(targetSound,  callback);
    }

    reset(callback = () => {}) {
        let targetSound = this.getSound(this.sound.reset);
        this.playSound(targetSound,  callback);
    }
}