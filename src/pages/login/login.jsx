import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./login.style.js";
import Header from "../../components/header/header.jsx";
import TextBox from "../../components/textbox/textbox.jsx";
import Button from "../../components/button/button.jsx";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

    const Stack = createNativeStackNavigator()


function Login({navigation}) {
    return <View style={styles.container}>
        <Header texto="Acesse sua conta." />

        <View style={styles.formGroup}>
            <View style={styles.form}>
                <TextBox label="E-mail" />
            </View>

            <View style={styles.form}>
                <TextBox label="Senha" isPassword={true} />
            </View>

            <View style={styles.form}>
                <Button texto="Acessar" />
            </View>
        </View>

        <View style={styles.footer}>
            <TouchableOpacity onPress={()=>navigation.navigate('Registro')}>
                <Text style={styles.footerText}>Ou se Cadastre</Text>
            </TouchableOpacity>
        </View>
    </View>
}

export default Login;