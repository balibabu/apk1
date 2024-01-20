import axios from "axios";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function Login({ navigation }) {
    const [token, setToken] = useState('token');
    const loginHandler = async () => {
        const response = await axios.post(`https://balib.pythonanywhere.com/user/login/`, {
            username: 'bali',
            password: '9845930089',
        });
        if (response.status === 200) {
            setToken(response.data.token);
        } else {
            setToken('something went wring');
        }
    }
    return (
        <View>
            <Text>Hello toke is {token}</Text>
            <TouchableOpacity onPress={loginHandler}>
                <View><Text>Login</Text></View>
            </TouchableOpacity>
        </View>
    )
}
