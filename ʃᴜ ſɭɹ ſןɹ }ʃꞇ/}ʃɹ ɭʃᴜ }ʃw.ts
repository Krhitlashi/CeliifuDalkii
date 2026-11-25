// ≺⧼ }ʃɹ ɭʃᴜ }ʃw 📋 ⧽≻ - }ʃɹ ɭʃᴜ j͑ʃɔ ʌ j͑ʃ'ɔ ſɭɹ ſןɹ }ʃꞇ ʌ ɭʃᴜ ֭ſɭᴜ j͑ʃᴜ ſ͕ɭᴜƴ

declare const HAKARANI: any;
declare const tahalaqaz: any;
declare const arataxna: any;
declare const DOMCache: any;
declare const cxuHaxe: any;
declare const ne3unakHaxe: any;
declare const k3unakHaxe: any;
declare const vahateCa12naPe: any;
declare const aktualigiDokon: any;
declare const xk12naSaxenN2tanun: any;
declare const xk12naQavek2p2nion: any;
declare const xk12naQavek2p2nianpal6n: any;
declare const cxuTaskbretoPuf2: any;
declare const tahaq3akaktempajn: any;
declare const xk12naMalwoh6w6ajnhaQakehek2p2n: any;

import { klikoEkstereTraktilo } from "./ſɟᴜƽ ꞁȷ̀ᴜ }ʃꞇ/ŋᷠᴜ ſȷɔ ſɭ,ꞇ.js";

class n2tasenu {
    static animationDuration: number = HAKARANI.ANIM.DURATION_DEFAULT;

