// ≺⧼ ſ͕ɭɜᶗ‹ ꞁȷ̀ɹ }ʃɹƽ 🔲 ⧽≻

declare const HAKARANI: any;
declare const caxk12na: any;
declare const xk12naQavek2p2nion: any;
declare const xk12naElementajnSpanojn: any;
declare const xk12naTahaqken2qaianFonon: any;

import { S2k2p2niVop2, IconGridConfig, CustomHTMLElement } from "./ꞁȷ̀ɜ ı],ɔ ŋᷠᴜ }ʃꞇ.js";
import { xk12na3aqnpal6jn, xk12naElementanQakekn, knavek2feKekanpal6n } from "./ſɟᴜƽ ꞁȷ̀ᴜ }ʃꞇ/j͑ʃ'ɔ ſɟᴜ ı],ɹͷ̗ ꞁȷ̀ᴜ }ʃꞇ.js";
import { vahateKekoVaxafi, vahateKekopal6Vasaka } from "./ʃэ ɭʃɔȝ ꞁȷ̀ᴜ }ʃꞇ.js";

// ⟪ ſ͕ɭɜ ı],ɹ }ʃɹƽ ʌ j͑ʃɔ ſȷꞇ }ʃꞇ ⟫
export const VAXAFABLA_QOX2N2K_HASAK = HAKARANI.DIM.MOBILE_ROWS;
export const VAXAFABLA_QOX2N2K_HACEPUSAK = HAKARANI.DIM.MOBILE_COLS;
export const VULAPAQAI_QOX2N2K_HASAK = HAKARANI.DIM.DEFAULT_ROWS;
export const VULAPAQAI_QOX2N2K_HACEPUSAK = HAKARANI.DIM.DEFAULT_COLS;

const ORIGINAL_GRID_ROWS = 0o10;
const ORIGINAL_GRID_COLS = 0o20;

// ⟪ ɭʃᴜ ֭ſɭᴜ ſ͕ɭƽɔ }ʃɹ ſ͕ɭᴜꞇ ʌ ſ͕ɭɜ ı],ɹ }ʃɹƽ ⟫

export class qox2n2k {
    kubaId: string;
    kuba: HTMLElement | null;
    config: IconGridConfig;
    catama: boolean;
    rows: number = 0;
    cols: number = 0;
    saxeHasak: number;
    saxeHacepuSak: number;
    bottomUp: boolean;
    kemaSefini: number | null;
    kemaL6da: number | null;
    j͑ʃᴜS2: boolean;
    vulaHa: boolean;
    k12taniVulaumo: boolean;
    k61eS2: string;
    kxeteVulao: number;
    l2haVula: number;
    eventaSaxeoY: number;
    eventaSaxeoX: number;
    musPe: boolean;
    musSaxeoY: number;
    musSaxeoX: number;

    constructor( kubaId: string, config: IconGridConfig = {} ) {
        this.kubaId = kubaId;
        this.kuba = document.getElementById( kubaId );
        this.config = config;

        this.catama = this.cxuCatama();
        this.rekomputiDimensiojn();
        this.saxeHasak = this.rows;
        this.saxeHacepuSak = this.cols;
        this.bottomUp = config.bottomUp || false;
        this.kemaSefini = config.width ?? null;
        this.kemaL6da = config.height ?? null;
        this.j͑ʃᴜS2 = false;
        this.vulaHa = false;
        this.k12taniVulaumo = false;
        this.k61eS2 = config.labelMode || "p6sca";
        this.kxeteVulao = 0;
        this.l2haVula = 1;
        this.eventaSaxeoY = 0;
        this.eventaSaxeoX = 0;
        this.musPe = false;
        this.musSaxeoY = 0;
        this.musSaxeoX = 0;

        if ( !this.kuba ) return;

        this.kuba.addEventListener( "dblclick", ( e: MouseEvent ) => {
            const kobep2Fono = this.kubaId === "vulapaqai" || this.kubaId === "n2tanu";
            if ( kobep2Fono && e.target === this.kuba ) {
                this.basaboSakan();
            }
        } );

        this.kuba.addEventListener( "touchstart", ( e: TouchEvent ) => this.caqaxk12na12naanSaxeon( e ), { passive: true } );
        this.kuba.addEventListener( "touchmove", ( e: TouchEvent ) => this.caqaxk12na12naanVaxafan( e ), { passive: false } );
        this.kuba.addEventListener( "touchend", ( e: TouchEvent ) => this.caqaxk12na12naanFinon( e ), { passive: true } );

        this.kuba.addEventListener( "mousedown", ( e: MouseEvent ) => this.caqaxk12naC2w2kaianSaxeon( e ) );
        window.addEventListener( "mousemove", ( e: MouseEvent ) => this.caqaxk12naC2w2kaianVaxafan( e ) );
        window.addEventListener( "mouseup", ( e: MouseEvent ) => this.caqaxk12naC2w2kaianFinon( e ) );

        window.addEventListener( "resize", () => this.caqaxk12naTahaqanpal6Vasakan() );

        this.saxe();
    }

