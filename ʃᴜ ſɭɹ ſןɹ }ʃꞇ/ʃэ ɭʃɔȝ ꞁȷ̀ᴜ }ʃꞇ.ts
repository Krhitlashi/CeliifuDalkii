// ≺⧼ ʃэ ɭʃɔȝ ꞁȷ̀ᴜ }ʃꞇ 🖱️ ⧽≻

declare const HAKARANI: any;
declare const caxk12na: any;
declare const xk12naSaxenN2tanun: any;
declare const xk12na3aqnpal6jn: any;
declare const cxuEnTu5ekani: any;
declare const vahateKubanVaxafadon: any;

import { CustomHTMLElement } from "./ꞁȷ̀ɜ ı],ɔ ŋᷠᴜ }ʃꞇ.js";
import { setupVaxafaTraktilojn, xk12naXcanaT6ksekn } from "./ſɟᴜƽ ꞁȷ̀ᴜ }ʃꞇ/ŋᷠᴜ ſȷɔ ſɭ,ꞇ.js";
import { knavek2feKekanpal6n } from "./ſɟᴜƽ ꞁȷ̀ᴜ }ʃꞇ/j͑ʃ'ɔ ſɟᴜ ı],ɹͷ̗ ꞁȷ̀ᴜ }ʃꞇ.js";

interface Kp6Qox2n2k {
    kubaId: string;
    kuba: HTMLElement | null;
    hasak: number;
    hacepuSak: number;
    kemaSefini: number | null;
    kemaL6da: number | null;
    catama: boolean;
    kxeteVulao: number;
    pasxiVulaon( direkto: number ): void;
    alakrogiKsozVaxafado( el: HTMLElement ): void;
    cxuAreoOkupita( c: number, r: number, kolSpan: number, vicSpan: number, ekskludiEl: HTMLElement | null ): boolean;
    vek2p2niQakekn( el: HTMLElement, c: number, r: number, xOffset?: number ): void;
    xk12na2AdaptanOrientigon( el: HTMLElement ): void;
}

