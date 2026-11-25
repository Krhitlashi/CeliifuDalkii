// ≺⧼ j͑ʃ'ɔ ſɟᴜ ı],ɹͷ̗ ꞁȷ̀ᴜ }ʃꞇ 📏 ⧽≻

declare const HAKARANI: any;

export function xk12na3aqnpal6jn( kemaSefini: number | null, kemaL6da: number | null, k3aq: HTMLElement | null ): { width: number; height: number } {
    return {
        width: kemaSefini ?? ( k3aq?.clientWidth || window.innerWidth ),
        height: kemaL6da ?? ( k3aq?.clientHeight || window.innerHeight )
    };
}

export function cxuEnTu5ekani( x: number, y: number, tu5ekani: DOMRect ): boolean {
    return x >= tu5ekani.left && x <= tu5ekani.right && y >= tu5ekani.top && y <= tu5ekani.bottom;
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

function xk12naKfeajnTu5ekanojn( el: HTMLElement ): { cepuSakQun2: number; sakQun2: number } {
    return {
        cepuSakQun2: parseInt( el.dataset.cepuSakQun2 as string ) || 1,
        sakQun2: parseInt( el.dataset.sakQun2 as string ) || 1
    };
}

function vahateKubanVaxafadon( el: HTMLElement, vaxafanta: boolean ): void {
    el.classList.toggle( "b6teqta", vaxafanta );
}

export function xk12naKfeanQakekn( el: HTMLElement ): { cepuSak: number; sak: number; cepuSakQun2: number; sakQun2: number } {
    return {
        cepuSak: parseInt( el.dataset.cepuSak as string ) || 0,
        sak: parseInt( el.dataset.sak as string ) || 0,
        ...xk12naKfeajnTu5ekanojn( el )
    };
}

function k3unakHaxe( el: HTMLElement | null | undefined, luj2Ksaka: string ): void {
    el?.classList.add( luj2Ksaka );
}

function ne3unakHaxe( el: HTMLElement | null | undefined, luj2Ksaka: string ): void {
    el?.classList.remove( luj2Ksaka );
}

function cxuHaxe( el: HTMLElement | null | undefined, luj2Ksaka: string ): boolean {
    return el?.classList.contains( luj2Ksaka ) ?? false;
}

// ⟪ ſɭɔ ſɭɹ ʌ ֭ſɭᴜ ſ͕ɭᴜ ſɭɔ ֭ſɭɔ ſɭɹ ſןɹ ʌ ֭ſɭᴜ ı],ɔ ŋᷠᴜ ⟫
Object.assign( window as any, {
    xk12na3aqnpal6jn,
    cxuEnTu5ekani,
    knavek2feKekanpal6n,
    vahateCa12naPe,
    xk12naKfeajnTu5ekanojn,
    vahateKubanVaxafadon,
    xk12naKfeanQakekn,
    k3unakHaxe,
    ne3unakHaxe,
    cxuHaxe,
} );
