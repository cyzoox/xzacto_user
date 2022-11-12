import React, { useState } from "react";
import {  StyleSheet } from "react-native";
import { Text,Input, Button } from "react-native-elements";
import { useNavigation } from '@react-navigation/native';
import Spacer from "./Spacer";
import colors from "../themes/colors";

const AuthForm = ({headerText, errorMessage, onSubmit, submitButtonText, routeName}) => {
   const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

  return (
      <>
          <Spacer>
             <Text h3>{headerText}</Text>
          </Spacer>
           <Input 
              label="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              autoCorrect={false}
            />
           <Spacer/>
           <Input 
              secureTextEntry
              label="Password"
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
              autoCorrect={false}
            />
     
           <Spacer>
              <Button buttonStyle={{backgroundColor: colors.accent, padding: 10}} title={submitButtonText}  onPress={()=> onSubmit(email, password )}/>
           </Spacer>
      </>
      );
};

const styles = StyleSheet.create({
    errorMessage: {
        fontSize: 16,
        color: 'red',
        marginLeft: 15,
        marginTop: 15
      },
});

export default AuthForm;