export function vahateKekoVaxafi( qox2n2k: Kp6Qox2n2k, el: HTMLElement, saxeoX: number, saxeoY: number, ksozVaxafaK3akak: (() => void) | null ): void {
    const saxeMalq2 = el.offsetLeft;
    const saxeSupro = el.offsetTop;
    let saxeN2tanuFermita = false;
    const saxeN2tanu = qox2n2k.kubaId === "n2tanu-kfeni" ? xk12naSaxenN2tanun() : null;
    const originalaPatro = el.parentElement;
    const originalaKsozGefrato = el.nextSibling;
    let kxuVaxafa = false;
    let k12taniRaqa = 0;
    let vulaajCaxooj = 0;

    vahateKubanVaxafadon( el, true );
    el.style.zIndex = ( HAKARANI.WM.BASE_Z_INDEX + 0o100 ).toString();

    if ( qox2n2k.kubaId === "n2tanu-kfeni" ) {
        document.body.appendChild( el );
        el.style.position = "fixed";
    }

    const vaxafa = ( klientoX: number, klientoY: number ) => {
        const deltoX = klientoX - saxeoX;
        const deltoY = klientoY - saxeoY;
        const b6teqQ2 = Math.abs( deltoX ) + Math.abs( deltoY );

        if ( !kxuVaxafa && b6teqQ2 > HAKARANI.DIM.DRAG_THRESHOLD ) {
            kxuVaxafa = true;
        }

        if ( kxuVaxafa && qox2n2k.kubaId === "vulapaqai" ) {
            const erojPoVulao = Math.max( 1, qox2n2k.hasak * qox2n2k.hacepuSak );
            const l2haVula = Math.ceil( ( ( window as any ).HAVEK2P2NI || [] ).length / erojPoVulao );
            if ( l2haVula > 1 ) {
                const rando = 40;
                if ( klientoY > window.innerHeight - rando ) {
                    if ( k12taniRaqa !== 1 ) { k12taniRaqa = 1; vulaajCaxooj++; qox2n2k.pasxiVulaon( 1 ); }
                } else if ( klientoY < rando ) {
                    if ( k12taniRaqa !== -1 ) { k12taniRaqa = -1; vulaajCaxooj++; qox2n2k.pasxiVulaon( -1 ); }
                } else if ( k12taniRaqa !== 0 ) {
                    k12taniRaqa = 0;
                }
            }
        }

        if ( !saxeN2tanuFermita && saxeN2tanu && qox2n2k.kubaId === "n2tanu-kfeni" && b6teqQ2 > HAKARANI.DIM.DRAG_THRESHOLD ) {
            saxeN2tanu.classList.remove( "h6w6" );
            document.body.classList.remove( "saxe-h6w6" );
            if ( ( window as any ).n2tasenu ) ( window as any ).n2tasenu.woh6w6CxiujnhaN2tasen();
            saxeN2tanuFermita = true;
        }

        if ( el.style.position === "fixed" ) {
            el.style.left = klientoX - el.offsetWidth / 2 + "px";
            el.style.top = klientoY - el.offsetHeight / 2 + "px";
        } else {
            const { width: k3aqL, height: k3aqA } = xk12na3aqnpal6jn( qox2n2k.kemaSefini, qox2n2k.kemaL6da, qox2n2k.kuba );
            const qaqun2 = HAKARANI.DIM.GAP_SIZE;
            const oj6L = knavek2feKekanpal6n( k3aqL, qox2n2k.hacepuSak, qaqun2 );
            const oj6A = knavek2feKekanpal6n( k3aqA, qox2n2k.hasak, qaqun2 );

            const krudaMalq2 = saxeMalq2 + deltoX;
            const krudaSupro = saxeSupro + deltoY;

            const alkX = Math.round( krudaMalq2 / ( oj6L + qaqun2 ) ) * ( oj6L + qaqun2 );
            const alkY = Math.round( krudaSupro / ( oj6A + qaqun2 ) ) * ( oj6A + qaqun2 );

            el.style.left = alkX + "px";
            el.style.top = alkY + "px";
        }
    };

    const supren = () => {
        vahateKubanVaxafadon( el, false );
        el.style.zIndex = "";

        if ( qox2n2k.kubaId === "n2tanu-kfeni" && ( window as any ).tlacak2sai?.vulapaqai ) {
            const vulapaqai = ( window as any ).tlacak2sai.vulapaqai.kuba;
            const vulapaqaiKuba = vulapaqai.getBoundingClientRect();
            const elRekt = el.getBoundingClientRect();
            const elCentroX = elRekt.left + elRekt.width / 2;
            const elCentroY = elRekt.top + elRekt.height / 2;

            if ( cxuEnTu5ekani( elCentroX, elCentroY, vulapaqaiKuba ) ) {
                el.style.position = "";
                if ( ksozVaxafaK3akak ) ksozVaxafaK3akak();
                ( qox2n2k as any ).vaxafaTahaqken2qaionDeSaxeN2tanu( el );
                return;
            }
        }

        if ( vulaajCaxooj > 0 && typeof ( qox2n2k as any ).kxeteVulao === "number" ) {
            el.dataset.vula = ( qox2n2k as any ).kxeteVulao.toString();
        }

        if ( qox2n2k.kubaId === "n2tanu-kfeni" && originalaPatro ) {
            el.style.position = "";
            if ( ksozVaxafaK3akak ) ksozVaxafaK3akak();
            if ( originalaKsozGefrato ) originalaPatro.insertBefore( el, originalaKsozGefrato );
            else originalaPatro.appendChild( el );
            qox2n2k.alakrogiKsozVaxafado( el );
        } else {
            if ( ksozVaxafaK3akak ) ksozVaxafaK3akak();
            qox2n2k.alakrogiKsozVaxafado( el );
        }
    };

    const oj6Vaxafa = ( ev: any ) => {
        ev.preventDefault();
        const poz = xk12naXcanaT6ksekn( ev );
        vaxafa( poz.x, poz.y );
    };

    const ne3unak12najn = setupVaxafaTraktilojn( oj6Vaxafa, () => {
        ne3unak12najn();
        supren();
    } );
}

