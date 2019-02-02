import React from 'react';
import { Link } from 'react-router';
import { Menu, Dropdown, Container, Icon } from 'semantic-ui-react';

export default class Navbar extends React.Component {
    render() {
        const navBarStyle = {
            marginBottom: '10px'
        };

        const { user } = this.props;

        return (
            <Container style={navBarStyle}>
                <Menu stackable>
                    <Menu.Item header>Gadget Catalog</Menu.Item>
                    <Link to="dashboard" activeClassName="active" className="item">
                        <Icon name="dashboard"/>
                        Dashboard
                    </Link>
                    <Dropdown item text='Item'>
                        <Dropdown.Menu>
                            <Link to="items" activeClassName="active" className="item">Item list</Link>
                            <Link to="items/add" activeClassName="active" className="item">Add new item</Link>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown item text='Category'>
                        <Dropdown.Menu>
                            <Link to="categories" activeClassName="active" className="item">Category list</Link>
                            { user && user.isAdmin &&
                                <Link to="categories/add" activeClassName="active" className="item">Add new category</Link>
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown item text='Brand'>
                        <Dropdown.Menu>
                            <Link to="brands" activeClassName="active" className="item">Brand list</Link>
                            <Link to="brands/add" activeClassName="active" className="item">Add new brand</Link>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Menu.Menu position='right'>
                        <Dropdown item text={user.name}>
                            <Dropdown.Menu>
                                <Link to="profile" activeClassName="active" className="item">
                                    <Icon name="edit"/> Edit profile
                                </Link>
                                <a href="/api/logout" className="item">
                                    <Icon name="sign out"/> Sign out
                                </a>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Menu>
                </Menu>
            </Container>
        );
    }
}
