// ≺⧼ Eniga Traktilo - Unuigitaj Tuŝaj kaj Musaj Regiloj ⧽≻

// Rultempe: prenu CONSTANTS el fenestro ( ŝargita per HTML-skripta etikedo )
const CONSTANTS = (window as any).CONSTANTS;

interface MontrilajDatumoj {
    x?: number;
    y?: number;
    deltaX?: number;
    deltaY?: number;
    tenilo?: string;
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
        let moveEvent: string = "";
        let endEvent: string = "";
        let target: EventTarget | null = null;

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

            // Determini eventajn celojn kaj tipojn
            moveEvent = this.isTouch ? "touchmove" : "mousemove";
            endEvent = this.isTouch ? "touchend" : "mouseup";
            target = (isResize || this.isTouch) ? document : element;

            // Krei mov-traktilon
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

            // Krei fin-traktilon
            endHandler = (ev: Event) => {
                if (!this.activeElement) return;
                if (isResize) this.isResizing = false;
                handlers.onEnd(ev);
                this.cleanup();

                // Forigi aŭskultilojn post fino
                if (moveHandler) target!.removeEventListener(moveEvent, moveHandler);
                if (endHandler) target!.removeEventListener(endEvent, endHandler);
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
            // Purigi iujn postrestantajn aŭskultilojn
            if ((moveHandler || endHandler) && target) {
                if (moveHandler) target.removeEventListener(moveEvent, moveHandler);
                if (endHandler) target.removeEventListener(endEvent, endHandler);
            }
        };
    },

    // ⟪ Agordaj Funkcioj ⟫
    setupDrag(
        element: HTMLElement,
        onStart: ((e: Event, datumoj: MontrilajDatumoj) => void) | null,
        onMove: ((e: Event, datumoj: MontrilajDatumoj) => void) | null,
        onEnd: ((e: Event, datumoj: MontrilajDatumoj) => void) | null
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
        tenilo: string,
        onStart: ((e: Event, datumoj: MontrilajDatumoj) => void) | null,
        onMove: ((e: Event, datumoj: MontrilajDatumoj) => void) | null,
        onEnd: ((e: Event, datumoj: MontrilajDatumoj) => void) | null
    ): (() => void) | undefined {
        if (!element) return;

        return this.setupPointerHandlers(element, true, {
            onStart: (e, pos) => onStart?.(e, { x: pos.x, y: pos.y, tenilo }),
            onMove: (e, pos) => onMove?.(e, { x: pos.x, y: pos.y, deltaX: pos.deltaX, deltaY: pos.deltaY, tenilo }),
            onEnd: (e) => onEnd?.(e, { tenilo })
        });
    },

    setupTap(
        element: HTMLElement,
        onTap: ((e: Event) => void) | null,
        onLongPress: ((e: Event) => void) | null
    ): void {
        if (!element) return;

        let tempigilo: number | null = null;
        let estasTusxo = false;

        const pritraktiKomencon = (e: Event) => {
            estasTusxo = this.isTouchEvent(e);

            if (estasTusxo && onLongPress) {
                tempigilo = window.setTimeout(() => {
                    onLongPress(e);
                    tempigilo = null;
                }, this.longPressDuration);
            }
        };

        const pritraktiFinon = (e: Event) => {
            if (tempigilo) {
                window.clearTimeout(tempigilo);
                if (onTap) onTap(e);
            }
            tempigilo = null;
        };

        element.addEventListener("mousedown", pritraktiKomencon);
        element.addEventListener("mouseup", pritraktiFinon);
        element.addEventListener("touchstart", pritraktiKomencon, { passive: true });
        element.addEventListener("touchend", pritraktiFinon);
    },

    setupSwipe(
        element: HTMLElement,
        onSwipe: ((direkto: string, datumoj: { difX: number; difY: number }) => void) | null,
        sojlo: number = CONSTANTS.INPUT.SWIPE_THRESHOLD
    ): void {
        if (!element) return;

        let komencoX = 0;
        let komencoY = 0;

        const pritraktiKomencon = (e: Event) => {
            const poz = this.getPointerPos(e);
            komencoX = poz.x;
            komencoY = poz.y;
        };

        const pritraktiFinon = (e: Event) => {
            const poz = this.getPointerPos(e);
            const difX = poz.x - komencoX;
            const difY = poz.y - komencoY;

            if (Math.abs(difX) < sojlo && Math.abs(difY) < sojlo) return;

            let direkto: string;
            if (Math.abs(difX) > Math.abs(difY)) {
                direkto = difX > 0 ? "right" : "left";
            } else {
                direkto = difY > 0 ? "down" : "up";
            }

            if (onSwipe) onSwipe(direkto, { difX, difY });
        };

        element.addEventListener("touchstart", pritraktiKomencon, { passive: true });
        element.addEventListener("touchend", pritraktiFinon);
    },

    setupPinch(
        element: HTMLElement,
        onPinch: ((skalo: number, datumoj: { komencaDistanco: number; nunaDistanco: number }) => void) | null
    ): void {
        if (!element) return;

        let komencaDistanco = 0;

        const akiriDistancon = (tusxoj: TouchList): number => {
            const dx = tusxoj[0].clientX - tusxoj[1].clientX;
            const dy = tusxoj[0].clientY - tusxoj[1].clientY;
            return Math.sqrt(dx * dx + dy * dy);
        };

        const pritraktiKomencon = (e: Event) => {
            const tusxoj = (e as TouchEvent).touches;
            if (tusxoj?.length === 2) {
                komencaDistanco = akiriDistancon(tusxoj);
            }
        };

        const pritraktiMovon = (e: Event) => {
            const tusxoj = (e as TouchEvent).touches;
            if (tusxoj?.length === 2) {
                e.preventDefault();
                const nunaDistanco = akiriDistancon(tusxoj);
                const skalo = nunaDistanco / komencaDistanco;

                if (onPinch) onPinch(skalo, { komencaDistanco, nunaDistanco });
            }
        };

        element.addEventListener("touchstart", pritraktiKomencon, { passive: true });
        element.addEventListener("touchmove", pritraktiMovon, { passive: false });
    },

    setupDoubleTap(
        element: HTMLElement,
        onDoubleTap: ((e: Event) => void) | null,
        prokrasto: number = CONSTANTS.INPUT.DOUBLE_TAP_DELAY
    ): void {
        if (!element) return;

        let lastaFrapo = 0;

        const pritraktiFrapeton = (e: Event) => {
            const nun = Date.now();
            if (nun - lastaFrapo < prokrasto) {
                if (onDoubleTap) onDoubleTap(e);
                e.preventDefault();
            }
            lastaFrapo = nun;
        };

        element.addEventListener("click", pritraktiFrapeton);
        element.addEventListener("touchend", pritraktiFrapeton);
    },

    setupPan(
        element: HTMLElement,
        onPan: ((e: Event, datumoj: MontrilajDatumoj) => void) | null,
        onPanStart: ((e: Event) => void) | null,
        onPanEnd: ((e: Event) => void) | null
    ): (() => void) | undefined {
        return this.setupDrag(element, onPanStart, (e, datumoj) => {
            if (onPan) onPan(e, datumoj);
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

function setDraggingState(stato: boolean): void {
    InputHandler.isDragging = stato;
    document.body.classList.toggle("is-dragging", stato);
}

function setResizingState(stato: boolean): void {
    InputHandler.isResizing = stato;
}

// ⟪ Konsoliditaj Fenestraj Eksportoj ⟫
Object.assign( window as any, {
    EnigaAdministranto: InputHandler,
    isDragging,
    isResizing,
    setDraggingState,
    setResizingState,
} );
