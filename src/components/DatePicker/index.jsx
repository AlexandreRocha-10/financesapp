import React, { useState } from 'react';

import DateTimePicker from '@react-native-community/datetimepicker';
import { Container } from './styles';

export default function DatePicker({ date, onChange }) {
    const [dateNow, setdateNow] = useState(new Date(date));

    return (
        <Container>
            <DateTimePicker 
            value={dateNow}
            mode='date'
            display='default'
            onChange={ (e, d) => {
                const currentDate = d || dateNow;
                setdateNow(currentDate);
                onChange(currentDate);
            }}
            style={{ backgroundColor: '#FFF'}}
            />
            
        </Container>
    );
}