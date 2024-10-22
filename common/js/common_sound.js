
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