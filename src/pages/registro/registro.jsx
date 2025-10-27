// EM: registro.jsx
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native"; // 1. Removemos o SafeAreaView daqui
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./registro.style";
import Header from "../../components/header/header.jsx";
import TextBox from "../../components/textbox/textbox.jsx";
import Button from "../../components/button/button.jsx";
import { useState } from "react";
import api from "../../services/api"; // 2. Corrigi a importação do API

function Registro({ navigation }) { // Adicionei "navigation" para o footer funcionar
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmaSenha, setConfirmaSenha] = useState("");

    const handleRegistro = async () => {
        // ... (Sua função de registro, que está perfeita, continua aqui) ...
        console.log("--- BOTÃO CLICADO! A função handleRegistro foi iniciada. ---");
        if (senha !== confirmaSenha) {
            Alert.alert("Erro no Cadastro", "As senhas não coincidem.");
            return;
        }
        console.log("Enviando para o backend os seguintes dados:", {
            name: nome,
            email: email,
            password: "[SENHA OCULTA NO LOG]"
        });
        try {
            console.log("Tentando fazer a chamada api.post...");
            const response = await api.post('/users', {
                name: nome,
                email: email,
                password: senha
            });
            console.log("Backend respondeu com sucesso!", response.data);
            Alert.alert("Sucesso!", "Usuário cadastrado com sucesso.");
            navigation.navigate('Login'); // Opcional: envia pro login após sucesso
        } catch (error) {
            console.error("ERRO na chamada da API:", error);
            if (error.response) {
                console.error("Dados do erro do servidor:", error.response.data);
            }
            Alert.alert("Erro no Cadastro", "Não foi possível criar o usuário. Verifique o console para mais detalhes.");
        } finally {
            console.log("--- Fim da tentativa de registro. ---");
        }
    };

    // 3. A ESTRUTURA JSX FOI MUDADA PARA SER IGUAL À DO LOGIN
    return (
        <SafeAreaView style={styles.container}>
            <Header texto="Cadastro" />

            <View style={styles.formGroup}>
                <View style={styles.form}>
                    <TextBox label="Nome Completo" 
                             value={nome} 
                             onChangeText={setNome} />
                </View>

                <View style={styles.form}>
                    <TextBox label="E-mail" 
                             value={email} 
                             onChangeText={setEmail} 
                             keyboardType="email-address" />
                </View>

                <View style={styles.form}>
                    <TextBox label="Escolha uma senha" 
                             isPassword={true}
                             value={senha}
                             onChangeText={setSenha} />
                </View>

                <View style={styles.form}>
                    <TextBox label="Confirme a senha" 
                             isPassword={true}
                             value={confirmaSenha}
                             onChangeText={setConfirmaSenha} />
                </View>

                <View style={styles.buttonContainer}>
                    <Button texto="Cadastrar" 
                            onPress={handleRegistro} />
                </View>
            </View>

            {/* 4. ADICIONAMOS UM FOOTER (IGUAL AO DO LOGIN) */}
            <View style={styles.footer}>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.footerText}>Já tenho uma conta. Acessar.</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default Registro;