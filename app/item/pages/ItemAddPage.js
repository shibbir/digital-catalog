import React from 'react';
import { Divider } from 'semantic-ui-react';
import ItemFormContainer from '../containers/ItemFormContainer';

export default class ItemAddPage extends React.Component {
    render() {
        return (
            <div>
                <h3>Add new item</h3>
                <Divider section/>

                <ItemFormContainer/>
            </div>
        );
    }
}
