// ≺⧼ Ĉenaj Utilajoj ⧽≻

/**
 * Escape HTML special characters
 * @param {string} str
 * @returns {string}
 */
function eskapiHtml( str: string ): string {
    if ( !str ) return "";
    const div = document.createElement( "div" );
    div.textContent = str;
    return div.innerHTML;
}

/**
 * Truncate string to max length
 * @param {string} str
 * @param {number} maxLength
 * @returns {string}
 */
function trancxi( str: string, maxLength: number = 0o40 ): string {
    if ( !str ) return "";
    return str.length > maxLength ? str.slice( 0, maxLength ) : str;
}

/**
 * Check if string contains any of the terms
 * @param {string} str
 * @param {string[]} terms
 * @returns {boolean}
 */
function cxuEnhavasIun( str: string, terms: string[] ): boolean {
    if ( !str ) return false;
    return terms.some( term => str.includes( term ) );
}

// Attach to window for global access
( window as any ).escapeHtml = eskapiHtml;
( window as any ).truncate = trancxi;
( window as any ).containsAny = cxuEnhavasIun;
