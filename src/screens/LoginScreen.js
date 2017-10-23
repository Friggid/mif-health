import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    Image,
    TouchableWithoutFeedback
} from 'react-native';
import * as firebase from 'firebase';
import MainTabNavigator from '../navigation/MainTabNavigator';
import { StackNavigator } from 'react-navigation';
import { FormLabel, FormInput } from 'react-native-elements';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB5BjfgXJmHXyk6ZPCsajtXxAOjj0K3mJg",
    authDomain: "mif-health.firebaseapp.com",
    databaseURL: "https://mif-health.firebaseio.com",
    projectId: "mif-health",
    storageBucket: "mif-health.appspot.com",
    messagingSenderId: "342939282652"
};
firebase.initializeApp(firebaseConfig);

const DismissKeyboard = require('dismissKeyboard');

export default class login extends React.Component{
    constructor(props) {
        super(props);
        this.state = { email:'', password:'', error:'', loading:false};
    }

    onLoginPress() {
        this.setState({error:'', loading:true});

        const {email, password} = this.state;

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({error:'', loading:false});
                this.props.navigation.navigate('Home');
            })
            .catch(() => {
                this.setState({error:'Authentication failed', loading:false});
            })
    }

    onSignUpPress() {
        this.setState({error:'', loading:true});

        const {email, password} = this.state;

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({error:'', loading:false});
                this.props.navigation.navigate('Home');
            })
            .catch(() => {
                this.setState({error:'Authentication failed', loading:false});
            })
    }

    renderButtonOrLoading() {
        if(this.state.loading) {
            return <Text>Loading</Text>
        }
        return <View style={styles.buttonContainer}>
            <View style={styles.button}>
                <Button 
                    onPress={this.onLoginPress.bind(this)} 
                    title='Login'/>
            </View>
            <View style={styles.button}>
                <Button 
                    onPress={this.onSignUpPress.bind(this)}
                    title='Sign Up'/>
            </View>
        </View>
    }

    render() {

        return (
            <TouchableWithoutFeedback onPress={ () => { DismissKeyboard() } }>
                <View
                    style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image
                            style={{width: 100, height: 100}}
                            source={require('../assets/images/icon.png')}/>
                    </View>
                    <View style={{ paddingTop: 10, paddingLeft: 20, paddingRight: 20 }}>
                        <Text>Email</Text>
                        <View style={styles.textInput}>
                            <TextInput 
                                style={{ paddingLeft: 10 }}
                                underlineColorAndroid='rgba(0,0,0,0)'
                                keyboardType={'email-address'}
                                autoCorrect={false}
                                placeholder={'email@email.com'}
                                value={this.props.email}
                                onChangeText={email => this.setState({email})}/>
                        </View>
                    </View>
                    <View style={{ paddingTop: 10, paddingLeft: 20, paddingRight: 20 }}>
                        <Text>Password</Text>
                        <View style={styles.textInput}>
                            <TextInput
                                style={{ paddingLeft: 10}}
                                underlineColorAndroid='rgba(0,0,0,0)'
                                autoCorrect={false}
                                placeholder={'password'}
                                value={this.props.password}
                                onChangeText={password => this.setState({password})}
                                secureTextEntry={true}/>
                        </View>
                    </View>
                    <View>
                        <Text>{this.state.error}</Text>
                        {this.renderButtonOrLoading()}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'        
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        padding: 10,
        minWidth: 180
    },
    textInput: {
        borderWidth: 0.8, 
        borderRadius: 5, 
        borderColor: 'gray'
    }
});
