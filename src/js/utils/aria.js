// -----------------------------------------------------------------------------
// WAI-ARIA UTILITIES
// -----------------------------------------------------------------------------
//
// Here are some functions for operations with aria-roles and properties.
// These functions should be used in components for better code readability.
//
// Here is the full list of aria methods:
//  - set(element, property, value = true)
//  - setRole(element, role)
//  - removeRole(element)
//  - setId(element, id)
//  - get(element, property)
//  - getRole(element)
//  - toggleState(element, state)
//
// -----------------------------------------------------------------------------


import { setAttribute         } from '../utils/attributes';
import { getAttribute         } from '../utils/attributes';
import { removeAttribute      } from '../utils/attributes';
import { generateRandomString } from '../utils/uncategorized';
import { stringToBoolean      } from '../utils/uncategorized';




// Set property
// ------------
// Sets aria-property to the element

function set(element, property, value = true) {
    return setAttribute(element, `aria-${property}`, value);
}


// Set role
// --------
// Sets aria-role to the element

function setRole(element, role) {
    return setAttribute(element, 'role', role);
}


// Remove role
// -----------
// Removes aria-role from the element

function removeRole(element) {
    return removeAttribute(element, 'role');
}


// Set id
// ------
// Sets ID to the element (generates a random ID if ID not passed as a parameter),
// returns this ID

function setId(element, id) {
    const newId = id || (`mui-id-${generateRandomString(6)}`);

    setAttribute(element, 'id', newId);

    return newId;
}


// Get property
// ------------
// Gets aria-property from the element

function get(element, property) {
    return getAttribute(element, `aria-${property}`);
}


// Get role
// --------
// Gets aria-role from the element

function getRole(element) {
    return getAttribute(element, 'role');
}


// Toggle state
// ------------
// Changes boolean state from true to false and from false to true.

function toggleState(element, state) {
    setAttribute(element, `aria-${state}`, !stringToBoolean(getAttribute(element, `aria-${state}`)));
}


// -----------------------------------------------------------------------------

const aria = {
    set,
    setRole,
    removeRole,
    setId,
    get,
    getRole,
    toggleState
};

export default aria;

