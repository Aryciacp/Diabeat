// ARQUIVO: src/pages/MudarSenha/MudarSenha.jsx

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './MudarSenha.style'; 
import { COLORS } from '../../constants/theme';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import api from '../../services/api';
import TextBox from '../../components/textbox/textbox.jsx';
import Button from '../../components/button/button.jsx';

// --- IMPORT DO ALERTA CUSTOMIZADO ---
import CustomAlert from '../../components/customAlert/CustomAlert.jsx';

const LogoImage = require('../../assets/logo.png'); 

function MudarSenha({ navigation }) {
    const [senhaAtual, setSenhaAtual] = useState("");
    const [novaSenha, setNovaSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [loading, setLoading] = useState(false);

    // --- ESTADOS DO ALERTA ---
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertConfig, setAlertConfig] = useState({ 
        title: "", message: "", type: "info", onConfirm: null 
    });

    const showAlert = (title, message, type = "info", onConfirm = null) => {
        setAlertConfig({ title, message, type, onConfirm });
        setAlertVisible(true);
    };

    const handleUpdatePassword = async () => {
        // 1. Validações
        if (!senhaAtual || !novaSenha || !confirmarSenha) {
            showAlert("Campos Vazios", "Por favor, preencha todos os campos.", "error");
            return;
        }
        if (novaSenha !== confirmarSenha) {
            showAlert("Senhas Diferentes", "A nova senha e a confirmação não coincidem.", "error");
            return;
        }
        
        // Regra de Senha Forte (Opcional, mas recomendado)
        if (novaSenha.length < 6) {
            showAlert("Senha Curta", "A nova senha deve ter pelo menos 6 caracteres.", "error");
            return;
        }

        try {
            setLoading(true);
            
            // 2. Chama o backend (Rota de atualização de perfil)
            // Enviamos currentPassword para validação e newPassword para troca
            await api.patch('/users/me', {
                currentPassword: senhaAtual,
                newPassword: novaSenha
            });

            setLoading(false);

            // 3. Sucesso
            showAlert(
                "Sucesso!",
                "Sua senha foi alterada com sucesso.",
                "success",
                () => navigation.goBack() // Volta para o perfil ao fechar
            );

        } catch (error) {
            setLoading(false);
            const errorMessage = error.response?.data?.error || "Não foi possível alterar a senha. Verifique sua senha atual.";
            showAlert("Erro ao Alterar", errorMessage, "error");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            
            <CustomAlert 
                visible={alertVisible}
                title={alertConfig.title}
                message={alertConfig.message}
                type={alertConfig.type}
                onConfirm={alertConfig.onConfirm}
                onClose={() => {
                    setAlertVisible(false);
                    if (alertConfig.onConfirm) alertConfig.onConfirm();
                }}
            />

            <KeyboardAwareScrollView
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
                enableOnAndroid={true}
                extraScrollHeight={75}
                showsVerticalScrollIndicator={false}
            >
                
                {/* Logo fora do card */}
                <View style={styles.logoContainer}>
                    <Image source={LogoImage} style={styles.logo} />
                </View>

                {/* --- CARD BRANCO FLUTUANTE --- */}
                <View style={styles.card}>
                    
                    <Text style={styles.titleText}>Alterar Senha</Text> 
                    <Text style={styles.subtitleText}>Atualize suas credenciais de acesso.</Text>

                    <View style={styles.form}>
                        <Text style={styles.label}>Senha Atual</Text>
                        <TextBox 
                            value={senhaAtual}
                            onChangeText={setSenhaAtual}
                            isPassword={true}
                            placeholder="Digite sua senha atual"
                            inputStyle={styles.inputBackground}
                        />
                    </View>

                    <View style={styles.form}>
                        <Text style={styles.label}>Nova Senha</Text>
                        <TextBox 
                            value={novaSenha}
                            onChangeText={setNovaSenha}
                            isPassword={true}
                            placeholder="Mín. 6 caracteres"
                            inputStyle={styles.inputBackground}
                        />
                    </View>

                    <View style={styles.form}>
                        <Text style={styles.label}>Confirmar Nova Senha</Text>
                        <TextBox 
                            value={confirmarSenha}
                            onChangeText={setConfirmarSenha}
                            isPassword={true}
                            placeholder="Repita a nova senha"
                            inputStyle={styles.inputBackground}
                        />
                    </View>

                    <View style={styles.buttonContainer}>
                        <Button 
                            texto={loading ? "Salvando..." : "Salvar Nova Senha"} 
                            onPress={handleUpdatePassword}
                            disabled={loading}
                            buttonStyle={styles.mainButton} 
                        />
                    </View>

                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Text style={styles.backText}>Cancelar</Text>
                    </TouchableOpacity>

                </View>

            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}

export default MudarSenha;