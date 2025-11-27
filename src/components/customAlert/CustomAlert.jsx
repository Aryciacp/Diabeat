// ARQUIVO: src/components/customAlert/CustomAlert.jsx

import React from 'react';
import { 
    Modal, 
    View, 
    Text, 
    TouchableOpacity, 
    StyleSheet, 
    Dimensions 
} from 'react-native';
import { FontAwesome } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function CustomAlert({ 
    visible, 
    title, 
    message, 
    type, 
    onClose,
    showCancel = false, // Novo: Decide se mostra botão cancelar
    onConfirm = null,   // Novo: Ação ao confirmar
    confirmText = "OK",
    cancelText = "Cancelar"
}) {
    
    // Configuração de Cores e Ícones
    let mainColor = '#46A376'; // Padrão
    let iconName = 'info-circle';

    if (type === 'success') {
        mainColor = '#00E676';
        iconName = 'check-circle';
    } else if (type === 'error') {
        mainColor = '#FF5252';
        iconName = 'times-circle';
    } else if (type === 'info') {
        mainColor = '#29B6F6';
        iconName = 'info-circle';
    }

    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.alertBox}>
                    
                    {/* Ícone Flutuante */}
                    <View style={[styles.iconContainer, { backgroundColor: mainColor }]}>
                        <FontAwesome name={iconName} size={32} color="#FFF" />
                    </View>

                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.message}>{message}</Text>

                    {/* Área dos Botões */}
                    <View style={styles.buttonContainer}>
                        
                        {/* Botão Cancelar (Opcional) */}
                        {showCancel && (
                            <TouchableOpacity 
                                style={[styles.button, styles.cancelButton]} 
                                onPress={onClose}
                            >
                                <Text style={styles.cancelButtonText}>{cancelText}</Text>
                            </TouchableOpacity>
                        )}

                        {/* Botão Confirmar/OK */}
                        <TouchableOpacity 
                            style={[styles.button, { backgroundColor: mainColor, flex: showCancel ? 1 : 0, width: showCancel ? undefined : '100%' }]} 
                            onPress={() => {
                                if (onConfirm) onConfirm(); // Executa a ação se houver
                                onClose(); // Fecha o modal
                            }}
                        >
                            <Text style={styles.buttonText}>{confirmText}</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    alertBox: {
        width: width * 0.85,
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 20,
        paddingTop: 45,
        alignItems: 'center',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    iconContainer: {
        position: 'absolute',
        top: -30,
        width: 64,
        height: 64,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: '#FFF',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 5,
        marginBottom: 8,
        textAlign: 'center',
    },
    message: {
        fontSize: 15,
        color: '#666',
        textAlign: 'center',
        marginBottom: 25,
        lineHeight: 22,
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        gap: 10,
    },
    button: {
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelButton: {
        backgroundColor: '#F5F5F5',
        flex: 1,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cancelButtonText: {
        color: '#777',
        fontSize: 16,
        fontWeight: 'bold',
    }
});