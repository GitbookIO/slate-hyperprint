// @flow
/* global document */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import ReactDOM from 'react-dom';
import Slate from 'slate';
import { print } from '../lib/';

import INITIAL_VALUE from './value';

class Website extends React.Component<*, *> {
    state = {
        input: JSON.stringify(INITIAL_VALUE.toJSON(), null, 2)
    };

    onChange = event => {
        this.setState({
            input: event.target.value
        });
    };

    render() {
        const { input } = this.state;

        let value;
        try {
            value = Slate.Value.fromJSON(input);
        } catch (e) {
            value = Slate.Value.create();
        }

        return (
            <div className="container">
                <h1>Input a Slate JSON representation</h1>
                <textarea value={input} onChange={this.onChange} />
                <h1>Get the hyperscript representation</h1>
                <pre>{print(value)}</pre>
            </div>
        );
    }
}

// $FlowFixMe
ReactDOM.render(<Website />, document.getElementById('example'));
