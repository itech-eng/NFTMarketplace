import {useToasts} from "react-toast-notifications";
import {useEffect} from "react";

const ShowToastAlert = ()=>{
    const { addToast } = useToasts();
    useEffect( ()=>{
        const response_type = localStorage.getItem('response-type');
        const response_message = localStorage.getItem('response-message');
        if (response_type && response_message){
            if (response_type === "success"){
                addToast(response_message, { appearance: "success" });
            }else if(response_type === "warning"){
                addToast(response_message, { appearance: "warning" });
            }else {
                addToast(response_message, { appearance: "error" });
            }
            localStorage.removeItem('response-type');
            localStorage.removeItem('response-message');
        }
    },[]);
}

const AddToastAlert = (message : string,type : string)=>{
    localStorage.setItem('response-type',type);
    localStorage.setItem('response-message',message);
}


export {ShowToastAlert,AddToastAlert}