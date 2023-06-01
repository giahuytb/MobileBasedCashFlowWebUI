/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useCallback, useRef } from 'react'
import PropTypes from 'prop-types';
import Modal from 'react-modal'

import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

GameAccountDelete.propTypes = {
    data: PropTypes.string,
    deleteGameAccount: PropTypes.func,
}
export default function GameAccountDelete({ data, deleteGameAccount }) {

    const toast = useRef(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    
    const handleIconClick = useCallback(() => {
        setModalIsOpen(true);
      }, []);

    const submitForm = async (e) => {       
        e.preventDefault();  
        try {
            deleteGameAccount(data.id)
            setModalIsOpen(true);
        } catch (error) {
            // Handle any errors that occurred during the operations
            console.error(error);
        }
    }
    return (
       
        <div style={{marginBottom: 10}}>
             {/* {console.log(selectedAccountType)} */}
            <Toast ref={toast} />
                <a 
                    href="#!" 
                    onClick={handleIconClick}>
                    <i className="fa fa-trash" aria-hidden="true" />
                </a>
            <Modal
                isOpen={modalIsOpen}
                ariaHideApp={false}
                onRequestClose={() => setModalIsOpen(false)}
                style={{
                    overlay: {
                        zIndex: '2',
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(191, 191, 191, 0.75)'
                    },
                    content: {
                        position: 'absolute',
                        top: '280px',
                        left: '760px',  
                        right: '560px',
                        bottom: '280px',
                        border: '1px solid #ccc',
                        background: '#fff',
                        overflow: 'auto',
                        WebkitOverflowScrolling: 'touch',
                        borderRadius: '25px',
                        outline: 'none',
                        padding: '20px',
                        borderWidth: '4px',
                        borderColor: '#b9e8fc',
                    }
                }}>
                <h3 className="p-mb-10 p-text-bold"
                    style={{textAlign: 'center', color: '#FF0000'}}>
                        Do you want to delete this game account  ( {data.Game_account_name} )
                </h3>
                <br />
                <form id="Event-Form" onSubmit={submitForm}>
                    <div style={{ display: 'flex', margin: 'auto', alignItems: 'center', justifyContent: 'center' }}>
                        <Button type="button" label="No"
                            onClick={() => setModalIsOpen(false)}
                            style={{marginRight: 20}} />
                        <Button type="Delete" label="Yes" />
                    </div>

                </form>
            </Modal>
        </div>
    )
}