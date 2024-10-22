let eventInfo = {
    start: -1,
    move: 1,
    end: 0,
}

class DragObject {
    constructor(option = {
        div: undefined,
        objectId: undefined,

        callback: undefined,
        targetIds: undefined
    }) {
        this.div = option.div;
        this.objectId = option.objectId;

        this.callback = option.callback || function (id, targetId, state) {
            console.log(['DragObject callback', id, targetId, state]);
        };
        this.targetIds = option.targetIds;

        this.cloneDiv = null;
        this.isFreeze = false;
        this.state = {
            offsetX: 0,
            offsetY: 0,
            isMouseDown: false,
        };

        this.init();
    }

    init() {
        this.makeEvent();
    }


    makeEvent() {
        this.div.addEventListener("touchstart", this.onDragStart.bind(this));
        this.div.addEventListener("mousedown", this.onDragStart.bind(this));

        document.addEventListener("touchmove", this.onDragMove.bind(this));
        document.addEventListener("mousemove", this.onDragMove.bind(this));

        document.addEventListener("touchend", this.onDragEnd.bind(this));
        document.addEventListener("mouseup", this.onDragEnd.bind(this));
    }

    onDragStart(e) {
        console.log('onTouchStart');
        if (this.isFreeze) {
            return;
        }

        if (e.changedTouches) {
            let touch = e.changedTouches[0];
            let rect = e.target.getBoundingClientRect();
            this.state.offsetX = touch.clientX - rect.left;
            this.state.offsetY = touch.clientY - rect.top;
        } else {
            this.state.offsetX = e.offsetX;
            this.state.offsetY = e.offsetY;
        }

        this.state.isMouseDown = true;

        this.cloneDiv = this.div.cloneNode(true);
        this.cloneDiv.id = this.div.id + '_clone';
        this.cloneDiv.style.zIndex = 9999;
        this.cloneDiv.classList.add('moveSticker');

        let touch = (e.changedTouches) ? e.changedTouches[0] : e;
        let mainArea = document.getElementById('base_container');

        var computedStyle = getComputedStyle(mainArea);
        var transform = computedStyle.transform || computedStyle.webkitTransform || computedStyle.mozTransform;
        var matrix = transform.match(/^matrix(3d)?\((.+)\)$/);
        var scale = matrix ? matrix[2].split(',').map(parseFloat)[0] : 1;

        let mainLeft = parseFloat($(mainArea).css('left').replace('px', ''));
        let mainTop = parseFloat($(mainArea).css('top').replace('px', ''));

        let moveX = (touch.clientX - mainLeft) / scale - this.state.offsetX;
        let moveY = (touch.clientY - mainTop) / scale - this.state.offsetY;

        this.cloneDiv.style.left = moveX + "px";
        this.cloneDiv.style.top = moveY + "px";
        this.cloneDiv.style.opacity = 0.7;

        document.getElementById('base_container').append(this.cloneDiv);
        this.callback(this.objectId, null, eventInfo.start);
    }

    onDragMove(e) {
        if (!this.state.isMouseDown) {
            return;
        }
        // console.log(['checkPosition', e]);
        let touch = (e.changedTouches) ? e.changedTouches[0] : e;

        let mainArea = document.getElementById('base_container');

        var computedStyle = getComputedStyle(mainArea);
        var transform = computedStyle.transform || computedStyle.webkitTransform || computedStyle.mozTransform;
        var matrix = transform.match(/^matrix(3d)?\((.+)\)$/);
        var scale = matrix ? matrix[2].split(',').map(parseFloat)[0] : 1;

        let mainLeft = parseFloat($(mainArea).css('left').replace('px', ''));
        let mainTop = parseFloat($(mainArea).css('top').replace('px', ''));

        let moveX = (touch.clientX - mainLeft) / scale - this.state.offsetX;
        let moveY = (touch.clientY - mainTop) / scale - this.state.offsetY;

        this.cloneDiv.style.left = moveX + "px";
        this.cloneDiv.style.top = moveY + "px";

        let maxOverlap = null;
        for(let targetId of this.targetIds) {
            let box = document.getElementById(targetId);

            let overlapArea = this.getOverlapArea(this.cloneDiv, box);

            if (overlapArea > 0) {
                // 겹치는 영역이 있으면 callback 호출
                if (!maxOverlap || overlapArea > maxOverlap.area) {
                    maxOverlap = { area: overlapArea, targetId: targetId };
                }
            }
        }

        if (maxOverlap) {
            // 가장 많이 겹친 대상에 대한 callback
            this.callback(this.objectId, maxOverlap.targetId, eventInfo.move);
        }
        else {
            this.callback(this.objectId, null, eventInfo.move);
        }

        // let box = document.getElementById(this.targetId);
        // if (this.isColliding(this.cloneDiv, box)) {
        //     this.cloneDiv.style.cursor = 'copy';
        // } else {
        //     this.cloneDiv.style.cursor = 'move';
        // }
    }

    onDragEnd(e) {
        if (!this.state.isMouseDown) {
            return;
        }

        if(commonSound !== null) {
            commonSound.drop();
        }

        let maxOverlap = null;
        for(let targetId of this.targetIds) {
            let box = document.getElementById(targetId);

            let overlapArea = this.getOverlapArea(this.cloneDiv, box);

            if (overlapArea > 0) {
                // 겹치는 영역이 있으면 callback 호출
                if (!maxOverlap || overlapArea > maxOverlap.area) {
                    maxOverlap = { area: overlapArea, targetId: targetId };
                }
            }
        }

        if (maxOverlap) {
            // 가장 많이 겹친 대상에 대한 callback
            this.callback(this.objectId, maxOverlap.targetId, eventInfo.end);
        }
        else {
            this.callback(this.objectId, null, eventInfo.end);
        }
        this.reset();
        this.state.isMouseDown = false;
    }

    getOverlapArea(el1, el2) {
        const rect1 = el1.getBoundingClientRect();
        const rect2 = el2.getBoundingClientRect();

        const x_overlap = Math.max(0, Math.min(rect1.right, rect2.right) - Math.max(rect1.left, rect2.left));
        const y_overlap = Math.max(0, Math.min(rect1.bottom, rect2.bottom) - Math.max(rect1.top, rect2.top));

        return x_overlap * y_overlap;
    }

    isColliding(el1, el2) {
        const rect1 = el1.getBoundingClientRect();
        const rect2 = el2.getBoundingClientRect();

        // console.log([rect1, rect2]);

        return !(rect2.left > rect1.right ||
            rect2.right < rect1.left ||
            rect2.top > rect1.bottom ||
            rect2.bottom < rect1.top);
    }

    reset() {
        this.cloneDiv.remove();
        this.cloneDiv = null;
    }

    getObject() {
        return this.div;
    }
}
