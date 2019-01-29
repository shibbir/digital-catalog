import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import { getBrands } from '../../actions/BrandActions';
import { getCategories } from '../../actions/CategoryActions';
import { createItem, updateItem, fetchItem, resetItemState } from '../item.actions';
import ItemConstants from '../item.types';
import ItemForm from '../components/ItemForm';

const mapStateToProps = (state, ownProps) => {
    return {
        itemId: ownProps.id,
        form: `${ownProps.form}ItemForm`,
        submitButtonText: ownProps.submitButtonText || 'Submit',
        brands: state.brandReducer.brands,
        categories: state.categoryReducer.categories
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getBrands: () => {
            dispatch(getBrands());
        },
        getCategories: () => {
            dispatch(getCategories());
        },
        createItem: (formData) => {
            dispatch(createItem(formData)).then(result => {
                const { type, payload } = result.action;

                if(type === ItemConstants.POST_ITEM_FULFILLED) {
                    hashHistory.push({ pathname: `items/${payload.data._id}` });
                }
            });
        },
        updateItem: (formData, itemId) => {
            dispatch(updateItem(formData, itemId)).then(result => {
                const { type, payload } = result.action;

                if(type === ItemConstants.PUT_ITEM_FULFILLED) {
                    hashHistory.push({ pathname: `items/${payload.data._id}` });
                }
            });
        },
        fetchItem: (itemId) => {
            dispatch(fetchItem(itemId));
        },
        resetItemState: () => {
            dispatch(resetItemState());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemForm);
