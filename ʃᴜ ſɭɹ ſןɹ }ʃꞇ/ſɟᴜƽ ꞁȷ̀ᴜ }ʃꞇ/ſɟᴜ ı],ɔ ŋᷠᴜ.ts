// ≺⧼ ſɟᴜ ı],ɔ ŋᷠᴜ 👆 ⧽≻

const HAKARANI = (window as any).HAKARANI;

interface XcanalajDatumoj {
    x?: number;
    y?: number;
    deltaX?: number;
    deltaY?: number;
    ve3aq?: string;
}

const caxk12na = {
// ⟪ j͑ʃɹ ⟫
    kobeVaxafa: false,
    cxuPal6iganta: false,
    cxuCa12naa: false,
    ksabaElemento: null as HTMLElement | null,
    saxeX: 0,
    saxeY: 0,
    saxeMalq2: 0,
    saxeSupro: 0,
    saxeSefini: 0,
    saxeL6da: 0,
    ofsetoX: 0,
    ofsetoY: 0,
    vaxafaPuf2k2fe: HAKARANI.INPUT.DRAG_THRESHOLD,
    puf2PeCa1om2: null as number | null,
    puf2PeS2: HAKARANI.INPUT.LONG_PRESS_DURATION,

// ⟪ ſᶘɹ }ʃᴜ ʌ ſɭɔ ſɭɹ ⟫
    xk12naXcanaQakeken(e: Event): { x: number; y: number } {
        if (e.type.startsWith("touch")) {
            const touch = (e as TouchEvent).touches?.[0] || (e as TouchEvent).changedTouches?.[0];
            return { x: touch?.clientX || 0, y: touch?.clientY || 0 };
        }
        return { x: (e as MouseEvent).clientX || 0, y: (e as MouseEvent).clientY || 0 };
    },

    cxu12naa12na(e: Event): boolean {
        return e.type.startsWith("touch");
    },

// ⟪ ſɟɹ ֭ſɭɹ ʌ ı],ᴜ̭ᴜ }ʃᴜ ſɭɔƽ ʌ ſɟᴜ ſ͕ɭᴜ ı],ɔ ŋᷠᴜ ʌ ſɭw ſᶘɜ ⟫
    vahateVaxafaTraktilojn(
        element: HTMLElement,
        cxuRegradigo: boolean,
        handlers: {
            onStart: (e: Event, raqa: { x: number; y: number }) => void,
            oj6Vaxafa: (e: Event, raqa: { x: number; y: number; deltaX: number; deltaY: number }) => void,
            onEnd: (e: Event) => void
        }
    ): () => void {
        let vaxafaTraktilo: ((ev: Event) => void) | null = null;
        let endHandler: ((ev: Event) => void) | null = null;
        let vaxafaCa12na: string = "";
        let end12na: string = "";
        let natakatomasai: EventTarget | null = null;

        const handleStart = (e: Event) => {
            if ( cxuRegradigo ) {
                e.stopPropagation();
                e.preventDefault();
            }

            this.cxuCa12naa = this.cxu12naa12na(e);
            const raqa = this.xk12naXcanaQakeken(e);

            this.saxeX = raqa.x;
            this.saxeY = raqa.y;
            this.ksabaElemento = element;
            if ( cxuRegradigo ) this.cxuPal6iganta = true;

            handlers.onStart(e, { x: raqa.x, y: raqa.y });

            vaxafaCa12na = this.cxuCa12naa ? "touchmove" : "mousemove";
            end12na = this.cxuCa12naa ? "touchend" : "mouseup";
            natakatomasai = (cxuRegradigo || this.cxuCa12naa) ? document : element;

            vaxafaTraktilo = (ev: Event) => {
                if ( !this.ksabaElemento ) return;
                if (this.cxuCa12naa && !cxuRegradigo) ev.preventDefault();
                const vaxafaRaqa = this.xk12naXcanaQakeken(ev);
                handlers.oj6Vaxafa(ev, {
                    x: vaxafaRaqa.x,
                    y: vaxafaRaqa.y,
                    deltaX: vaxafaRaqa.x - this.saxeX,
                    deltaY: vaxafaRaqa.y - this.saxeY
                });
            };

            endHandler = (ev: Event) => {
                if ( !this.ksabaElemento ) return;
                if ( cxuRegradigo ) this.cxuPal6iganta = false;
                handlers.onEnd(ev);
                this.purigi();

                if ( vaxafaTraktilo ) natakatomasai!.removeEventListener(vaxafaCa12na, vaxafaTraktilo);
                if ( endHandler ) natakatomasai!.removeEventListener(end12na, endHandler);
                vaxafaTraktilo = null;
                endHandler = null;
            };

            natakatomasai.addEventListener(vaxafaCa12na, vaxafaTraktilo, { passive: false });
            natakatomasai.addEventListener(end12na, endHandler);
        };

        element.addEventListener("mousedown", handleStart);
        element.addEventListener("touchstart", handleStart, { passive: true });

        return () => {
            this.purigi();
            if ((vaxafaTraktilo || endHandler) && natakatomasai) {
                if ( vaxafaTraktilo ) natakatomasai.removeEventListener(vaxafaCa12na, vaxafaTraktilo);
                if ( endHandler ) natakatomasai.removeEventListener(end12na, endHandler);
            }
        };
    },

// ⟪ j͑ʃ'ᴜ ֭ſɭᴜ ɭʃɔ ʌ ſɟᴜ ſ͕ɭᴜ ı],ɔ ŋᷠᴜ ⟫
    vahateVaxafadon(
        element: HTMLElement,
        onStart: ((e: Event, datumoj: XcanalajDatumoj) => void) | null,
        oj6Vaxafa: ((e: Event, datumoj: XcanalajDatumoj) => void) | null,
        onEnd: ((e: Event, datumoj: XcanalajDatumoj) => void) | null
    ): (() => void) | undefined {
        if ( !element ) return;

        return this.vahateVaxafaTraktilojn(element, false, {
            onStart: (e, raqa) => onStart?.(e, { x: raqa.x, y: raqa.y }),
            oj6Vaxafa: (e, raqa) => oj6Vaxafa?.(e, raqa),
            onEnd: (e) => {
                const raqa = this.xk12naXcanaQakeken(e);
                onEnd?.(e, { x: raqa.x, y: raqa.y, deltaX: raqa.x - this.saxeX, deltaY: raqa.y - this.saxeY });
            }
        });
    },

// ⟪ ſ͕ɭw }ʃɹ ⟫
    purigi(): void {
        this.kobeVaxafa = false;
        this.cxuPal6iganta = false;
        this.ksabaElemento = null;
        if (this.puf2PeCa1om2) {
            clearTimeout(this.puf2PeCa1om2);
            this.puf2PeCa1om2 = null;
        }
    }
};

// ⟪ ʃэ ɭʃɔȝ ʌ j͑ʃɹ ʌ ſɟᴜ ſ͕ɭᴜ ı],ɔ ŋᷠᴜ ⟫
function vahateVaxafanC2ksakn(s2: boolean): void {
    caxk12na.kobeVaxafa = s2;
    document.body.classList.toggle("b6teqta", s2);
}

// ⟪ ſɭɔ ſɭɹ ʌ ֭ſɭᴜ ſ͕ɭᴜ ſɭɔ ֭ſɭɔ ſɭɹ ſןɹ ʌ ֭ſɭᴜ ı],ɔ ŋᷠᴜ ⟫
Object.assign( window as any, {
    caxk12na,
    vahateVaxafanC2ksakn,
} );
