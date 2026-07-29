// ≺⧼ Eniga Traktilo - Unuigitaj Tuŝaj kaj Musaj Regiloj ⧽≻

// Runtime: get CONSTANTS from window (loaded by HTML script tag)
const CONSTANTS = (window as any).CONSTANTS;

interface PointerData {
    x?: number;
    y?: number;
    deltaX?: number;
    deltaY?: number;
    handle?: string;
}

const InputHandler = {
    // ⟪ Ŝtato ⟫
    isDragging: false,
    isResizing: false,
    isTouch: false,
    activeElement: null as HTMLElement | null,
    startX: 0,
    startY: 0,
    startLeft: 0,
    startTop: 0,
    startWidth: 0,
    startHeight: 0,
    offsetX: 0,
    offsetY: 0,
    dragThreshold: CONSTANTS.INPUT.DRAG_THRESHOLD,
    longPressTimer: null as number | null,
    longPressDuration: CONSTANTS.INPUT.LONG_PRESS_DURATION,

    // ⟪ Eventa Normigado ⟫
    getPointerPos(e: Event): { x: number; y: number } {
        if (e.type.startsWith("touch")) {
            const touch = (e as TouchEvent).touches?.[0] || (e as TouchEvent).changedTouches?.[0];
            return { x: touch?.clientX || 0, y: touch?.clientY || 0 };
        }
        return { x: (e as MouseEvent).clientX || 0, y: (e as MouseEvent).clientY || 0 };
    },

    isTouchEvent(e: Event): boolean {
        return e.type.startsWith("touch");
    },

    // ⟪ Interna Montrila Traktila Agordo ⟫
    setupPointerHandlers(
        element: HTMLElement,
        isResize: boolean,
        handlers: {
            onStart: (e: Event, pos: { x: number; y: number }) => void,
            onMove: (e: Event, pos: { x: number; y: number; deltaX: number; deltaY: number }) => void,
            onEnd: (e: Event) => void
        }
    ): () => void {
        let moveHandler: ((ev: Event) => void) | null = null;
        let endHandler: ((ev: Event) => void) | null = null;

        const handleStart = (e: Event) => {
            if (isResize) {
                e.stopPropagation();
                e.preventDefault();
            }

            this.isTouch = this.isTouchEvent(e);
            const pos = this.getPointerPos(e);

            this.startX = pos.x;
            this.startY = pos.y;
            this.activeElement = element;
            if (isResize) this.isResizing = true;

            handlers.onStart(e, { x: pos.x, y: pos.y });

            // Determine event targets and types
            const moveEvent = this.isTouch ? "touchmove" : "mousemove";
            const endEvent = this.isTouch ? "touchend" : "mouseup";
            const target = (isResize || this.isTouch) ? document : element;

            // Create move handler
            moveHandler = (ev: Event) => {
                if (!this.activeElement) return;
                if (this.isTouch && !isResize) ev.preventDefault();
                if (!isResize && !this.isDragging) {
                    const movePos = this.getPointerPos(ev);
                    const deltaX = movePos.x - this.startX;
                    const deltaY = movePos.y - this.startY;
                    if (Math.abs(deltaX) + Math.abs(deltaY) > this.dragThreshold) {
                        this.isDragging = true;
                    }
                }
                const movePos = this.getPointerPos(ev);
                handlers.onMove(ev, {
                    x: movePos.x,
                    y: movePos.y,
                    deltaX: movePos.x - this.startX,
                    deltaY: movePos.y - this.startY
                });
            };

            // Create end handler
            endHandler = (ev: Event) => {
                if (!this.activeElement) return;
                if (isResize) this.isResizing = false;
                handlers.onEnd(ev);
                this.cleanup();

                // Remove listeners after end
                if (moveHandler) target.removeEventListener(moveEvent, moveHandler);
                if (endHandler) target.removeEventListener(endEvent, endHandler);
                moveHandler = null;
                endHandler = null;
            };

            target.addEventListener(moveEvent, moveHandler, { passive: false });
            target.addEventListener(endEvent, endHandler);
        };

        element.addEventListener("mousedown", handleStart);
        element.addEventListener("touchstart", handleStart, { passive: true });

        return () => {
            this.cleanup();
            // Cleanup any lingering listeners
            if (moveHandler || endHandler) {
                const moveEvent = this.isTouch ? "touchmove" : "mousemove";
                const endEvent = this.isTouch ? "touchend" : "mouseup";
                const target = (isResize || this.isTouch) ? document : element;
                if (moveHandler) target.removeEventListener(moveEvent, moveHandler);
                if (endHandler) target.removeEventListener(endEvent, endHandler);
            }
        };
    },

    // ⟪ Agordaj Funkcioj ⟫
    setupDrag(
        element: HTMLElement,
        onStart: ((e: Event, data: PointerData) => void) | null,
        onMove: ((e: Event, data: PointerData) => void) | null,
        onEnd: ((e: Event, data: PointerData) => void) | null
    ): (() => void) | undefined {
        if (!element) return;

        return this.setupPointerHandlers(element, false, {
            onStart: (e, pos) => onStart?.(e, { x: pos.x, y: pos.y }),
            onMove: (e, pos) => onMove?.(e, { x: pos.x, y: pos.y, deltaX: pos.deltaX, deltaY: pos.deltaY }),
            onEnd: (e) => {
                const pos = this.getPointerPos(e);
                onEnd?.(e, { x: pos.x, y: pos.y, deltaX: pos.x - this.startX, deltaY: pos.y - this.startY });
            }
        });
    },

    setupResize(
        element: HTMLElement,
        handle: string,
        onStart: ((e: Event, data: PointerData) => void) | null,
        onMove: ((e: Event, data: PointerData) => void) | null,
        onEnd: ((e: Event, data: PointerData) => void) | null
    ): (() => void) | undefined {
        if (!element) return;

        return this.setupPointerHandlers(element, true, {
            onStart: (e, pos) => onStart?.(e, { x: pos.x, y: pos.y, handle }),
            onMove: (e, pos) => onMove?.(e, { x: pos.x, y: pos.y, deltaX: pos.deltaX, deltaY: pos.deltaY, handle }),
            onEnd: (e) => onEnd?.(e, { handle })
        });
    },

    setupTap(
        element: HTMLElement,
        onTap: ((e: Event) => void) | null,
        onLongPress: ((e: Event) => void) | null
    ): void {
        if (!element) return;

        let timer: number | null = null;
        let isTouch = false;

        const handleStart = (e: Event) => {
            isTouch = this.isTouchEvent(e);

            if (isTouch && onLongPress) {
                timer = window.setTimeout(() => {
                    onLongPress(e);
                    timer = null;
                }, this.longPressDuration);
            }
        };

        const handleEnd = (e: Event) => {
            if (timer) {
                window.clearTimeout(timer);
                if (onTap) onTap(e);
            }
            timer = null;
        };

        element.addEventListener("mousedown", handleStart);
        element.addEventListener("mouseup", handleEnd);
        element.addEventListener("touchstart", handleStart, { passive: true });
        element.addEventListener("touchend", handleEnd);
    },

    setupSwipe(
        element: HTMLElement,
        onSwipe: ((direction: string, data: { diffX: number; diffY: number }) => void) | null,
        threshold: number = CONSTANTS.INPUT.SWIPE_THRESHOLD
    ): void {
        if (!element) return;

        let startX = 0;
        let startY = 0;

        const handleStart = (e: Event) => {
            const pos = this.getPointerPos(e);
            startX = pos.x;
            startY = pos.y;
        };

        const handleEnd = (e: Event) => {
            const pos = this.getPointerPos(e);
            const diffX = pos.x - startX;
            const diffY = pos.y - startY;

            if (Math.abs(diffX) < threshold && Math.abs(diffY) < threshold) return;

            let direction: string;
            if (Math.abs(diffX) > Math.abs(diffY)) {
                direction = diffX > 0 ? "right" : "left";
            } else {
                direction = diffY > 0 ? "down" : "up";
            }

            if (onSwipe) onSwipe(direction, { diffX, diffY });
        };

        element.addEventListener("touchstart", handleStart, { passive: true });
        element.addEventListener("touchend", handleEnd);
    },

    setupPinch(
        element: HTMLElement,
        onPinch: ((scale: number, data: { startDistance: number; currentDistance: number }) => void) | null
    ): void {
        if (!element) return;

        let startDistance = 0;
        let startScale = 1;

        const getDistance = (touches: TouchList): number => {
            const dx = touches[0].clientX - touches[1].clientX;
            const dy = touches[0].clientY - touches[1].clientY;
            return Math.sqrt(dx * dx + dy * dy);
        };

        const handleStart = (e: Event) => {
            const touches = (e as TouchEvent).touches;
            if (touches?.length === 2) {
                startDistance = getDistance(touches);
                startScale = 1;
            }
        };

        const handleMove = (e: Event) => {
            const touches = (e as TouchEvent).touches;
            if (touches?.length === 2) {
                e.preventDefault();
                const currentDistance = getDistance(touches);
                const scale = currentDistance / startDistance;

                if (onPinch) onPinch(scale, { startDistance, currentDistance });
            }
        };

        element.addEventListener("touchstart", handleStart, { passive: true });
        element.addEventListener("touchmove", handleMove, { passive: false });
    },

    setupDoubleTap(
        element: HTMLElement,
        onDoubleTap: ((e: Event) => void) | null,
        delay: number = CONSTANTS.INPUT.DOUBLE_TAP_DELAY
    ): void {
        if (!element) return;

        let lastTap = 0;

        const handleTap = (e: Event) => {
            const now = Date.now();
            if (now - lastTap < delay) {
                if (onDoubleTap) onDoubleTap(e);
                e.preventDefault();
            }
            lastTap = now;
        };

        element.addEventListener("click", handleTap);
        element.addEventListener("touchend", handleTap);
    },

    setupPan(
        element: HTMLElement,
        onPan: ((e: Event, data: PointerData) => void) | null,
        onPanStart: ((e: Event) => void) | null,
        onPanEnd: ((e: Event) => void) | null
    ): (() => void) | undefined {
        return this.setupDrag(element, onPanStart, (e, data) => {
            if (onPan) onPan(e, data);
        }, onPanEnd);
    },

    // ⟪ Purigado ⟫
    cleanup(): void {
        this.isDragging = false;
        this.isResizing = false;
        this.activeElement = null;
        if (this.longPressTimer) {
            clearTimeout(this.longPressTimer);
            this.longPressTimer = null;
        }
    },

    // ⟪ Utilajoj ⟫
    stopEvent(e: Event): void {
        e.preventDefault();
        e.stopPropagation();
    },

    isPointerInElement(x: number, y: number, element: HTMLElement): boolean {
        const rect = element.getBoundingClientRect();
        return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
    },

    getRelativePointerPos(e: Event, element: HTMLElement): { x: number; y: number } {
        const pos = this.getPointerPos(e);
        const rect = element.getBoundingClientRect();
        return { x: pos.x - rect.left, y: pos.y - rect.top };
    }
};

// ⟪ Tutmondaj Helpiloj ⟫
function isDragging(): boolean {
    return InputHandler.isDragging;
}

function isResizing(): boolean {
    return InputHandler.isResizing;
}

function setDraggingState(state: boolean): void {
    InputHandler.isDragging = state;
    document.body.classList.toggle("is-dragging", state);
}

function setResizingState(state: boolean): void {
    InputHandler.isResizing = state;
}

// Aldoni al fenestro por tutmonda aliro
( window as any ).EnigaAdministranto = InputHandler;
(window as any).isDragging = isDragging;
(window as any).isResizing = isResizing;
(window as any).setDraggingState = setDraggingState;
(window as any).setResizingState = setResizingState;
