// -----------------------------------------------------------------------------
// Unit tests for utilities
// /src/js/utils/aria.js
// -----------------------------------------------------------------------------


var traceur = require('traceur');

traceur.require.makeDefault(function(filename) {
    return filename.indexOf('node_modules') === -1;
});

require('jsdom-global/register');


var _ = require('../../src/js/utils.js');



module.exports = {
    ['set']: function(test) {
        document.body.innerHTML = '<div></div>';

        var element = document.querySelector('div');

        _.aria.set(element, 'hidden');
        test.equal(element.getAttribute('aria-hidden'), 'true', 'it should set the attribute to "true" by default');

        _.aria.set(element, 'hidden', false);
        test.equal(element.getAttribute('aria-hidden'), 'false', 'it should set the attribute to the selected value');

        test.doesNotThrow(() => _.aria.set(null));
        test.doesNotThrow(() => _.aria.set(undefined));
        test.doesNotThrow(() => _.aria.set(element, null));
        test.doesNotThrow(() => _.aria.set(element, null, null));
        test.doesNotThrow(() => _.aria.set(element, undefined));

        test.done();
    },



    ['setRole']: function(test) {
        document.body.innerHTML = '<div></div>';

        var element = document.querySelector('div');

        _.aria.setRole(element, 'button');

        test.equal(element.getAttribute('role'), 'button', 'it should set the role of the element to the selected value');

        test.doesNotThrow(() => _.aria.setRole(null));
        test.doesNotThrow(() => _.aria.setRole(undefined));
        test.doesNotThrow(() => _.aria.setRole(element, null));
        test.doesNotThrow(() => _.aria.setRole(element, undefined));

        test.done();
    },



    ['removeRole']: function(test) {
        document.body.innerHTML = '<div role="button"></div>';

        var element = document.querySelector('div');

        _.aria.removeRole(element);

        test.equal(element.getAttribute('role'), null, 'it should remove the role from the element');

        test.doesNotThrow(() => _.aria.removeRole(null));
        test.doesNotThrow(() => _.aria.removeRole(undefined));

        test.done();
    },



    ['setId']: function(test) {
        document.body.innerHTML = '<div></div>';

        var element = document.querySelector('div');

        _.aria.setId(element, 'test-id');

        test.equal(element.getAttribute('id'), 'test-id', 'it should set the id of the element to the selected value');

        test.doesNotThrow(() => _.aria.setId(null));
        test.doesNotThrow(() => _.aria.setId(undefined));
        test.doesNotThrow(() => _.aria.setId(element, null));
        test.doesNotThrow(() => _.aria.setId(element, undefined));

        test.done();
    },



    ['get']: function(test) {
        document.body.innerHTML = '<div aria-hidden="true"></div>';

        var element = document.querySelector('div');

        test.equal(_.aria.get(element, 'hidden'), 'true', 'it should return the value of the attribute');

        test.doesNotThrow(() => _.aria.get(null));
        test.doesNotThrow(() => _.aria.get(undefined));
        test.doesNotThrow(() => _.aria.get(element, null));
        test.doesNotThrow(() => _.aria.get(element, undefined));

        test.done();
    },



    ['getRole']: function(test) {
        document.body.innerHTML = '<div role="button"></div>';

        var element = document.querySelector('div');

        test.equal(_.aria.getRole(element), 'button', 'it should return the role of the element');
    
        test.doesNotThrow(() => _.aria.getRole(null));
        test.doesNotThrow(() => _.aria.getRole(undefined));

        test.done();
    },



    ['toggleState']: function(test) {
        document.body.innerHTML = '<div aria-hidden="false"></div>';

        var element = document.querySelector('div');

        _.aria.toggleState(element, 'hidden');

        test.equal(element.getAttribute('aria-hidden'), 'true', 'it should toggle the selected state of the element');

        test.doesNotThrow(() => _.aria.toggleState(null));
        test.doesNotThrow(() => _.aria.toggleState(undefined));
        test.doesNotThrow(() => _.aria.toggleState(element, null));
        test.doesNotThrow(() => _.aria.toggleState(element, undefined));

        test.done();
    }
};
