import React from "react";
import { Form, withFormik } from "formik";
import { Divider, Button, Message, Icon } from "semantic-ui-react";
import CategorySchema from "../category.schema";
import { TextInput, FileInput } from "../../../core/client/components/FieldInput/FieldInputs";

class CategoryForm extends React.Component {
    constructor(props) {
        super();

        if(props.categoryId) {
            props.fetchCategory(props.categoryId);
        }
    }

    render() {
        const { user, handleSubmit, isSubmitting, setFieldValue } = this.props;

        const handleFileChange = e => {
            setFieldValue("files", e.currentTarget.files);
        }

        return (
            <div>
                { user && user.isAdmin &&
                    <Form onSubmit={handleSubmit} className="ui form">
                        <TextInput attributes={{
                            type: "text",
                            name: "name",
                            label: "Name",
                            required: true
                        }}/>
                        <FileInput attributes={{
                            type: "file",
                            name: "files",
                            label: "Upload",
                            onChange: handleFileChange
                        }}/>
                        <Divider hidden/>
                        <Button.Group>
                            <Button type="submit" positive disabled={isSubmitting}>Submit</Button>
                            <Button.Or/>
                            <Button type="reset" disabled={isSubmitting}>Reset</Button>
                        </Button.Group>
                    </Form>
                }

                { !user || !user.isAdmin &&
                    <Message negative>
                        <Message.Header>
                            <Icon name="lock" size="large"/>
                            You don't have the permission!
                        </Message.Header>
                    </Message>
                }
            </div>
        );
    }
}

CategoryForm = withFormik({
    enableReinitialize: true,

    mapPropsToValues: (props) => {
        if(props.categoryId && props.category) {
            return {
                name: props.category.name
            };
        }

        return {
            name: "",
            files: ""
        };
    },

    validationSchema: CategorySchema,

    handleSubmit: (formValues, { setSubmitting, resetForm, props }) => {
        const formData = new FormData();

        if(formValues.files) {
            for(let index = 0; index < formValues.files.length; index++) {
                formData.append("files", formValues.files[index]);
            }
            delete formValues.files;
        }

        for(let key in formValues) {
            if(formValues.hasOwnProperty(key) && formValues[key]) {
                formData.append(key, formValues[key]);
            }
        }

        if(props.categoryId) {
            props.updateCategory(formData, props.categoryId);
        } else {
            props.createCategory(formData).then(function() {
                resetForm();
            });
        }

        setSubmitting(false);
    },

    displayName: "CategoryForm"
})(CategoryForm);

export default CategoryForm;
