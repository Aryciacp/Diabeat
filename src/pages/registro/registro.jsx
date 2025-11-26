import React, { useState } from "react";
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Alert, 
    Image 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./registro.style";

// Biblioteca para o teclado não cobrir os inputs
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { COLORS } from "../../constants/theme"; 
const LogoImage = require('../../assets/logo.png'); 

import TextBox from "../../components/textbox/textbox.jsx";
import Button from "../../components/button/button.jsx";
import api from "../../services/api"; 

function Registro({ navigation }) { 
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmaSenha, setConfirmaSenha] = useState("");
    const [loading, setLoading] = useState(false); // Estado para travar o botão

    // --- FUNÇÃO DE VALIDAÇÃO (Regras de Negócio) ---
    const validarCadastro = () => {
        // Remove espaços acidentais no começo/fim
        const nomeLimpo = nome.trim();
        const emailLimpo = email.trim();
        const senhaLimpa = senha.trim();
        const confirmaSenhaLimpa = confirmaSenha.trim();

        // 1. Campos Vazios
        if (!nomeLimpo || !emailLimpo || !senhaLimpa || !confirmaSenhaLimpa) {
            Alert.alert("Campos Obrigatórios", "Por favor, preencha todos os campos.");
            return null;
        }

        // 2. Validação de E-mail (Regex Padrão)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailLimpo)) {
            Alert.alert("E-mail Inválido", "Por favor, insira um e-mail válido.");
            return null;
        }

        // 3. Validação de SENHA FORTE
        // Mínimo 8 chars + 1 Maiúscula + 1 Minúscula + 1 Número + 1 Especial
        const senhaForteRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

        if (!senhaForteRegex.test(senhaLimpa)) {
            Alert.alert(
                "Senha Fraca", 
                "Sua senha precisa ter:\n\n• Mínimo de 8 caracteres\n• Uma letra maiúscula\n• Uma letra minúscula\n• Um número\n• Um caractere especial (@$!%*?&)"
            );
            return null;
        }

        // 4. Comparação de Senhas
        if (senhaLimpa !== confirmaSenhaLimpa) {
            Alert.alert("Senhas Diferentes", "A senha e a confirmação não conferem.");
            return null;
        }

        // Retorna o objeto pronto para a API
        return { name: nomeLimpo, email: emailLimpo, password: senhaLimpa };
    };

    // --- FUNÇÃO DE ENVIO ---
    const handleRegistro = async () => {
        // Valida antes de tentar enviar
        const dadosValidos = validarCadastro();
        
        if (!dadosValidos) return; // Se a validação falhou, para aqui.

        try {
            setLoading(true); // Ativa o "Carregando..."
            
            // Envia para o Backend (/users é a rota de criação)
            await api.post('/users', dadosValidos);
            
            setLoading(false); // Desativa o loading
            
            Alert.alert("Sucesso!", "Conta criada com sucesso! Faça login agora.", [
                { text: "OK", onPress: () => navigation.navigate('Login') }
            ]);
            
        } catch (error) {
            setLoading(false);
            console.error("ERRO REGISTRO:", error);
            
            // Tenta pegar a mensagem de erro do Backend (ex: "Email já existe")
            const mensagemErro = error.response?.data?.error || "Não foi possível criar o usuário. Tente novamente.";
            Alert.alert("Erro no Cadastro", mensagemErro);
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
                extraScrollHeight={75} 
                showsVerticalScrollIndicator={false}
            >
                {/* Grupo do Formulário */}
                <View style={styles.formGroup}>
                    
                    {/* Logo */}
                    <View style={{ marginBottom: 0, alignItems: 'center' }}>
                        <Image 
                            source={LogoImage} 
                            style={{ width: 230, height: 230, resizeMode: 'contain' }} 
                        />
                    </View>
                    
                    <Text style={styles.welcomeText}>Crie sua conta:</Text> 

                    {/* Campo Nome */}
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

                    {/* Campo Email */}
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

                    {/* Campo Senha */}
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
                        {/* Dica visual pequena (opcional) */}
                        <Text style={{color: '#ddd', fontSize: 10, marginTop: 2, marginLeft: 2}}>
                            Mín. 8 caracteres, maiúsculas e símbolos.
                        </Text>
                    </View>

                    {/* Campo Confirmar Senha */}
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
                    
                    {/* Botão Cadastrar */}
                    <View style={styles.form}>
                        <Button 
                            texto={loading ? "Criando conta..." : "Cadastrar"} 
                            onPress={handleRegistro}
                            disabled={loading} 
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

                {/* Rodapé */}
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