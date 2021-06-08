import React, { useState } from 'react'
import { Button, TextInput, View } from 'react-native'
import axios from 'axios';
const Translator = () => {
    const [input, setInput] = useState('');
    const [trans, settrans] = useState('');
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [response, setRes] = useState(null)

    const send = () => {
        axios.get(`https://lanugaetransltor.herokuapp.com/tasks?input=${input}&from=${from}&to=${to}`,
            {
                headers: { 'Content-Type': 'application/json' }
            }).then(res => {
                console.log(res.data);
                setRes(res.data)
            }).catch(e => {
                console.log(e)
            })
    }

    return (
        <View style={{
            padding: 30, display: 'flex', justifyContent: 'center',
            alignContent: 'center', alignItems: 'center'
        }}>
            <TextInput value={input} placeholder='adnan' onChangeText={t => setInput(t)} />
            {/* <Text>{trans}</Text> */}
            <Button onPress={send} title='send' color='blue' />
        </View>
    )
}

export default Translator
