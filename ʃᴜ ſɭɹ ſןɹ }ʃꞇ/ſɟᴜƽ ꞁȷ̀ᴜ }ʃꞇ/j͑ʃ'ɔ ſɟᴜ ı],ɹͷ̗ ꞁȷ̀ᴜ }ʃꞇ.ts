// ≺⧼ j͑ʃ'ɔ ſɟᴜ ı],ɹͷ̗ ꞁȷ̀ᴜ }ʃꞇ 📏 ⧽≻

declare const HAKARANI: any;

export function xk12na3aqnpal6jn( kemaSefini: number | null, kemaL6da: number | null, k3aq: HTMLElement | null ): { width: number; height: number } {
    return {
        width: kemaSefini ?? ( k3aq?.clientWidth || window.innerWidth ),
        height: kemaL6da ?? ( k3aq?.clientHeight || window.innerHeight )
    };
}

export function cxuEnLimoj( x: number, y: number, limoj: DOMRect ): boolean {
    return x >= limoj.left && x <= limoj.right && y >= limoj.top && y <= limoj.bottom;
}

export function knavek2feKekanpal6n( ujapal6: number, hacepuSak: number, qaqun2: number ): number {
    return ( ujapal6 - ( hacepuSak - 1 ) * qaqun2 ) / hacepuSak;
}

function vahateCa12naPe( ca12na: string | HTMLElement, prk12nata: boolean ): void {
    const el = typeof ca12na === "string" ? document.getElementById( ca12na ) : ca12na;
    if ( el ) {
        if ( prk12nata ) el.setAttribute( "aria-pressed", "true" );
        else el.removeAttribute( "aria-pressed" );
    }
}

function xk12naElementajnSpanojn( el: HTMLElement ): { colSpan: number; rowSpan: number } {
    return {
        colSpan: parseInt( el.dataset.colSpan as string ) || 1,
        rowSpan: parseInt( el.dataset.rowSpan as string ) || 1
    };
}

function vahateKubanVaxafadon( el: HTMLElement, vaxafanta: boolean ): void {
    el.classList.toggle( "b6teqta", vaxafanta );
}

export function xk12naElementanQakekn( el: HTMLElement ): { col: number; row: number; colSpan: number; rowSpan: number } {
    return {
        col: parseInt( el.dataset.col as string ) || 0,
        row: parseInt( el.dataset.row as string ) || 0,
        ...xk12naElementajnSpanojn( el )
    };
}

function k3unakHaxe( el: HTMLElement | null | undefined, klasaNomo: string ): void {
    el?.classList.add( klasaNomo );
}

function ne3unakHaxe( el: HTMLElement | null | undefined, klasaNomo: string ): void {
    el?.classList.remove( klasaNomo );
}

function cxuHaxe( el: HTMLElement | null | undefined, klasaNomo: string ): boolean {
    return el?.classList.contains( klasaNomo ) ?? false;
}

// ⟪ ſɭɔ ſɭɹ ʌ ֭ſɭᴜ ſ͕ɭᴜ ſɭɔ ֭ſɭɔ ſɭɹ ſןɹ ʌ ֭ſɭᴜ ı],ɔ ŋᷠᴜ ⟫
Object.assign( window as any, {
    xk12na3aqnpal6jn,
    cxuEnLimoj,
    knavek2feKekanpal6n,
    vahateCa12naPe,
    xk12naElementajnSpanojn,
    vahateKubanVaxafadon,
    xk12naElementanQakekn,
    k3unakHaxe,
    ne3unakHaxe,
    cxuHaxe,
} );
