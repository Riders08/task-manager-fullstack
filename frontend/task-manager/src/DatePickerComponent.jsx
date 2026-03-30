import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"

function DatePickerComponent({onChangeDate}){

    
    
    
    const [date, setDate] = useState(null);
    
    const handleChange = (newDate)=>{
        setDate(newDate);
        onChangeDate(newDate);
    }
 
    return (<ReactDatePicker
    selected={date}
    onChange={handleChange}
    showTimeSelect
    dateFormat="Pp"
    />);
}
    
export default DatePickerComponent;