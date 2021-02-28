import React, {Component} from 'react';
import {Text, View, TouchableOpacity, TextInput, StyleSheet, ScrollView, Modal} from 'react-native';
import firebase from 'firebase';
import db from '../config';

export default class LoginScreen extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            contact:'',
            confirmPassword: '',
            isModalVisible: false
        }
    
    }
    Login = async(email, password)=>{
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(()=>{
            return(alert("Succesfully Login"))
        })
        .catch(()=>{
            return(alert("Invalid Email or Password"))
        })
    }

    SignUp = async(email, password, confirmPassword)=>{
        if(password !== confirmPassword){
            return(alert("Password does not match"))
        }
        else {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(()=>{
            return(alert("User added Successfully"))
        })
        .catch(()=>{
            return(alert("Could not create Email and Password"))
        })}
        db.collection("Users").add({
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            address: this.state.address,
            contact_number: this.state.contact,
            email_id: this.state.email
        })
    }
    
    showModal = async()=>{
        return(
            <Modal animationType = "fade"
            transparent = {true}
            visible = {this.state.isModalVisible}>
                <View style = {styles.container}>
                    <ScrollView style = {{width: "100%"}}>
                        <Text>
                            Registration
                        </Text>
                        <TextInput style = {styles.searchBar}
                        maxLength = {10}
                        placeholder = "First Name"
                        onChangeText = {(text)=>{
                            this.setState({
                                firstName: text
                            })
                        }}>
                        </TextInput >

                        <TextInput style = {styles.searchBar}
                        maxLength = {15}
                        placeholder = "Last Name"
                        onChangeText = {(text)=>{
                            this.setState({
                                lastName: text
                            })
                        }}>
                        </TextInput>

                        <TextInput style = {styles.searchBar}
                        multiline = {true}
                        placeholder = "Address"
                        onChangeText = {(text)=>{
                            this.setState({
                                address: text
                            })
                        }}>
                        </TextInput>

                        <TextInput style = {styles.searchBar}
                        maxLength = {10}
                        placeholder = "Contact"
                        onChangeText = {(text)=>{
                            this.setState({
                                contact: text
                            })
                        }}>
                        </TextInput>

                        <TextInput style = {styles.searchBar}
                        maxLength = {25}
                        placeholder = "Email Id"
                        onChangeText = {(text)=>{
                            this.setState({
                                email: text
                            })
                        }}>                           
                        </TextInput>

                        <TextInput style = {styles.searchBar}
                        maxLength = {15}
                        placeholder = "Password"
                        secureTextEntry = {true}
                        onChangeText = {(text)=>{
                            this.setState({
                                password: text
                            })
                        }}>                           
                        </TextInput>

                        <TextInput style = {styles.searchBar}
                        maxLength = {15}
                        placholder = "Confirm Password"
                        secureTextEntry = {true}
                        onChangeText = {(text)=>{
                            this.setState({
                                confirmPassword: text
                            })
                        }}>                            
                        </TextInput>

                        <TouchableOpacity style = {styles.submitButton} onPress = {()=>{
                            this.SignUp(this.state.email, this.state.password, this.state.confirmPassword)
                            this.setState({
                                isModalVisible: false
                            })
                        }}>
                            <Text style = {styles.bar}>
                                Register
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style = {styles.submitButton} onPress = {()=>{
                            this.setState({
                                isModalVisible: false
                        })
                        }}>
                            <Text style = {styles.bar}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </Modal>
        )
    }

    render (){
        return(
            <View style = {styles.container}>
                <View style = {{justifyContent: "center", alignItems: "center"}}>
                {this.showModal()}
                </View>
                <TextInput
                style = {styles.bar}
                placeholder = "Email"
                onChangeText = {(text)=>{
                    this.setState({
                        email: text
                    })
                }}>
                </TextInput>

                <TextInput
                style = {styles.bar}
                placeholder = "Password"
                onChangeText = {(text)=>{
                    this.setState({
                        password: text
                    })
                }}>
                </TextInput>

                <TouchableOpacity style = {styles.submitButton} onPress = {()=>{
                    this.Login(this.state.email, this.state.password)
                }}>
                    <Text>
                        Login
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.submitButton} onPress = {()=>{
                    this.SignUp(this.state.email, this.state.password)
                }}>
                    <Text>
                        Register
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    searchBar:{
      flexDirection:'row',
      height:40,
      width:'auto',
      borderWidth:0.5,
      alignItems:'center',
      backgroundColor:'grey',
    },
    bar:{
      borderWidth:2,
      height:30,
      width:300,
      paddingLeft:10,
    },
    submitButton:{
      borderWidth:1,
      height:30,
      width:50,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'green'
    }
  })
