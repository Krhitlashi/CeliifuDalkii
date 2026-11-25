// ≺⧼ ſɭʞɔ }ʃꞇ 🌐 ⧽≻

declare const HAKARANI: any;
declare const HAVEK2P2NI: any;
declare const skakefani: any;
declare const arakehek2p2: any;

interface Qavek2p2niaInformo {
    raqa: string;
    kobek2: boolean;
}

function xk12naQavek2p2nion(): HTMLElement | null {
    return document.getElementById( "caqaxak2p2" );
}

function xk12naSaxenN2tanun(): HTMLElement | null {
    return document.getElementById( "n2tanu" );
}

function xk12naHafenAreon(): HTMLElement | null {
    return document.getElementById( "kap2-kfeni" );
}

function xk12naQakehek2p2an3aqn(): HTMLElement | null {
    return document.getElementById( "qakehek2p2-kuba" );
}

function xk12naMalwoh6w6ajnhaQakehek2p2n(): NodeListOf<HTMLElement> {
    return document.querySelectorAll( ".qakehek2p2" );
}

function xk12naTaskbretonInfo(): Qavek2p2niaInformo {
    const taskbar = xk12naQavek2p2nion();
    const raqa = taskbar?.dataset.position || "ctama";
    return { raqa, kobek2: raqa === "ctama" || raqa === "ptama" };
}

function xk12naQavek2p2nianpal6n(): number {
    return parseInt( getComputedStyle( document.documentElement ).getPropertyValue( HAKARANI.CSS_VARS.caqaxak2p2Size ) ) || HAKARANI.SYS.TASKBAR_SIZE;
}

function cxuTaskbretoPuf2(): boolean {
    const kobek2 = window.innerWidth <= window.innerHeight;
    return kobek2 ? window.innerWidth >= HAKARANI.BREAKPOINTS.MOBILE : window.innerHeight >= HAKARANI.BREAKPOINTS.MOBILE;
}

function xk12naQakehek2p2anK61epuf2n( qakehek2p2o: HTMLElement ): string {
    const tabaK61epuf2 = qakehek2p2o.querySelector( ".vula-ca12na[aria-pressed=true] .vula-hate" ) as HTMLElement | null;
    return tabaK61epuf2?.innerText
        || ( qakehek2p2o.querySelector( ".hate-nar2sa-hate" ) as HTMLElement | null )?.innerText
        || "App";
}

function xk12naTextojn(): { [key: string]: string } {
    const lang = document.documentElement.lang || "aih";
    return ( typeof skakefani !== "undefined" && ( skakefani as any )[ lang ] )
        ? ( skakefani as any )[ lang ]
        : ( skakefani ? ( skakefani as any ).en : {} );
}

function xk12naQakehek2p2anAdministranton(): any {
    return ( window as any ).arakehek2p2 || ( typeof arakehek2p2 !== "undefined" ? arakehek2p2 : null );
}

// ⟪ ſɭɔ ſɭɹ ʌ ֭ſɭᴜ ſ͕ɭᴜ ſɭɔ ֭ſɭɔ ſɭɹ ſןɹ ʌ ֭ſɭᴜ ı],ɔ ŋᷠᴜ ⟫
Object.assign( window as any, {
    xk12naQavek2p2nion,
    xk12naSaxenN2tanun,
    xk12naHafenAreon,
    xk12naQakehek2p2an3aqn,
    xk12naMalwoh6w6ajnhaQakehek2p2n,
    xk12naTaskbretonInfo,
    xk12naQavek2p2nianpal6n,
    cxuTaskbretoPuf2,
    xk12naQakehek2p2anK61epuf2n,
    xk12naTextojn,
    xk12naQakehek2p2anAdministranton,
} );
