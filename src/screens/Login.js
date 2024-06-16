import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
    webClientId: '1051718902034-sgda7kqk02fhat8s50k6b8i28m82nr2j.apps.googleusercontent.com', // From Firebase Console
});

const LoginScreen = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [confirm, setConfirm] = useState(null);
    const [code, setCode] = useState('');

    const onGoogleButtonPress = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);
            const signedInUser = await auth().signInWithCredential(googleCredential);
            console.log(signedInUser)
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (f.e. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    };

    const signInWithPhoneNumber = async () => {
        const confirmation = await auth().signInWithPhoneNumber('+91' + phoneNumber);

        console.log(JSON.stringify(confirmation))
        setConfirm(confirmation);
    };

    const confirmCode = async () => {
        try {
            const user = await confirm.confirm(code);
            console.log('User: ', JSON.stringify(user))
        } catch (error) {
            console.log('Invalid code.');
        }
    };

    return (
        <View>
            <GoogleSigninButton onPress={onGoogleButtonPress} />
            <TextInput placeholder="Phone Number" onChangeText={setPhoneNumber} />
            <Button title="Sign in with phone" onPress={signInWithPhoneNumber} />
            {confirm && (
                <>
                    <TextInput placeholder="Verification Code" onChangeText={setCode} />
                    <Button title="Confirm Code" onPress={confirmCode} />
                </>
            )}
        </View>
    );
};

export default LoginScreen;
