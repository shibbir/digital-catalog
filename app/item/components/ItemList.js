import React from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import { Label, Form, Button, Accordion, Card, Divider, Message, Icon, Menu, Container, Image } from 'semantic-ui-react';

export default class ItemList extends React.Component {
    constructor(props) {
        super();
        props.getBrands();
        props.getCategories();
        props.fetchItems(props.location.search);

        this.state = {
            params: queryString.parse(props.location.search)
        };

        this.state = {
            ...this.state,
            categoryId: this.state.params.categoryId || '-1',
            categoryName: '',
            brandId: this.state.params.brandId || '-1',
            brandName: '',
            activeFilter: false
        };

        this.filter = this.filter.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.toggleFilterPanel = this.toggleFilterPanel.bind(this);
        this.discardFilter = this.discardFilter.bind(this);
    }

    componentDidUpdate(prevProps) {
        const params = queryString.parse(this.props.location.search);

        if(this.props.categories
            && this.props.categories.length
            && params.categoryId
            && params.categoryId !== '-1') {
            this.state.categoryName = _.find(this.props.categories, {_id: params.categoryId}).name;
        }

        if(this.props.brands
            && this.props.brands.length
            && params.brandId
            && params.brandId !== '-1') {
            this.state.brandName = _.find(this.props.brands, {_id: params.brandId}).name;
        }

        if(this.props.location.search !== prevProps.location.search) {
            this.props.fetchItems(this.props.location.search);
        }
    }

    handleInputChange(event, data) {
        this.setState({
            [data.name]: data.value
        });
    }

    discardFilter(event) {
        this.state[event.target.dataset.id] = '-1';
        this.filter();
    }

    filter() {
        if(this.state.categoryId === '-1' && this.state.brandId === '-1') {
            this.props.history.push({ pathname: 'items' });
            return;
        };

        let q = {};

        if(this.state.categoryId !== '-1') {
            q.categoryId = this.state.categoryId;
        }

        if(this.state.brandId !== '-1') {
            q.brandId = this.state.brandId;
        }

        if(this.props.location.search === `?${queryString.stringify(q)}`) return;

        this.props.history.push({
            pathname: 'items',
            search: queryString.stringify(q)
        });
    }

    toggleFilterPanel() {
        this.setState(state => ({
            activeFilter: !state.activeFilter
        }));
    }

    render() {
        const { activeFilter, categoryId, categoryName, brandId, brandName } = this.state;
        const params = queryString.parse(this.props.location.search);

        const {
            items: { data, pagination } = items,
            location, brands, categories
        } = this.props;

        let categoryOptions = categories.map(function(option) {
            return { key: option._id, value: option._id, text: option.name };
        });

        let brandOptions = brands.map(function(option) {
            return { key: option._id, value: option._id, text: option.name };
        });

        brandOptions.unshift({ key: '-1', value: '-1', text: 'None' });
        categoryOptions.unshift({ key: '-1', value: '-1', text: 'None' });

        let cards = data.map(function(item) {
            let activeImage = item.files.filter(x => x.active)[0];
            activeImage = activeImage ? activeImage.secure_url : null;

            return (
                <Card key={item._id} raised href={`#/items/${item._id}`}>
                    <Card.Content header={item.name} className="ui center aligned"/>
                    <Card.Content className="ui center aligned">
                        { activeImage
                            ? <Image src={activeImage} alt={item.name}/>
                            : 'Image Not Available!'
                        }
                    </Card.Content>
                </Card>
            );
        });

        let paginationLinks = [];

        for(let idx = 1; idx <= pagination.pages; idx++) {
            paginationLinks.push({
                idx,
                link: {
                    pathname: location.pathname,
                    search: queryString.stringify({ ...params, page: idx })
                },
                isActive: !params.page && idx === 1 || +params.page === idx
            });
        }

        paginationLinks = paginationLinks.map(function(page) {
            return (
                <Menu.Item active={page.isActive} key={page.idx}>
                    <Link to={page.link}>{page.idx}</Link>
                </Menu.Item>
            );
        });

        return (
            <div>
                <Accordion fluid styled>
                    <Accordion.Title active={activeFilter === true} onClick={this.toggleFilterPanel}>
                        <Icon name='dropdown' />
                        REFINE BY
                    </Accordion.Title>
                    <Accordion.Content active={activeFilter === true}>
                        <Form onSubmit={this.filter}>
                            <Form.Group widths='equal'>
                                <Form.Dropdown
                                    selection search
                                    label='Category'
                                    name='categoryId'
                                    options={categoryOptions}
                                    value={categoryId}
                                    onChange={this.handleInputChange}
                                />
                                <Form.Dropdown
                                    selection search
                                    label='Brand'
                                    name='brandId'
                                    options={brandOptions}
                                    value={brandId}
                                    onChange={this.handleInputChange}
                                />
                            </Form.Group>
                            <Button type='submit' positive>
                                <Icon name='filter'/>Filter
                            </Button>
                        </Form>
                    </Accordion.Content>
                </Accordion>

                {(params.categoryId || params.brandId) &&
                    <div>
                        <Divider hidden/>

                        Refined by:
                        {(params.categoryId && params.categoryId !== '-1') &&
                            <Label basic>
                                Category: {categoryName} <Icon name='delete' data-id="categoryId" onClick={this.discardFilter}/>
                            </Label>
                        }

                        {(params.brandId && params.brandId !== '-1') &&
                            <Label basic>
                                Brand: {brandName} <Icon name='delete' data-id="brandId" onClick={this.discardFilter}/>
                            </Label>
                        }
                    </div>
                }

                <Divider hidden/>

                { cards.length > 0 &&
                    <div id="item-cards-container">
                        <Card.Group itemsPerRow={5} stackable>
                            {cards}
                        </Card.Group>

                        { pagination.pages !== 1 &&
                            <div>
                                <Divider hidden/>
                                <Container textAlign="center">
                                    <Menu pagination>
                                        {paginationLinks}
                                    </Menu>
                                </Container>
                            </div>
                        }
                    </div>
                }
                { cards.length === 0 &&
                    <Message warning>
                        <Message.Header>
                            <Icon name="warning sign" size="large"/>
                            Nothing found!
                        </Message.Header>
                        To add an item please <Link to="items/add">click here</Link>.
                    </Message>
                }
            </div>
        );
    }
}
