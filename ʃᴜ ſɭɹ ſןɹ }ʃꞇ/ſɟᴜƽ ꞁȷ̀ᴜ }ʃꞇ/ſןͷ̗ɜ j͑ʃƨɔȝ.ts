// ≺⧼ ſןͷ̗ɜ j͑ʃƨɔȝ 🛠️ ⧽≻

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

( window as any ).limkurzo = limkurzo;