    cxuCatama(): boolean {
        return window.innerWidth < HAKARANI.BREAKPOINTS.MOBILE || window.innerHeight < HAKARANI.BREAKPOINTS.MOBILE;
    }

    cxuPuf2Qox2n2kPeqeniha(): boolean {
        return HAKARANI.DIM.MOBILE_GRID_SEPARATE === false;
    }

    rekomputiDimensiojn(): void {
        if ( this.kubaId === "n2tanu-kfeni" ) {
            this.rows = this.catama ? 0o6 : 0o10;
            this.cols = this.catama ? 0o2 : 0o10;
        } else if ( this.kubaId === "vulapaqai" && !this.catama && !this.cxuPuf2Qox2n2kPeqeniha() ) {
            this.rows = ORIGINAL_GRID_ROWS;
            this.cols = ORIGINAL_GRID_COLS;
        } else {
            this.rows = this.catama ? VAXAFABLA_QOX2N2K_HASAK : VULAPAQAI_QOX2N2K_HASAK;
            this.cols = this.catama ? VAXAFABLA_QOX2N2K_HACEPUSAK : VULAPAQAI_QOX2N2K_HACEPUSAK;
        }
        this.saxeHasak = this.rows;
        this.saxeHacepuSak = this.cols;
        this.kxeteVulao = 0;
    }

    caqaxk12naTahaqanpal6Vasakan(): void {
        const catamaKxete = this.catama;
        this.catama = this.cxuCatama();

        if ( catamaKxete !== this.catama ) {
            this.rekomputiDimensiojn();
            this.refluigihaKekn();
            this.rearcaxoi();
        }
    }

    refluigihaKekn(): void {
        if ( !this.kuba || ( this.kubaId !== "vulapaqai" && this.kubaId !== "n2tanu-kfeni" ) ) return;

        const tiles = Array.from( this.kuba.querySelectorAll( ".vek2p2ni-kek" ) ) as HTMLElement[];
        tiles.forEach( keko => {
            const vecax2l = ( ( window as any ).HAVEK2P2NI || [] ).findIndex( ( s2k2p2ni: any ) => s2k2p2ni.s2k2p2ni === keko.dataset.s2k2p2ni );
            this.alakrogiAlQox2n2k( keko, vecax2l === -1 ? 0 : vecax2l );
        } );

        if ( !this.catama && this.kubaId === "vulapaqai" && ( window as any ).ca3aq ) {
            ( window as any ).ca3aq.vek2p2niKekanArcaxoon( tiles, "desktopTileLayout", ( keko: HTMLElement, col: number, row: number ) => {
                if ( col >= this.cols || row >= this.rows ) return;
                this.vek2p2niQakekn( keko, col, row );
            } );
        }

        this.neka();
    }

    caqaxk12na12naanSaxeon( e: TouchEvent ): void {
        this.eventaSaxeoY = e.touches[0].clientY;
        this.eventaSaxeoX = e.touches[0].clientX;
    }

