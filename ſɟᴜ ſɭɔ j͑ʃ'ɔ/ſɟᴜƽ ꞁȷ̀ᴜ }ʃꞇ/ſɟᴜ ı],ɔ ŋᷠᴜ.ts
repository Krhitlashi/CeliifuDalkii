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

const EnigaAdministranto = {
    // ⟪ Ŝtato ⟫
    estasTrenanta: false,
    estasRegrandiganta: false,
    estasTuŝa: false,
    aktivaElemento: null as HTMLElement | null,
    komencaX: 0,
    komencaY: 0,
    komencaMaldekstro: 0,
    komencaSupro: 0,
    komencaLarĝo: 0,
    komencaAlto: 0,
    ofsetoX: 0,
    ofsetoY: 0,
    trenaSojlo: CONSTANTS.INPUT.DRAG_THRESHOLD,
    longaPremoTempigilo: null as number | null,
    longaPremoDaŭro: CONSTANTS.INPUT.LONG_PRESS_DURATION,

    // ⟪ Eventa Normigado ⟫
    akiriMontranPozicion(e: Event): { x: number; y: number } {
        if (e.type.startsWith("touch")) {
            const touch = (e as TouchEvent).touches?.[0] || (e as TouchEvent).changedTouches?.[0];
            return { x: touch?.clientX || 0, y: touch?.clientY || 0 };
        }
        return { x: (e as MouseEvent).clientX || 0, y: (e as MouseEvent).clientY || 0 };
    },

    cxuTuŝaEvento(e: Event): boolean {
        return e.type.startsWith("touch");
    },

    // ⟪ Interna Montrila Traktila Agordo ⟫
    agordiMontrajnTraktilojn(
        element: HTMLElement,
        cxuRegrandigo: boolean,
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
            if (cxuRegrandigo) {
                e.stopPropagation();
                e.preventDefault();
            }

            this.estasTuŝa = this.cxuTuŝaEvento(e);
            const pos = this.akiriMontranPozicion(e);

            this.komencaX = pos.x;
            this.komencaY = pos.y;
            this.aktivaElemento = element;
            if (cxuRegrandigo) this.estasRegrandiganta = true;

            handlers.onStart(e, { x: pos.x, y: pos.y });

            // Determini eventajn celojn kaj tipojn
            moveEvent = this.estasTuŝa ? "touchmove" : "mousemove";
            endEvent = this.estasTuŝa ? "touchend" : "mouseup";
            target = (cxuRegrandigo || this.estasTuŝa) ? document : element;

            // Krei mov-traktilon
            moveHandler = (ev: Event) => {
                if (!this.aktivaElemento) return;
                if (this.estasTuŝa && !cxuRegrandigo) ev.preventDefault();
                if (!cxuRegrandigo && !this.estasTrenanta) {
                    const movePos = this.akiriMontranPozicion(ev);
                    const deltaX = movePos.x - this.komencaX;
                    const deltaY = movePos.y - this.komencaY;
                    if (Math.abs(deltaX) + Math.abs(deltaY) > this.trenaSojlo) {
                        this.estasTrenanta = true;
                    }
                }
                const movePos = this.akiriMontranPozicion(ev);
                handlers.onMove(ev, {
                    x: movePos.x,
                    y: movePos.y,
                    deltaX: movePos.x - this.komencaX,
                    deltaY: movePos.y - this.komencaY
                });
            };

            // Krei fin-traktilon
            endHandler = (ev: Event) => {
                if (!this.aktivaElemento) return;
                if (cxuRegrandigo) this.estasRegrandiganta = false;
                handlers.onEnd(ev);
                this.purigi();

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
            this.purigi();
            // Purigi iujn postrestantajn aŭskultilojn
            if ((moveHandler || endHandler) && target) {
                if (moveHandler) target.removeEventListener(moveEvent, moveHandler);
                if (endHandler) target.removeEventListener(endEvent, endHandler);
            }
        };
    },

    // ⟪ Agordaj Funkcioj ⟫
    agordiTrenadon(
        element: HTMLElement,
        onStart: ((e: Event, datumoj: MontrilajDatumoj) => void) | null,
        onMove: ((e: Event, datumoj: MontrilajDatumoj) => void) | null,
        onEnd: ((e: Event, datumoj: MontrilajDatumoj) => void) | null
    ): (() => void) | undefined {
        if (!element) return;

        return this.agordiMontrajnTraktilojn(element, false, {
            onStart: (e, pos) => onStart?.(e, { x: pos.x, y: pos.y }),
            onMove: (e, pos) => onMove?.(e, { x: pos.x, y: pos.y, deltaX: pos.deltaX, deltaY: pos.deltaY }),
            onEnd: (e) => {
                const pos = this.akiriMontranPozicion(e);
                onEnd?.(e, { x: pos.x, y: pos.y, deltaX: pos.x - this.komencaX, deltaY: pos.y - this.komencaY });
            }
        });
    },

    agordiRegrandigadon(
        element: HTMLElement,
        tenilo: string,
        onStart: ((e: Event, datumoj: MontrilajDatumoj) => void) | null,
        onMove: ((e: Event, datumoj: MontrilajDatumoj) => void) | null,
        onEnd: ((e: Event, datumoj: MontrilajDatumoj) => void) | null
    ): (() => void) | undefined {
        if (!element) return;

        return this.agordiMontrajnTraktilojn(element, true, {
            onStart: (e, pos) => onStart?.(e, { x: pos.x, y: pos.y, tenilo }),
            onMove: (e, pos) => onMove?.(e, { x: pos.x, y: pos.y, deltaX: pos.deltaX, deltaY: pos.deltaY, tenilo }),
            onEnd: (e) => onEnd?.(e, { tenilo })
        });
    },

    agordiFrapeton(
        element: HTMLElement,
        onTap: ((e: Event) => void) | null,
        onLongPress: ((e: Event) => void) | null
    ): void {
        if (!element) return;

        let tempigilo: number | null = null;
        let estasTusxo = false;

        const pritraktiKomencon = (e: Event) => {
            estasTusxo = this.cxuTuŝaEvento(e);

            if (estasTusxo && onLongPress) {
                tempigilo = window.setTimeout(() => {
                    onLongPress(e);
                    tempigilo = null;
                }, this.longaPremoDaŭro);
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

    agordiGliton(
        element: HTMLElement,
        onSwipe: ((direkto: string, datumoj: { difX: number; difY: number }) => void) | null,
        sojlo: number = CONSTANTS.INPUT.SWIPE_THRESHOLD
    ): void {
        if (!element) return;

        let komencoX = 0;
        let komencoY = 0;

        const pritraktiKomencon = (e: Event) => {
            const poz = this.akiriMontranPozicion(e);
            komencoX = poz.x;
            komencoY = poz.y;
        };

        const pritraktiFinon = (e: Event) => {
            const poz = this.akiriMontranPozicion(e);
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

    agordiPinton(
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

    agordiDuoblanFrapeton(
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

    agordiPanon(
        element: HTMLElement,
        onPan: ((e: Event, datumoj: MontrilajDatumoj) => void) | null,
        onPanStart: ((e: Event) => void) | null,
        onPanEnd: ((e: Event) => void) | null
    ): (() => void) | undefined {
        return this.agordiTrenadon(element, onPanStart, (e, datumoj) => {
            if (onPan) onPan(e, datumoj);
        }, onPanEnd);
    },

    // ⟪ Purigado ⟫
    purigi(): void {
        this.estasTrenanta = false;
        this.estasRegrandiganta = false;
        this.aktivaElemento = null;
        if (this.longaPremoTempigilo) {
            clearTimeout(this.longaPremoTempigilo);
            this.longaPremoTempigilo = null;
        }
    },

    // ⟪ Utilajoj ⟫
    haltigiEventon(e: Event): void {
        e.preventDefault();
        e.stopPropagation();
    },

    cxuMontriloEnElemento(x: number, y: number, element: HTMLElement): boolean {
        const rect = element.getBoundingClientRect();
        return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
    },

    akiriRelativanMontranPozicion(e: Event, element: HTMLElement): { x: number; y: number } {
        const pos = this.akiriMontranPozicion(e);
        const rect = element.getBoundingClientRect();
        return { x: pos.x - rect.left, y: pos.y - rect.top };
    }
};

// ⟪ Tutmondaj Helpiloj ⟫
function estasTrenanta(): boolean {
    return EnigaAdministranto.estasTrenanta;
}

function estasRegrandiganta(): boolean {
    return EnigaAdministranto.estasRegrandiganta;
}

function agordiTrenanStaton(stato: boolean): void {
    EnigaAdministranto.estasTrenanta = stato;
    document.body.classList.toggle("is-dragging", stato);
}

function agordiRegrandiganStaton(stato: boolean): void {
    EnigaAdministranto.estasRegrandiganta = stato;
}

// ⟪ Konsoliditaj Fenestraj Eksportoj ⟫
Object.assign( window as any, {
    EnigaAdministranto,
    estasTrenanta,
    estasRegrandiganta,
    agordiTrenanStaton,
    agordiRegrandiganStaton,
} );
