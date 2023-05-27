/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useCallback, useRef } from 'react'
import PropTypes from 'prop-types';
import Modal from 'react-modal'

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Dropdown } from 'primereact/dropdown';

import {Button as MyButton} from '@mui/material';

import { Tag } from 'primereact/tag';
import Iconify from '../../components/iconify';

import styles from '../../mystyle.module.css'


GameAccountCreate.propTypes = {
    createGameAccount: PropTypes.func,
}
export default function GameAccountCreate({ createGameAccount }) {

    const toast = useRef(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [messageError, setMessageError] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedAccountType, setSelectedAccountType] = useState(null);
    const [newGameAccount, setNewGameAccount] = useState(
        {
        Game_account_name: "", 
        Game_account_type: "",   
        })

    const accountType = [
        "Income", "Expense", "Asset", "Dept"
    ]; 

    const onGameAccountTypeChange= (e) => {
        setSelectedAccountType(e.value);
        // console.log(e.value);
        if(e.value !== undefined){          
            setNewGameAccount ({ ...newGameAccount, Game_account_type: e.value });
        }
    }
   
    const getTypeBackground = (status) => {
        switch (status) {
            case "Income":
                return {background : '#2196f3'};
            case "Expense":
                return {background : '#FF0000'};
            case "Dept":
                return {background : '#00FF00',color : 'black'};
            case "Asset":
                return {background : '#7B68EE',};
            default:
                return {background : 'black',};
        }
    };

    const TypeItemTemplate = (option) => <Tag value={option} 
                                            style={getTypeBackground(option)} />;

    const handleIconClick = useCallback(() => {
        setModalIsOpen(true);
      }, []);


    const submitForm = async (e) => {       
        e.preventDefault();
        setLoading(true);     
        try {
            createGameAccount(newGameAccount)
            setLoading(false);
            setModalIsOpen(true);
        } catch (error) {
            // Handle any errors that occurred during the operations
            console.error(error);
            setLoading(false);
        }
    }

    return (
       
        <div style={{marginBottom: 10}}>
             {/* {console.log(selectedAccountType)} */}
            <Toast ref={toast} />
            <MyButton 
                style={{ float: 'right' }}
                variant="contained" 
                startIcon={<Iconify icon="eva:plus-fill"/>}
                onClick={handleIconClick}
                tabIndex={0}
                role="button"
                aria-hidden="true"
                aria-label="Close modal">
                New Game Account
            </MyButton>
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
                        top: '200px',
                        left: '650px',
                        right: '450px',
                        bottom: '200px',
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
                    style={{textAlign: 'center', color: '#2196f3'}}>
                        Create New Event Card
                </h3>
                <br />
                <form id="Event-Form" onSubmit={submitForm}>
                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col">
                            <label className={styles.label}>Game account name</label>
                            <InputText value = {newGameAccount.Game_account_name} 
                                id="firstname2" type="text" required
                                onChange={e => setNewGameAccount ({ ...newGameAccount, Game_account_name: e.target.value })}/>
                        </div>
                    </div>
       
                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col">
                            <label className={styles.label}>Game account type</label>
                            <Dropdown value={selectedAccountType} options={accountType} 
                                placeholder="Select game account type" required
                                itemTemplate={TypeItemTemplate}                             
                                onChange={onGameAccountTypeChange} />
                        </div> 
                        <h5> {messageError}</h5> 
                    </div>

                    <div style={{ float: 'right', marginTop: 20 }}>
                        <Button type="button" label="Close"
                            onClick={() => setModalIsOpen(false)}
                            style={{marginRight: 20}} />

                        <Button type="submit" label="Create" loading={loading} />
                    </div>

                </form>
            </Modal>
        </div>
    )
}