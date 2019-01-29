import React from 'react';
import toastr from 'toastr';

export default class MessageComponent extends React.Component {
    render() {
        const { type, message } = this.props;

        if(type && message) {
            toastr[type](message);
        }

        return <div/>;
    }
}