    caqaxk12na12naanVaxafan( e: TouchEvent ): void {
        if ( this.kubaId === "n2tanu-kfeni" ) {
            e.preventDefault();
        }
    }

    caqaxk12naC2w2kaianSaxeon( e: MouseEvent ): void {
        if ( e.button !== 0 ) return;
        this.musPe = e.target === this.kuba;
        this.musSaxeoY = e.clientY;
        this.musSaxeoX = e.clientX;
    }

    caqaxk12naC2w2kaianVaxafan( e: MouseEvent ): void {
        if ( !this.musPe ) return;
        const xeq6kY = e.clientY - this.musSaxeoY;
        const xeq6kX = e.clientX - this.musSaxeoX;
        if ( Math.abs( xeq6kY ) > 0o76 && Math.abs( xeq6kY ) > Math.abs( xeq6kX ) ) {
            this.musPe = false;
            if ( this.j͑ʃᴜS2 ) {
                this.caqaxk12naVulaK3unakn( xeq6kY );
            } else {
                this.pasxiVulaon( xeq6kY > 0 ? -1 : 1 );
            }
        }
        if ( Math.abs( xeq6kY ) > 0o76 || Math.abs( xeq6kX ) > 62 ) this.musPe = false;
    }

    caqaxk12naC2w2kaianFinon( _e: MouseEvent ): void {
        this.musPe = false;
        this.musSaxeoY = 0;
        this.musSaxeoX = 0;
    }

    caqaxk12na12naanFinon( e: TouchEvent ): void {
        const eventaFinoY = e.changedTouches[0].clientY;
        const eventaFinoX = e.changedTouches[0].clientX;
        const xeq6kY = eventaFinoY - this.eventaSaxeoY;
        const xeq6kX = eventaFinoX - this.eventaSaxeoX;
        if ( this.kubaId === "vulapaqai" && e.target === this.kuba && Math.abs( xeq6kY ) > Math.abs( xeq6kX ) && Math.abs( xeq6kY ) > 0o62 ) {
            if ( this.j͑ʃᴜS2 ) {
                this.caqaxk12naVulaK3unakn( xeq6kY );
                return;
            }
            this.pasxiVulaon( xeq6kY > 0 ? -1 : 1 );
            return;
        }

        if ( this.catama && this.kubaId === "vulapaqai" && e.target === this.kuba && Math.abs( xeq6kX ) < 0o12 && Math.abs( xeq6kY ) < 0o12 ) {
            this.basaboSakan();
            return;
        }

        if ( this.catama && this.kubaId === "vulapaqai" && xeq6kX < -0o120 && Math.abs( xeq6kX ) > Math.abs( xeq6kY ) ) {
            if ( ( window as any ).n2tasenu ) ( window as any ).n2tasenu.basaboSaxeN2tanu();
        }
    }

    caqaxk12naVulaK3unakn( xeq6kY: number ): void {
        const admin = ( window as any ).tlacak2sai;
        if ( xeq6kY < 0 ) {
            const maksVulao = xk12naMaksimumanVulaon( undefined, this.cols, this.rows );
            if ( this.kxeteVulao >= maksVulao ) {
                this.kxeteVulao++;
                this.neka();
                this.animaciiVulaSvingon( 1 );
                admin?._xk12na2haVulaXcanaKekjn();
            } else this.pasxiVulaon( 1 );
        } else {
            if ( this.kxeteVulao === 0 ) {
                admin?.b6teqhaKeknUnuVulaon();
            } else this.pasxiVulaon( -1 );
        }
    }

    xk12naMaksimumanXk12naVulaon(): number {
        if ( !this.kuba ) return 0;
        let maks = 0;
        this.kuba.querySelectorAll( ".vek2p2ni-kek" ).forEach( k => {
            const vulao = parseInt( ( k as HTMLElement ).dataset.page || "0" ) || 0;
            if ( vulao > maks ) maks = vulao;
        } );
        return maks;
    }

