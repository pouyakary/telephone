// Author: Pouya Kary <k@karyfoundation.org> (in case you had any questions...)

import { colors } from "./views/css/colors";
import { lighten } from "./views/css/functions";
import { Suggestion } from "./plugins/autocompletion_utils/Common";
import * as css from './views/css/main'
import * as React from "react";

const maxAcceptableSuggestionLength = 60;

export interface SortableObject {
    weight: number;
    value: Suggestion;
}

/**
 * Checks if the __key__ exists as a _sequence_ in the __element__.
 */
export function SequenceFilter( element: string, key: string ): boolean {
    if ( key.length > element.length ) return false;
    let currentSearchCharIndex = 0;

    for ( let searchStringsIndex = 0;
          searchStringsIndex < element.length;
          searchStringsIndex++ ) {

        let currentChar = element[ searchStringsIndex ];
        if ( currentChar === key[ currentSearchCharIndex ] ) {
            if ( currentSearchCharIndex < key.length ) {
                currentSearchCharIndex++;
            }
        }
    }

    return currentSearchCharIndex >= key.length;
}


/**
 * Inserts spans into the sequence to make it colorized.
 */
export function filterAndHighlightSuggestions( element: string,
                                                   key: string,
                                         isHighlighted: boolean ): JSX.Element[] {
    let overflowStatus = false;
    let currentSearchCharIndex = 0;
    let highlightedElements = new Array<JSX.Element>();

    if ( element.length > maxAcceptableSuggestionLength ) {
        element = element.substring( 0, maxAcceptableSuggestionLength );
        overflowStatus = true;
    }

    for ( let searchStringsIndex = 0; searchStringsIndex < element.length; searchStringsIndex++) {
        let currentChar = element[ searchStringsIndex ];

        if ( currentChar === key[ currentSearchCharIndex ] ) {
            if ( currentSearchCharIndex < key.length ) {
                // highlightedElement += `<span style="color:${colors.blue}">${currentChar}</span>`;
                highlightedElements.push(
                    <span style={ css.autocomplete.highlightedChar( isHighlighted ) }>{currentChar}</span>
                )
                currentSearchCharIndex++;

            } else {
                highlightedElements.push(<span>{currentChar}</span>);
            }
        } else {
            highlightedElements.push(<span>{currentChar}</span>);
        }
    }

    if ( overflowStatus ) {
        highlightedElements.push(
            <span style={ 
                isHighlighted? { color: lighten( css.telephoneRed , 50 ) } : { color: colors.green }
            }>...</span>
        );
    }

    return highlightedElements;
}
