// ≺⧼ ɭʃᴜ ֭ſɭᴜ j͐ʃᴜ ſ͕ɭᴜƴ ✨ ⧽≻ - ſ͕ɭᴜ ſɭɔ ֭ſɭɔ ſɭɹ ſןɹ ʌ ɭʃᴜ ֭ſɭᴜ j͐ʃᴜ ſ͕ɭᴜƴ

declare const HAKARANI: any;
declare const xk12naQavek2p2nion: any;
declare const xk12naQavek2p2nianpal6n: any;

const tahalaqaz: {
    apriorajxoj: { duration: number; easing: string };
    mildigoj: any;
    _raqaCak2p2: { [key: string]: any };
    _animacii: (
        element: HTMLElement,
        from: Keyframe,
        to: Keyframe,
        options: any,
        setup?: ( el: HTMLElement ) => void,
        teardown?: ( el: HTMLElement ) => void
    ) => Promise<void>;
    [key: string]: any;
} = {
// ⟪ j͑ʃɹ ı],ɹ ʌ ʃэ ɭʃɔȝ ʌ ſɭw ſᶘɜ ⟫
    apriorajxoj: {
        duration: HAKARANI.ANIM.DURATION_DEFAULT,
        easing: HAKARANI.ANIM.EASINGS.ease
    },

// ⟪ ſɟᴜ ı],ɜ ı],ɔ ⟫
    mildigoj: HAKARANI.ANIM.EASINGS,

// ⟪ ſ͕ɭᴜ ſɭɔƽ ʌ j͑ʃ'ᴜ ֭ſɭᴜ ɭʃɔ ʌ ſɭɜ ʃɔ j͑ʃ'ɜ ſןɹ ⟫
    _raqaCak2p2: {},

// ⟪ ſɭɔ ſɭɹ ʌ ʃэ ɭʃɔȝ ʌ ſɭɔ ſɭɹ ⟫

    _animacii(
        element: HTMLElement,
        from: Keyframe,
        to: Keyframe,
        options: any = {},
        setup?: ( el: HTMLElement ) => void,
        teardown?: ( el: HTMLElement ) => void
    ): Promise<void> {
        if ( !element ) return Promise.resolve();

        const duration: number = options.duration ?? this.apriorajxoj.duration;
        const easing: string = options.easing ?? this.apriorajxoj.easing;

        if ( setup ) setup( element );
        void element.offsetWidth;

        return element.animate( [ from, to ], { duration, easing } ).finished.then( () => {
            if ( teardown ) teardown( element );
        } );
    },

// ⟪ ſ͕ɭᴜ ſɭɔƽ ʌ ֭ſɭᴜ j͑ʃɹ ⟫

    xk12naQakekanKu1on(raqa: any = null): any {
        const caqaxak2p2: HTMLElement | null = xk12naQavek2p2nion();
        const raqaVop2: string = raqa || caqaxak2p2?.dataset.raqa || "ctama";

        if (this._raqaCak2p2[raqaVop2]) {
            return this._raqaCak2p2[raqaVop2];
        }

        const cfg: any = HAKARANI.CAQAXAK2P2_RAQA[ raqaVop2 ] || HAKARANI.CAQAXAK2P2_RAQA.ctama;

        const result = {
            raqa: raqaVop2,
            slideTransform: cfg.slide,
            offsetTransform: cfg.n2taseOffset,
            kanto: raqaVop2 === "ctama" || raqaVop2 === "ptama" ? "X" : "Y"
        };

        this._raqaCak2p2[raqaVop2] = result;
        return result;
    },

// ⟪ ı],ɔ ŋᷠᴜ ʌ }ʃɹ ɭʃᴜ j͑ʃɔ ʌ ʃэ ɭʃɔȝ ʌ ſɭɹ ʌ ı],ɹ ı],ɹȝ ʌ ſ͕ɭᴜ j͑ʃ'ɔ ſɭɹ ſןɹ }ʃꞇ ⟫

    xk12naN2taseanDirekton(n2taseId: string): { from: string; to: string } {
        const { raqa: raqaVop2 } = this.xk12naQakekanKu1on();
        return { from: raqaVop2, to: raqaVop2 };
    },

// ⟪ ı],ɔ ŋᷠᴜ ʌ ſɟᴜ ı],ɜ ʌ ſɭɹ ⟫

    xk12naRaqanTransformon(direction: string, fraction: number = 1): string {
        const percentage: number = fraction * 100;
        const transforms: { [key: string]: string } = {
            top: `translateY(-${percentage}%)`,
            bottom: `translateY(${percentage}%)`,
            left: `translateX(-${percentage}%)`,
            right: `translateX(${percentage}%)`
        };
        return transforms[direction] || transforms.bottom;
    },

// ⟪ ı],ɔ ŋᷠᴜ ʌ ſ͕ɭᴜ j͑ʃ'ɔ ſɭɹ ſןɹ }ʃꞇ ʌ j͑ʃɔ ſȷꞇ }ʃꞇ ʌ ſ͕ɭᴜ ſɭɔƽ ⟫

    xk12naQavek2p2nianpal6nPorQakek(raqa: any = null, fraction: number = 1): { raqa: string; size: number; offset: number } {
        const { raqa: raqaVop2 } = this.xk12naQakekanKu1on(raqa);
        const tbSize: number = xk12naQavek2p2nianpal6n();
        return {
            raqa: raqaVop2,
            size: tbSize,
            offset: tbSize * fraction
        };
    },

// ⟪ ſɭɜ ʃɔ ⟫

    malaperiEn(element: HTMLElement, options: any = {}): Promise<void> {
        return this._animacii(
            element,
            { opacity: 0 },
            { opacity: 1 },
            options,
            ( el ) => {
                el.style.opacity = "0";
                el.style.display = options.display || "flex";
                el.style.pointerEvents = "none";
            },
            ( el ) => {
                el.style.opacity = "";
                el.style.pointerEvents = "";
            }
        );
    },

// ⟪ ſɭɜ ʃɔ ⟫

    malaperiEl(element: HTMLElement, options: any = {}): Promise<void> {
        return this._animacii(
            element,
            { opacity: 1 },
            { opacity: 0 },
            options,
            ( el ) => { el.style.pointerEvents = "none"; },
            ( el ) => {
                el.style.display = "none";
                el.style.opacity = "";
                el.style.pointerEvents = "";
            }
        );
    },

// ⟪ ʃэ ɭʃɔȝ ʌ }ʃɹ ɭʃᴜ j͑ʃɔ ⟫

    b6teqN2tanu(
        element: HTMLElement,
        n2taseId: string,
        isEntering: boolean,
        options: any = {}
    ): Promise<void> {
        if ( !element ) return Promise.resolve();

        const portebla = window.innerWidth < HAKARANI.BREAKPOINTS.MOBILE || window.innerHeight < HAKARANI.BREAKPOINTS.MOBILE;
        if ( portebla ) {
            const frakcio: number = HAKARANI.ANIM.FRACTIONS.oneEighth;
            const skalo: number = HAKARANI.ANIM.FRACTIONS.sevenEighths;
            const kanto = this.xk12naQavek2p2nianpal6nPorQakek(null, frakcio);
            const caqaxak2p2Transformo = this._qakehek2p2aQavek2p2nioTransformo(kanto.raqa, kanto.offset, isEntering);
            const startTransform = isEntering ? `${caqaxak2p2Transformo} scale(${skalo})` : "scale(1)";
            const endTransform = isEntering ? "scale(1)" : `${caqaxak2p2Transformo} scale(${skalo})`;

            return this._animacii(
                element,
                { transform: startTransform, opacity: isEntering ? 0 : 1 },
                { transform: endTransform, opacity: isEntering ? 1 : 0 },
                options,
                ( el ) => {
                    el.style.display = options.display || "flex";
                    el.style.transform = startTransform;
                    el.style.opacity = isEntering ? "0" : "1";
                    el.style.pointerEvents = "none";
                },
                ( el ) => {
                    el.style.transform = "";
                    el.style.opacity = "";
                    el.style.pointerEvents = "";
                    if ( !isEntering ) el.style.display = "none";
                }
            );
        }

        const fraction: number = options.fraction ?? 1;
        const direction = this.xk12naN2taseanDirekton(n2taseId);
        const edge = isEntering ? direction.from : direction.to;

        const baseTransform: string = element.style.transform && element.style.transform !== "none" ? element.style.transform : "";
        const slideTransform: string = this.xk12naRaqanTransformon(edge, fraction);
        
        const startTransform: string = isEntering ? `${baseTransform} ${slideTransform}`.trim() : (baseTransform || "translate(0, 0)");
        const endTransform: string = isEntering ? (baseTransform || "translate(0, 0)") : `${baseTransform} ${slideTransform}`.trim();

        return this._animacii(
            element,
            { transform: startTransform, opacity: isEntering ? 0 : 1 },
            { transform: endTransform, opacity: isEntering ? 1 : 0 },
            options,
            ( el ) => {
                el.style.display = options.display || "flex";
                el.style.transform = startTransform;
                el.style.opacity = isEntering ? "0" : "1";
                el.style.pointerEvents = "none";
            },
            ( el ) => {
                el.style.transform = baseTransform;
                el.style.opacity = "";
                el.style.pointerEvents = "";
                if ( !isEntering ) el.style.display = "none";
            }
        );
    },

// ⟪ ʃэ ɭʃɔȝ ʌ ſ͕ɭᴜ j͑ʃ'ɔ ſɭɹ ſןɹ }ʃꞇ ʌ ſɭɔ ſɭᴜ ſȷɹ ⟫

    b6teqEnElQavek2p2nio(element: HTMLElement, n2taseId: string, options: any = {}): Promise<void> {
        if ( !element ) return Promise.resolve();

        const duration: number = options.duration ?? this.apriorajxoj.duration;
        const easing: string = options.easing ?? this.mildigoj.easeOut;
        const fraction: number = options.fraction ?? 1;

        return this.b6teqN2tanu(element, n2taseId, true, { duration, easing, fraction, display: options.display });
    },

// ⟪ ʃэ ɭʃɔȝ ʌ ſ͕ɭᴜ j͑ʃ'ɔ ſɭɹ ſןɹ }ʃꞇ ʌ ſɭɔ ſɭᴜ ſȷɹ ⟫

    b6teqElAlQavek2p2nio(element: HTMLElement, n2taseId: string, options: any = {}): Promise<void> {
        if ( !element ) return Promise.resolve();

        const duration: number = options.duration ?? this.apriorajxoj.duration;
        const easing: string = options.easing ?? this.mildigoj.easeIn;
        const fraction: number = options.fraction ?? 1;

        return this.b6teqN2tanu(element, n2taseId, false, { duration, easing, fraction, display: options.display });
    },

// ⟪ j͑ʃɹ ɽ͑ʃ'ɜ ʌ }ʃɹ ɭʃᴜ j͑ʃɔ ⟫

    h6w6N2taseon(element: HTMLElement, n2taseId: string, options: any = {}): Promise<void> {
        if ( !element ) return Promise.resolve();

        const duration: number = options.duration ?? this.apriorajxoj.duration;
        const easing: string = options.easing ?? this.mildigoj.easeOut;

        return this.b6teqEnElQavek2p2nio(element, n2taseId, { duration, easing, fraction: options.fraction, display: options.display });
    },

// ⟪ ſןw ſɭᶗ‹ɔ ʌ }ʃɹ ɭʃᴜ j͑ʃɔ ⟫

    woh6w6N2taseon(element: HTMLElement, n2taseId: string, options: any = {}): Promise<void> {
        if ( !element ) return Promise.resolve();

        const duration: number = options.duration ?? this.apriorajxoj.duration;
        const easing: string = options.easing ?? this.mildigoj.easeIn;

        return this.b6teqElAlQavek2p2nio(element, n2taseId, { duration, easing, fraction: options.fraction, display: options.display });
    },

// ⟪ j͑ʃɹ ɽ͑ʃ'ɜ ʌ ſ͕ɭᴜ ſɭɔ ֭ſɭɔ ſɭɹ ſןɹ ⟫

    qakehek2p2oMalwoh6w6(element: HTMLElement, options: any = {}): Promise<void> {
        const fraction: number = options.fraction ?? HAKARANI.ANIM.FRACTIONS.oneEighth;
        const scale: number = options.scale ?? HAKARANI.ANIM.FRACTIONS.sevenEighths;
        const kanto = this.xk12naQavek2p2nianpal6nPorQakek(null, fraction);
        const startTransform: string = this._qakehek2p2aQavek2p2nioTransformo(kanto.raqa, kanto.offset, true);

        return this._animacii(
            element,
            { transform: startTransform + ` scale(${scale})`, opacity: 0 },
            { transform: "scale(1)", opacity: 1 },
            { ...options, duration: options.duration ?? HAKARANI.ANIM.DURATION_LONG, easing: options.easing ?? this.mildigoj.easeOut },
            ( el ) => {
                el.style.display = "block";
                el.style.transform = startTransform + ` scale(${scale})`;
                el.style.opacity = "0";
            },
            ( el ) => {
                el.style.transform = "";
                el.style.opacity = "";
            }
        );
    },

// ⟪ ſןw ſɭᶗ‹ɔ ʌ ſ͕ɭᴜ ſɭɔ ֭ſɭɔ ſɭɹ ſןɹ ⟫

    qakehek2p2oFermi(element: HTMLElement, options: any = {}): Promise<void> {
        const fraction: number = options.fraction ?? HAKARANI.ANIM.FRACTIONS.oneEighth;
        const scale: number = options.scale ?? HAKARANI.ANIM.FRACTIONS.sevenEighths;
        const kanto = this.xk12naQavek2p2nianpal6nPorQakek(null, fraction);
        const endTransform: string = this._qakehek2p2aQavek2p2nioTransformo(kanto.raqa, kanto.offset, false);

        return this._animacii(
            element,
            { transform: "scale(1)", opacity: 1 },
            { transform: endTransform + ` scale(${scale})`, opacity: 0 },
            { ...options, duration: options.duration ?? HAKARANI.ANIM.DURATION_SHORT, easing: options.easing ?? this.mildigoj.easeIn },
            ( el ) => { el.style.pointerEvents = "none"; },
            ( el ) => {
                el.style.display = "none";
                el.style.transform = "";
                el.style.opacity = "";
                el.style.pointerEvents = "";
            }
        );
    },

// ⟪ ſ͕ɭᴜ j͑ʃƨꞇ ֭ſɭɹ ʌ ſ͕ɭᴜ ſɭɔ ֭ſɭɔ ſɭɹ ſןɹ ⟫

    _qakehek2p2aQavek2p2nioTransformo(raqa: string, offset: number, cxuPukxeo: boolean): string {
        const cfg: any = HAKARANI.CAQAXAK2P2_RAQA[ raqa ] || HAKARANI.CAQAXAK2P2_RAQA.ctama;
        const baza: string = cfg.windowOffset.replace("{offset}", offset.toString());
        if ( raqa === "ctama" || raqa === "ptama" ) {
            const etaY: string = cxuPukxeo ? HAKARANI.ANIM_SETTINGS.windowOpen.offsetY : HAKARANI.ANIM_SETTINGS.windowClose.offsetY;
            return baza + ` translateY(${etaY})`;
        }
        return baza;
    },

// ⟪ ſɟᴜ ı],ɜ ı],ɔ ɭʃᴜ ʌ ſ͕ɭᴜ ſɭɔ ֭ſɭɔ ſɭɹ ſןɹ ⟫

    caxoxeQakehek2p2on(element: HTMLElement, options: any = {}): Promise<void> {
        const scale: number = options.scale ?? HAKARANI.ANIM_SETTINGS.windowMinimize.scale;

        const { raqa: raqaVop2 } = this.xk12naQakekanKu1on();
        const caqaxak2p2: HTMLElement | null = xk12naQavek2p2nion();
        const tbRect: DOMRect = caqaxak2p2?.getBoundingClientRect() || { left: 0, top: window.innerHeight, right: window.innerWidth, bottom: window.innerHeight, width: window.innerWidth, height: 0, x: 0, y: window.innerHeight, toJSON() { return {}; } };
        const winRect: DOMRect = element.getBoundingClientRect();

        const winCenterX: number = winRect.left + winRect.width / 2;
        const winCenterY: number = winRect.top + winRect.height / 2;

        let targetX: number, targetY: number;
        switch (raqaVop2) {
            case "ctama":
                targetX = tbRect.right;
                targetY = winCenterY;
                break;
            case "ptama":
                targetX = tbRect.left;
                targetY = winCenterY;
                break;
            case "soza":
                targetX = winCenterX;
                targetY = tbRect.bottom;
                break;
            case "psaz":
            default:
                targetX = winCenterX;
                targetY = tbRect.top;
                break;
        }

        const translateX: number = targetX - winCenterX;
        const translateY: number = targetY - winCenterY;

        return this._animacii(
            element,
            { transform: "scale(1)", opacity: 1 },
            { transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`, opacity: 0 },
            { ...options, duration: options.duration ?? HAKARANI.ANIM_SETTINGS.windowMinimize.duration, easing: options.easing ?? HAKARANI.ANIM_SETTINGS.windowMinimize.easing },
            ( el ) => { el.style.pointerEvents = "none"; },
            ( el ) => {
                el.style.transform = "";
                el.style.opacity = "";
                el.style.pointerEvents = "";
            }
        );
    },

// ⟪ ſɟᴜ ı],ɜ ſןw ſȷɹ ʌ ſ͕ɭᴜ ſɭɔ ֭ſɭɔ ſɭɹ ſןɹ ʌ ʃэ ɭʃɔȝ ⟫

    caxopuf2Qakehek2p2on(element: HTMLElement, options: any = {}): Promise<void> {
        return this._skaliKerno(
            element,
            options.fromScale ?? HAKARANI.ANIM_SETTINGS.windowMaximize.scale,
            true,
            { ...options, startOpacity: HAKARANI.ANIM.FRACTIONS.sixEighths, duration: options.duration ?? HAKARANI.ANIM_SETTINGS.windowMaximize.duration, easing: options.easing ?? HAKARANI.ANIM_SETTINGS.windowMaximize.easing }
        );
    },

// ⟪ }ʃɔ ſɭᴜ ʌ ſɟᴜ ı],ɜ ſןw ſȷɹ ʌ ʃэ ɭʃɔȝ ⟫

    malcaxopuf2Qakehek2p2on(element: HTMLElement, options: any = {}): Promise<void> {
        return this._skaliKerno(
            element,
            options.toScale ?? HAKARANI.ANIM_SETTINGS.windowMaximize.scale,
            false,
            { ...options, endOpacity: HAKARANI.ANIM.FRACTIONS.sixEighths, duration: options.duration ?? HAKARANI.ANIM_SETTINGS.windowMaximize.duration, easing: options.easing ?? HAKARANI.ANIM_SETTINGS.windowMaximize.easing }
        );
    },

// ⟪ }ʃɔ ſɭᴜ ʌ ſ͕ɭᴜ ſɭɔ ֭ſɭɔ ſɭɹ ſןɹ ⟫

    nekaQakehek2p2on(element: HTMLElement, options: any = {}): Promise<void> {
        const fraction: number = options.fraction ?? HAKARANI.ANIM.FRACTIONS.oneEighth;

        return this._skaliKerno(element, fraction, true, {
            ...options,
            duration: options.duration ?? HAKARANI.ANIM.DURATION_DEFAULT,
            easing: options.easing ?? this.mildigoj.spring,
            vahateTahaq: true,
            display: "block"
        });
    },

// ⟪ ɭʃᴜ ſᶘɜ ſɭɜ ʌ ı],ᴜ̭ᴜ }ʃᴜ ⟫

    skaliEn(element: HTMLElement, options: any = {}): Promise<void> {
        return this._skaliKerno(
            element,
            options.fromScale ?? HAKARANI.ANIM.FRACTIONS.sevenEighths,
            true,
            { ...options, easing: options.easing ?? this.mildigoj.spring, vahateTahaq: true, bloki12najn: true }
        );
    },

// ⟪ ɭʃᴜ ſᶘɜ ſɭɜ ʌ ſɭɜ ʃɔ ⟫

    skaliEl(element: HTMLElement, options: any = {}): Promise<void> {
        return this._skaliKerno(
            element,
            options.toScale ?? HAKARANI.ANIM.FRACTIONS.sevenEighths,
            false,
            { ...options, easing: options.easing ?? this.mildigoj.easeIn, bloki12najn: true, finoKobe: true }
        );
    },

// ⟪ j͑ʃ'ᴜ ֭ſɭᴜ ɭʃɔ ʌ ı],ᴜ̭ᴜ }ʃᴜ ⟫

    kuplaJ6se(element: HTMLElement, options: any = {}): Promise<void> {
        const scale: number = options.scale ?? HAKARANI.ANIM_SETTINGS.popup.scale;

        return this._skaliKerno(
            element,
            scale,
            true,
            { ...options, duration: options.duration ?? HAKARANI.ANIM_SETTINGS.popup.duration, easing: options.easing ?? HAKARANI.ANIM_SETTINGS.popup.easing }
        );
    },

// ⟪ j͑ʃ'ᴜ ֭ſɭɜ ɭʃɔ ʌ ſɭɜ ʃɔ ⟫

    kuplaP6sca(element: HTMLElement, options: any = {}): Promise<void> {
        const scale: number = options.scale ?? HAKARANI.ANIM_SETTINGS.popup.scale;

        return this._skaliKerno(
            element,
            scale,
            false,
            { ...options, duration: options.duration ?? HAKARANI.ANIM_SETTINGS.popup.duration, easing: options.easing ?? HAKARANI.ANIM_SETTINGS.popup.easing, bloki12najn: true, finoKobe: true }
        );
    },

// ⟪ ɭʃᴜ ſᶘɜ ſɭɜ ʌ ſɭᴜ ɽ͑ʃ'ᴜ }ʃꞇ ⟫

    _skaliKerno(element: HTMLElement, scale: number, cxuK4cak2: boolean, options: any = {}): Promise<void> {
        const startTransform: string = cxuK4cak2 ? `scale(${scale})` : "scale(1)";
        const endTransform: string = cxuK4cak2 ? "scale(1)" : `scale(${scale})`;
        const startOpacity: number = options.startOpacity ?? 0;
        const endOpacity: number = options.endOpacity ?? 1;

        return this._animacii(
            element,
            { transform: startTransform, opacity: cxuK4cak2 ? startOpacity : 1 },
            { transform: endTransform, opacity: cxuK4cak2 ? 1 : endOpacity },
            options,
            ( el ) => {
                if ( cxuK4cak2 && options.vahateTahaq ) el.style.display = options.display || "flex";
                el.style.transform = startTransform;
                el.style.opacity = cxuK4cak2 ? startOpacity.toString() : "1";
                if ( options.bloki12najn ) el.style.pointerEvents = "none";
            },
            ( el ) => {
                if ( options.finoKobe ) el.style.display = "none";
                el.style.transform = "";
                el.style.opacity = "";
                el.style.pointerEvents = "";
            }
        );
    }
};

(window as any).tahalaqaz = tahalaqaz;
