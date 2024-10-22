class Image360 {
    constructor(option = {
        objectId: undefined,
        frameLength: 0,
        initScale:0.3333,
        imageSize:[1920,1000],
        imageList:['','','','',],
        callback:() => {
            console.log('Image360 callback');
        }
    }) {
        this.div = document.querySelector('#' + option.objectId);
        this.frameLength = option.frameLength;
        this.isDragging = false;
        this.initScale = option.initScale;
        this.imageSize = option.imageSize;
        this.imageList = option.imageList;
        this.imageData = [];
        this.callback = option.callback;

        this.scale = 1;
        this.tempIndex = 0;
        this.lastIndex = 0;

        $(this.div).css('scale', this.initScale );

        this.startX = 0;
        this.initialPositionY = 0;

        this.init();
    }

    show() {
        $(this.div).addClass('show');
        this.setFrame(this.lastIndex);
    }

    hide() {
        $(this.div).removeClass('show');
    }

    active() {
        $(this.div).addClass('active');
    }

    deActive() {
        $(this.div).removeClass('active');
    }

    init() {
        this.createCanvas();

        setTimeout(() => {
            this.ctx = this.canvas.getContext('2d');
            for (let index = 0; index < this.frameLength; index++) {
                let tempImg = new Image();
                tempImg.src = this.imageList[index];
                this.imageData.push(tempImg);
            }

            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // 이전 그림 지우기
            this.ctx.drawImage(this.imageData[0], 0, 0, this.canvas.width, this.canvas.height, 0, 0, this.canvas.width, this.canvas.height);
        },1);


        this.makeEvent();

    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.imageSize[0];
        this.canvas.height = this.imageSize[1];
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.position = 'absolute';
        this.div.appendChild(this.canvas);

    }

    makeEvent() {
        this.div.addEventListener('mousedown', (e) => {
            this.callback();
            this.startX = e.clientX;
            this.isDragging = true;
            // initialPositionY = parseInt(img.style.transform.replace('translateY(', '').replace('px)', '')) || 0;
            this. initialPositionY = parseInt(this.canvas.style.transform.replace('translateY(', '').replace('px)', '')) || 0;
        });

        this.div.addEventListener('mousemove', (e) => {
            if (this.isDragging) {
                let moveX = e.clientX - this.startX;
                this.updateImagePosition(moveX);
            }
        });

        document.addEventListener('mouseup', () => {
            this.isDragging = false;
            this.lastIndex = this.tempIndex;
        });

        this.div.addEventListener('touchstart', (e) => {
            this.callback();
            this.startX = e.touches[0].clientX;
            this.isDragging = true;
            // initialPositionY = parseInt(img.style.transform.replace('translateY(', '').replace('px)', '')) || 0;
            this.initialPositionY = parseInt(canvas.style.transform.replace('translateY(', '').replace('px)', '')) || 0;
        });

        this.div.addEventListener('touchmove', (e) => {
            if (this.isDragging) {
                let moveX = e.touches[0].clientX - this.startX;
                this.updateImagePosition(moveX);
            }
        });

        document.addEventListener('touchend', () => {
            this.isDragging = false;
            this.lastIndex = this.tempIndex;
        });
    }

    setScale(scale) {
        this.scale = scale;
        $(this.div).css('transform', 'scale(' + this.scale + ')');
    }

    setZoom(scale) {
        this.scale = scale;
        $(this.div).css('transform', 'scale(' + this.scale + ')');
    }

    updateImagePosition(moveX) {
        let newIndex;
        if (moveX > 0) {
            newIndex = Math.floor(moveX/25) * -1;
        } else {
            newIndex = Math.ceil(Math.abs(moveX/25));
        }

        newIndex = (newIndex + this.lastIndex) % this.frameLength;
        if(newIndex < 0) {
            newIndex = newIndex + this.frameLength;
        }
        this.tempIndex = newIndex;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // 이전 그림 지우기
        this.ctx.drawImage(this.imageData[newIndex], 0, 0, this.canvas.width, this.canvas.height, 0, 0, this.canvas.width, this.canvas.height);
    }
    setFrame(index) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // 이전 그림 지우기
        this.ctx.drawImage(this.imageData[index], 0, 0, this.canvas.width, this.canvas.height, 0, 0, this.canvas.width, this.canvas.height);

    }
}