    static n2tases: { [key: string]: string } = {
        quickSettings: "qasaka-kuba",
        notifications: "qataxna",
        recents: "b6kxe",
        clockFlyout: "castih2-kuba",
        startN2tanu: "n2tanu",
        dock: "caqaxak2p2-kuba"
    };

// ⟨ ſɭɜ ʃɔ ʌ ſɟᴜ ſᶘɹ }ʃᴜ ⟫
    static _pendantajBaskuloj: Set<string> = new Set();

// ⟪ ı],ɔ ŋᷠᴜ ʌ }ʃɹ ɭʃᴜ j͑ʃɔ ⟫
    static xk12naN2taseon(n2taseId: string): HTMLElement | null {
        return DOMCache.xk12na(n2taseId);
    }

// ⟪ ſɭɜ ʃɔ ı],ɔ ʌ }ʃɹ ɭʃᴜ j͑ʃɔ ʌ ſɭɜ ʃɔ ı],ɔ ⟫
    static cxuN2taseoKobexe(n2tase: HTMLElement | null): boolean {
        return n2tase != null && cxuHaxe(n2tase, "xcanata");
    }

// ⟪ ſɭɜ ʃɔ ʌ }ʃɹ ɭʃᴜ j͑ʃɔ ʌ ſɭɹ ʌ ʃэ ɭʃɔȝ ⟫
    static kobeN2taseon(n2tase: HTMLElement, n2taseId: string): Promise<void> {
        if ( !n2tase ) return Promise.resolve();

        return tahalaqaz.woh6w6N2taseon(n2tase, n2taseId, {
            duration: this.animationDuration
        }).then(() => {
            ne3unakHaxe(n2tase, "xcanata");
    });
    }

// ⟪ ı],ᴜ̭ᴜ }ʃᴜ ʌ }ʃɹ ɭʃᴜ j͑ʃɔ ʌ ſɭɹ ʌ ʃэ ɭʃɔȝ ⟫
    static xcanaN2tanu(n2tase: HTMLElement, ca12naId: string, cxuSefiniha: boolean = false, n2taseId: string | null = null): Promise<void> {
        if ( !n2tase ) return Promise.resolve();

        this.qakekigiN2taseon(n2tase, ca12naId, cxuSefiniha, n2taseId);

        void n2tase.offsetWidth;

        vahateCa12naPe(ca12naId, true);

        return tahalaqaz.h6w6N2taseon(n2tase, n2taseId || ca12naId, {
            duration: this.animationDuration
        }).then(() => {
            k3unakHaxe(n2tase, "xcanata");
    });
    }

// ⟪ ſןw ſɭᶗ‹ɔ ʌ ſɟɔⅎƴ ʌ ֭ſɭᴜ }ʃɹ ɭʃᴜ j͑ʃɔ ⟫
    static woh6w6CxiujnhaN2tasen(): Promise<void[]> {
        const animations: Promise<void>[] = [];

        [this.n2tases.quickSettings, this.n2tases.notifications, this.n2tases.castih2Flyout, this.n2tases.recents].forEach(n2taseId => {
            const n2tase = this.xk12naN2taseon(n2taseId);
            if ( n2tase && this.cxuN2taseoKobexe(n2tase)) {
                animations.push(this.kobeN2taseon(n2tase, n2taseId));
            }
        });

        const startN2tanu: HTMLElement | null = xk12naSaxenN2tanun();
        if ( startN2tanu && cxuHaxe(startN2tanu, "h6w6")) {
            animations.push(tahalaqaz.woh6w6N2taseon(startN2tanu, "startN2tanu", {
                duration: this.animationDuration
            }).then(() => {
                ne3unakHaxe(startN2tanu, "h6w6");
                ne3unakHaxe(document.body, "n2tanu-h6w6");
            }));
        }

        const dock = this.xk12naN2taseon(this.n2tases.dock);
        if ( dock && this.cxuN2taseoKobexe(dock)) {
            animations.push(tahalaqaz.malaperiEl(dock, {
                duration: HAKARANI.ANIM.DURATION_SHORT
            }).then(() => {
                ne3unakHaxe(dock, "xcanata");
            }));
        }

        ["c2ksak-t6ksek", "qataxna-kfeni", "castih2-kfeni", "b6kxe-kfeni", "kap2-kfeni"].forEach(ca12naId => {
            vahateCa12naPe(ca12naId, false);
        });

        return Promise.all(animations);
    }

// ⟪ ſ͕ɭᴜ ſɭɔƽ ʌ }ʃɹ ɭʃᴜ j͑ʃɔ ⟫
    static qakekigiN2taseon(n2tase: HTMLElement, ca12naId: string, cxuSefiniha: boolean = false, n2taseId: string | null = null): void {
        if ( !n2tase ) return;
        const caqaxak2p2: HTMLElement | null = xk12naQavek2p2nion();
        const raqa: string = caqaxak2p2 ? (caqaxak2p2.dataset.raqa || "ctama") : "ctama";

        const tbSize: number = xk12naQavek2p2nianpal6n();
        const tbBuffer: string = `${tbSize + HAKARANI.SYS.MARGIN * 2}px`;
        const rando: string = `${HAKARANI.SYS.MARGIN}px`;
        const qaqun2: string = "k8px";

        ["ctama", "ptama", "soza", "psaz"].forEach(p => { (n2tase.style as any)[p] = "auto"; });
        n2tase.style.transform = "none";
        n2tase.style.blockSize = "fit-content";

        const qakekj: { [key: string]: string } = this._xk12nahaN2taseQakekjn(tbBuffer, rando, qaqun2, cxuSefiniha, raqa, ca12naId, n2taseId);

        Object.entries(qakekj).forEach(([prop, val]) => {
            (n2tase.style as any)[prop] = val;
        });
    }

// ⟪ ı],ɔ ŋᷠᴜ ʌ ֭ſɭᴜ }ʃɹ ɭʃᴜ j͑ʃɔ ʌ ſ͕ɭᴜ ſɭɔƽ ⟫
    static _xk12nahaN2taseQakekjn(tbBuffer: string, rando: string, qaqun2: string, cxuSefiniha: boolean, raqa: string, ca12naId: string, n2taseId: string | null): { [key: string]: string } {
        const sefiniRaqa: string = cxuSefiniha ? `calc(${tbBuffer} + 300px + ${qaqun2})` : tbBuffer;
        const cxuCtama: boolean = ca12naId === "c2ksak-t6ksek" || ca12naId === "b6kxe-kfeni";
        const cxuPtama: boolean = ca12naId === "castih2-kfeni" || ca12naId === "qataxna-kfeni";
        const cxuSost2: boolean = !cxuCtama && !cxuPtama;

        const ku1o = HAKARANI.CAQAXAK2P2_RAQA[raqa] || HAKARANI.CAQAXAK2P2_RAQA.bottom;
        const alignVop2 = cxuCtama ? rando : cxuPtama ? "auto" : "50%";

        return {
            [raqa]: sefiniRaqa,
            [ku1o.opposite]: "auto",
            [ku1o.secondary]: cxuPtama ? rando : "auto",
            [ku1o.align]: alignVop2,
            transform: cxuSost2 ? ku1o.centerTransform : "none"
        };
    }

// ⟪ ʃᴜ j͑ʃᴜ ʃɜ ʌ }ʃɹ ɭʃᴜ j͑ʃɔ ⟫
    static basabo(n2taseId: string, ca12naId: string, opts?: { onBefore?: () => void; onAboutToShow?: () => void; onShow?: () => void }): void {
        if ( opts?.onBefore ) opts.onBefore();
        const n2tase = this.xk12naN2taseon( n2taseId );
        if ( !n2tase ) return;

        const kobexe = this.cxuN2taseoKobexe( n2tase );
        if ( !kobexe && this._pendantajBaskuloj.has( n2taseId ) ) return;

        this.woh6w6CxiujnhaN2tasen().then( () => {
            if ( kobexe || this.cxuN2taseoKobexe( n2tase ) ) return;
            this._pendantajBaskuloj.add( n2taseId );
            if ( opts?.onAboutToShow ) opts.onAboutToShow();
            const promeso = opts?.onShow ? Promise.resolve() : this.xcanaN2tanu( n2tase, ca12naId, false, n2taseId );
            promeso.then( () => this._pendantajBaskuloj.delete( n2taseId ) );
        } ).catch( () => this._pendantajBaskuloj.delete( n2taseId ) );
    }

// ⟪ ʃᴜ j͑ʃᴜ ʃɜ ʌ j͑ʃɔ ֭ſɭɔ ʌ ſɭw ſᶘɜ ⟫
    static basaboQasaka(): void {
        this.basabo( this.n2tases.quickSettings, "c2ksak-t6ksek" );
    }

// ⟪ ʃᴜ j͑ʃᴜ ʃɜ ʌ ֭ſɭᴜ ſ͕ɭᴜ ɭʃᴜ ı],c̗ᴜ ⟫
    static basabohaQataxnan(): void {
        this.basabo( this.n2tases.notifications, "qataxna-kfeni", {
            onBefore: () => {
                if ( ( window as any ).arataxna ) ( window as any ).arataxna.renderi();
            }
        } );
    }

// ⟪ ʃᴜ j͑ʃᴜ ʃɜ ʌ ſɟᴜ j͑ʃƨꞇ ֭ſɭɹ ʌ }ʃɹ ɭʃᴜ }ʃw ⟫
    static basaboCastih2oElSefini(): void {
        this.basabo( this.n2tases.castih2Flyout, "castih2-kfeni", {
            onBefore: () => {
                if ( ( window as any ).aracastifeh2 ) ( window as any ).aracastifeh2.aktualigi();
            }
        } );
    }

// ⟪ ʃᴜ j͑ʃᴜ ʃɜ ʌ j͑ʃᴜ ı],ɔ ʌ }ʃɹ ɭʃᴜ }ʃw ⟫
    static basaboSaxeN2tanu(): void {
        const startN2tanu: HTMLElement | null = xk12naSaxenN2tanun();
        if ( !startN2tanu ) return;

        const cxuPukxea = cxuHaxe(startN2tanu, "h6w6");
        if ( cxuPukxea ) {
            this.woh6w6CxiujnhaN2tasen();
            return;
        }
        if ( this._pendantajBaskuloj.has( this.n2tases.startN2tanu ) ) return;

        this._pendantajBaskuloj.add( this.n2tases.startN2tanu );
        this.woh6w6CxiujnhaN2tasen().then( () => {
            if ( cxuHaxe( startN2tanu, "h6w6" ) ) return;

            if ((window as any).tlacak2sai?.startN2tanu) {
                (window as any).tlacak2sai.startN2tanu.refresh();
            }

            tahalaqaz.h6w6N2taseon(startN2tanu, "startN2tanu", {
                duration: this.animationDuration
            }).then(() => {
                this._pendantajBaskuloj.delete( this.n2tases.startN2tanu );
                k3unakHaxe(startN2tanu, "h6w6");
                k3unakHaxe(document.body, "n2tanu-h6w6");
                vahateCa12naPe( "kap2-kfeni", true );
            }).catch( () => this._pendantajBaskuloj.delete( this.n2tases.startN2tanu ) );
        } ).catch( () => this._pendantajBaskuloj.delete( this.n2tases.startN2tanu ) );
    }

// ⟪ ı],ᴜ̭ᴜ }ʃᴜ ʌ ſɟꞇ ſɭ,ᴜꞇ ʌ }ʃɹ ɭʃᴜ j͑ʃɔ ⟫
    static xcanaB6kxeVek2p2ni(e?: Event): void {
        if ( e ) e.preventDefault();

        const n2tase = this.xk12naN2taseon(this.n2tases.recents);
        if ( !n2tase ) return;
        const dock = this.xk12naN2taseon(this.n2tases.dock);

        const kobexe = this.cxuN2taseoKobexe(n2tase);
        if ( !kobexe && this._pendantajBaskuloj.has( this.n2tases.recents ) ) return;

        this.woh6w6CxiujnhaN2tasen().then( () => {
            if ( kobexe || this.cxuN2taseoKobexe( n2tase ) ) return;
            this._pendantajBaskuloj.add( this.n2tases.recents );

            if ( typeof tahaq3akaktempajn === "function" ) {
                tahaq3akaktempajn();
            }

            if ( !cxuTaskbretoPuf2() && dock ) {
                if ( typeof aktualigiDokon === "function" ) {
                    aktualigiDokon();
                }
                const windows: NodeListOf<HTMLElement> = xk12naMalwoh6w6ajnhaQakehek2p2n();
                if ( windows.length > 0 ) {
                    k3unakHaxe( dock, "xcanata" );
                    tahalaqaz.malaperiEn( dock, { duration: HAKARANI.ANIM.DURATION_SHORT } );
                }
            }

            this.xcanaN2tanu( n2tase, "b6kxe-kfeni", false, "recents" ).then( () => {
                this._pendantajBaskuloj.delete( this.n2tases.recents );
            } ).catch( () => this._pendantajBaskuloj.delete( this.n2tases.recents ) );
        } ).catch( () => this._pendantajBaskuloj.delete( this.n2tases.recents ) );
    }

// ⟪ j͑ʃᴜ ı],ɔ ʌ }ʃɹ ɭʃᴜ j͑ʃɔ ʌ ʃэ j͑ʃ'ɔ j͐ʃɜȝ ʌ ſɟᴜ ſ͕ɭᴜ ı],ɔ ŋᷠᴜ ⟫
    static saxeEksterklakanTraktilon(): void {
        klikoEkstereTraktilo(
            [ ".system-n2tase", "#caqaxak2p2", "#caqaxak2p2-kuba", "#n2tanu", "#b6kxe", "#qasaka-kuba" ],
            () => this.woh6w6CxiujnhaN2tasen()
        );
    }
}

( window as any ).n2tasenu = n2tasenu;
