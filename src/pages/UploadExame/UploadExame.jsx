// ARQUIVO: src/pages/UploadExame/UploadExame.jsx

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, TextInput, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as DocumentPicker from 'expo-document-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome } from '@expo/vector-icons';

import api from '../../services/api';
import Button from '../../components/button/button.jsx';
// Importando o estilo
import { styles } from './uploadExame.style.js'; 

export default function UploadExame({ navigation }) {
    const [examName, setExamName] = useState("");
    const [examType, setExamType] = useState("");
    const [date, setDate] = useState(new Date());
    const [file, setFile] = useState(null); 
    const [isUploading, setIsUploading] = useState(false);

    const [showPicker, setShowPicker] = useState(false);
    const onDateChange = (event, selectedDate) => {
        setShowPicker(false);
        if (selectedDate) setDate(selectedDate);
    };
    const formatDate = (date) => date.toLocaleDateString('pt-BR');

    const pickDocument = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: ['application/pdf', 'image/jpeg', 'image/png'], 
            });
            
            if (!result.canceled && result.assets && result.assets.length > 0) {
                setFile(result.assets[0]); 
            }
        } catch (error) {
            Alert.alert("Erro", "Não foi possível selecionar o arquivo.");
        }
    };

    const handleUpload = async () => {
        if (!file || !examName || !examType) {
            Alert.alert("Erro", "Por favor, preencha todos os campos e selecione um arquivo.");
            return;
        }

        setIsUploading(true);

        const formData = new FormData();
        formData.append('examName', examName);
        formData.append('examType', examType);
        formData.append('examDate', date.toISOString());

        // ⚠️ CORREÇÃO CRÍTICA: O nome do campo deve ser 'file' para bater com upload.single('file') no backend
        formData.append('file', {
            uri: file.uri,
            name: file.name,
            type: file.mimeType || 'application/pdf', // Garante um tipo se vier vazio
        });

        try {
            // A rota correta é /users/exams (conforme seu backend)
            await api.post('/users/exams', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', 
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
                        texto={file ? `Arquivo Selecionado: ${file.name.substring(0, 15)}...` : "Selecionar Arquivo"}
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