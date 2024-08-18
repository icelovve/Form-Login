import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class FormLogin extends Component {
    state = { 
        username: {
            type: 'text',
            value: '',
            validator: {
                required: true,
                minLength: 5,
                maxLength: 15,
            },
            touched: false,
            error: { status: true, message: '' }
        },
        email: {
            type: 'email',
            value: '',
            validator: {
                required: true,
                email: true,
            },
            touched: false,
            error: { status: true, message: '' }
        },
        password: {
            type: 'password',
            value: '',
            validator: {
                required: true,
                minLength: 8,
                maxLength: 20,
            },
            touched: false,
            error: { status: true, message: '' }
        },
        formValid: false
    }

    onChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        let updatedField = { ...this.state[name] };
        updatedField.value = value;
        updatedField.touched = true;

        const validationObject = this.checkValidator(value, updatedField.validator);
        updatedField.error = {
            status: validationObject.status,
            message: validationObject.message
        };

        let updatedState = { ...this.state, [name]: updatedField };

        let formStatus = true;
        for (let fieldName in updatedState) {
            if (updatedState[fieldName].validator && updatedState[fieldName].validator.required) {
                formStatus = !updatedState[fieldName].error.status && formStatus;
            }
        }

        this.setState({
            ...updatedState,
            formValid: formStatus
        });
    }

    checkValidator = (value, rule) => {
        let isValid = true;
        let message = '';

        if (value.trim().length === 0 && rule.required) {
            isValid = false;
            message = 'จำเป็นต้องกรอก';
        }

        if (value.length < rule.minLength && isValid) {
            isValid = false;
            message = `น้อยกว่า ${rule.minLength} ตัวอักษร`;
        }

        if (value.length > rule.maxLength && isValid) {
            isValid = false;
            message = `มากกว่า ${rule.maxLength} ตัวอักษร`;
        }

        if (rule.email && isValid) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(value)) {
                isValid = false;
                message = 'อีเมล์ไม่ถูกต้อง';
            }
        }

        return { status: !isValid, message: message };
    }

    getInputClassName = (name) => {
        const elementErrorStatus = this.state[name].error.status;
        return elementErrorStatus && this.state[name].touched ? 'form-control is-invalid' : 'form-control is-valid';
    }

    getErrorMessage = (name) => {
        return this.state[name].error.message;
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        const formData = {};
        for (let name in this.state) {
            if (typeof this.state[name] === 'object' && this.state[name].value !== undefined) {
                formData[name] = this.state[name].value;
            }
        }
        console.log(formData);
    }

    render() {
        return (
            <div className='d-flex justify-content-center mt-5'>
                <div className='col-sm-6'>
                    <div className='card'>
                        <div className='card-body p-4'>
                            <form onSubmit={this.onFormSubmit}>
                                <div className='form-group'>
                                    <label htmlFor='username'>User Name</label>
                                    <input
                                        type='text'
                                        className={this.getInputClassName('username')}
                                        id='username'
                                        name='username'
                                        onChange={this.onChange}
                                    />
                                    <div className='invalid-feedback'>
                                        {this.getErrorMessage('username')}
                                    </div>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='email'>Email</label>
                                    <input
                                        type='email'
                                        className={this.getInputClassName('email')}
                                        id='email'
                                        name='email'
                                        onChange={this.onChange}
                                    />
                                    <div className='invalid-feedback'>
                                        {this.getErrorMessage('email')}
                                    </div>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='password'>Password</label>
                                    <input
                                        type='password'
                                        className={this.getInputClassName('password')}
                                        id='password'
                                        name='password'
                                        onChange={this.onChange}
                                    />
                                    <div className='invalid-feedback'>
                                        {this.getErrorMessage('password')}
                                    </div>
                                </div>
                                <div className='text-center'>
                                    <button 
                                        className='btn btn-primary mt-4' 
                                        type='submit'
                                        disabled={!this.state.formValid}
                                    >submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FormLogin;
