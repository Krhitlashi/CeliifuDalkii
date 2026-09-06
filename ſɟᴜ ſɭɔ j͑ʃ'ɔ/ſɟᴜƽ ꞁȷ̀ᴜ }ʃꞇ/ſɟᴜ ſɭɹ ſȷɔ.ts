// ≺⧼ Matematikaj Utilaĵoj ⧽≻

/**
 * Throttle-funkcio
 * @param {Function} funkcio
 * @param {number} limo
 * @returns {Function}
 */
function limkurzo<T extends ( ...args: any[] ) => void>( func: T, limit: number ): ( ...args: Parameters<T> ) => void {
    let inThrottle: any;
    return function ( this: any, ...args: Parameters<T> ) {
        if ( !inThrottle ) {
            func.apply( this, args );
            inThrottle = true;
            setTimeout( () => inThrottle = false, limit );
        }
    };
}

// Alkroĉi al fenestro por tutmonda aliro
( window as any ).limkurzo = limkurzo;