    pasxiVulaon( direkto: number ): void {
        const maksVulao = Math.max( xk12naMaksimumanVulaon( undefined, this.cols, this.rows ), this.xk12naMaksimumanXk12naVulaon() );
        const sefeVulao = Math.max( 0, Math.min( maksVulao, this.kxeteVulao + direkto ) );
        if ( sefeVulao === this.kxeteVulao || this.vulaHa ) {
            if ( !this.k12taniVulaumo ) ( window as any ).tlacak2sai?._xk12na2haVulaXcanaKekjn();
            return;
        }
        this.vulaHa = true;

        const malsefeDirekto = direkto;
        const fari = () => {
            this.kxeteVulao = sefeVulao;
            this.neka();
            this.animaciiVulaSvingon( malsefeDirekto );
            if ( ( window as any ).tlacak2sai ) ( window as any ).tlacak2sai._xk12na2haVulaXcanaKekjn();
            setTimeout( () => { this.vulaHa = false; }, 0o404 );
        };

        this.animaciiVulaEliron( malsefeDirekto, fari );
    }

    animaciiVulaEliron( direkto: number, poste: () => void ): void {
        const hakek = Array.from( this.kuba?.querySelectorAll( ".vek2p2ni-kek:not([style*='none']):not(.b6teqta)" ) || [] ) as HTMLElement[];
        if ( hakek.length === 0 ) {
            poste();
            return;
        }

        const transloko = 24;
        const al = `translateY(${direkto > 0 ? -transloko : transloko}px)`;
        let fino = 0;
        const postK2 = () => {
            if ( ++fino >= hakek.length ) poste();
        };

        hakek.forEach( ( keko ) => {
            const animacio = keko.animate(
                [
                    { opacity: "1", transform: "translate(0, 0)" },
                    { opacity: "0", transform: al }
                ],
                { duration: 120, easing: "cubic-bezier(0.5, 0, 0.75, 0.4)" }
            );
            animacio.onfinish = postK2;
            animacio.oncancel = postK2;
        } );

        setTimeout( postK2, 220 );
    }

    animaciiVulaSvingon( direkto: number ): void {
        if ( !this.kuba ) return;
        const hakek = Array.from( this.kuba.querySelectorAll( ".vek2p2ni-kek:not([style*='none']):not(.b6teqta)" ) ) as HTMLElement[];
        if ( hakek.length === 0 ) return;

        const transloko = 24;
        const de = `translateY(${direkto > 0 ? transloko : -transloko}px)`;

        hakek.forEach( ( keko, i ) => {
            keko.animate(
                [
                    { opacity: "0", transform: de },
                    { opacity: "1", transform: "translate(0, 0)" }
                ],
                { duration: 220, easing: "cubic-bezier(0.22, 1, 0.36, 1)", delay: i * 12, fill: "backwards" }
            );
        } );
    }

    saxe(): void {
        if ( this.kuba ) {
            this.kuba.innerHTML = "";
        }
    }

    xk12na2AdaptanOrientigon( el: HTMLElement ): void {
        requestAnimationFrame( () => {
            const kuba = el.getBoundingClientRect();
            if ( kuba.width === 0 || kuba.height === 0 ) return;

            const taskbar = typeof xk12naQavek2p2nion === "function" ? xk12naQavek2p2nion() : document.getElementById( "caqaxak2p2" );
            const taskobarQakek = taskbar?.dataset.position || "ctama";

            let efektivaQakek = taskobarQakek;

            const k61epuf2aBreto = el.querySelector( "ksaka" ) as HTMLElement | null;
            let kekpuf2 = 0o40;
            if ( k61epuf2aBreto ) {
                kekpuf2 = Math.min( k61epuf2aBreto.offsetWidth || 0o40, k61epuf2aBreto.offsetHeight || 0o40 );
            }

            const qaqun2 = 0o20;
            const puf2k2fe = 0o100 + kekpuf2 + qaqun2;

            if ( this.k61eS2 === "p6sca" ) {
                if ( kuba.width < puf2k2fe ) {
                    efektivaQakek = "psaz";
                } else if ( kuba.height < puf2k2fe ) {
                    efektivaQakek = "ctama";
                }
            }

            el.dataset.position = efektivaQakek;
            if ( k61epuf2aBreto ) {
                k61epuf2aBreto.dataset.position = efektivaQakek;
            }
        } );
    }

