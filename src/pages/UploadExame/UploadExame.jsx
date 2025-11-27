// ARQUIVO: src/pages/UploadExame/UploadExame.jsx

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as DocumentPicker from 'expo-document-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome } from '@expo/vector-icons';

import api from '../../services/api';
import Button from '../../components/button/button.jsx';
import { styles } from './uploadExame.style.js'; 

// --- IMPORT DO ALERTA CUSTOMIZADO ---
import CustomAlert from '../../components/customAlert/CustomAlert';

export default function UploadExame({ navigation }) {
    const [examName, setExamName] = useState("");
    const [examType, setExamType] = useState("");
    const [date, setDate] = useState(new Date());
    const [file, setFile] = useState(null); 
    const [isUploading, setIsUploading] = useState(false);
    const [showPicker, setShowPicker] = useState(false);

    // --- ESTADOS DO ALERTA ---
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertConfig, setAlertConfig] = useState({ 
        title: "", 
        message: "", 
        type: "info",
        onConfirm: null 
    });

    // Helper para mostrar alerta
    const showAlert = (title, message, type = "info", onConfirm = null) => {
        setAlertConfig({ title, message, type, onConfirm });
        setAlertVisible(true);
    };

    const onDateChange = (event, selectedDate) => {
        setShowPicker(false);
        if (selectedDate) setDate(selectedDate);
    };
    
    const formatDate = (date) => date.toLocaleDateString('pt-BR');

    const pickDocument = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: ['application/pdf', 'image/jpeg', 'image/png'], 
                copyToCacheDirectory: true // Importante para garantir acesso ao arquivo
            });
            
            if (!result.canceled && result.assets && result.assets.length > 0) {
                setFile(result.assets[0]); 
            }
        } catch (error) {
            showAlert("Erro", "Não foi possível selecionar o arquivo.", "error");
        }
    };

    const handleUpload = async () => {
        // 1. Validação
        if (!file || !examName || !examType) {
            showAlert("Campos Incompletos", "Por favor, preencha o nome, o tipo e selecione um arquivo.", "error");
            return;
        }

        setIsUploading(true);

        // 2. Montagem do FormData
        const formData = new FormData();
        formData.append('examName', examName);
        formData.append('examType', examType);
        formData.append('examDate', date.toISOString());

        // Tratamento do Arquivo
        formData.append('file', {
            uri: file.uri,
            name: file.name || 'exame_sem_nome.pdf',
            type: file.mimeType || 'application/pdf', 
        });

        try {
            // 3. Envio (Usando api.post com header multipart)
            // Nota: Se der Network Error aqui também, trocaremos por 'fetch' igual no perfil
            await api.post('/users/exams', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', 
                },
            });

            // 4. Sucesso
            showAlert(
                "Upload Concluído!", 
                "Seu exame foi salvo com sucesso e já está disponível no histórico.", 
                "success",
                () => navigation.goBack() // Volta pra tela anterior ao clicar em OK
            );

        } catch (error) {
            console.error("Erro no upload:", error.response?.data || error);
            showAlert("Falha no Upload", "Não foi possível enviar o arquivo. Verifique sua conexão.", "error");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            
            {/* --- COMPONENTE DE ALERTA --- */}
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

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <FontAwesome name="chevron-left" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Adicionar Exame</Text>
                <View style={{ width: 24 }} /> 
            </View>

            <KeyboardAwareScrollView 
                style={styles.formArea}
                contentContainerStyle={{paddingBottom: 40}}
            >
                
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Nome do Exame</Text>
                    <TextInput
                        style={styles.input}
                        value={examName}
                        onChangeText={setExamName}
                        placeholder="Ex: Hemoglobina Glicada"
                        placeholderTextColor="#ccc"
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Tipo de Exame</Text>
                    <TextInput
                        style={styles.input}
                        value={examType}
                        onChangeText={setExamType}
                        placeholder="Ex: Sangue"
                        placeholderTextColor="#ccc"
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Data do Exame</Text>
                    <TouchableOpacity style={styles.inputDate} onPress={() => setShowPicker(true)}>
                        <Text style={{color: '#333'}}>{formatDate(date)}</Text>
                        <FontAwesome name="calendar" size={20} color="#46A376" />
                    </TouchableOpacity>
                </View>

                {showPicker && (
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display="default"
                        onChange={onDateChange}
                    />
                )}

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Arquivo (PDF ou Imagem)</Text>
                    <Button
                        texto={file ? `Arquivo: ${file.name.length > 20 ? file.name.substring(0, 18) + '...' : file.name}` : "Selecionar Arquivo"}
                        onPress={pickDocument}
                        buttonStyle={{ 
                            backgroundColor: file ? '#E8F5E9' : '#f0f0f0', 
                            borderWidth: 1, 
                            borderColor: file ? '#46A376' : '#ccc' 
                        }}
                        textStyle={{ color: file ? '#46A376' : '#666' }}
                    />
                </View>

                <View style={{marginTop: 20}}>
                    <Button
                        texto={isUploading ? "Enviando..." : "Salvar Exame"}
                        onPress={handleUpload}
                        disabled={isUploading}
                        buttonStyle={{ backgroundColor: '#46A376' }}
                    />
                </View>

            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}