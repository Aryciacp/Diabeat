// ARQUIVO: src/pages/MudarSenha/MudarSenha.jsx (FINALIZADO)

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './MudarSenha.style'; 
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import api from '../../services/api';
import TextBox from '../../components/textbox/textbox.jsx';
import Button from '../../components/button/button.jsx';
import CustomAlert from '../../components/customAlert/CustomAlert.jsx';
// OBS: Removi o import do COLORS, pois ele não estava sendo usado diretamente aqui.

const LogoImage = require('../../assets/logo.png'); 
// A cor branca no seu snippet original era um fallback do COLORS.white, 
// aqui vou manter o estilo no JSX para evitar quebrar o CSS.

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

    // --- FUNÇÃO DE NAVEGAÇÃO SEGURA (FIX CORRETO) ---
    const navigateBackSafely = () => {
        if (navigation.canGoBack()) {
            navigation.goBack(); 
        } else {
            // FIX: Navega para o Tab Navigator principal e especifica a aba 'Perfil'
            navigation.navigate('MainApp', {
                screen: 'Perfil', 
            }); 
        }
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
        
        // Regra de Senha Forte
        if (novaSenha.length < 6) {
            showAlert("Senha Curta", "A nova senha deve ter pelo menos 6 caracteres.", "error");
            return;
        }

        try {
            setLoading(true);
            
            await api.patch('/users/me', {
                currentPassword: senhaAtual,
                newPassword: novaSenha
            });

            setLoading(false);

            // 3. Sucesso (Com Navegação Segura)
            showAlert(
                "Sucesso!",
                "Sua senha foi alterada com sucesso.",
                "success",
                navigateBackSafely // Chama a função que volta para o Perfil de forma segura
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

                    <TouchableOpacity onPress={navigateBackSafely} style={styles.backButton}>
                        {/* A cor original era COLORS.white. Usando um texto que se destaca no fundo verde */}
                        <Text style={styles.backText}>Cancelar</Text>
                    </TouchableOpacity>

                </View>

            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}

export default MudarSenha;