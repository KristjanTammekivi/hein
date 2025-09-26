import { match, notMatch } from '../assert.js';
import { use } from '../mixins.js';

use({
    match: {
        type: 'method',
        value:
            ({ value, inverted }) =>
            (regex: RegExp) => {
                if (inverted) {
                    notMatch(value, regex);
                } else {
                    match(value, regex);
                }
            }
    }
});
