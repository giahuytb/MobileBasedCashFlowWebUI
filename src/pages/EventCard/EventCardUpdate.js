/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState} from 'react'
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// hook
import useResponsive from '../../hooks/useResponsive';
import { storage } from "../../firebase";
import styles from '../../mystyle.module.css'


EventUpdate.propTypes = {
    updateEventCard: PropTypes.func,
    data: PropTypes.object,
    gameAccountList: PropTypes.array,
}
export default function EventUpdate({ data, updateEventCard, gameAccountList }) {

    const isDesktop = useResponsive('up', 'lg');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [imgMesage, setImgMesage] = useState("");
    const [newEventCard, setNewEventCard] = useState(
        {
        id: data.id, Event_name: data.Event_name, Image_url: data.Image_url, Account_name: data.Account_name, 
        Cost: data.Cost, Down_pay: data.Down_pay, Dept: data.Dept, Cash_flow: data.Cash_flow, Trading_range: data.Trading_range, 
        Event_description: data.Event_description, Event_type_id: data.Event_type_id,  Action: data.Action, Game_mod_id: data.Game_mod_id,
        });
    const [file, setFile] = useState(null)
    const validExt = ["jpg", "png", "jpeg"];

    const [selectedAction, setSelectedAction] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [selectedGameAccount, setSelectedGameAccount] = useState(null);
    const [gameAccount, setGameAccount] = useState([{name : '', code: ''}]);
    const check = localStorage.getItem("check");

    const found = gameAccountList.find(obj => obj.Game_account_name === data.Account_name);

    const action = [
        { name: 'Buy', code: 1 },
        { name: 'Sell', code: 2 },
        { name: 'Pay', code: 3 },
        { name: 'Double the stock', code: 4 },
        { name: 'Halve the stock', code: 5 },
    ];

    const eventType = [
        { name: 'Big Deal', code: 1 },
        { name: 'Small Deal', code: 2 },
        { name: 'Doodad', code: 3 },
        { name: 'Market', code: 4 },
        { name: 'Opotunity', code: 5 },
    ];

    useEffect(() => {
        if(check === true){
            localStorage.setItem("check", "false");           
        }
        setGameAccount(gameAccountList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setSelectedType(eventType[newEventCard.Event_type_id-1]);
        setSelectedAction(action[newEventCard.Action-1]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

    const onGameAccountChange= (e) => {
        setSelectedGameAccount(e.value);
        console.log(e.value);
        if(e.value !== undefined){          
            setNewEventCard ({ ...newEventCard, gameAccount: e.value });
        }
    }

    const handleIconClick = (e) => {
        e.preventDefault();
        setModalIsOpen(true);
      };

      useEffect(() => {
        // console.log(newEventCard);
        if(newEventCard.Image_url !== data.Image_url){
            updateEventCard(newEventCard);
        }
        setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newEventCard.Image_url]);

    const submitForm = async (e) => {
        setLoading(true);
        e.preventDefault();
        console.log(file)
        if(file !== null){
            const imageRef = ref(storage, `/Image/${file.name}`);
            uploadBytes(imageRef, file).then( async (snapshot) => {
                console.log("Uploaded Image")
                await getDownloadURL(snapshot.ref).then(url => setNewEventCard({...newEventCard, Image_url:url }));
            });
        }else{
            updateEventCard(newEventCard);
            setLoading(false);
        }     
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
            {/* {console.log(data)}
            {console.log(gameAccount)} */}
            <a href="#!" onClick={handleIconClick} style={{ marginRight: '15px' }}>
                <i className="fas fa-edit fa" />
            </a>
            {isDesktop ? (
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
                        Edit Event Card Desktop
                </h3>
                <br />
                <form id="Event-Form" onSubmit={submitForm}>
                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col">
                            <label className={styles.label} >Event Name</label>
                            <InputText id="firstname2" type="text" className='border-solid'
                                value = {newEventCard.Event_name}
                                onChange={e => setNewEventCard ({ ...newEventCard, Event_name: e.target.value })}/>
                        </div>
                        <div className="p-field p-col">
                            <label className={styles.label}>Account Name</label>
                            <Dropdown value={found} options={gameAccount} 
                                optionLabel="Game_account_name" 
                                filter showClear filterBy="Game_account_name" 
                                placeholder="Select game account"
                                onChange={onGameAccountChange} />
                        </div>
                        <div className="p-field p-col">
                            <label className={styles.label}>Type</label>
                            <Dropdown value={selectedType} options={eventType} 
                                optionLabel="name" 
                                filter showClear filterBy="name" 
                                placeholder="Select a Type"
                                onChange={onEventTypeChange} />
                        </div>
                    </div>

                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col">
                            <label className={styles.label}>Cost</label>
                            <InputNumber value = {newEventCard.Cost} 
                                inputId="minmax" id="firstname2" type="text" mode="decimal" min={0} max={1000000}
                                onChange={e => setNewEventCard ({ ...newEventCard, Cost: e.value })}/>
                        </div>
                        <div className="p-field p-col">
                            <label className={styles.label}>Down Pay</label>
                            <InputNumber value = {newEventCard.Down_pay} 
                            inputId="minmax" id="firstname2" type="text" mode="decimal" min={0} max={1000000}
                                onChange={e => setNewEventCard ({ ...newEventCard, Down_pay: e.value })}/>
                        </div>
                        <div className="p-field p-col">
                            <label className={styles.label}>Dept</label>
                            <InputNumber value = {newEventCard.Dept}  
                                inputId="minmax" id="firstname2" type="text" mode="decimal" min={0} max={1000000}
                                onChange={e => setNewEventCard ({ ...newEventCard, Dept: e.value })}/>
                        </div>
                        <div className="p-field p-col">
                            <label className={styles.label}>CashFlow</label>
                            <InputNumber value = {newEventCard.Cash_flow}  
                                inputId="minmax" id="firstname2" type="text" mode="decimal" min={0} max={1000000}
                                onChange={e => setNewEventCard ({ ...newEventCard, Cash_flow: e.value })}/>
                        </div>
                    </div>

                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col">
                            <label className={styles.label}>Trading Range</label>
                            <InputText value = {newEventCard.Trading_range}  
                                id="firstname2" type="text"
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
                            <InputText id="event-img" type="file" name="img"
                                onChange={onchangeImg}
                            />
                            <label style={{ color: 'red' }}> {imgMesage} </label>
                        </div>
                    </div>

                    <div className="p-fluid p-formgrid p-grid">
                        <label className={styles.label}>Event Description</label>
                        <InputTextarea rows={3} cols={30} autoResize spellCheck='false' aria-label="Bold"
                            value={newEventCard.Event_description}
                            onChange={e => setNewEventCard ({ ...newEventCard, Event_description: e.target.value })}/>
                    </div>

                    <div style={{ float: 'right', marginTop: 20 }}>
                        <Button type="button" label="Close"
                            onClick={() => setModalIsOpen(false)}
                            style={{marginRight: 20}} />

                        <Button type="submit" label="Submit" loading={loading} />
                    </div>

                </form>
            </Modal>): (<Modal          
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
                        top: '80px',
                        left: '200px',
                        right: '200px',
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
                    style={{textAlign: 'center', color: '#a7d1e3'}}>
                        Edit Event Card Tablet
                </h3>
                <br />
                <form id="Event-Form" onSubmit={submitForm}>
                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col">
                            <label htmlFor="firstname2">Event Name</label>
                            <InputText id="firstname2" type="text" className='border-solid'
                                value = {newEventCard.Event_name}
                                onChange={e => setNewEventCard ({ ...newEventCard, Event_name: e.target.value })}/>
                        </div>
                        <div className="p-field p-col">
                            <label htmlFor="lastname2">Account Name</label>
                            <Dropdown value={selectedGameAccount} options={gameAccount} 
                                optionLabel="Game_account_name" 
                                filter showClear filterBy="Game_account_name" 
                                placeholder="Select game account"
                                onChange={onGameAccountChange} />
                        </div>
                        <div className="p-field p-col">
                            <label htmlFor="firstname2">Type</label>
                            <Dropdown value={selectedType} options={eventType} 
                                optionLabel="name" 
                                filter showClear filterBy="name" 
                                placeholder="Select a Type"
                                onChange={onEventTypeChange} />
                        </div>
                    </div>

                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col">
                            <label htmlFor="firstname2">Cost</label>
                            <InputNumber value = {newEventCard.Cost} 
                                inputId="minmax" id="firstname2" type="text" mode="decimal" min={0} max={1000000}
                                onChange={e => setNewEventCard ({ ...newEventCard, Cost: e.value })}/>
                        </div>
                        <div className="p-field p-col">
                            <label htmlFor="lastname2">Down Pay</label>
                            <InputNumber value = {newEventCard.Down_pay} 
                            inputId="minmax" id="firstname2" type="text" mode="decimal" min={0} max={1000000}
                                onChange={e => setNewEventCard ({ ...newEventCard, Down_pay: e.value })}/>
                        </div>
                        <div className="p-field p-col">
                            <label htmlFor="lastname2">Dept</label>
                            <InputNumber value = {newEventCard.Dept}  
                                inputId="minmax" id="firstname2" type="text" mode="decimal" min={0} max={1000000}
                                onChange={e => setNewEventCard ({ ...newEventCard, Dept: e.value })}/>
                        </div>
                        <div className="p-field p-col">
                            <label htmlFor="firstname2">CashFlow</label>
                            <InputNumber value = {newEventCard.Cash_flow}  
                                inputId="minmax" id="firstname2" type="text" mode="decimal" min={0} max={1000000}
                                onChange={e => setNewEventCard ({ ...newEventCard, Cash_flow: e.value })}/>
                        </div>
                    </div>

                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col">
                            <label htmlFor="firstname2">Trading Range</label>
                            <InputText value = {newEventCard.Trading_range}  
                                id="firstname2" type="text"
                                onChange={e => setNewEventCard ({ ...newEventCard, Trading_range: e.target.value })}/>
                        </div>
                        <div className="p-field p-col">
                            <label htmlFor="firstname2">Action</label>
                            <Dropdown value={selectedAction} options={action} 
                                optionLabel="name" 
                                filter showClear filterBy="name"               
                                placeholder="Select an action"
                                onChange={onActionChange} />
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
                        <InputTextarea rows={3} cols={30} autoResize spellCheck='false' aria-label="Bold"
                            value={newEventCard.Event_description}
                            onChange={e => setNewEventCard ({ ...newEventCard, Event_description: e.target.value })}/>
                    </div>

                    <div style={{ float: 'right', marginTop: 20 }}>
                        <Button type="button" label="Close"
                            onClick={() => setModalIsOpen(false)}
                            style={{marginRight: 20}} />

                        <Button type="submit" label="Submit" loading={loading} />
                    </div>

                </form>
            </Modal>)          
        } 
            
        </div>
    )
}