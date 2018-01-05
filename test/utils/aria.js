// -----------------------------------------------------------------------------
// Unit tests for utilities
// /src/js/utils/aria.js
// -----------------------------------------------------------------------------


require('babel-register')({
    presets: ['env']
});

require('jsdom-global/register');


var log = require('../../nodeunit.config.js').log,
    _   = require('../../src/js/utils.js').default;


module.exports = {
    ['set']: function(test) {
        document.body.innerHTML =
                `<div></div>
                 <div></div>`;

        var elements = document.querySelectorAll('div');

        // ---------------

        _.aria.set(elements[0], 'hidden');
        _.aria.set(elements[1], 'hidden', false);

        // ---------------

        test.equal(elements[0].getAttribute('aria-hidden'), 'true',  'It should set the attribute to "true" by default.');
        test.equal(elements[1].getAttribute('aria-hidden'), 'false', 'It should set the attribute to the selected value.');

        test.doesNotThrow(function() {
            _.aria.set(null);
            _.aria.set(undefined);
            _.aria.set(elements[0], null);
            _.aria.set(elements[0], null, null);
            _.aria.set(elements[0], undefined);
        });

        test.done();
    },



    ['setRole']: function(test) {
        document.body.innerHTML = `<div></div>`;

        var element = document.querySelector('div');

        // ---------------

        _.aria.setRole(element, 'button');

        // ---------------

        test.equal(element.getAttribute('role'), 'button', 'It should set the role of the element to the selected value.');

        test.doesNotThrow(function() {
            _.aria.setRole(null);
            _.aria.setRole(undefined);
            _.aria.setRole(element, null);
            _.aria.setRole(element, undefined);
        });

        test.done();
    },



    ['removeRole']: function(test) {
        document.body.innerHTML = `<div role='button'></div>`;

        var element = document.querySelector('div');

        // ---------------

        _.aria.removeRole(element);

        // ---------------

        test.equal(element.getAttribute('role'), null, 'It should remove the role from the element.');

        test.doesNotThrow(function() {
            _.aria.removeRole(null);
            _.aria.removeRole(undefined);
        });

        test.done();
    },



    ['setId']: function(test) {
        document.body.innerHTML = `<div></div>`;

        var element = document.querySelector('div');

        // ---------------

        _.aria.setId(element, 'test-id');

        // ---------------

        test.equal(element.getAttribute('id'), 'test-id', 'It should set the id of the element to the selected value.');

        test.doesNotThrow(function() {
            _.aria.setId(null);
            _.aria.setId(undefined);
            _.aria.setId(element, null);
            _.aria.setId(element, undefined);
        });

        test.done();
    },



    ['get']: function(test) {
        document.body.innerHTML = `<div aria-hidden='true'></div>`;

        var element = document.querySelector('div');

        // ---------------

        var result = _.aria.get(element, 'hidden');

        // ---------------

        test.equal(result, 'true', 'It should return the value of the attribute.');

        test.doesNotThrow(function() {
            _.aria.get(null);
            _.aria.get(undefined);
            _.aria.get(element, null);
            _.aria.get(element, undefined);
        });

        test.done();
    },



    ['getRole']: function(test) {
        document.body.innerHTML = `<div role='button'></div>`;

        var element = document.querySelector('div');

        // ---------------

        var result = _.aria.getRole(element);

        // ---------------

        test.equal(result, 'button', 'It should return the role of the element.');
    
        test.doesNotThrow(function() {
            _.aria.getRole(null);
            _.aria.getRole(undefined);
        });

        test.done();
    },



    ['toggleState']: function(test) {
        document.body.innerHTML = `<div aria-hidden='false'></div>`;

        var element = document.querySelector('div');

        // ---------------

        _.aria.toggleState(element, 'hidden');

        // ---------------

        test.equal(element.getAttribute('aria-hidden'), 'true', 'It should toggle the selected state of the element.');

        test.doesNotThrow(function() {
            _.aria.toggleState(null);
            _.aria.toggleState(undefined);
            _.aria.toggleState(element, null);
            _.aria.toggleState(element, undefined);
        });

        test.done();
    }
};