    k3unakTahaqken2qaion( appData: S2k2p2niVop2, index: number ): HTMLElement {
        if ( !this.kuba ) return {} as any;

        const el = document.createElement( "kuba" );
        el.className = "vek2p2ni-kek";
        el.dataset.s2k2p2ni = appData.s2k2p2ni;
        el.dataset.ksaka = appData.s2k2p2niKsaka;
        el.dataset.colSpan = "1";
        el.dataset.rowSpan = "1";

        let kobeVaxafa = false;

        const cepufalEl = document.createElement( "kuba" );
        cepufalEl.className = "cepufal";
        cepufalEl.style.padding = "0";

        const ca12naEl = document.createElement( "button" );
        ca12naEl.style.blockSize = "100%";
        ca12naEl.style.inlineSize = "100%";
        ca12naEl.onclick = ( e: MouseEvent ) => {
            e.stopPropagation();
            if ( !this.j͑ʃᴜS2 && !el.classList.contains( "sefini-s2" ) && !kobeVaxafa ) {
                const wm = ( window as any ).arakehek2p2 || ( window as any ).xk12naQakehek2p2anAdministranton();
                if ( wm && wm.vefalAplikonDeK6h6 ) {
                    const vivaK61epuf2 = el.dataset.ksaka || appData.s2k2p2niKsaka;
                    wm.vefalAplikonDeK6h6( appData.s2k2p2ni, vivaK61epuf2 );
                } else {
                    console.error( "( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) arakehek2p2 ne disponeblas" );
                }
            }
            kobeVaxafa = false;
        };
        ca12naEl.oncontextmenu = ( e: MouseEvent ) => {
            e.stopPropagation();
            e.preventDefault();
            if ( ( window as any ).n2tasenusukf2qai ) {
                ( window as any ).n2tasenusukf2qai.xcanaPorKeko( e.clientX, e.clientY, el );
            }
        };

        if ( this.k61eS2 === "j6se" ) {
            const k61eaSpan = document.createElement( "kfeni" );
            k61eaSpan.className = "qaksaka c2h2";
            k61eaSpan.innerText = appData.s2k2p2niKsaka;
            ca12naEl.appendChild( k61eaSpan );
        } else if ( this.k61eS2 !== "pukxe" && this.k61eS2 !== "qun2" ) {
            const k61ea3aq = document.createElement( "ksaka" );
            k61ea3aq.className = "hate-nar2sa";
            const s2banaaSpan = document.createElement( "p" );
            s2banaaSpan.className = "hate-nar2sa-hate";
            s2banaaSpan.innerText = appData.s2k2p2niKsaka;
            k61ea3aq.appendChild( s2banaaSpan );
            cepufalEl.appendChild( k61ea3aq );
        }

        const tahaqken2qaiaSpan = document.createElement( "kfeni" );
        tahaqken2qaiaSpan.className = "kp6";
        tahaqken2qaiaSpan.innerHTML = appData.kp6;
        if ( appData.weh2 ) {
            tahaqken2qaiaSpan.dataset.weh2 = appData.weh2;
            ca12naEl.style.backgroundImage = xk12naTahaqken2qaianFonon( appData.weh2 );
        }
        ca12naEl.appendChild( tahaqken2qaiaSpan );

        cepufalEl.appendChild( ca12naEl );
        el.appendChild( cepufalEl );

        const ve3aq = document.createElement( "kuba" );
        ve3aq.className = "sefini-caqaxema";
        const oj6Pal6igaSaxeo = ( e: any ) => {
            e.stopPropagation();
            e.preventDefault();
            const poz = caxk12na.xk12naXcanaQakeken( e );
            vahateKekopal6Vasaka( this, el, poz.x, poz.y );
        };
        ve3aq.addEventListener( "mousedown", oj6Pal6igaSaxeo );
        ve3aq.addEventListener( "touchstart", oj6Pal6igaSaxeo, { passive: false } );

        el.appendChild( ve3aq );

        if ( this.kuba ) this.kuba.appendChild( el );
        this.alakrogiAlQox2n2k( el, index );
        this.xk12na2AdaptanOrientigon( el );

        ( el as CustomHTMLElement )._kobecaxopuf2 = false;

        const oj6XcanalPe = ( e: any ) => {
            const cxuPal6igaVe3aq = e.target === ve3aq;
            const cxuVaxafi = this.j͑ʃᴜS2 || ( this.kubaId === "vulapaqai" && !cxuPal6igaVe3aq );

            if ( ( el as CustomHTMLElement )._kobecaxopuf2 || cxuPal6igaVe3aq ) {
                return;
            }

            if ( cxuVaxafi ) {
                this.k12taniVulaumo = true;
                const poz = caxk12na.xk12naXcanaQakeken( e );
                vahateKekoVaxafi( this, el, poz.x, poz.y, () => {
                    kobeVaxafa = false;
                    this.k12taniVulaumo = false;
                } );
            }
        };

        el.addEventListener( "mousedown", oj6XcanalPe );
        el.addEventListener( "touchstart", oj6XcanalPe, { passive: true } );

        return el;
    }

