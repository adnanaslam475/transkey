import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Alert,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from '@react-native-picker/picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Voice from '@react-native-community/voice';
import axios from 'axios';
import Languages from '../translation.json';


const Speech = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null)
  const [start, setStart] = useState(false);
  const [error, setError] = useState('');
  const [languageCode, setLanguageCode] = useState('')
  const [end, setEnd] = useState('');
  const [text, setText] = useState('')
  const [update, setUpdate] = useState(false);
  const [empty, setempty] = useState(false)
  const [results, setResults] = useState([]);


  useEffect(() => {
    AsyncStorage.getItem('lang').then(res => {
      const lang = JSON.parse(res)
      setLanguageCode(Languages[lang])
    }).catch(e => {
      console.log('nhi ara', e)
    })
  }, [update])
  useEffect(() => {
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners).catch(e => {
        console.log('41 catch==>', e)
      });
    };
  }, []);

  

  const onSpeechError = (e) => {
    setError(JSON.stringify(e.error));
  };

  const onSpeechResults = (e) => {
    setResults(e.value);
    setText(e.value.reverse()[0])
  };
  const startRecognizing = async () => {
    try {
      await Voice.start('en-US'); //yahn pr device language aegi
      setError('');
      setResults([]);
      setEnd('');
      setStart(true)
    } catch (e) {
      console.error('85',);
    }
  };

  const stopRecognizing = async () => {
    setStart(false)
    try {
      await Voice.stop();
      await Voice.cancel();
      await Voice.destroy();
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };


  const send = () => {
    if (text) {

      setLoading(true);
      axios.get(`https://lanugaetransltor.herokuapp.com/tasks?input=${text}&from=en&to=${languageCode}`,
        {
          headers: { 'Content-Type': 'application/json' }
        }).then(res => {
          setResponse(res.data.ress)
          setLoading(false)
        }).catch(e => {
          Alert.alert(
            "ERROR!!!",
            "Cannot Translate...",
            [
              { text: "OK" }
            ]
          );
          setLoading(false)
        })
    }
    else {
      setempty(true)
    }
  }



  // const destroyRecognizer = async () => {
  //   //Destroys the current SpeechRecognizer instance
  //   try {
  //     await Voice.destroy();
  //     setError('');
  //     setResults([]);
  //     setEnd('');
  //   } catch (e) {
  //     //eslint-disable-next-line
  //     console.error(e);
  //   }
  // };

  const saveLanguage = async lang => {
    try {
      const jsonValue = JSON.stringify(lang)
      await AsyncStorage.setItem('lang', jsonValue);
      setUpdate(!update)
    }
    catch (error) {
      console.log('cannto set 135')
    }
  }

  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={{ alignSelf: 'flex-start', fontWeight: 'bold' }}> Enter Text  </Text>
        <View style={styles.vw}>
          <TextInput textAlign='center' value={text}
            style={styles.input}
            placeholder='enter text..'
            onChangeText={t => { setText(t); setempty(false) }} />

          <TouchableHighlight onPress={start === false ? startRecognizing : stopRecognizing}>
            <FontAwesome name='microphone'
              style={{ marginLeft: 5 }}
              color={start === false ? 'blue' : 'green'} size={width * 0.1} />
          </TouchableHighlight>
        </View>
        {empty ? <Text style={{margin:5, color: 'red' }}>Please Enter Text</Text> : null}
        <Picker
          style={styles.picker}
          selectedValue={languageCode}
          onValueChange={lang => saveLanguage(lang)} >
          {Object.keys(Languages).map((key, i) => {
            return (<Picker.Item key={i} label={Languages[key]} value={key} />)
          })}
        </Picker>
        {loading ? <ActivityIndicator color='blue' size={height * 0.07} /> :
          <TouchableOpacity style={styles.btn}
            onPress={send}>
            <Text style={{ color: 'white' }}>Translated into {languageCode}</Text>
          </TouchableOpacity>}
        <Text>{response}</Text>
      </View>
    </SafeAreaView >
  );
};

export default Speech;
const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
  input: {
    height: height * 0.065,
    width: width * 0.85, borderRadius: 20,
    backgroundColor: 'lightgray'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 5,
  },
  picker: {
    width: width * 0.8, height: 50,
    borderWidth: 1,
    borderRadius: 10, borderColor: 'gray'
  },
  vw: {
    display: 'flex', flexDirection: 'row',
    justifyContent: 'space-between'
  },
  btn: {
    width: width * 0.9,
    height: height * 0.07,
    borderRadius: 20,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
});