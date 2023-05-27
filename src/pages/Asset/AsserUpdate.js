/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef} from 'react'
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { InputTextarea } from 'primereact/inputtextarea';

import styles from '../../mystyle.module.css'


AssetUpdate.propTypes = {
    updateAsset: PropTypes.func,
    data: PropTypes.object,
}
export default function AssetUpdate({ data, updateAsset }) {

    const toast = useRef(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [newAsset, setNewAsset] = useState(
        {
        AssetId: data.AssetId, 
        AssetName: data.AssetName, 
        AssetPrice: data.AssetPrice,
        ImageUrl: data.ImageUrl,
        Description : data.Description,
        IsInShop: data.IsInShop,
        AssetTypeId: data.AssetTypeId,    
        });

    const handleIconClick = (e) => {
        e.preventDefault();
        setModalIsOpen(true);
      };

    const submitForm = async (e) => {
        setLoading(true);
        e.preventDefault();
        updateAsset(newAsset);
        setLoading(false);
        setModalIsOpen(true);
    }

    return (
        <div>
            {/* {console.log(newAsset)} */}
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
                        Edit Asset
                </h3>
                <br />
                <form id="Event-Form" onSubmit={submitForm}>                   
                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col">
                            <label className={styles.label}>Asset name</label>
                            <InputText value = {newAsset.AssetName} 
                                id="firstname2" type="text" required
                                onChange={e => setNewAsset ({ ...newAsset, AssetName: e.target.value })}/>
                        </div>  
                        <div className="p-field p-col">
                            <label className={styles.label}>Asset Price</label>
                            <InputText value = {newAsset.AssetPrice} 
                                id="firstname2" type="text" required
                                onChange={e => setNewAsset ({ ...newAsset, AssetPrice: e.target.value })}/>
                        </div>                   
                    </div>

                    <div className="p-fluid p-formgrid p-grid">
                            <label className={styles.label}>Description</label>
                            <InputTextarea rows={3} cols={30} autoResize spellCheck='false' aria-label="Bold"
                                    value={newAsset.Description}
                                    onChange={e => setNewAsset ({ ...newAsset, Description: e.target.value })}/>
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