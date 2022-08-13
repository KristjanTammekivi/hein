import { isEmpty, notIsEmpty } from '../assert';
import { use } from '../mixins';

use({
    empty: {
        type: 'method',
        value: ({ value, inverted }) => (message?: string) => {
            if (inverted) {
                notIsEmpty(value, message);
            } else {
                isEmpty(value, message);
            }
        }
    }
});
