import { View, Text, TouchableOpacity, Alert } from "react-native";
import { styles } from "./esqueceuSenha.style"; 
import Header from "../../components/header/header.jsx";
import TextBox from "../../components/textbox/textbox.jsx";
import Button from "../../components/button/button.jsx";
import { useState } from "react";
import api from "../../services/api.ts";

function RecuperarSenha({ navigation }) {
    const [email, setEmail] = useState("");

    const handleRecover = async () => {
        if (!email) {
            Alert.alert("Atenção", "Por favor, informe seu e-mail.");
            return;
        }

        try {
            console.log("Solicitando recuperação de senha para:", email);

            const response = await api.post('/users/recover-password', {
                email: email,
            });

            console.log("Resposta do servidor:", response.data);
            Alert.alert(
                "Verifique seu e-mail!",
                "Enviamos instruções para criar uma nova senha."
            );
            navigation.goBack();

        } catch (error) {
            console.error("Erro ao recuperar senha:", error);
            Alert.alert("Erro", "Não encontramos esse e-mail no sistema.");
        }
    };

    return (
        <View style={styles.container}>
            <Header texto="Recuperar Senha" />

            <View style={styles.formGroup}>
                <View style={styles.form}>
                    <TextBox 
                        label="Informe seu e-mail"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />
                </View>

                <View style={styles.form}>
                    <Button 
                        texto="Enviar" 
                        onPress={handleRecover} 
                    />
                </View>

            </View>
        </View>
    );
}

export default RecuperarSenha;
