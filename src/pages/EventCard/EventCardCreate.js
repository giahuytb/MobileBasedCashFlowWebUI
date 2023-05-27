/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState, useCallback, useRef } from 'react'
import PropTypes from 'prop-types';
import Modal from 'react-modal'

import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';
import { Dropdown } from 'primereact/dropdown';


import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {Button as MyButton} from '@mui/material';

import { Tag } from 'primereact/tag';
import { storage } from "../../firebase";
import ApiService from '../../api/ApiService'

import styles from '../../mystyle.module.css';
import Iconify from '../../components/iconify';


EventCardCreate.propTypes = {
    createEventCard: PropTypes.func,
}
export default function EventCardCreate({ createEventCard }) {

    const toast = useRef(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [imgMesage, setImgMesage] = useState("");
    const [newEventCard, setNewEventCard] = useState(
        {
        Event_name: "", Image_url: "", Account_name: "Empty", Cost: "", Down_pay: "", Dept: "", 
        Cash_flow: "", Trading_range: "", Event_description: "", Event_type: "",  Action: "", Game_mod_id : 1,
        });
    const [file, setFile] = useState([])
    const validExt = ["jpg", "png", "jpeg"];

    const [selectedAction, setSelectedAction] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [selectedGameAccount, setSelectedGameAccount] = useState(null);
    const [gameAccount, setGameAccount] = useState(null);

    const getBackGroundColor = (option) => {
        switch (option) {
            case "Big Deal":
                return {background : '#2196f3', borderRadius: 10};
            case "Small Deal":
                return {background : '#00FF00', color : 'black', borderRadius: 10};
            case "DooDad":
                return {background : '#FF0000', borderRadius: 10};
            case "Market":
                return {background : '#FFA500', borderRadius: 10};
            case "Opotunity":
                return {background : '#7B68EE', borderRadius: 10};
            default:
                return {background : 'black', borderRadius: 10};
        }
    };

    const action = [
        { name: 'Buy', code: 1 },
        { name: 'Sell', code: 2 },
        { name: 'Pay', code: 3 },
        { name: 'Double the stock', code: 4 },
        { name: 'Halve the stock', code: 5 },
    ];

    const eventType = [
        "Big Deal", "Small Deal", "DooDad", "Market", "Opotunity"
    ]; 

    const GetAllGameAccount = async () => {
        try {
            ApiService.GetAllGameAccount()
                .then(response => {
                    setGameAccount(response.data);
                })
        } catch (error) {
            if (error.response) {
                // get response with a status code not in range 2xx
                console.log(error.response.data.data);
                console.log(error.response.data.status);
                console.log(error.response.data.headers);
              } else if (error.request) {
                // no response
                console.log(error.request);
              } else {
                // Something wrong in setting up the request
                console.log("Error", error.message);
              }
              console.log(error.config);
        }
    }

    const onchangeImg = (e) => {
        setFile(e.target.files[0])
        // console.log(e.target.files[0]);
        validation(e.target.files[0]);
    }

    const onEventTypeChange = (e) => {
        setSelectedType(e.value);
        if(e.value !== undefined){
            setNewEventCard ({ ...newEventCard, Event_type: e.value });
        }     
    }

    const onActionChange = (e) => {
        setSelectedAction(e.value);
        if(e.value !== undefined){          
            setNewEventCard ({ ...newEventCard, Action: e.value.code });
        }
    }

    const onGameAccountChange= (e) => {
        setSelectedGameAccount(e.value);
        // console.log(e.value);
        if(e.value !== undefined){          
            setNewEventCard ({ ...newEventCard, Account_name: e.value.Game_account_name });
        }
    }

    const handleIconClick = useCallback(() => {
        setModalIsOpen(true);
        // GetAllGameAccount();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    useEffect(() => {
        // console.log(newEventCard);
        if(newEventCard.Image_url !== ""){
            createEventCard(newEventCard);
        }
        setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newEventCard.Image_url]);

    useEffect(() => {
        GetAllGameAccount();   
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const submitForm = async (e) => {
        setLoading(true);
        e.preventDefault();
        const imageRef = ref(storage, `/Image/${file.name}`);
        uploadBytes(imageRef, file).then( async (snapshot) => {           
            toast.current.show({severity: 'info', summary: 'Success', detail: 'Uploaded Image', life: 4000});
            await getDownloadURL(snapshot.ref).then(url => setNewEventCard({...newEventCard, Image_url:url }));
        });
        setModalIsOpen(true);
    }

    const validation = (file) => {
        if (file != null) {
            // get index of .
            const posOfDot = file.name.lastIndexOf(".") + 1;
            // get the string after index of .
            const imgExtention = file.name.substring(posOfDot);
            const result = validExt.includes(imgExtention);
            if (!result) {
                setImgMesage("Select File Is Not Image")
                toast.current.show({severity: 'error', summary: 'Error', detail: 'Select File Is Not Image', life: 4000});
                document.getElementById("event-img").value = "";
                return false;
            } 
            setImgMesage("");  
        }
        return true;
    }

    const statusItemTemplate = (option) => <Tag value={option} 
                                                style={getBackGroundColor(option)} />;

    return (
        <div style={{marginBottom: 10}}>
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
                New card
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
                <h3 className="p-mb-10 p-text-bold"
                    style={{textAlign: 'center', color: '#2196f3'}}>
                        Create New Event Card
                </h3>
                <br />
                <form id="Event-Form" onSubmit={submitForm}>
                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col">
                            <label className={styles.label}>Event Name</label>
                            <InputText id="firstname2" type="text" 
                                onChange={e => setNewEventCard ({ ...newEventCard, Event_name: e.target.value })}/>
                        </div>
                        <div className="p-field p-col">
                            <label className={styles.label}>Account Name</label>
                            <Dropdown value={selectedGameAccount} options={gameAccount} 
                                optionLabel="Game_account_name" 
                                filter showClear filterBy="Game_account_name" 
                                placeholder="Select game account"                               
                                onChange={onGameAccountChange} />
                        </div>
                        <div className="p-field p-col">
                            <label className={styles.label}>Event Type</label>
                            <Dropdown value={selectedType} options={eventType} 
                                itemTemplate={statusItemTemplate} 
                                showClear  
                                placeholder="Select a Type"
                                onChange={onEventTypeChange} />
                        </div>
                    </div>

                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col">
                            <label className={styles.label}>Cost</label>
                            <InputNumber inputId="minmax" id="firstname2" type="text" mode="decimal" min={0} max={1000000}
                                onChange={e => setNewEventCard ({ ...newEventCard, Cost: e.value })}/>
                        </div>
                        <div className="p-field p-col">
                            <label className={styles.label}>Down Pay</label>
                            <InputNumber inputId="minmax" id="firstname2" type="text" mode="decimal" min={0} max={1000000}
                                onChange={e => setNewEventCard ({ ...newEventCard, Down_pay: e.value })}/>
                        </div>
                        <div className="p-field p-col">
                            <label className={styles.label}>Dept</label>
                            <InputNumber inputId="minmax" id="firstname2" type="text" mode="decimal" min={0} max={1000000}
                                onChange={e => setNewEventCard ({ ...newEventCard, Dept: e.value })}/>
                        </div>
                        <div className="p-field p-col">
                            <label className={styles.label}>CashFlow</label>
                            <InputNumber inputId="minmax" id="firstname2" type="text" mode="decimal" min={0} max={1000000}
                                onChange={e => setNewEventCard ({ ...newEventCard, Cash_flow: e.value })}/>
                        </div>
                    </div>

                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col">
                            <label className={styles.label}>Trading Range</label>
                            <InputText id="firstname2" type="text"
                                onChange={e => setNewEventCard ({ ...newEventCard, Trading_range: e.target.value })}/>
                        </div>
                        <div className="p-field p-col">
                            <label className={styles.label}>Action</label>
                            <Dropdown value={selectedAction} options={action} 
                                optionLabel="name" 
                                filter showClear filterBy="name" 
                                placeholder="Select an action"
                                onChange={onActionChange} />
                        </div>
                        <div className="p-field p-col">
                            <label className={styles.label}>Event Image</label>
                            <InputText id="event-img" type="file" name="img" required
                                onChange={onchangeImg}
                            />
                            <label style={{ color: 'red' }}> {imgMesage} </label>
                        </div>
                    </div>

                    <div className="p-fluid p-formgrid p-grid">
                        <label className={styles.label}>Event Description</label>
                        <InputTextarea  rows={5} cols={30} autoResize 
                            onChange={e => setNewEventCard ({ ...newEventCard, Event_description: e.target.value })}/>
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