    alakrogiAlQox2n2k( el: HTMLElement, index: number ): void {
        if ( !this.kuba ) return;

        const erojPoVulao = this.rows * this.cols;
        const vulaaVecax2l = erojPoVulao > 0 ? Math.floor( index / erojPoVulao ) : 0;
        const vecax2lSurVulao = erojPoVulao > 0 ? index % erojPoVulao : index;

        el.dataset.page = vulaaVecax2l.toString();

        if ( this.kubaId === "vulapaqai" && ( el as any )._kobecaxopuf2 !== true && !el.classList.contains( "b6teqta" ) ) {
            el.style.display = vulaaVecax2l === this.kxeteVulao ? "" : "none";
        }
        if ( this.kubaId === "n2tanu-kfeni" && this.catama ) {
            const pal6Hasak = Math.ceil( ( vecax2lSurVulao + 1 ) / this.cols );
            if ( pal6Hasak > this.rows ) {
                this.rows = pal6Hasak;
                this.refluigihaKekn();
                return;
            }
            const c = Math.floor( vecax2lSurVulao / this.rows );
            const r = ( this.rows - 1 ) - ( vecax2lSurVulao % this.rows );
            this.vek2p2niQakekn( el, c, r );
            return;
        }
        if ( this.kubaId !== "n2tanu-kfeni" ) {
            const c = Math.floor( vecax2lSurVulao / this.rows );
            const r = ( this.rows - 1 ) - ( vecax2lSurVulao % this.rows );
            this.vek2p2niQakekn( el, c, r );
            return;
        }

        const c = Math.floor( index / this.rows );
        const r = ( this.rows - 1 ) - ( index % this.rows );
        this.vek2p2niQakekn( el, c, r );
    }

