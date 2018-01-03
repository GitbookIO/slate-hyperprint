// @flow
/* global document */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import ReactDOM from 'react-dom';
import Slate from 'slate';
import hyperprint from '../dist/';

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
            value = Slate.Value.fromJSON(JSON.parse(input));
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log(e);
            value = Slate.Value.create();
        }

        return (
            <div className="container">
                <div className="side-by-side">
                    <div className="left-side">
                        <h1>Input a Slate JSON representation</h1>
                        <pre>
                            <code>
                                <textarea
                                    id="inputarea"
                                    value={input}
                                    onChange={this.onChange}
                                />
                            </code>
                        </pre>
                    </div>
                    <div className="right-side">
                        <h1>Get the hyperscript representation</h1>
                        <pre>
                            <code className="language-jsx">
                                {hyperprint(value)}
                            </code>
                        </pre>
                    </div>
                </div>
            </div>
        );
    }
}

// $FlowFixMe
ReactDOM.render(<Website />, document.getElementById('example'));
