class Tutorial {
    constructor(totalStep) {
        this.totalStep = totalStep;
        this.scenes = [];

        this.init();
    }

    init() {
        this.containerId = "tutorialContainer";

        this.containerTag = document.querySelector('#' + this.containerId);

        this.closeBtnTag = this.containerTag.querySelector('.close_btn_area');
        this.prevBtnTag = this.containerTag.querySelector('.arrow_left');
        this.nextBtnTag = this.containerTag.querySelector('.arrow_right');

        this.tutorialButton = document.querySelector(".tutorial_btn_area");

        if(this.totalStep == 1) {
            this.prevBtnTag.style.display = 'none';
            this.nextBtnTag.style.display = 'none';
        }

        this.containerTag.addEventListener('click', () => {
            //마지막이 아니면
            if(this.sceneIndex < (this.totalStep-1)) {
                this.next();
                return;
            }
            if(commonSound !== null) {
                commonSound.click();
            }
            this.close();
        });

        // closeBtnTag에 클릭 이벤트 추가
        this.closeBtnTag.addEventListener('click', (e) => {
            if(commonSound !== null) {
                commonSound.click();
            }
            this.close();
            e.stopPropagation(); // 이벤트 전파 중지
        });

        // prevBtnTag에 클릭 이벤트 추가
        this.prevBtnTag.addEventListener('click', (e) => {
            this.prev();
            e.stopPropagation(); // 이벤트 전파 중지
        });

        // nextBtnTag에 클릭 이벤트 추가
        this.nextBtnTag.addEventListener('click', (e) => {
            this.next();
            e.stopPropagation(); // 이벤트 전파 중지
        });

        this.tutorialButton.addEventListener('click', (e) => {
            if(commonSound !== null) {
                commonSound.click();
            }
            this.show();
        });

        for(let step=this.totalStep; step>=1; step--) {
            this.scenes.unshift(new TutorialScene(step, this.containerTag));
        }        
    }

    show() {
        this.sceneIndex = 0;

        this.containerTag.classList.add("show_pop_up");
        this.scenes[this.sceneIndex].show();

        this.setButtons();
    }

    next() {
        if(this.sceneIndex == (this.totalStep-1)) {
            return;
        }
        if(commonSound !== null) {
            commonSound.click();
        }
        this.scenes[this.sceneIndex].hide();
        this.sceneIndex++;
        this.scenes[this.sceneIndex].show();

        this.setButtons();
    }

    prev() {        
        if(this.sceneIndex == 0) {
            return;
        }
        if(commonSound !== null) {
            commonSound.click();
        }
        this.scenes[this.sceneIndex].hide();
        this.sceneIndex--;
        this.scenes[this.sceneIndex].show();

        this.setButtons();
    }

    close() {
        for(let i=0; i<this.totalStep; i++) {
            this.scenes[i].hide();
        }

        this.containerTag.classList.remove("show_pop_up");
    }

    setButtons() {
        //첫 페이지이면
        if(this.sceneIndex == 0) {
            this.prevBtnTag.classList.remove("on");
            this.nextBtnTag.classList.add("on");
        } 
        //마지막 페이지이면
        else if(this.sceneIndex == (this.totalStep-1)) {
            this.prevBtnTag.classList.add("on");
            this.nextBtnTag.classList.remove("on");            
        } else {
            this.prevBtnTag.classList.add("on");
            this.nextBtnTag.classList.add("on");            
        }
    }
}

class TutorialScene {
    constructor(step, containerTag) {
        this.imagePath = "./resources/images/";
        this.imagePrefix = "img_tutorial0";
        this.imageExtension = "png";

        this.containerTag = containerTag;

        this.sceneTag = document.createElement("div");        
        this.sceneTag.className = "tutorial_scene";

        this.step = step;        

        this.imgTag = this.#makeTutorialImage(step);
        this.sceneTag.append(this.imgTag);
        this.containerTag.prepend(this.sceneTag);
    }

    show() {
        this.sceneTag.classList.add("show");
    }

    hide() {
        this.sceneTag.classList.remove("show");
    }

    setDrag(left, top, moveX, moveY) {
        this.guideDragTag = document.createElement("div");
        this.guideDragTag.classList.add("guide_area");

        const hand = this.#makeHand(left, top);
        hand.className = "click_hand animate__animated animate__infinite animate__guide_drag";

        hand.style.setProperty('--move-x', moveX + 'px');
        hand.style.setProperty('--move-y', moveY + 'px');

        this.guideDragTag.append(hand);

        this.sceneTag.append(this.guideDragTag);
    }

    setBlink(left, top) {
        this.guideBlinkTag = document.createElement("div");
        this.guideBlinkTag.classList.add("guide_area");

        const hand = this.#makeHand(left, top);
        hand.className = "click_hand animate__animated animate__flash animate__infinite animate__slow";

        this.guideBlinkTag.append(hand);

        this.sceneTag.append(this.guideBlinkTag);
    }

    #makeHand(left, top) {
        const hand = document.createElement("img");
        hand.src = "../common/images/click_hand.png";
        hand.style.left = left + "px";
        hand.style.top = top + "px";
        return hand;
    }

    #makeTutorialImage(step) {
        // 이미지 요소 생성
        const img = document.createElement("img");
        img.className = "bg_img";
        img.src = this.imagePath + this.imagePrefix + step + "." + this.imageExtension;
        img.draggable = false;
        return img;
    }
}