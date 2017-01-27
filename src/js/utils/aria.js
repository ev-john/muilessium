// -----------------------------------------------------------------------------
// WAI-ARIA utilities
// -----------------------------------------------------------------------------
// Here is some functions for operation with aria-roles and properties


import { setAttribute         } from '../utils/attributes';
import { getAttribute         } from '../utils/attributes';
import { removeAttribute      } from '../utils/attributes';
import { generateRandomString } from '../utils/uncategorized';
import { stringToBoolean      } from '../utils/uncategorized';


export const aria = {


    // Set property
    // ------------
    // Sets aria-property to the element

    set: (element, property, value = true) => {
        return setAttribute(element, `aria-${property}`, value);
    },


    // Set role
    // --------
    // Sets aria-role to the element

    setRole: (element, role) => {
        return setAttribute(element, 'role', role);
    },


    // Remove role
    // -----------
    // Removes aria-role from the element

    removeRole: (element) => {
        return removeAttribute(element, 'role');
    },


    // Set id
    // ------
    // Sets ID to the element (generates a random ID if ID not passed as a parameter),
    // returns this ID

    setId: (element, id) => {
        const newId = id || (`mui-id-${generateRandomString(6)}`);

        setAttribute(element, 'id', newId);

        return newId;
    },


    // Get property
    // ------------
    // Gets aria-property from the element

    get: (element, property) => {
        return getAttribute(element, `aria-${property}`);
    },


    // Get role
    // --------
    // Gets aria-role from the element

    getRole: (element) => {
        return getAttribute(element, 'role');
    },


    // Toggle state
    // ------------
    // Changes boolean state from true to false and from false to true.

    toggleState: (element, state) => {
        setAttribute(element, `aria-${state}`, !stringToBoolean(getAttribute(element, `aria-${state}`)));
    },


    // Hide icons
    // ----------
    // Sets role='presentation' to all icons with specified class name

    hideIcons: (className) => {
        [].forEach.call(document.getElementsByClassName(className), (icon) => {
            setAttribute(icon, 'aria-hidden', true);
        });
    }
};

