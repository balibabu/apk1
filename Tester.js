import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "./counterSlice";

export default function Tester({ navigation }) {
    const value = useSelector((state) => state.counter);
    const dispatch = useDispatch();

    return (
        <View>
            <Text>Hello Tester</Text>
            <Text>{value}</Text>
            <TouchableOpacity onPress={() => dispatch(increment())}>
                <View><Text>start Fetcher</Text></View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <View><Text>axios tester</Text></View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('sql')}>
                <View><Text>sql tester</Text></View>
            </TouchableOpacity>
        </View>
    )
}