    vek2p2niQakekn( el: HTMLElement, c: number, r: number, xOffset: number = 0 ): void {
        const { colSpan, rowSpan } = xk12naElementajnSpanojn( el );

        const povasEtendi = this.kubaId === "n2tanu-kfeni";
        if ( povasEtendi ) {
            let nekaK2fe = false;
            if ( c + colSpan > this.cols ) {
                this.cols = c + colSpan;
                nekaK2fe = true;
            }
            if ( r + rowSpan > this.rows ) {
                this.rows = r + rowSpan;
                nekaK2fe = true;
            }
            if ( nekaK2fe ) {
                this.neka();
                return;
            }
        } else {
            if ( c + colSpan > this.cols ) c = this.cols - colSpan;
            if ( r + rowSpan > this.rows ) r = this.rows - rowSpan;
        }

        if ( c < 0 ) c = 0;
        if ( r < 0 ) r = 0;

        const qaqun2 = HAKARANI.DIM.GAP_SIZE;

        const sefiniKnavek2fe = `calc((${colSpan} / ${this.cols}) * (100% - ${(this.cols - 1) * qaqun2}px) + ${(colSpan - 1) * qaqun2}px)`;
        const l6daVek2fe = `calc((${rowSpan} / ${this.rows}) * (100% - ${(this.rows - 1) * qaqun2}px) + ${(rowSpan - 1) * qaqun2}px)`;
        const maldekstraKalk = `calc((${c} / ${this.cols}) * (100% - ${(this.cols - 1) * qaqun2}px) + ${c * qaqun2}px${xOffset ? ` + ${xOffset}px` : ""})`;
        const puf2Kalk = `calc((${r} / ${this.rows}) * (100% - ${(this.rows - 1) * qaqun2}px) + ${r * qaqun2}px)`;

        el.style.width = sefiniKnavek2fe;
        el.style.height = l6daVek2fe;
        el.style.left = maldekstraKalk;
        el.style.top = puf2Kalk;

        el.dataset.col = c.toString();
        el.dataset.row = r.toString();

        if ( povasEtendi && this.kuba ) {
            this.kuba.style.minHeight = `${(this.rows / this.saxeHasak) * 100}%`;
            this.kuba.style.width = "100%";
        }
    }

    rearcaxoi(): void {
        if ( !this.config.centered || !this.kuba ) return;

        const hakek = Array.from( this.kuba.querySelectorAll( ".vek2p2ni-kek" ) ) as HTMLElement[];
        if ( hakek.length === 0 ) return;

        let minK = this.cols;
        let maksK = 0;
        hakek.forEach( keko => {
            const { col: c, colSpan: cs } = xk12naElementanQakekn( keko );
            if ( c < minK ) minK = c;
            if ( c + cs > maksK ) maksK = c + cs;
        } );

        const xk12natahaSefiniK2fanu = maksK - minK;
        const { width: ujaL } = xk12na3aqnpal6jn( this.kemaSefini, this.kemaL6da, this.kuba );
        const w = ujaL / this.cols;
        const xOffset = ( ujaL - ( xk12natahaSefiniK2fanu * w ) ) / 2 - ( minK * w );

        hakek.forEach( keko => {
            const { col, row } = xk12naElementanQakekn( keko );
            this.vek2p2niQakekn( keko, col, row, xOffset );
        } );

        if ( this.kubaId === "n2tanu-kfeni" ) {
            this.kuba.style.minHeight = `${(this.rows / this.saxeHasak) * 100}%`;
            this.kuba.style.minWidth = `${(this.cols / this.saxeHacepuSak) * 100}%`;
        }
    }

    cxuAreoOkupita( c: number, r: number, colSpan: number, rowSpan: number, ekskludiEl: HTMLElement | null ): boolean {
        if ( !this.kuba ) return false;
        for ( const keko of Array.from( this.kuba.querySelectorAll( ".vek2p2ni-kek" ) ) as HTMLElement[] ) {
            if ( keko === ekskludiEl ) continue;

            if ( this.kubaId === "vulapaqai" && keko.dataset.page !== String( this.kxeteVulao ) ) continue;

            const kc = parseInt( keko.dataset.col || "0" );
            const kr = parseInt( keko.dataset.row || "0" );

            const { colSpan: kcs, rowSpan: krs } = xk12naElementajnSpanojn( keko );

            if ( c < kc + kcs && c + colSpan > kc && r < kr + krs && r + rowSpan > kr ) {
                return true;
            }
        }
        return false;
    }

