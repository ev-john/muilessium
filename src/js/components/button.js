import * as Utils from '../utils';
import { Component } from '../component';


export class Button extends Component {
    constructor(element, options) {
        super(element, options);
        
        Utils.console.info(`creating button for the ${element} with options ${JSON.stringify(options)}`);

        Utils.aria.setRole(element, 'button');

        [].forEach.call(element.getElementsByClassName('fa'), (icon) => {
            Utils.aria.set(icon, 'hidden', true);
        });

        this.state.initialized = true;
    }
}
