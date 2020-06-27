import React, { useEffect } from "react";
import { Form, Formik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { Divider, Button, Message, Icon } from "semantic-ui-react";
import CategorySchema from "../category.schema";
import { saveCategory, getCategory } from "../category.actions";
import { TextInput, FileInput } from "../../../core/client/components/FieldInput/FieldInputs";

export default function CategoryForm({id} = props) {
    const dispatch = useDispatch();

    if(id) {
        useEffect(() => {
            dispatch(getCategory(id));
        }, []);
    }

    const category = useSelector(state => state.categoryReducer.category);
    const loggedInUser = useSelector(state => state.userReducer.loggedInUser);

    return (
        <>
            { loggedInUser && loggedInUser.isAdmin &&
                <Formik
                    initialValues={{
                        _id: id,
                        name: category ? category.name : "",
                        file: ""
                    }}
                    displayName="CategoryForm"
                    enableReinitialize={true}
                    validationSchema={CategorySchema}
                    onSubmit={(values, actions) => {
                        if(values._id) {
                            dispatch(saveCategory(values));
                        } else {
                            dispatch(saveCategory(values)).then(function() {
                                actions.resetForm();
                            });
                        }

                        actions.setSubmitting(false);
                    }}
                >
                    {formikProps => (
                        <Form onSubmit={formikProps.handleSubmit} className="ui form">
                            <TextInput attributes={{
                                type: "text",
                                name: "name",
                                label: "Name",
                                required: true
                            }}/>
                            <FileInput attributes={{
                                type: "file",
                                name: "file",
                                label: "Upload",
                                onChange: e => {
                                    formikProps.setFieldValue("file", e.currentTarget.files[0]);
                                }
                            }}/>
                            <Divider hidden/>
                            <Button.Group>
                                <Button type="submit" positive disabled={formikProps.isSubmitting}>Submit</Button>
                                <Button.Or/>
                                <Button type="reset" disabled={formikProps.isSubmitting}>Reset</Button>
                            </Button.Group>
                        </Form>
                    )}
                </Formik>
            }

            { !loggedInUser || !loggedInUser.isAdmin &&
                <Message negative>
                    <Message.Header>
                        <Icon name="lock" size="large"/>
                        You don't have the permission!
                    </Message.Header>
                </Message>
            }
        </>
    );
}
