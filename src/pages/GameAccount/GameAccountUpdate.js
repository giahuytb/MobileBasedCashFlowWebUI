/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef, useEffect} from 'react'
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
// hook

import styles from '../../mystyle.module.css'


GameAccountUpdate.propTypes = {
    updateGameAccount: PropTypes.func,
    data: PropTypes.object,
}
export default function GameAccountUpdate({ data, updateGameAccount }) {

    const toast = useRef(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedAccountType, setSelectedAccountType] = useState(null);
    const [newGameAccount, setNewGameAccount] = useState(
        {
        id: data.id, 
        Game_account_name: data.Game_account_name, 
        Game_account_type: data.Game_account_type, 
        Status : data.Status,    
        });

    const accountType = [
        "Income", "Expense", "Asset", "Dept"
    ];
    

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

    const onGameAccountTypeChange= (e) => {
        setSelectedAccountType(e.value);
        // console.log(e.value);
        if(e.value !== undefined){          
            setNewGameAccount ({ ...newGameAccount, Game_account_type: e.value });
        }
    }

    useEffect(() => {     
        setSelectedAccountType(data.Game_account_type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleIconClick = (e) => {
        e.preventDefault();
        setModalIsOpen(true);
    };

    const loading2 = false;

    useEffect( () => {     
        console.log(loading)
            try {
                if(loading === true) {
                    updateGameAccount(newGameAccount)   
                }                       
            } catch (error) {
                // Handle any errors that occurred during the operations
                console.error(error);
                setLoading(false);
            }

   
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading]);

    const submitForm = (e) => {
        e.preventDefault();
        setLoading(true); 
    }

    

    return (
        <div>
            {/* {console.log(data)} */}
            <Toast ref={toast}/>
            <a href="#!" onClick={handleIconClick} style={{ marginRight: '15px' }}>
                <i className="fas fa-edit fa" />
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
                        Edit Game Account
                </h3>
                <br />
                <form id="Event-Form" onSubmit={(submitForm)}>                   
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
                                placeholder="Select game account type" 
                                itemTemplate={TypeItemTemplate}                             
                                onChange={onGameAccountTypeChange} />
                        </div>                      
                    </div>

                    <div style={{ float: 'right', marginTop: 20 }}>
                        <Button type="button" label="Close"
                            onClick={() => setModalIsOpen(false)}
                            style={{marginRight: 20}} />

                        <Button type="submit" label="Update" loading={(loading2)}/>
                    </div>

                </form>
            </Modal>

        </div>
    )
}