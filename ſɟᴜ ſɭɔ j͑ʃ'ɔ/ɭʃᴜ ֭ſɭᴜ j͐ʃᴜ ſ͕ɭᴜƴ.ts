// ≺⧼ Animacia Administranto ⧽≻ - Taskobret-direktaj animacioj kun okumaj frakcioj

declare const CONSTANTS: any;
declare const akiriTaskobreton: any;
declare const akiriTaskobretanGrandecon: any;

const AnimacioAdministranto: {
    apriorajxoj: { duration: number; easing: string };
    mildigoj: any;
    _positionConfigCache: { [key: string]: any };
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
    // ⟪ Aprioraj Animaciaj Agordoj ⟫
    apriorajxoj: {
        duration: CONSTANTS.ANIM.DURATION_DEFAULT,
        easing: CONSTANTS.ANIM.EASINGS.ease
    },

    // ⟪ Mildigaj Funkcioj ⟫
    mildigoj: CONSTANTS.ANIM.EASINGS,

    // ⟪ Pozicia Agorda Kaŝmemoro ⟫
    _positionConfigCache: {},

    // ⟪ Unuigita Animacia Kerno ⟫

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

    // ⟪ Poziciaj Utilajoj ⟫

    // Akiri kompletan pozician agordon por taskobreta pozicio
    akiriPozicianAgordon(pos: any = null): any {
        const taskbar: HTMLElement | null = akiriTaskobreton();
        const position: string = pos || taskbar?.dataset.position || "left";

        // Redoni kaŝmemorigitan agordon se disponebla
        if (this._positionConfigCache[position]) {
            return this._positionConfigCache[position];
        }

        const transforms: { [key: string]: { slide: string; offset: string; axis: string; invert: number } } = {
            top: { slide: "translateY(-100%)", offset: "translateY({offset}px)", axis: "Y", invert: -1 },
            bottom: { slide: "translateY(100%)", offset: "translateY(-{offset}px)", axis: "Y", invert: -1 },
            left: { slide: "translateX(-100%)", offset: "translateX({offset}px)", axis: "X", invert: 1 },
            right: { slide: "translateX(100%)", offset: "translateX(-{offset}px)", axis: "X", invert: 1 }
        };

        const cfg = transforms[position] || transforms.bottom;

        const result = {
            position,
            slideTransform: cfg.slide,
            offsetTransform: cfg.offset,
            axis: cfg.axis,
            invert: cfg.invert,
            insetProp: position
        };

        this._positionConfigCache[position] = result;
        return result;
    },

    // ⟪ Akiri Panelan Animacian Direkton Bazitan sur Taskobreto ⟫

    // Ĉiuj paneloj glitas el la taskobreta rando
    akiriPanelanDirekton(panelId: string): { from: string; to: string } {
        const { position } = this.akiriPozicianAgordon();
        // Ĉiuj paneloj kunhavas la saman direktan logikon — gliti el taskobreta rando
        return { from: position, to: position };
    },

    // ⟪ Akiri Transformon por Direkto ⟫

    akiriDirektanTransformon(direction: string, fraction: number = 1): string {
        const percentage: number = fraction * 100;
        const transforms: { [key: string]: string } = {
            top: `translateY(-${percentage}%)`,
            bottom: `translateY(${percentage}%)`,
            left: `translateX(-${percentage}%)`,
            right: `translateX(${percentage}%)`
        };
        return transforms[direction] || transforms.bottom;
    },

    // ⟪ Akiri Taskobretan Randan Ofseton ⟫

    akiriTaskobretanOfseton(fraction: number = 1): { transform: string; inset: { [key: string]: string } } {
        const { position, offsetTransform, insetProp } = this.akiriPozicianAgordon();
        const tbSize: number = akiriTaskobretanGrandecon();
        const offset: number = tbSize * fraction;

        return {
            transform: offsetTransform.replace("{offset}", offset.toString()),
            inset: { [insetProp]: `${offset}px` }
        };
    },

    // ⟪ Akiri Taskobretan Grandecon por Pozicio ⟫

    akiriTaskobretanGrandonPorPozicio(pos: any = null, fraction: number = 1): { position: string; size: number; offset: number } {
        const { position } = this.akiriPozicianAgordon(pos);
        const tbSize: number = akiriTaskobretanGrandecon();
        return {
            position,
            size: tbSize,
            offset: tbSize * fraction
        };
    },

    // ⟪ Malaperi En ⟫

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

    // ⟪ Malaperi El ⟫

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

    // ⟪ Gliti Panelon ( Unuigita Interna Metodo ) ⟫

    glitiPanelon(
        element: HTMLElement,
        panelId: string,
        isEntering: boolean,
        options: any = {}
    ): Promise<void> {
        if (!element) return Promise.resolve();

        const fraction: number = options.fraction ?? 1;
        const direction = this.akiriPanelanDirekton(panelId);
        const edge = isEntering ? direction.from : direction.to;

        const baseTransform: string = element.style.transform && element.style.transform !== "none" ? element.style.transform : "";
        const slideTransform: string = this.akiriDirektanTransformon(edge, fraction);
        
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
                if (!isEntering) el.style.display = "none";
            }
        );
    },

    // ⟪ Gliti En el Taskobreta Rando ⟫

    glitiEnElTaskobreto(element: HTMLElement, panelId: string, options: any = {}): Promise<void> {
        if (!element) return Promise.resolve();

        const duration: number = options.duration ?? this.apriorajxoj.duration;
        const easing: string = options.easing ?? this.mildigoj.easeOut;
        const fraction: number = options.fraction ?? 1;

        return this.glitiPanelon(element, panelId, true, { duration, easing, fraction, display: options.display });
    },

    // ⟪ Gliti El al Taskobreta Rando ⟫

    glitiElAlTaskobreto(element: HTMLElement, panelId: string, options: any = {}): Promise<void> {
        if (!element) return Promise.resolve();

        const duration: number = options.duration ?? this.apriorajxoj.duration;
        const easing: string = options.easing ?? this.mildigoj.easeIn;
        const fraction: number = options.fraction ?? 1;

        return this.glitiPanelon(element, panelId, false, { duration, easing, fraction, display: options.display });
    },

    // ⟪ Gliti En ( el rando ) ⟫

    glitiEn(element: HTMLElement, options: any = {}): Promise<void> {
        const fromEdge: string = options.fromEdge || "bottom";
        const startTransform: string = this.akiriDirektanTransformon(fromEdge.replace("%", ""), 1);

        return this._animacii(
            element,
            { transform: startTransform, opacity: 0 },
            { transform: "translate(0, 0)", opacity: 1 },
            { ...options, easing: options.easing ?? this.mildigoj.easeOut },
            ( el ) => {
                el.style.display = options.display || "flex";
                el.style.transform = startTransform;
                el.style.opacity = "0";
                el.style.pointerEvents = "none";
            },
            ( el ) => {
                el.style.transform = "";
                el.style.opacity = "";
                el.style.pointerEvents = "";
            }
        );
    },

    // ⟪ Gliti El ( al rando ) ⟫

    glitiEl(element: HTMLElement, options: any = {}): Promise<void> {
        const toEdge: string = options.toEdge || "bottom";
        const endTransform: string = this.akiriDirektanTransformon(toEdge.replace("%", ""), 1);

        return this._animacii(
            element,
            { transform: "translate(0, 0)", opacity: 1 },
            { transform: endTransform, opacity: 0 },
            { ...options, easing: options.easing ?? this.mildigoj.easeIn },
            ( el ) => { el.style.pointerEvents = "none"; },
            ( el ) => {
                el.style.display = "none";
                el.style.transform = "";
                el.style.opacity = "";
                el.style.pointerEvents = "";
            }
        );
    },

    // ⟪ Skali En ( ŝprucefiko ) ⟫

    skaliEn(element: HTMLElement, options: any = {}): Promise<void> {
        const fromScale: number = options.fromScale ?? CONSTANTS.ANIM.FRACTIONS.sevenEighths;

        return this._animacii(
            element,
            { transform: `scale(${fromScale})`, opacity: 0 },
            { transform: "scale(1)", opacity: 1 },
            { ...options, easing: options.easing ?? this.mildigoj.spring },
            ( el ) => {
                el.style.display = options.display || "flex";
                el.style.transform = `scale(${fromScale})`;
                el.style.opacity = "0";
                el.style.pointerEvents = "none";
            },
            ( el ) => {
                el.style.transform = "";
                el.style.opacity = "";
                el.style.pointerEvents = "";
            }
        );
    },

    // ⟪ Skali El ( ŝrumpa efiko ) ⟫

    skaliEl(element: HTMLElement, options: any = {}): Promise<void> {
        const toScale: number = options.toScale ?? CONSTANTS.ANIM.FRACTIONS.sevenEighths;

        return this._animacii(
            element,
            { transform: "scale(1)", opacity: 1 },
            { transform: `scale(${toScale})`, opacity: 0 },
            { ...options, easing: options.easing ?? this.mildigoj.easeIn },
            ( el ) => { el.style.pointerEvents = "none"; },
            ( el ) => {
                el.style.display = "none";
                el.style.transform = "";
                el.style.opacity = "";
                el.style.pointerEvents = "";
            }
        );
    },

    // ⟪ Fenestro Malferma Animacio ( gliti + malaperi el taskobreto ) ⟫

    fenestroMalfermi(element: HTMLElement, options: any = {}): Promise<void> {
        const fraction: number = options.fraction ?? CONSTANTS.ANIM.FRACTIONS.oneEighth;
        const scale: number = options.scale ?? CONSTANTS.ANIM.FRACTIONS.sevenEighths;

        // Akiri taskobretan pozicion kaj ofseton
        const { position, offset } = this.akiriTaskobretanGrandonPorPozicio(null, fraction);

        // Kalkuli ofseton bazitan sur taskobreta pozicio
        const offsets: { [key: string]: string } = {
            left: `translateX(${offset}px) translateY(-20px)`,
            right: `translateX(-${offset}px) translateY(-20px)`,
            top: `translateY(${offset}px)`,
            bottom: `translateY(-${offset}px)`
        };

        const startTransform: string = offsets[position] || offsets.bottom;

        return this._animacii(
            element,
            { transform: startTransform + ` scale(${scale})`, opacity: 0 },
            { transform: "scale(1)", opacity: 1 },
            { ...options, duration: options.duration ?? CONSTANTS.ANIM.DURATION_LONG, easing: options.easing ?? this.mildigoj.easeOut },
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

    // ⟪ Fenestro Ferma Animacio ( skali malsupren + malaperi al taskobreto ) ⟫

    fenestroFermi(element: HTMLElement, options: any = {}): Promise<void> {
        const fraction: number = options.fraction ?? CONSTANTS.ANIM.FRACTIONS.oneEighth;
        const scale: number = options.scale ?? CONSTANTS.ANIM.FRACTIONS.sevenEighths;

        // Akiri taskobretan pozicion kaj ofseton
        const { position, offset } = this.akiriTaskobretanGrandonPorPozicio(null, fraction);

        // Kalkuli finan transformon al taskobreto
        const offsets: { [key: string]: string } = {
            left: `translateX(${offset}px) translateY(8px)`,
            right: `translateX(-${offset}px) translateY(8px)`,
            top: `translateY(${offset}px)`,
            bottom: `translateY(-${offset}px)`
        };

        const endTransform: string = offsets[position] || offsets.bottom;

        return this._animacii(
            element,
            { transform: "scale(1)", opacity: 1 },
            { transform: endTransform + ` scale(${scale})`, opacity: 0 },
            { ...options, duration: options.duration ?? CONSTANTS.ANIM.DURATION_SHORT, easing: options.easing ?? this.mildigoj.easeIn },
            ( el ) => { el.style.pointerEvents = "none"; },
            ( el ) => {
                el.style.display = "none";
                el.style.transform = "";
                el.style.opacity = "";
                el.style.pointerEvents = "";
            }
        );
    },

    // ⟪ Minimumigi Fenestran Animacion ( skali en taskobreton ) ⟫

    minimumigiFenestron(element: HTMLElement, options: any = {}): Promise<void> {
        const scale: number = options.scale ?? CONSTANTS.ANIM_SETTINGS.windowMinimize.scale;

        // Akiri taskobretan pozicion kaj grandecon
        const { position } = this.akiriPozicianAgordon();
        const taskbar: HTMLElement | null = akiriTaskobreton();
        const tbRect: DOMRect = taskbar?.getBoundingClientRect() || { left: 0, top: window.innerHeight, right: window.innerWidth, bottom: window.innerHeight, width: window.innerWidth, height: 0, x: 0, y: window.innerHeight, toJSON() { return {}; } };
        const winRect: DOMRect = element.getBoundingClientRect();

        // Kalkuli la centran punkton de la fenestro
        const winCenterX: number = winRect.left + winRect.width / 2;
        const winCenterY: number = winRect.top + winRect.height / 2;

        // Kalkuli celpunkton sur taskobreto
        let targetX: number, targetY: number;
        switch (position) {
            case "left":
                targetX = tbRect.right;
                targetY = winCenterY;
                break;
            case "right":
                targetX = tbRect.left;
                targetY = winCenterY;
                break;
            case "top":
                targetX = winCenterX;
                targetY = tbRect.bottom;
                break;
            case "bottom":
            default:
                targetX = winCenterX;
                targetY = tbRect.top;
                break;
        }

        // Kalkuli tradukan distancon
        const translateX: number = targetX - winCenterX;
        const translateY: number = targetY - winCenterY;

        return this._animacii(
            element,
            { transform: "scale(1)", opacity: 1 },
            { transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`, opacity: 0 },
            { ...options, duration: options.duration ?? CONSTANTS.ANIM_SETTINGS.windowMinimize.duration, easing: options.easing ?? CONSTANTS.ANIM_SETTINGS.windowMinimize.easing },
            ( el ) => { el.style.pointerEvents = "none"; },
            ( el ) => {
                el.style.transform = "";
                el.style.opacity = "";
                el.style.pointerEvents = "";
            }
        );
    },

    // ⟪ Maksimumigi Fenestran Animacion ⟫

    maksimumigiFenestron(element: HTMLElement, options: any = {}): Promise<void> {
        const fromScale: number = options.fromScale ?? CONSTANTS.ANIM_SETTINGS.windowMaximize.scale;

        return this._animacii(
            element,
            { transform: `scale(${fromScale})`, opacity: CONSTANTS.ANIM.FRACTIONS.sixEighths },
            { transform: "scale(1)", opacity: 1 },
            { ...options, duration: options.duration ?? CONSTANTS.ANIM_SETTINGS.windowMaximize.duration, easing: options.easing ?? CONSTANTS.ANIM_SETTINGS.windowMaximize.easing },
            undefined,
            ( el ) => {
                el.style.transform = "";
                el.style.opacity = "";
            }
        );
    },

    // ⟪ Restarigi el Maksimumiga Animacio ⟫

    malmaksimumigiFenestron(element: HTMLElement, options: any = {}): Promise<void> {
        const toScale: number = options.toScale ?? CONSTANTS.ANIM_SETTINGS.windowMaximize.scale;

        return this._animacii(
            element,
            { transform: "scale(1)", opacity: 1 },
            { transform: `scale(${toScale})`, opacity: CONSTANTS.ANIM.FRACTIONS.sixEighths },
            { ...options, duration: options.duration ?? CONSTANTS.ANIM_SETTINGS.windowMaximize.duration, easing: options.easing ?? CONSTANTS.ANIM_SETTINGS.windowMaximize.easing },
            undefined,
            ( el ) => {
                el.style.transform = "";
                el.style.opacity = "";
            }
        );
    },

    // ⟪ Restarigi Fenestran Animacion ( el minimumigita ) ⟫

    restaŭriFenestron(element: HTMLElement, options: any = {}): Promise<void> {
        const fraction: number = options.fraction ?? CONSTANTS.ANIM.FRACTIONS.oneEighth;

        return this._animacii(
            element,
            { transform: `scale(${fraction})`, opacity: 0 },
            { transform: "scale(1)", opacity: 1 },
            { ...options, duration: options.duration ?? CONSTANTS.ANIM.DURATION_DEFAULT, easing: options.easing ?? this.mildigoj.spring },
            ( el ) => {
                el.style.display = "block";
                el.style.transform = `scale(${fraction})`;
                el.style.opacity = "0";
            },
            ( el ) => {
                el.style.transform = "";
                el.style.opacity = "";
            }
        );
    },

    // ⟪ Ondeta Efiko ( por butonoj ) ⟫

    ondeto(element: HTMLElement, event: MouseEvent, options: any = {}): void {
        if (!element) return;

        const duration: number = options.duration ?? CONSTANTS.ANIM.DURATION_DEFAULT;
        const color: string = options.color ?? `rgba(255, 255, 255, ${CONSTANTS.ANIM.FRACTIONS.twoEighths})`;

        const ripple: HTMLSpanElement = document.createElement("span");
        ripple.className = "ripple-effect";
        ripple.style.position = "absolute";
        ripple.style.borderRadius = "50%";
        ripple.style.backgroundColor = color;
        ripple.style.transform = "scale(0)";
        ripple.style.animation = `ripple ${duration}ms ${this.mildigoj.easeOut}`;
        ripple.style.pointerEvents = "none";

        const rect: DOMRect = element.getBoundingClientRect();
        const size: number = Math.max(rect.width, rect.height) * 2;
        ripple.style.width = ripple.style.height = size + "px";
        ripple.style.left = (event?.clientX - rect.left - size / 2) + "px";
        ripple.style.top = (event?.clientY - rect.top - size / 2) + "px";

        element.style.position = "relative";
        element.style.overflow = "hidden";
        element.appendChild(ripple);

        setTimeout(() => ripple.remove(), duration);
    },

    // ⟪ Animacii Valoron ( por nombriloj, ŝoviloj ) ⟫

    animaciiValoron(element: HTMLElement, start: number, end: number, duration: number, formatter?: (val: number) => string): Promise<void> {
        if (!element) return Promise.resolve();

        const startTime: number = performance.now();

        return new Promise((resolve) => {
            const animate = (currentTime: number) => {
                const elapsed: number = currentTime - startTime;
                const progress: number = Math.min(elapsed / duration, 1);

                const easedProgress: number = this.analiziMildigon(this.mildigoj.easeOut, progress);

                const currentValue: number = start + (end - start) * easedProgress;

                if (formatter) {
                    element.textContent = formatter(currentValue);
                } else {
                    element.textContent = Math.round(currentValue).toString();
                }

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    resolve();
                }
            };

            requestAnimationFrame(animate);
        });
    },

    // ⟪ Analizi Mildigan Funkcion ⟫

    analiziMildigon(easing: string, t: number): number {
        if (easing.includes("cubic-bezier")) {
            return t < CONSTANTS.ANIM.FRACTIONS.fourEighths ? 2 * t * t : -1 + (4 - 2 * t) * t;
        }
        return t;
    },

    // ⟪ Nuligi Ĉiujn Animaciojn sur Elemento ⟫

    nuligiAnimaciojn(element: HTMLElement): void {
        if (element && element.getAnimations) {
            element.getAnimations().forEach(anim => anim.cancel());
        }
    },

    // ⟪ Ŝpruca Animacio ( por kunteksta menuo ) ⟫

    sxprucEn(element: HTMLElement, options: any = {}): Promise<void> {
        const scale: number = options.scale ?? CONSTANTS.ANIM_SETTINGS.popup.scale;

        return this._animacii(
            element,
            { transform: `scale(${scale})`, opacity: 0 },
            { transform: "scale(1)", opacity: 1 },
            { ...options, duration: options.duration ?? CONSTANTS.ANIM_SETTINGS.popup.duration, easing: options.easing ?? CONSTANTS.ANIM_SETTINGS.popup.easing },
            ( el ) => {
                el.style.transform = `scale(${scale})`;
                el.style.opacity = "0";
            },
            ( el ) => {
                el.style.transform = "";
                el.style.opacity = "";
            }
        );
    },

    // ⟪ Ŝpruca Ferma Animacio ( malaperi el ) ⟫

    sxprucEl(element: HTMLElement, options: any = {}): Promise<void> {
        const scale: number = options.scale ?? CONSTANTS.ANIM_SETTINGS.popup.scale;

        return this._animacii(
            element,
            { transform: "scale(1)", opacity: 1 },
            { transform: `scale(${scale})`, opacity: 0 },
            { ...options, duration: options.duration ?? CONSTANTS.ANIM_SETTINGS.popup.duration, easing: options.easing ?? CONSTANTS.ANIM_SETTINGS.popup.easing },
            ( el ) => { el.style.pointerEvents = "none"; },
            ( el ) => {
                el.style.display = "none";
                el.style.transform = "";
                el.style.opacity = "";
                el.style.pointerEvents = "";
            }
        );
    },

    // ⟪ Ŝpruca Animacio ( por kunteksta menuo ) - Heredaĵa Aliajnimo ⟫

    popup(element: HTMLElement, options: any = {}): Promise<void> {
        return this.sxprucEn(element, options);
    },

    // ⟪ Plenekrana Aplika Malapero En ⟫

    plenekranaApliko(element: HTMLElement, options: any = {}): Promise<void> {
        if (!element) return Promise.resolve();
        return this.malaperiEn(element, options);
    },

    // ⟪ Heredaĵa Aliajnimo ⟫
    fullScreenApp(element: HTMLElement, options: any = {}): Promise<void> {
        return this.plenekranaApliko(element, options);
    },

    // ⟪ Animacii Panelan Malfermon ( el taskobreta rando ) ⟫

    malfermiPanelon(element: HTMLElement, panelId: string, options: any = {}): Promise<void> {
        if (!element) return Promise.resolve();

        const fraction: number = options.fraction ?? CONSTANTS.ANIM.FRACTIONS.full;
        const duration: number = options.duration ?? CONSTANTS.ANIM_SETTINGS.panelSlide.duration;
        const easing: string = options.easing ?? CONSTANTS.ANIM_SETTINGS.panelSlide.easing;

        return this.glitiEnElTaskobreto(element, panelId, {
            duration,
            easing,
            fraction
        });
    },

    // ⟪ Animacii Panelan Fermon ( al taskobreta rando ) ⟫

    fermiPanelon(element: HTMLElement, panelId: string, options: any = {}): Promise<void> {
        if (!element) return Promise.resolve();

        const fraction: number = options.fraction ?? CONSTANTS.ANIM.FRACTIONS.full;
        const duration: number = options.duration ?? CONSTANTS.ANIM_SETTINGS.panelSlide.duration;
        const easing: string = options.easing ?? CONSTANTS.ANIM_SETTINGS.panelSlide.easing;

        return this.glitiElAlTaskobreto(element, panelId, {
            duration,
            easing,
            fraction
        });
    }
};

// Aldoni al fenestro por tutmonda aliro
(window as any).AnimacioAdministranto = AnimacioAdministranto;
