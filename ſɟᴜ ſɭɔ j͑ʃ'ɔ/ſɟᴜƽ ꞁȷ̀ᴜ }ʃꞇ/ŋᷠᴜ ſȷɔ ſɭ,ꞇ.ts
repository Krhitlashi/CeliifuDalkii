// ≺⧼ Komunaj Helpiloj ⧽≻ - Komunaj montradaj okazaĵoj kaj eksterklakaj traktiloj

// ⟪ Akiri Punkton de Montra Evento ⟫

export function akiriMontranPunkton( ev: any ): { x: number; y: number } {
    if ( ev && ev.touches && ev.touches.length > 0 ) {
        return { x: ev.touches[0].clientX, y: ev.touches[0].clientY };
    }
    if ( ev && ev.changedTouches && ev.changedTouches.length > 0 ) {
        return { x: ev.changedTouches[0].clientX, y: ev.changedTouches[0].clientY };
    }
    return { x: ev?.clientX || 0, y: ev?.clientY || 0 };
}

// ⟪ Agordi Komunajn Montrajn Eventaŭskultilojn ⟫ - Redonas forigan funkcion por purigado en onEnd

export function setupMontrajnEventojn( onMove: ( ev: any ) => void, onEnd: () => void ): () => void {
    document.addEventListener( "mousemove", onMove );
    document.addEventListener( "mouseup", onEnd );
    document.addEventListener( "touchmove", onMove, { passive: false } );
    document.addEventListener( "touchend", onEnd );
    document.addEventListener( "touchcancel", onEnd );
    return () => {
        document.removeEventListener( "mousemove", onMove );
        document.removeEventListener( "mouseup", onEnd );
        document.removeEventListener( "touchmove", onMove );
        document.removeEventListener( "touchend", onEnd );
        document.removeEventListener( "touchcancel", onEnd );
    };
}

// ⟪ Eksterklaka Traktilo ⟫ - Redonas forigan funkcion. La kromvojo "cxuRuli" ebligas fruan ĉesigon antaŭ la closest-marcho

export function klikoEkstereTraktilo( rootSelectors: string[], onEkstere: ( e: MouseEvent ) => void, cxuRuli?: () => boolean ): () => void {
    const traktilo = ( e: MouseEvent ) => {
        if ( cxuRuli && !cxuRuli() ) return;
        const target: HTMLElement = e.target as HTMLElement;
        if ( rootSelectors.some( sel => target.closest( sel ) ) ) return;
        onEkstere( e );
    };
    document.addEventListener( "mousedown", traktilo );
    return () => document.removeEventListener( "mousedown", traktilo );
}
