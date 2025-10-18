import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { styles } from "./registro.style.js";
import Header from "../../components/header/header.jsx";
import TextBox from "../../components/textbox/textbox.jsx";
import Button from "../../components/button/button.jsx";
// --- 1. Importe o useState e o seu serviço de API ---
import { useState } from "react";
import api from "../../services/api.ts"; // Importa a configuração do axios

function Registro() {
    // --- 2. Crie os estados para guardar os dados do formulário ---
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmaSenha, setConfirmaSenha] = useState("");

    // --- 3. Crie a função que será chamada ao clicar no botão ---
    const handleRegistro = async () => {
    // LUZ DE TESTE 1: A função foi chamada?
    console.log("--- BOTÃO CLICADO! A função handleRegistro foi iniciada. ---");

    if (senha !== confirmaSenha) {
        Alert.alert("Erro no Cadastro", "As senhas não coincidem.");
        return;
    }

    // LUZ DE TESTE 2: Quais dados estamos tentando enviar?
    console.log("Enviando para o backend os seguintes dados:", {
        name: nome,
        email: email,
        password: "[SENHA OCULTA NO LOG]" // Não vamos logar a senha por segurança
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

    } catch (error) {
        // LUZ DE TESTE 3: Se der um erro, qual foi?
        console.error("ERRO na chamada da API:", error);
        
        // Vamos verificar se o erro tem uma resposta do servidor
        if (error.response) {
            console.error("Dados do erro do servidor:", error.response.data);
        }
        
        Alert.alert("Erro no Cadastro", "Não foi possível criar o usuário. Verifique o console para mais detalhes.");
    } finally {
        // LUZ DE TESTE 4: Este bloco sempre executa, confirmando que tentamos
        console.log("--- Fim da tentativa de registro. ---");
    }
};

    return <ScrollView>
        <View style={styles.container}>
            <Header texto="Cadastro" />

            <View style={styles.formGroup}>
                <View style={styles.form}>
                    {/* --- 4. Conecte os TextBoxes aos seus estados --- */}
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

                <View style={styles.form}>
                    {/* --- 5. Conecte o botão à sua função de envio --- */}
                    <Button texto="Próximo passo" 
                        
                            onPress={handleRegistro} />
                </View>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity>
                    <Text style={styles.footerText}>Acessar minha conta.</Text>
                </TouchableOpacity>
            </View>
        </View>
    </ScrollView>
}

export default Registro;