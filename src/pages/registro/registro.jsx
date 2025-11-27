// EM: src/pages/Registro/registro.jsx

import React, { useState } from "react";
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Image 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./registro.style";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { COLORS } from "../../constants/theme"; 
const LogoImage = require('../../assets/logo.png'); 

import TextBox from "../../components/textbox/textbox.jsx";
import Button from "../../components/button/button.jsx";
import api from "../../services/api"; 
import CustomAlert from "../../components/customAlert/CustomAlert.jsx"; 

function Registro({ navigation }) { 
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmaSenha, setConfirmaSenha] = useState("");
    const [loading, setLoading] = useState(false);

    // Estados do Alerta
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertData, setAlertData] = useState({ title: "", message: "", type: "error" });

    const mostrarAlerta = (title, message, type = "error") => {
        setAlertData({ title, message, type });
        setAlertVisible(true);
    };

    const fecharAlerta = () => {
        setAlertVisible(false);
        if (alertData.type === 'success') {
            navigation.navigate('Login');
        }
    };

    // --- Lógica de Validação Visual ---
    // Verifica se as senhas conferem em tempo real (apenas se o usuário já começou a digitar a confirmação)
    const senhasConferem = !confirmaSenha || senha === confirmaSenha;

    const validarCadastro = () => {
        const nomeLimpo = nome.trim();
        const emailLimpo = email.trim();
        const senhaLimpa = senha.trim();
        const confirmaSenhaLimpa = confirmaSenha.trim();

        if (!nomeLimpo || !emailLimpo || !senhaLimpa || !confirmaSenhaLimpa) {
            mostrarAlerta("Campos Vazios", "Por favor, preencha todos os campos.");
            return null;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailLimpo)) {
            mostrarAlerta("E-mail Inválido", "O formato do e-mail está incorreto.");
            return null;
        }

        const senhaForteRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
        if (!senhaForteRegex.test(senhaLimpa)) {
            mostrarAlerta(
                "Senha Fraca", 
                "Sua senha precisa ter 8 caracteres, letra maiúscula, minúscula, número e símbolo."
            );
            return null;
        }

        if (senhaLimpa !== confirmaSenhaLimpa) {
            mostrarAlerta("Senhas Diferentes", "A senha e a confirmação não conferem.");
            return null;
        }

        return { name: nomeLimpo, email: emailLimpo, password: senhaLimpa };
    };

    const handleRegistro = async () => {
        const dadosValidos = validarCadastro();
        if (!dadosValidos) return; 

        try {
            setLoading(true);
            await api.post('/users', dadosValidos);
            setLoading(false);
            mostrarAlerta("Sucesso!", "Sua conta foi criada. Faça login para continuar.", "success");
        } catch (error) {
            setLoading(false);
            const mensagemErro = error.response?.data?.error || "Não foi possível criar o usuário.";
            mostrarAlerta("Erro no Cadastro", mensagemErro, "error");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            
            <CustomAlert 
                visible={alertVisible}
                title={alertData.title}
                message={alertData.message}
                type={alertData.type}
                onClose={fecharAlerta}
            />

            <KeyboardAwareScrollView
                style={{ flex: 1 }}
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
                enableOnAndroid={true}
                enableAutomaticScroll={true}
                extraScrollHeight={75} 
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.formGroup}>
                    
                    <View style={{ marginBottom: 0, alignItems: 'center' }}>
                        <Image 
                            source={LogoImage} 
                            style={{ width: 230, height: 230, resizeMode: 'contain' }} 
                        />
                    </View>
                    
                    <Text style={styles.welcomeText}>Crie sua conta:</Text> 

                    <View style={styles.form}>
                        <TextBox 
                            label="Nome Completo" 
                            value={nome} 
                            onChangeText={setNome}
                            labelStyle={{ color: COLORS.white }}
                            inputStyle={{ backgroundColor: '#fff', borderColor: 'transparent' }} 
                            textInputStyle={{ color: '#000' }} 
                            placeholderColor="#888"
                            autoCapitalize="words" 
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
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>

                    <View style={styles.form}>
                        <TextBox 
                            label="Senha" 
                            isPassword={true}
                            value={senha}
                            onChangeText={setSenha}
                            labelStyle={{ color: COLORS.white }}
                            inputStyle={{ backgroundColor: '#fff', borderColor: 'transparent' }} 
                            textInputStyle={{ color: '#000' }} 
                            placeholderColor="#888"
                        />
                    </View>

                    {/* --- CAMPO CONFIRMAR SENHA (COM FEEDBACK VISUAL) --- */}
                    <View style={styles.form}>
                        <TextBox 
                            label="Confirme a senha" 
                            isPassword={true}
                            value={confirmaSenha}
                            onChangeText={setConfirmaSenha}
                            labelStyle={{ color: COLORS.white }}
                            
                            // APLICA A BORDA VERMELHA SE NÃO CONFERIR
                            inputStyle={{ 
                                backgroundColor: '#fff', 
                                borderWidth: 2,
                                borderColor: senhasConferem ? 'transparent' : '#FF5252' 
                            }} 
                            
                            textInputStyle={{ color: '#000' }} 
                            placeholderColor="#888"
                        />
                        
                        {/* Texto de erro opcional abaixo do input */}
                        {!senhasConferem && (
                            <Text style={{ color: '#FF5252', fontSize: 12, marginTop: 4, fontWeight: 'bold' }}>
                                As senhas não conferem
                            </Text>
                        )}
                    </View>
                    
                    <View style={styles.form}>
                        <Button 
                            texto={loading ? "Criando conta..." : "Cadastrar"} 
                            onPress={handleRegistro}
                            disabled={loading} 
                            buttonStyle={{ width: '100%', backgroundColor: '#008000' }} 
                            textStyle={{ color: COLORS.white, fontWeight: 'bold' }} 
                        />
                    </View>
                </View>

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