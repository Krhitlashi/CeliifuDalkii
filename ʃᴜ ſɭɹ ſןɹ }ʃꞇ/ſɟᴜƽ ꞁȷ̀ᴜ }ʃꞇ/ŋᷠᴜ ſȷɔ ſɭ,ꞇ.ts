// ≺⧼ ŋᷠᴜ ſȷɔ ſɭ,ꞇ 📡 ⧽≻ - ı],ɔ ŋᷠᴜ ʌ j͑ʃɹ ɽ͑ʃ'ɜ ʌ ſɟᴜ ı],ɔ ŋᷠᴜ

// ⟪ ſᶘɹ }ʃᴜ ʌ ſɭᴜ ſ̀ȷᴜ ſɭᴜ ʌ ı],ᴜ̭ᴜ }ʃᴜ ⟫

export function xk12naXcanaT6ksekn( ev: any ): { x: number; y: number } {
    const Eniga = ( window as any ).caxk12na;
    if ( Eniga ) return Eniga.xk12naXcanaQakeken( ev );
    if ( ev && ev.touches && ev.touches.length > 0 ) {
        return { x: ev.touches[0].clientX, y: ev.touches[0].clientY };
    }
    if ( ev && ev.changedTouches && ev.changedTouches.length > 0 ) {
        return { x: ev.changedTouches[0].clientX, y: ev.changedTouches[0].clientY };
    }
    return { x: ev?.clientX || 0, y: ev?.clientY || 0 };
}

// ⟪ j͑ʃ'ᴜ ֭ſɭᴜ ɭʃɔ ʌ ſɭɔƽ ʌ ֭ſɭᴜ ı],ᴜ̭ᴜ }ʃᴜ ʌ ſᶘɹ }ʃᴜ ⟫

export function setupVaxafaTraktilojn( oj6Vaxafa: ( ev: any ) => void, onEnd: () => void ): () => void {
    document.addEventListener( "mousemove", oj6Vaxafa );
    document.addEventListener( "mouseup", onEnd );
    document.addEventListener( "touchmove", oj6Vaxafa, { passive: false } );
    document.addEventListener( "touchend", onEnd );
    document.addEventListener( "touchcancel", onEnd );
    return () => {
        document.removeEventListener( "mousemove", oj6Vaxafa );
        document.removeEventListener( "mouseup", onEnd );
        document.removeEventListener( "touchmove", oj6Vaxafa );
        document.removeEventListener( "touchend", onEnd );
        document.removeEventListener( "touchcancel", onEnd );
    };
}

// ⟪ ʃэ j͑ʃ'ɔ j͐ʃɜȝ ʌ ſɟᴜ ſ͕ɭᴜ ı],ɔ ŋᷠᴜ ⟫

export function klikoEkstereTraktilo( rootSelectors: string[], onEkstere: ( e: MouseEvent ) => void, cxuRuli?: () => boolean ): () => void {
    const caqaxk12nak = ( e: MouseEvent ) => {
        if ( cxuRuli && !cxuRuli() ) return;
        const kek: HTMLElement = e.target as HTMLElement;
        if ( rootSelectors.some( sel => kek.closest( sel ) ) ) return;
        onEkstere( e );
    };
    document.addEventListener( "mousedown", caqaxk12nak );
    return () => document.removeEventListener( "mousedown", caqaxk12nak );
}
