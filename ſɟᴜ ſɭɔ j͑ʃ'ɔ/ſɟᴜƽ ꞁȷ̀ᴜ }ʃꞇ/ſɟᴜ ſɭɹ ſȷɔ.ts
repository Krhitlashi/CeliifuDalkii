// ≺⧼ Matematikaj Utilajoj ⧽≻

/**
 * Premlimigi valoron inter minimumo kaj maksimumo
 * @param {number} valoro
 * @param {number} minimumo
 * @param {number} maksimumo
 * @returns {number}
 */
function limigo( value: number, min: number, max: number ): number {
    return Math.max( min, Math.min( max, value ) );
}

/**
 * Debounce-funkcio
 * @param {Function} funkcio
 * @param {number} atendu
 * @returns {Function}
 */
function malakordigi<T extends ( ...args: any[] ) => void>( func: T, wait: number ): ( ...args: Parameters<T> ) => void {
    let timeout: any;
    return function executedFunction( ...args: Parameters<T> ) {
        const later = () => {
            clearTimeout( timeout );
            func( ...args );
        };
        clearTimeout( timeout );
        timeout = setTimeout( later, wait );
    };
}

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
( window as any ).limigo = limigo;
( window as any ).malakordigi = malakordigi;
( window as any ).limkurzo = limkurzo;