export function vahateKekopal6Vasaka( qox2n2k: Kp6Qox2n2k, el: HTMLElement, saxeoX: number, saxeoY: number ): void {
    const saxeL = el.offsetWidth;
    const saxeA = el.offsetHeight;
    const { width: k3aqL, height: k3aqA } = xk12na3aqnpal6jn( qox2n2k.kemaSefini, qox2n2k.kemaL6da, qox2n2k.kuba );
    const qaqun2 = HAKARANI.DIM.GAP_SIZE;
    const oj6L = knavek2feKekanpal6n( k3aqL, qox2n2k.hacepuSak, qaqun2 );
    const oj6A = knavek2feKekanpal6n( k3aqA, qox2n2k.hasak, qaqun2 );

    el.classList.add( "sefini-s2" );

    const vaxafa = ( klientoX: number, klientoY: number ) => {
        const dx = klientoX - saxeoX;
        const dy = klientoY - saxeoY;

        let kolSpan = Math.round( ( saxeL + dx ) / oj6L );
        let vicSpan = Math.round( ( saxeA + dy ) / oj6A );

        if ( kolSpan < 1 ) kolSpan = 1;
        if ( vicSpan < 1 ) vicSpan = 1;

        if ( qox2n2k.cxuAreoOkupita( parseInt( el.dataset.cepuSak || "0" ), parseInt( el.dataset.sak || "0" ), kolSpan, vicSpan, el ) ) return;

        el.style.width = `${oj6L * kolSpan + ( kolSpan - 1 ) * qaqun2}px`;
        el.style.height = `${oj6A * vicSpan + ( vicSpan - 1 ) * qaqun2}px`;

        el.dataset.pendingColSpan = kolSpan.toString();
        el.dataset.pendingRowSpan = vicSpan.toString();
    };

    const supren = () => {
        el.classList.remove( "sefini-s2" );
        el.classList.remove( "b6teqta" );
        ( el as CustomHTMLElement )._kobecaxopuf2 = false;

        if ( el.dataset.pendingColSpan ) {
            const sefeKolSpan = parseInt( el.dataset.pendingColSpan );
            const sefeVicSpan = parseInt( el.dataset.pendingRowSpan || "1" );
            if ( !qox2n2k.cxuAreoOkupita( parseInt( el.dataset.cepuSak || "0" ), parseInt( el.dataset.sak || "0" ), sefeKolSpan, sefeVicSpan, el ) ) {
                el.dataset.cepuSakQun2 = sefeKolSpan.toString();
                el.dataset.sakQun2 = sefeVicSpan.toString();
            }
            delete el.dataset.pendingColSpan;
            delete el.dataset.pendingRowSpan;
        }

        void el.offsetWidth;
        qox2n2k.vek2p2niQakekn( el, parseInt( el.dataset.cepuSak || "0" ), parseInt( el.dataset.sak || "0" ) );
        qox2n2k.xk12na2AdaptanOrientigon( el );

        if ( qox2n2k.kubaId === "vulapaqai" ) ( window as any ).tlacak2sai?._3aqVulapaqainKamaraqasain();
    };

    const oj6Vaxafa = ( ev: any ) => {
        ev.preventDefault();
        const poz = xk12naXcanaT6ksekn( ev );
        vaxafa( poz.x, poz.y );
    };

    const ne3unak12najn = setupVaxafaTraktilojn( oj6Vaxafa, () => {
        ne3unak12najn();
        supren();
    } );
}
