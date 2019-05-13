import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Message, Icon, Divider } from 'semantic-ui-react';

export default class BrandList extends React.Component {
    constructor(props) {
        super();
        props.getBrands('?filter_by=user');
    }

    render() {
        const { brands, user } = this.props;

        let cards = brands.map(function(brand) {
            return (
                <Table.Row key={brand._id}>
                    <Table.Cell>{brand.name}</Table.Cell>
                    { user && user.isAdmin &&
                        <Table.Cell>{brand.createdBy}</Table.Cell>
                    }
                    <Table.Cell>
                        <Link to={`/items?brandId=${brand._id}`}>View</Link> | <Link to={`/brands/${brand._id}/edit`}>Edit</Link>
                    </Table.Cell>
                </Table.Row>
            );
        });

        return (
            <>
                <h2>Available brands</h2>
                <Divider section/>

                { cards.length > 0 &&
                    <Table celled compact striped>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                { user && user.isAdmin &&
                                    <Table.HeaderCell>Created By</Table.HeaderCell>
                                }
                                <Table.HeaderCell>Action</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {cards}
                        </Table.Body>
                    </Table>
                }

                { cards.length === 0 &&
                    <Message warning>
                        <Message.Header>
                            <Icon name="warning sign" size="large"/>
                            Nothing found!
                        </Message.Header>
                        To add a brand please <Link to="brands/add">click here</Link>.
                    </Message>
                }
            </>
        );
    }
}