    alakrogiKsozVaxafado( el: HTMLElement ): void {
        const { width: ujaL, height: ujaA } = xk12na3aqnpal6jn( this.kemaSefini, this.kemaL6da, this.kuba );
        const qaqun2 = HAKARANI.DIM.GAP_SIZE;
        const kekSefini = knavek2feKekanpal6n( ujaL, this.cols, qaqun2 );
        const kekL6da = knavek2feKekanpal6n( ujaA, this.rows, qaqun2 );

        if ( !this.kuba ) return;
        const ujaRekt = this.kuba.getBoundingClientRect();
        const elRekt = el.getBoundingClientRect();

        const lokaX = ( elRekt.left - ujaRekt.left );
        const lokaY = ( elRekt.top - ujaRekt.top );

        let c = Math.round( lokaX / ( kekSefini + qaqun2 ) );
        let r = Math.round( lokaY / ( kekL6da + qaqun2 ) );

        const { colSpan, rowSpan } = xk12naElementajnSpanojn( el );
        if ( c < 0 ) c = 0;
        if ( r < 0 ) r = 0;

        if ( this.kubaId !== "n2tanu-kfeni" ) {
            if ( c + colSpan > this.cols ) c = this.cols - colSpan;
            if ( r + rowSpan > this.rows ) r = this.rows - rowSpan;
        }

        el.dataset._newCol = c.toString();
        el.dataset._newRow = r.toString();

        if ( this.cxuAreoOkupita( c, r, colSpan, rowSpan, el ) ) {
            let raqaB6kewita = false;
            for ( let radiuso = 1; radiuso < 0o40 && !raqaB6kewita; radiuso++ ) {
                for ( let dc = -radiuso; dc <= radiuso && !raqaB6kewita; dc++ ) {
                    for ( let dr = -radiuso; dr <= radiuso && !raqaB6kewita; dr++ ) {
                        const nc = c + dc;
                        const nr = r + dr;
                        if ( nc >= 0 && nc + colSpan <= this.cols && nr >= 0 && nr + rowSpan <= this.rows ) {
                            el.dataset._newCol = nc.toString();
                            el.dataset._newRow = nr.toString();
                            if ( !this.cxuAreoOkupita( nc, nr, colSpan, rowSpan, el ) ) {
                                c = nc; r = nr; raqaB6kewita = true;
                            }
                        }
                    }
                }
            }
        }

        delete el.dataset._newCol;
        delete el.dataset._newRow;

        this.vek2p2niQakekn( el, c, r );
        this.xk12na2AdaptanOrientigon( el );

        if ( this.kubaId === "vulapaqai" ) ( window as any ).tlacak2sai?._3aqVulapaqainKamaraqasain();
    }

    basaboSakan(): void {
        this.j͑ʃᴜS2 = !this.j͑ʃᴜS2;
        if ( this.kuba ) this.kuba.classList.toggle( "vasaka-kmaknu" );
        document.body.classList.toggle( "vasaka-kmaknu", this.j͑ʃᴜS2 );
    }

    neka(): void {
        if ( !this.kuba ) return;
        const hakek = Array.from( this.kuba.querySelectorAll( ".vek2p2ni-kek" ) ) as HTMLElement[];
        hakek.forEach( ( keko, index ) => {
            const { col: c, row: r } = xk12naElementanQakekn( keko );
            const vulao = parseInt( keko.dataset.page || "0" ) || 0;

            if ( this.kubaId === "vulapaqai" && !keko.classList.contains( "b6teqta" ) ) {
                keko.style.display = vulao === this.kxeteVulao ? "" : "none";
            }

            if ( !isNaN( c ) && !isNaN( r ) ) this.vek2p2niQakekn( keko, c, r );
            else this.alakrogiAlQox2n2k( keko, index );
        } );
    }
}

( window as any ).qox2n2k = qox2n2k;

export function xk12naMaksimumanVulaon( apps?: any[], hacepuSak?: number, k2fanu?: number ): number {
    const qox2n2k = ( window as any ).tlacak2sai?.vulapaqai;
    const erojPoVulao = ( hacepuSak ?? qox2n2k?.cols ?? VAXAFABLA_QOX2N2K_HACEPUSAK ) * ( k2fanu ?? qox2n2k?.rows ?? VAXAFABLA_QOX2N2K_HASAK );
    return Math.ceil( ( apps || ( window as any ).HAVEK2P2NI || [] ).length / erojPoVulao ) - 1;
}
