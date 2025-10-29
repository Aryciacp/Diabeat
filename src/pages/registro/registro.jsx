// EM: registro.jsx (CORRIGIDO)

import { 
    View, 
    Text, 
    TouchableOpacity, 
    Alert, 
    StyleSheet,
    Image 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./registro.style";

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { COLORS, FONT_SIZE } from "../../constants/theme"; 
const LogoImage = require('../../assets/logo.png'); // (Verifique este caminho!)

import TextBox from "../../components/textbox/textbox.jsx";
import Button from "../../components/button/button.jsx";
import { useState } from "react";
import api from "../../services/api"; 

function Registro({ navigation }) { 
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmaSenha, setConfirmaSenha] = useState("");

    // (Sua função handleRegistro está 100% correta)
    const handleRegistro = async () => {
        if (senha !== confirmaSenha) {
            Alert.alert("Erro no Cadastro", "As senhas não coincidem.");
            return;
        }
        try {
            const response = await api.post('/users', {
                name: nome,
                email: email,
                password: senha
            });
            Alert.alert("Sucesso!", "Usuário cadastrado com sucesso.");
            navigation.navigate('Login'); 
        } catch (error) {
            console.error("ERRO na chamada da API:", error);
            Alert.alert("Erro no Cadastro", "Não foi possível criar o usuário.");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            
            <KeyboardAwareScrollView
                style={{ flex: 1 }}
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
                enableOnAndroid={true}
                enableAutomaticScroll={true}
                
                // --- CORREÇÕES APLICADAS AQUI ---
                
                // 1. Aumentamos o espaço para o scroll automático (igual ao Login)
                extraScrollHeight={75} 
                
                // 2. Esconde a barra lateral de rolagem
                showsVerticalScrollIndicator={false}
                
                // --- FIM DAS CORREÇÕES ---
            >
                {/* Grupo do Formulário (Topo) */}
                <View style={styles.formGroup}>
                    {/* Logo */}
                    <View style={{ marginBottom: 30, alignItems: 'center' }}>
                        <Image 
                            source={LogoImage} 
                            style={{ width: 150, height: 150, resizeMode: 'contain' }} 
                        />
                    </View>
                    
                    <Text style={styles.welcomeText}>Cadastro:</Text> 

                    <View style={styles.form}>
                        <TextBox 
                            label="Nome Completo" 
                            value={nome} 
                            onChangeText={setNome}
                            labelStyle={{ color: COLORS.white }}
                            inputStyle={{ backgroundColor: '#fff', borderColor: 'transparent' }} 
                            textInputStyle={{ color: '#000' }} 
                            placeholderColor="#888"
                        />
                    </View>

                    <View style={styles.form}>
                        <TextBox 
                            label="E-mail" 
                            value={email} 
                            onChangeText={setEmail} 
                            keyboardType="email-address"
                            labelStyle={{ color: COLORS.white }}
                            inputStyle={{ backgroundColor: '#fff', borderColor: 'transparent' }} 
                            textInputStyle={{ color: '#000' }} 
                            placeholderColor="#888"
                        />
                    </View>

                    <View style={styles.form}>
                        <TextBox 
                            label="Escolha uma senha" 
                            isPassword={true}
                            value={senha}
                            onChangeText={setSenha}
                            labelStyle={{ color: COLORS.white }}
                            inputStyle={{ backgroundColor: '#fff', borderColor: 'transparent' }} 
                            textInputStyle={{ color: '#000' }} 
                            placeholderColor="#888"
                        />
                    </View>

                    <View style={styles.form}>
                        <TextBox 
                            label="Confirme a senha" 
                            isPassword={true}
                            value={confirmaSenha}
                            onChangeText={setConfirmaSenha}
                            labelStyle={{ color: COLORS.white }}
                            inputStyle={{ backgroundColor: '#fff', borderColor: 'transparent' }} 
                            textInputStyle={{ color: '#000' }} 
                            placeholderColor="#888"
                        />
                    </View>
                    
                    <View style={styles.form}>
                        <Button 
                            texto="Cadastrar" 
                            onPress={handleRegistro}
                            buttonStyle={{ 
                                width: '100%', 
                                backgroundColor: '#008000' 
                            }} 
                            textStyle={{ 
                                color: COLORS.white, 
                                fontWeight: 'bold' 
                            }} 
                        />
                    </View>
                </View>

                {/* Rodapé (no fim da tela) */}
                <View style={styles.footer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.footerText}>Já tenho uma conta. Acessar.</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}

export default Registro;