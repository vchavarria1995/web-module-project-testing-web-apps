import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{

    render(<ContactForm />)
});

test('renders the contact form header', ()=> {

    render(<ContactForm />)

    const header = screen.getByText(/contact form/i)

    expect(header).toBeInTheDocument()
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
   
    render(<ContactForm />)

    const firstName = screen.getByLabelText(/first name*/i)
    expect(firstName).toBeInTheDocument();

    userEvent.type(firstName, 'Victor')

    const button = screen.getByRole('button', { name: /submit/i });
    userEvent.click(button);

    const error = await screen.getByText(/must have at least 5 characters/i);
    expect(error).toBeInTheDocument();
});

test('renders THREE error messages if user enters no values into any fields.', async () => {

    render(<ContactForm />)

    const firstName = screen.getByLabelText(/first name*/i)

    const lastName = screen.getByLabelText(/last name*/i)

    const email = screen.getByLabelText(/email*/i)

    const message = screen.getByLabelText(/message/i);
 
    userEvent.type(firstName,'')
    userEvent.type(lastName,'')
    userEvent.type(email,'')
    userEvent.type(message, '');

    const button = screen.getByRole('button', { name: /submit/i });
    userEvent.click(button);

    const firstNameError = await screen.getByText(/must have at least 5 characters/i);
    expect(firstNameError).toBeInTheDocument();

    const emailError = await screen.getByText(/must be a valid email address/i);
    expect(emailError).toBeInTheDocument();

    const messageError = await screen.getByText(/is a required field/i);
    expect(messageError).toBeInTheDocument();
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {

    render(<ContactForm />)

    const firstName = screen.getByLabelText(/first name*/i)

    const lastName = screen.getByLabelText(/last name*/i)
    
    const email = screen.getByLabelText(/email*/i)

    userEvent.type(firstName,'Victor')
    userEvent.type(lastName,'Chavarria')
    userEvent.type(email,'')

    const button = screen.getByRole('button', { name: /submit/i });
    userEvent.click(button);

    const emailError = await screen.getByText(/must be a valid email address/i);

    expect(emailError).toBeInTheDocument();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {

    render(<ContactForm />)

    const email = screen.getByLabelText(/email/i)
    expect(email).toBeInTheDocument();

    userEvent.type(email,'Invalid-Email')

    const button = screen.getByRole('button', { name: /submit/i });
    userEvent.click(button);

    const emailError = await screen.getByText(/must be a valid email address/i);

    expect(emailError).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {

    render(<ContactForm />);

    const lastName = screen.getByLabelText(/last name/i)
    expect(lastName).toBeInTheDocument();
    
    userEvent.type(lastName,'')
    
    const button = screen.getByRole('button', { name: /submit/i });
    userEvent.click(button);
  
    const error = screen.getByText(/lastName is a required field/i);

    expect(error).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {

    render(<ContactForm />);

        const firstName = screen.getByLabelText(/first name*/i);

        const lastName = screen.getByLabelText(/last name*/i);

        const email = screen.getByLabelText(/email*/i);

        const message = screen.getByLabelText(/message/i)

        userEvent.type(firstName, 'Victor');
        userEvent.type(lastName,'Chavarria')
        userEvent.type(email, 'vchavarria1995@gmail.com');
        userEvent.type(message,'')

        const button = screen.getByRole('button', { name: /submit/i });
        userEvent.click(button);

        const firstNameText = await screen.getByText(/victor/i);
        expect(firstNameText).toBeInTheDocument();

        const lastNameText = await screen.getByText(/chavarria/i);
        expect(lastNameText).toBeInTheDocument();

        const emailText = await screen.getByText(/vchavarria1995@gmail.com/i);
        expect(emailText).toBeInTheDocument();
});

test('renders all fields text when all fields are submitted.', async () => {

    render(<ContactForm />);

        const firstName = screen.getByLabelText(/first name*/i);;

        const lastName = screen.getByLabelText(/last name*/i);

        const email = screen.getByLabelText(/email*/i);

        const message = screen.getByLabelText(/message/i);

        userEvent.type(firstName, 'Victor');
        userEvent.type(lastName,'Chavarria')
        userEvent.type(email, 'vchavarria1995@gmail.com');
        userEvent.type(message,'test message')

        const button = screen.getByRole('button', { name: /submit/i });
        userEvent.click(button);
            
        const firstNameText = await screen.getByText(/victor/i);
        expect(firstNameText).toBeInTheDocument();

        const lastNameText = await screen.getByText(/chavarria/i);
        expect(lastNameText).toBeInTheDocument();

        const emailText = await screen.getByText(/vchavarria1995@gmail.com/i);
        expect(emailText).toBeInTheDocument();

        const messageText = await screen.getByDisplayValue(/test message/i);
        expect(messageText).toBeInTheDocument();
});