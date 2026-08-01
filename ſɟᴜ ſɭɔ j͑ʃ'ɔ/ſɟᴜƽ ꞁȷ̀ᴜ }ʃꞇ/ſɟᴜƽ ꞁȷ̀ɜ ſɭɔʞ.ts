// ≺⧼ Ĉenaj Utilajoj ⧽≻

/**
 * Escape HTML-specialajn signojn
 * @param {string} ĉeno
 * @returns {string}
 */
function eskapiHtml( str: string ): string {
    if ( !str ) return "";
    const div = document.createElement( "div" );
    div.textContent = str;
    return div.innerHTML;
}

/**
 * Detranĉi ĉenon al maksimuma longo
 * @param {string} ĉeno
 * @param {number} maksLongo
 * @returns {string}
 */
function trancxi( str: string, maxLength: number = 0o40 ): string {
    if ( !str ) return "";
    return str.length > maxLength ? str.slice( 0, maxLength ) : str;
}

/**
 * Kontroli ĉu ĉeno enhavas iun el la terminoj
 * @param {string} ĉeno
 * @param {string[]} terminoj
 * @returns {boolean}
 */
function cxuEnhavasIun( str: string, terms: string[] ): boolean {
    if ( !str ) return false;
    return terms.some( term => str.includes( term ) );
}

// Alkroĉi al fenestro por tutmonda aliro
( window as any ).eskapiHtml = eskapiHtml;
( window as any ).trancxi = trancxi;
( window as any ).cxuEnhavasIun = cxuEnhavasIun;
