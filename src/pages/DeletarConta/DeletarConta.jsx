// ARQUIVO: src/pages/DeletarConta/DeletarConta.jsx

import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './DeletarConta.style'; 
import { FontAwesome } from '@expo/vector-icons';
import Button from '../../components/button/button';
import api from '../../services/api';

// --- IMPORT DO ALERTA ---
import CustomAlert from '../../components/customAlert/CustomAlert';

export default function DeletarConta({ route, navigation }) {
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(false);

    // --- ESTADOS DO ALERTA ---
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertConfig, setAlertConfig] = useState({ 
        title: "", 
        message: "", 
        type: "info",
        onConfirm: null 
    });

    const showAlert = (title, message, type = "info", onConfirm = null) => {
        setAlertConfig({ title, message, type, onConfirm });
        setAlertVisible(true);
    };

    useEffect(() => {
        if (route.params?.token) {
            setToken(route.params.token);
        } else {
            // Se entrar sem token, avisa e manda pro login
            showAlert(
                "Link Inválido", 
                "Token de exclusão não encontrado.", 
                "error", 
                () => navigation.navigate('Login')
            );
        }
    }, [route.params]);

    const handleFinalDelete = async () => {
        setLoading(true);
        try {
            // Verifica se a rota no backend é '/confirm-delete' ou '/confirm-deletion'
            // Baseado no seu arquivo de rotas anterior, era '/confirm-delete'
            await api.post('/users/confirm-delete', { token });
            
            showAlert(
                "Conta Excluída", 
                "Sua conta e todos os seus dados foram apagados permanentemente.", 
                "success",
                () => {
                    // Reseta para o Login e limpa o histórico de navegação
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Login' }],
                    });
                }
            );
            
        } catch (error) {
            showAlert(
                "Erro", 
                "Não foi possível excluir a conta. O link pode ter expirado ou já foi usado.", 
                "error",
                () => navigation.navigate('Login')
            );
        } finally {
            setLoading(false);
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

            {/* --- CARD FLUTUANTE --- */}
            <View style={styles.card}>
                
                <View style={styles.warningIconContainer}>
                    <FontAwesome name="exclamation-triangle" size={70} color="#D32F2F" />
                </View>

                <Text style={styles.title}>Excluir Definitivamente?</Text>
                
                <Text style={styles.description}>
                    Você está prestes a apagar sua conta no <Text style={{fontWeight:'bold'}}>Diabeat</Text>.
                    {"\n\n"}
                    Esta ação é <Text style={{color:'#D32F2F', fontWeight:'bold'}}>irreversível</Text>. Todo o seu histórico de glicemia e exames será perdido.
                </Text>

                {loading ? (
                    <ActivityIndicator size="large" color="#D32F2F" style={{marginTop: 20}} />
                ) : (
                    <View style={styles.buttonContainer}>
                        <Button 
                            texto="SIM, EXCLUIR TUDO" 
                            onPress={handleFinalDelete}
                            buttonStyle={{backgroundColor: '#D32F2F', width: '100%', marginBottom: 15}}
                        />
                        <Button 
                            texto="Cancelar" 
                            onPress={() => navigation.navigate('Login')}
                            buttonStyle={{backgroundColor: '#ccc', width: '100%'}}
                            textStyle={{color: '#555'}}
                        />
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
}