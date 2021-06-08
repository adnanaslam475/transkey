import React, { Component } from 'react';
import {
    View, TextInput, StyleSheet,
    TouchableOpacity, Text, Image
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from "react-native-vector-icons/Ionicons";
import axios from 'axios'
import Languages from '../translation.json';


export default class Translator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            languageFrom: "",
            languageTo: "",
            languageCode: 'en',
            inputText: "",
            text: '',
            outputText: "",
            submit: false,
            micOn: false,
        };
    }
    handleTranslate = () => {
        axios.get(`http://192.168.1.105:5000/tasks?input=${this.state.inputText}&from=en&to=${this.state.languageCode}`,
            {
                headers: { 'Content-Type': 'application/json' }
            }).then(res => {
                console.log(res.data)
                this.setState({ text: res.data.text })
            }).catch(e => {
                console.log('cannot ranslate')
            })
    }

    render() {
        console.log(this.state.languageCode, this.state.languageTo)
        return (
            <View style={styles.container}>
                <View style={styles.input}>
                    <TextInput
                        style={{ flex: 1, height: 80 }}
                        placeholder="Enter Text"
                        underlineColorAndroid="transparent"
                        onChangeText={inputText => this.setState({ inputText })}
                        value={this.state.inputText}
                    />
                    <TouchableOpacity onPress={this._buttonClick}>
                        {this.state.micOn ? <Icon size={30} name="md-mic" style={styles.ImageStyle} /> : <Icon size={30} name="md-mic-off" style={styles.ImageStyle} />}
                    </TouchableOpacity>
                </View>
                <Picker
                    selectedValue={this.state.languageTo}
                    onValueChange={lang => this.setState({ languageTo: lang, languageCode: lang })}
                >
                    {Object.keys(Languages).map((key, i) => (
                        <Picker.Item key={i} label={Languages[key]} value={key} />
                    ))}
                </Picker>
                <Text>aaa{this.state.text}</Text>
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={this.handleTranslate}
                >
                    <Text style={styles.submitButtonText}> Submit </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 53
    },
    input: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: .5,
        borderColor: '#000',
        // height: 40,
        borderRadius: 5,
        margin: 10
    },
    output: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: .5,
        borderColor: '#000',
        borderRadius: 5,
        margin: 10,
        height: 80,
    },
    ImageStyle: {
        padding: 10,
        margin: 5,
        alignItems: 'center'
    },
    submitButton: {
        backgroundColor: '#7a42f4',
        padding: 10,
        margin: 15,
        borderRadius: 5,
        height: 40,
    },
    submitButtonText: {
        color: 'white'
    },
})