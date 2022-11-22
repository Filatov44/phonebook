import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchContacts } from 'redux/contacts-operation';
// import { nanoid } from 'nanoid';
import { useSelector } from 'react-redux';
import { getContacts } from 'redux/contacts-selector';
import { ToastContainer } from 'react-toastify';
import {Zoom} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  StyledPhonebookContainer,
  StyledPhonebookTitle,
  StyledTitleContact,
  StyledPhonebookWrapper,
  StyledDivAddContact,
  StyledDivContacts,
  StyledTitleContactAd,
} from 'components/Phonebook/Phonebook.styled';

import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import Message from './Message/Message';

import { getState } from 'redux/contacts-selector';

// const emptyContactsList = [];

export default function Phonebook() {
  const { loading, error } = useSelector(getState);
  const contacts = useSelector(getContacts);
  // console.log(contacts);
  // const length = contacts.length;

  const dispatch = useDispatch();
  
 useEffect(() => {
   dispatch(fetchContacts());
 }, [dispatch]);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        transition={Zoom}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <StyledPhonebookWrapper>
        <StyledPhonebookTitle>My PhoneBook</StyledPhonebookTitle>

        <StyledPhonebookContainer>
          <StyledDivAddContact>
            <StyledTitleContactAd>Add new contact</StyledTitleContactAd>
            <ContactForm />
          </StyledDivAddContact>
          <StyledDivContacts>
            <StyledTitleContact>Contacts</StyledTitleContact>

            <Filter />
            {!loading && contacts.length > 0 ? (
              <ContactList />
            ) : (
              <Message text="Contact list is empty" />
            )}
            {error && <p>sory, something went wrong</p>}
          </StyledDivContacts>
        </StyledPhonebookContainer>
      </StyledPhonebookWrapper>
    </>
  );
}