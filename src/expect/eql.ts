import { eql, notEql } from '../assert';
import { use } from '../mixins';

use({
    eql: {
        type: 'method',
        value: ({ value, inverted }) => (other: any) => {
            if (inverted) {
                notEql(value, other);
            } else {
                eql(value, other);
            }
        }
    }
});
