/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState} from 'react'
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
// hook

import styles from '../../mystyle.module.css'


JobCardUpdate.propTypes = {
    updateJobcard: PropTypes.func,
    data: PropTypes.object,
}
export default function JobCardUpdate({ data, updateJobcard }) {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [newJobCard, setNewJobCard] = useState({
        id: data.id, 
        Job_card_name: data.Job_card_name, 
        Children_cost: data.Children_cost, 
        Status: data.Status, 
        Image_url: data.Image_url, 
        Game_accounts: [
            {
                Game_account_name: data.Game_accounts[0].Game_account_name,
                Game_account_type: data.Game_accounts[0].Game_account_type,
                Game_account_value: data.Game_accounts[0].Game_account_value,
                Amount: 1
            },
            {
                Game_account_name: data.Game_accounts[1].Game_account_name,
                Game_account_type: data.Game_accounts[1].Game_account_type,
                Game_account_value: data.Game_accounts[1].Game_account_value,
                Amount: 1
            },
            {
                Game_account_name: data.Game_accounts[2].Game_account_name,
                Game_account_type: data.Game_accounts[2].Game_account_type,
                Game_account_value: data.Game_accounts[2].Game_account_value,
                Amount: 1
            },
            {
                Game_account_name: data.Game_accounts[3].Game_account_name,
                Game_account_type: data.Game_accounts[3].Game_account_type,
                Game_account_value: data.Game_accounts[3].Game_account_value,
                Amount: 1
            },
            {
                Game_account_name: data.Game_accounts[4].Game_account_name,
                Game_account_type: data.Game_accounts[4].Game_account_type,
                Game_account_value: data.Game_accounts[4].Game_account_value,
                Amount: 1
            },
            {
                Game_account_name: data.Game_accounts[5].Game_account_name,
                Game_account_type: data.Game_accounts[5].Game_account_type,
                Game_account_value: data.Game_accounts[5].Game_account_value,
                Amount: 1
            },
            {
                Game_account_name: data.Game_accounts[6].Game_account_name,
                Game_account_type: data.Game_accounts[6].Game_account_type,
                Game_account_value: data.Game_accounts[6].Game_account_value,
                Amount: 1
            },
            {
                Game_account_name: data.Game_accounts[7].Game_account_name,
                Game_account_type: data.Game_accounts[7].Game_account_type,
                Game_account_value: data.Game_accounts[7].Game_account_value,
                Amount: 1
            },
            {
                Game_account_name: data.Game_accounts[8].Game_account_name,
                Game_account_type: data.Game_accounts[8].Game_account_type,
                Game_account_value: data.Game_accounts[8].Game_account_value,
                Amount: 1
            },
            {
                Game_account_name: data.Game_accounts[9].Game_account_name,
                Game_account_type: data.Game_accounts[9].Game_account_type,
                Game_account_value: data.Game_accounts[9].Game_account_value,
                Amount: 1
            },
            {
                Game_account_name: data.Game_accounts[10].Game_account_name,
                Game_account_type: data.Game_accounts[10].Game_account_type,
                Game_account_value: data.Game_accounts[10].Game_account_value,
                Amount: 1
            },
            {
                Game_account_name: data.Game_accounts[11].Game_account_name,
                Game_account_type: data.Game_accounts[11].Game_account_type,
                Game_account_value: data.Game_accounts[11].Game_account_value,
                Amount: 1
            },
            {
                Game_account_name: data.Game_accounts[12].Game_account_name,
                Game_account_type: data.Game_accounts[12].Game_account_type,
                Game_account_value: data.Game_accounts[12].Game_account_value,
                Amount: 1
            },                       
        ]
    });

    const handleIconClick = (e) => {
        e.preventDefault();
        setModalIsOpen(true);
      };


    const submitForm = async (e) => {
        setLoading(true);
        e.preventDefault();
        updateJobcard(newJobCard);
        setLoading(false);  
        setModalIsOpen(true);
    }   

      const updateGameAccount = (e, field) => {
        console.log(`${e.value  }${  field}`);
        setNewJobCard(prevData => {
          const updatedData = { ...prevData }; // Create a new copy of the JSON object
                   
          // Find and update the "Salary" game account value
          updatedData.Game_accounts = updatedData.Game_accounts.map(account => {
            if (account.Game_account_name === field) {
              return {
                ...account,
                Game_account_value: e.value,
              };
            }
            return account;
          });        
          return updatedData; // Update the state with the modified object
        });
      };

    return (
        <div>
            {/* {console.log(data)} */}
            {/* {console.log(newJobCard)} */}
            {/* {console.log(data.Game_accounts[0].Game_account_value)} */}
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
                        top: '100px',
                        left: '500px',
                        right: '300px',
                        bottom: '50px',
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
                <br />
                <form id="Event-Form" onSubmit={submitForm}>
                    <div className="p-fluid p-formgrid p-grid">                       
                        <div className="p-field p-col">
                            <img style={{ width: '25%', height: '80%'}}
                                    src={`/assets/images/jobcards/${data.Image_url}.png`} 
                                    alt={newJobCard.Job_card_name} />
                        </div>
                        <div className="p-field p-col">
                            <label className={styles.label} >Job Name</label>
                            <InputText id="firstname2" type="text" className='border-solid' required
                                value = {newJobCard.Job_card_name}
                                onChange={e => setNewJobCard ({ ...newJobCard, Job_card_name: e.target.value })}/>
                        </div>

                        <div className="p-field p-col">
                            <label className={styles.label} >Children cost</label>
                                <InputNumber value = {newJobCard.Children_cost} 
                                inputId="minmax" id="firstname2" type="text" mode="decimal" min={0} max={1000000} required
                                onChange={e => setNewJobCard ({ ...newJobCard, Children_cost: e.value })}/>
                        </div> 
                        
                    </div>

                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col">
                            <label className={styles.label}>Salary</label>
                            <InputNumber value = {newJobCard.Game_accounts[0].Game_account_value.toString()} 
                                inputId="minmax" id="firstname2" type="text" mode="decimal" min={0} max={1000000} required
                                onChange={e => updateGameAccount(e, "Salary")}/>
                        </div>
                        <div className="p-field p-col">
                            <label className={styles.label}>Tax</label>
                            <InputNumber value = {newJobCard.Game_accounts[1].Game_account_value.toString()} 
                            inputId="minmax" id="firstname2" type="text" mode="decimal" min={0} max={1000000} required
                                onChange={e => updateGameAccount(e, "Tax")}/>
                        </div>
                        <div className="p-field p-col">
                            <label className={styles.label}>Paying home loan interest</label>
                            <InputNumber value = {newJobCard.Game_accounts[2].Game_account_value.toString()}  
                                inputId="minmax" id="firstname2" type="text" mode="decimal" min={0} max={1000000} required
                                onChange={e => updateGameAccount(e, "Paying home loan interest")}/>
                        </div>
                        <div className="p-field p-col">
                            <label className={styles.label}>Car loan payment</label>
                            <InputNumber value = {newJobCard.Game_accounts[3].Game_account_value.toString()}  
                                inputId="minmax" id="firstname2" type="text" mode="decimal" min={0} max={1000000} required
                                onChange={e => updateGameAccount(e, "Car loan payment")}/>
                        </div>
                    </div>

                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col">
                            <label className={styles.label}>Credit card loan payments</label>
                            <InputNumber value = {newJobCard.Game_accounts[4].Game_account_value.toString()} 
                                inputId="minmax" id="firstname2" type="text" mode="decimal" min={0} max={1000000} required
                                onChange={e => updateGameAccount(e, "Credit card loan payments")}/>
                        </div>
                        <div className="p-field p-col">
                            <label className={styles.label}>Shopping costs</label>
                            <InputNumber value = {newJobCard.Game_accounts[5].Game_account_value.toString()} 
                            inputId="minmax" id="firstname2" type="text" mode="decimal" min={0} max={1000000} required
                                onChange={e => updateGameAccount(e, "Shopping costs")}/>
                        </div>
                        <div className="p-field p-col">
                            <label className={styles.label}>Other cost</label>
                            <InputNumber value = {newJobCard.Game_accounts[6].Game_account_value.toString()}  
                                inputId="minmax" id="firstname2" type="text" mode="decimal" min={0} max={1000000} required
                                onChange={e => updateGameAccount(e, "Other cost")}/>
                        </div>
                        <div className="p-field p-col">
                            <label className={styles.label}>Child rearing costs</label>
                            <InputNumber value = {newJobCard.Game_accounts[7].Game_account_value.toString()}  
                                inputId="minmax" id="firstname2" type="text" mode="decimal" min={0} max={1000000} required
                                readOnly/>
                        </div>
                    </div>

                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col">
                            <label className={styles.label}>Cash</label>
                            <InputNumber value = {newJobCard.Game_accounts[8].Game_account_value.toString()} 
                                inputId="minmax" id="firstname2" type="text" mode="decimal" min={0} max={1000000} required
                                onChange={e => updateGameAccount(e, "cash")}/>
                        </div>
                        <div className="p-field p-col">
                            <label className={styles.label}>Mortgage debt</label>
                            <InputNumber value = {newJobCard.Game_accounts[9].Game_account_value.toString()} 
                            inputId="minmax" id="firstname2" type="text" mode="decimal" min={0} max={1000000} required
                                onChange={e => updateGameAccount(e, "Mortgage debt")}/>
                        </div>
                        <div className="p-field p-col">
                            <label className={styles.label}>Car debt</label>
                            <InputNumber value = {newJobCard.Game_accounts[10].Game_account_value.toString()}  
                                inputId="minmax" id="firstname2" type="text" mode="decimal" min={0} max={1000000} required
                                onChange={e => updateGameAccount(e, "Car debt")}/>
                        </div>
                        <div className="p-field p-col">
                            <label className={styles.label}>Credit card debt</label>
                            <InputNumber value = {newJobCard.Game_accounts[11].Game_account_value.toString()}  
                                inputId="minmax" id="firstname2" type="text" mode="decimal" min={0} max={1000000} required
                                onChange={e => updateGameAccount(e, "credit card debt")}/>
                        </div>
                    </div>

                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col">
                            <label className={styles.label}>Installment purchase debt</label>
                            <InputNumber value = {newJobCard.Game_accounts[12].Game_account_value.toString()} 
                            inputId="minmax" id="firstname2" type="text" mode="decimal" min={0} max={1000000} required
                                onChange={e => updateGameAccount(e, "installment purchase debt")}/>
                        </div>                        
                    </div>

                    <div style={{ float: 'right', marginTop: 20 }}>
                        <Button type="button" label="Close"
                            onClick={() => setModalIsOpen(false)}
                            style={{marginRight: 20}} />

                        <Button type="submit" label="Update" loading={loading} />
                    </div>

                </form>
            </Modal>     
        </div>
    )
}