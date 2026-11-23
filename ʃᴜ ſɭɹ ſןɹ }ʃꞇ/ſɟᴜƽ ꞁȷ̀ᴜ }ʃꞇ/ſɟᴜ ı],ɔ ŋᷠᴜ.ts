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
    estasRegradiganta: false,
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
        cxuRegradigo: boolean,
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
            if (cxuRegradigo) {
                e.stopPropagation();
                e.preventDefault();
            }

            this.estasTuŝa = this.cxuTuŝaEvento(e);
            const pos = this.akiriMontranPozicion(e);

            this.komencaX = pos.x;
            this.komencaY = pos.y;
            this.aktivaElemento = element;
            if (cxuRegradigo) this.estasRegradiganta = true;

            handlers.onStart(e, { x: pos.x, y: pos.y });

            // Determini eventajn celojn kaj tipojn
            moveEvent = this.estasTuŝa ? "touchmove" : "mousemove";
            endEvent = this.estasTuŝa ? "touchend" : "mouseup";
            target = (cxuRegradigo || this.estasTuŝa) ? document : element;

            moveHandler = (ev: Event) => {
                if (!this.aktivaElemento) return;
                if (this.estasTuŝa && !cxuRegradigo) ev.preventDefault();
                const movePos = this.akiriMontranPozicion(ev);
                handlers.onMove(ev, {
                    x: movePos.x,
                    y: movePos.y,
                    deltaX: movePos.x - this.komencaX,
                    deltaY: movePos.y - this.komencaY
                });
            };

            endHandler = (ev: Event) => {
                if (!this.aktivaElemento) return;
                if (cxuRegradigo) this.estasRegradiganta = false;
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
            onMove: (e, pos) => onMove?.(e, pos),
            onEnd: (e) => {
                const pos = this.akiriMontranPozicion(e);
                onEnd?.(e, { x: pos.x, y: pos.y, deltaX: pos.x - this.komencaX, deltaY: pos.y - this.komencaY });
            }
        });
    },

    // ⟪ Purigado ⟫
    purigi(): void {
        this.estasTrenanta = false;
        this.estasRegradiganta = false;
        this.aktivaElemento = null;
        if (this.longaPremoTempigilo) {
            clearTimeout(this.longaPremoTempigilo);
            this.longaPremoTempigilo = null;
        }
    }
};

// ⟪ Trena Stata Helpilo ⟫
function agordiTrenanStaton(stato: boolean): void {
    EnigaAdministranto.estasTrenanta = stato;
    document.body.classList.toggle("is-dragging", stato);
}

// ⟪ Konsoliditaj Fenestraj Eksportoj ⟫
Object.assign( window as any, {
    EnigaAdministranto,
    agordiTrenanStaton,
} );
