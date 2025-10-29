import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native"; // 1. Removemos o SafeAreaView daqui
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./resetPassword.style.js"; // Importa o estilo que acabamos de criar
import Header from "../../components/header/header.jsx";
import TextBox from "../../components/textbox/textbox.jsx";
import Button from "../../components/button/button.jsx";
import { useState } from "react";
import api from "../../services/api";

// 1. A tela precisa receber "route" para pegar os parâmetros da navegação
function ResetPassword({ navigation, route }) {
    const [novaSenha, setNovaSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    const handleResetPassword = async () => {
        // 2. Pegamos o token que foi passado para esta tela
        // (Veremos como testar isso no próximo passo)
        const { token } = route.params; 

        if (!token) {
            Alert.alert("Erro", "Token de redefinição não encontrado. Por favor, tente novamente.");
            return;
        }

        if (!novaSenha || !confirmarSenha) {
            Alert.alert("Atenção", "Preencha os dois campos.");
            return;
        }

        if (novaSenha !== confirmarSenha) {
            Alert.alert("Erro", "As senhas não coincidem.");
            return;
        }

        try {
            // 3. Chamamos a rota do backend que criamos!
            await api.post('/users/reset-password', {
                token: token,
                newPassword: novaSenha
            });

            Alert.alert(
                "Sucesso!",
                "Sua senha foi redefinida. Você já pode fazer login."
            );
            // 4. Enviamos o usuário de volta para o Login
            navigation.navigate('Login'); 

        } catch (error) {
            console.error("Erro ao redefinir senha:", error);
            // O backend nos dará este erro se o token estiver errado ou expirado
            Alert.alert("Erro", "Token inválido ou expirado. Por favor, solicite um novo link.");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header texto="Crie sua Nova Senha" />

            <View style={styles.formGroup}>
                <View style={styles.form}>
                    <TextBox 
                        label="Nova Senha" 
                        isPassword={true}
                        value={novaSenha}
                        onChangeText={setNovaSenha}
                    />
                </View>

                <View style={styles.form}>
                    <TextBox 
                        label="Confirme a Nova Senha" 
                        isPassword={true}
                        value={confirmarSenha}
                        onChangeText={setConfirmarSenha}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <Button 
                        texto="Salvar Nova Senha" 
                        onPress={handleResetPassword} 
                    />
                </View>
            </View>

            {/* Um rodapé para o usuário poder voltar ao login se desistir */}
            <View style={styles.footer}>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.footerText}>Voltar para o Login</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default ResetPassword;