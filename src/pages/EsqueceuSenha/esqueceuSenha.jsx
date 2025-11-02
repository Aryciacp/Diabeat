// EM: RecuperarSenha.jsx (CORRIGIDO)

import { View, Text, TouchableOpacity, Alert, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./esqueceuSenha.style.js"; 

// 1. Imports necessários
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { COLORS, FONT_SIZE } from "../../constants/theme"; 
const LogoImage = require('../../assets/logo.png'); // (Verifique este caminho!)

// import Header from "../../components/header/header.jsx"; // 2. REMOVA o Header
import TextBox from "../../components/textbox/textbox.jsx";
import Button from "../../components/button/button.jsx";
import { useState } from "react";
import api from "../../services/api"; 

function RecuperarSenha({ navigation }) {
    const [email, setEmail] = useState("");

    // (Sua função handleRecover está 100% correta)
    const handleRecover = async () => {
        if (!email) {
            Alert.alert("Atenção", "Por favor, informe seu e-mail.");
            return;
        }
        try {
            console.log("Solicitando recuperação de senha para:", email);
            const response = await api.post('/users/recover-password', { email });
            console.log("Resposta do servidor:", response.data);
            Alert.alert(
                "Verifique seu e-mail!",
                "Se o e-mail estiver cadastrado, enviamos instruções para criar uma nova senha."
            );
            navigation.goBack();
        } catch (error) {
            // Não informe ao usuário se o e-mail existe ou não
            console.error("Erro ao recuperar senha (ou e-mail não existe):", error);
            Alert.alert(
                "Verifique seu e-mail!",
                "Se o e-mail estiver cadastrado, enviamos instruções para criar uma nova senha."
            );
            navigation.goBack();
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* 3. Adicione o KeyboardAwareScrollView */}
            <KeyboardAwareScrollView
                style={{ flex: 1 }}
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
                enableOnAndroid={true}
                extraScrollHeight={75}
                showsVerticalScrollIndicator={false}
            >
                {/* 4. Grupo do Formulário (Topo) */}
                <View style={styles.formGroup}>
                    {/* 5. Adicione a Logo */}
                    <View style={{ marginBottom: 30, alignItems: 'center' }}>
                        <Image 
                            source={LogoImage} 
                            style={{ width: 250, height: 250, resizeMode: 'contain' }} 
                        />
                    </View>
                    
                    {/* 6. Título (Substituindo o Header) */}
                    <Text style={styles.titleText}>Recuperar Senha</Text> 

                    <View style={styles.form}>
                        {/* 7. Corrija o TextBox */}
                        <TextBox 
                            label="Informe seu e-mail"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            // Adiciona os estilos que faltavam
                            labelStyle={{ color: COLORS.white }}
                            inputStyle={{ backgroundColor: '#fff', borderColor: 'transparent' }} 
                            textInputStyle={{ color: '#000' }} 
                            placeholderColor="#888"
                        />
                    </View>

                    <View style={styles.form}>
                        {/* 8. Corrija o Button */}
                        <Button 
                            texto="Enviar" 
                            onPress={handleRecover}
                            buttonStyle={{ 
                                width: '100%', 
                                backgroundColor: '#008000' // Verde (igual ao login)
                            }} 
                            textStyle={{ 
                                color: COLORS.white, 
                                fontWeight: 'bold' 
                            }} 
                        />
                    </View>
                </View>

                {/* 9. Rodapé (Agora vai para o fim da tela) */}
                <View style={styles.footer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={styles.footerText}>Voltar para o Login</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}

export default RecuperarSenha;