// EM: src/pages/MudarSenha/MudarSenha.jsx

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './MudarSenha.style'; // Estilo novo
import { COLORS, FONT_SIZE } from '../../constants/theme';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import api from '../../services/api';
import TextBox from '../../components/textbox/textbox.jsx';
import Button from '../../components/button/button.jsx';

// (Assumindo que a logo está acessível por este caminho)
const LogoImage = require('../../assets/logo.png'); 

function MudarSenha({ navigation }) {
    const [senhaAtual, setSenhaAtual] = useState("");
    const [novaSenha, setNovaSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    const handleUpdatePassword = async () => {
        // 1. Validações primeiro
        if (!senhaAtual || !novaSenha || !confirmarSenha) {
            Alert.alert("Erro", "Por favor, preencha todos os campos.");
            return;
        }
        if (novaSenha !== confirmarSenha) {
            Alert.alert("Erro", "A nova senha e a confirmação não coincidem.");
            return;
        }

        try {
            // 2. Chama o backend
            // (O seu 'updateProfile' no backend JÁ está pronto para isso!)
            const response = await api.patch('/users/me', {
                currentPassword: senhaAtual,
                newPassword: novaSenha
            });

            // 3. Sucesso
            Alert.alert(
                "Sucesso!",
                "Sua senha foi alterada.",
                [
                    { 
                        text: "OK", 
                        // Volta para a tela de Perfil
                        onPress: () => navigation.goBack() 
                    }
                ]
            );

        } catch (error) {
            // 4. Erro (ex: senha atual incorreta)
            const errorMessage = error.response?.data?.error || "Não foi possível alterar a senha.";
            Alert.alert("Erro ao Alterar Senha", errorMessage);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1 }}
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
                enableOnAndroid={true}
                extraScrollHeight={75}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.formGroup}>
                    {/* Logo */}
                    <View style={{ marginBottom: 30, alignItems: 'center' }}>
                        <Image 
                            source={LogoImage} 
                            style={{ width: 150, height: 150, resizeMode: 'contain' }} 
                        />
                    </View>
                    
                    <Text style={styles.welcomeText}>Alterar Senha</Text> 

                    <View style={styles.form}>
                        <TextBox 
                            label="Senha Atual"
                            value={senhaAtual}
                            onChangeText={setSenhaAtual}
                            isPassword={true}
                            labelStyle={{ color: COLORS.white }}
                            inputStyle={{ backgroundColor: '#fff', borderColor: 'transparent' }} 
                            textInputStyle={{ color: '#000' }} 
                            placeholderColor="#888"
                        />
                    </View>

                    <View style={styles.form}>
                        <TextBox 
                            label="Nova Senha"
                            value={novaSenha}
                            onChangeText={setNovaSenha}
                            isPassword={true}
                            labelStyle={{ color: COLORS.white }}
                            inputStyle={{ backgroundColor: '#fff', borderColor: 'transparent' }} 
                            textInputStyle={{ color: '#000' }} 
                            placeholderColor="#888"
                        />
                    </View>

                    <View style={styles.form}>
                        <TextBox 
                            label="Confirmar Nova Senha"
                            value={confirmarSenha}
                            onChangeText={setConfirmarSenha}
                            isPassword={true}
                            labelStyle={{ color: COLORS.white }}
                            inputStyle={{ backgroundColor: '#fff', borderColor: 'transparent' }} 
                            textInputStyle={{ color: '#000' }} 
                            placeholderColor="#888"
                        />
                    </View>

                    <View style={styles.form}>
                        <Button 
                            texto="Salvar Nova Senha" 
                            onPress={handleUpdatePassword}
                            buttonStyle={{ width: '100%', backgroundColor: '#008000' }} 
                            textStyle={{ color: COLORS.white, fontWeight: 'bold' }} 
                        />
                    </View>
                </View>

                {/* Rodapé (Botão de Voltar) */}
                <View style={styles.footer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={styles.footerText}>Voltar para o Perfil</Text>
                    </TouchableOpacity>
                </View>

            </KeyboardAwareScrollView> 
        </SafeAreaView>
    );
}

export default MudarSenha;