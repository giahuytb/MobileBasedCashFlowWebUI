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
import { storage } from "../../firebase";


EventUpdate.propTypes = {
    EventCard: PropTypes.func,
}
export default function EventUpdate({ EventCard }) {

    
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const toast = useRef(null);
    const [loading, setLoading] = useState(false);
    const [imgMesage, setImgMesage] = useState("");
    const [newEventCard, setNewEventCard] = useState({
        Event_name: "", Image_url: "", Account_name: "", Cost: "", Down_pay: "", Dept: "", 
        Cash_flow: "", Trading_range: "", Event_description: "", Event_type_id: "",  Action: "",
    });
    const [file, setFile] = useState([])
    const validExt = ["jpg", "png", "jpeg"];

    const [selectedAction, setSelectedAction] = useState(null);
    const [selectedType, setSelectedType] = useState(null);

    const action = [
        { name: 'Buy', code: '1' },
        { name: 'Sell', code: '2' },
        { name: 'Pay', code: '3' },
        { name: 'Double the stock', code: '4' },
        { name: 'Halve the stock', code: '5' },
    ];

    const eventType = [
        { name: 'Big Deal', code: '1' },
        { name: 'Small Deal', code: '2' },
        { name: 'Doodad', code: '3' },
        { name: 'Market', code: '4' },
        { name: 'Opotunity', code: '5' },
    ];

    const onchangeImg = (e) => {
        setFile(e.target.files[0])
        // console.log(e.target.files[0]);
        validation(e.target.files[0]);
    }

    const onEventTypeChange = (e) => {
        setSelectedType(e.value);
        if(e.value !== undefined){
            setNewEventCard ({ ...newEventCard, Event_type_id: e.value.code });
        }     
    }

    const onActionChange = (e) => {
        setSelectedAction(e.value);
        if(e.value !== undefined){          
            setNewEventCard ({ ...newEventCard, Action: e.value.code });
        }
    }

    const handleIconClick = useCallback((e) => {
        e.preventDefault();
        setModalIsOpen(true);
      }, []);

    useEffect(() => {
        // console.log(newEventCard);
        if(newEventCard.Image_url !== ""){
             EventCard(newEventCard);
        }
        setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newEventCard.Image_url]);

    const submitForm = async (e) => {
        setLoading(true);
        e.preventDefault();
        const imageRef = ref(storage, `/Image/${file.name}`);
        uploadBytes(imageRef, file).then( async (snapshot) => {
            console.log("Uploaded Image")
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
                setImgMesage("Select File Is Not Image......")
                document.getElementById("event-img").value = "";
                return false;
            } 
            setImgMesage("");  
        }
        return true;
    }

    return (
        <div>
            <Toast ref={toast} />
            <a href="#!" onClick={handleIconClick} style={{ paddingRight: '15px' }}>
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
                        top: '160px',
                        left: '500px',
                        right: '300px',
                        bottom: '100px',
                        border: '1px solid #ccc',
                        background: '#fff',
                        overflow: 'auto',
                        WebkitOverflowScrolling: 'touch',
                        borderRadius: '25px',
                        outline: 'none',
                        padding: '20px',
                        borderWidth: '3px',
                        borderColor: '#FF3131',
                    }
                }}>
                <h3 className="p-mb-10 p-text-bold"
                    style={{textAlign: 'center'}}>
                        Create New Event Card
                </h3>
                <br />
                <form id="Event-Form" onSubmit={submitForm}>
                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col">
                            <label htmlFor="firstname2">Event Name</label>
                            <InputText id="firstname2" type="text" 
                                onChange={e => setNewEventCard ({ ...newEventCard, Event_name: e.target.value })}/>
                        </div>
                        <div className="p-field p-col">
                            <label htmlFor="lastname2">Account Name</label>
                            <InputText id="lastname2" type="text"
                                onChange={e => setNewEventCard ({ ...newEventCard, Account_name: e.target.value })}/>
                        </div>
                        <div className="p-field p-col">
                            <label htmlFor="firstname2">Type</label>
                            <Dropdown value={selectedType} options={eventType} optionLabel="name" filter showClear filterBy="name" placeholder="Select a Type"
                                 onChange={onEventTypeChange} />
                        </div>
                    </div>

                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col">
                            <label htmlFor="firstname2">Cost</label>
                            <InputNumber inputId="minmax" id="firstname2" type="text" mode="decimal" min={0} max={1000000}
                                onChange={e => setNewEventCard ({ ...newEventCard, Cost: e.value })}/>
                        </div>
                        <div className="p-field p-col">
                            <label htmlFor="lastname2">Down Pay</label>
                            <InputNumber inputId="minmax" id="firstname2" type="text" mode="decimal" min={0} max={1000000}
                                onChange={e => setNewEventCard ({ ...newEventCard, Down_pay: e.value })}/>
                        </div>
                        <div className="p-field p-col">
                            <label htmlFor="lastname2">Dept</label>
                            <InputNumber inputId="minmax" id="firstname2" type="text" mode="decimal" min={0} max={1000000}
                                onChange={e => setNewEventCard ({ ...newEventCard, Dept: e.value })}/>
                        </div>
                        <div className="p-field p-col">
                            <label htmlFor="firstname2">CashFlow</label>
                            <InputNumber inputId="minmax" id="firstname2" type="text" mode="decimal" min={0} max={1000000}
                                onChange={e => setNewEventCard ({ ...newEventCard, Cash_flow: e.value })}/>
                        </div>
                    </div>

                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col">
                            <label htmlFor="firstname2">Trading Range</label>
                            <InputText id="firstname2" type="text"
                                onChange={e => setNewEventCard ({ ...newEventCard, Trading_range: e.target.value })}/>
                        </div>
                        <div className="p-field p-col">
                            <label htmlFor="firstname2">Action</label>
                            <Dropdown value={selectedAction} options={action}  optionLabel="name" filter showClear filterBy="name" placeholder="Select an action"
                                 onChange={onActionChange}                                
                                />
                        </div>
                        <div className="p-field p-col">
                            <label htmlFor="lastname2">Event Image</label>
                            <InputText id="event-img" type="file" name="img" required
                                onChange={onchangeImg}
                            />
                            <label style={{ color: 'red' }}> {imgMesage} </label>
                        </div>
                    </div>

                    <div className="p-fluid p-formgrid p-grid">
                        <label htmlFor="lastname2">Event Description</label>
                        <InputTextarea  rows={5} cols={30} autoResize 
                            onChange={e => setNewEventCard ({ ...newEventCard, Event_description: e.target.value })}/>
                    </div>

                    <div style={{ float: 'right', marginTop: 20 }}>
                        <Button type="button" label="Close"
                            onClick={() => setModalIsOpen(false)}
                            style={{marginRight: 20}} />

                        <Button type="submit" label="Submit" loading={loading} />
                    </div>

                </form>
            </Modal>
        </div>
    )
}