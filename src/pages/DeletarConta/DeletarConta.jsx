import React, { useEffect, useState } from 'react';
import { View, Text, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './DeletarConta.style'; // Importando o style separado
import { FontAwesome } from '@expo/vector-icons';
import Button from '../../components/button/button';
import api from '../../services/api';

export default function DeletarConta({ route, navigation }) {
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (route.params?.token) {
            setToken(route.params.token);
        } else {
            Alert.alert("Erro", "Link inválido ou token não encontrado.");
            navigation.navigate('Login');
        }
    }, [route.params]);

    const handleFinalDelete = async () => {
        setLoading(true);
        try {
            // Chama a rota que criamos no backend para apagar tudo
            await api.post('/users/confirm-deletion', { token });
            
            Alert.alert("Conta Excluída", "Sua conta e todos os seus dados foram apagados permanentemente.");
            
            // Reseta a navegação para o Login
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        } catch (error) {
            Alert.alert("Erro", "Não foi possível excluir a conta. O link pode ter expirado.");
            navigation.navigate('Login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.warningIconContainer}>
                <FontAwesome name="exclamation-triangle" size={60} color="#D32F2F" />
            </View>

            <Text style={styles.title}>Excluir Conta Definitivamente?</Text>
            
            <Text style={styles.description}>
                Você clicou no link de confirmação. Ao clicar no botão abaixo, 
                todos os seus dados (perfil, glicemias, exames) serão apagados para sempre.
            </Text>

            {loading ? (
                <ActivityIndicator size="large" color="#D32F2F" />
            ) : (
                <View style={styles.buttonContainer}>
                    <Button 
                        texto="SIM, EXCLUIR TUDO" 
                        onPress={handleFinalDelete}
                        buttonStyle={{backgroundColor: '#D32F2F', width: '100%'}}
                    />
                    <Button 
                        texto="Cancelar" 
                        onPress={() => navigation.navigate('Login')}
                        buttonStyle={{backgroundColor: '#CCC', width: '100%'}}
                    />
                </View>
            )}
        </SafeAreaView>
    );
}