// Em: src/pages/UploadExame/UploadExame.jsx (ARQUIVO NOVO)

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, TextInput, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './uploadExame.style'; // (Vamos criar este estilo)
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import api from '../../services/api';
import Button from '../../components/button/button.jsx';
import TextBox from '../../components/textbox/textbox.jsx';
import * as DocumentPicker from 'expo-document-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome } from '@expo/vector-icons';

export default function UploadExame({ navigation }) {
    const [examName, setExamName] = useState("");
    const [examType, setExamType] = useState("");
    const [date, setDate] = useState(new Date());
    const [file, setFile] = useState(null); // Guarda o arquivo selecionado
    const [isUploading, setIsUploading] = useState(false);

    // --- Funções do DatePicker ---
    const [showPicker, setShowPicker] = useState(false);
    const onDateChange = (event, selectedDate) => {
        setShowPicker(false);
        if (selectedDate) setDate(selectedDate);
    };
    const formatDate = (date) => date.toLocaleDateString('pt-BR');
    // --- Fim do DatePicker ---

    // --- Função para Escolher o Arquivo ---
    const pickDocument = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: ['application/pdf', 'image/jpeg', 'image/png'], // Aceita PDF e Imagens
            });
            
            if (result.canceled === false && result.assets && result.assets.length > 0) {
                setFile(result.assets[0]); // Salva o primeiro arquivo selecionado
            }
        } catch (error) {
            Alert.alert("Erro", "Não foi possível selecionar o arquivo.");
        }
    };

    // --- Função de Upload ---
    const handleUpload = async () => {
        if (!file || !examName || !examType) {
            Alert.alert("Erro", "Por favor, preencha todos os campos e selecione um arquivo.");
            return;
        }

        setIsUploading(true);

        // 1. Precisamos usar 'FormData' para enviar arquivos
        const formData = new FormData();
        
        // 2. Adiciona os dados de texto
        formData.append('examName', examName);
        formData.append('examType', examType);
        formData.append('examDate', date.toISOString());

        // 3. Adiciona o arquivo (O NOME 'examFile' TEM QUE BATER com o backend)
        formData.append('examFile', {
            uri: file.uri,
            name: file.name,
            type: file.mimeType,
        });

        try {
            // 4. Envia o FormData para a API
            await api.post('/users/exams', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Essencial para o backend (multer)
                },
            });

            Alert.alert("Sucesso!", "Exame salvo com sucesso.", [
                { text: "OK", onPress: () => navigation.goBack() }
            ]);

        } catch (error) {
            console.error("Erro no upload:", error.response?.data || error);
            Alert.alert("Erro no Upload", "Não foi possível salvar seu exame.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <FontAwesome name="chevron-left" size={24} color="#46A376" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Adicionar Exame</Text>
                <View style={{ width: 24 }} /> 
            </View>

            <KeyboardAwareScrollView contentContainerStyle={styles.scrollContainer}>
                
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Nome do Exame</Text>
                    <TextInput
                        style={styles.input}
                        value={examName}
                        onChangeText={setExamName}
                        placeholder="Ex: Hemoglobina Glicada"
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Tipo de Exame</Text>
                    <TextInput
                        style={styles.input}
                        value={examType}
                        onChangeText={setExamType}
                        placeholder="Ex: Exame de Sangue"
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Data do Exame</Text>
                    <TouchableOpacity style={styles.input} onPress={() => setShowPicker(true)}>
                        <Text style={{color: '#333'}}>{formatDate(date)}</Text>
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
                        texto={file ? `Arquivo: ${file.name.substring(0, 20)}...` : "Selecionar Arquivo"}
                        onPress={pickDocument}
                        buttonStyle={{ backgroundColor: file ? '#E8F5E9' : '#DDD' }}
                        textStyle={{ color: file ? '#46A376' : '#555' }}
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