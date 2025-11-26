// ARQUIVO: src/pages/RegistroGlicemico/RegistroGlicemico.jsx

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, TextInput, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from '@react-native-community/datetimepicker'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { Picker } from '@react-native-picker/picker';

import Button from '../../components/button/button.jsx'; 
import api from '../../services/api';

// Importando o estilo (certifique-se de criar o arquivo abaixo)
import { styles } from './RegistroGlicemico.js'; 

export default function RegistroGlicemico({ navigation }) {
    const [value, setValue] = useState("");
    const [type, setType] = useState("JEJUM");
    const [notes, setNotes] = useState("");
    
    // Estados para Data e Hora
    const [date, setDate] = useState(new Date()); 
    const [showPicker, setShowPicker] = useState(false); 
    const [mode, setMode] = useState('date'); 

    const onDateTimeChange = (event, selectedDate) => {
        setShowPicker(false); 
        if (selectedDate) {
            if (mode === 'date') {
                setDate(selectedDate);
                setMode('time'); // Depois de escolher a data, pede a hora
                // Pequeno timeout para garantir que o primeiro picker feche antes de abrir o segundo no Android
                setTimeout(() => setShowPicker(true), 100); 
            } else {
                setDate(selectedDate);
            }
        }
    };

    const handleSave = async () => {
        if (!value) {
            Alert.alert("Erro", "Por favor, insira o valor da glicemia.");
            return;
        }

        try {
            // ⚠️ CORREÇÃO AQUI: A rota no backend é '/users/glucose'
            await api.post('/users/glucose', {
                value: parseInt(value),
                type: type, // O backend espera 'type' e converte para 'context' no banco
                notes: notes,
                recordedAt: date.toISOString(), 
            });

            Alert.alert("Sucesso!", "Registro salvo.", [
                { text: "OK", onPress: () => navigation.goBack() }
            ]);

        } catch (error) {
            console.error(error);
            Alert.alert("Erro", "Não foi possível salvar o registro.");
        }
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit', month: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit',
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            
            {/* Cabeçalho Verde */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <FontAwesome name="arrow-left" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Novo Registro</Text>
            </View>

            {/* Container Branco (Efeito Folha) */}
            <KeyboardAwareScrollView 
                style={styles.formArea} 
                contentContainerStyle={{paddingBottom: 40}} 
            >
                {/* Campo Valor */}
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Valor (mg/dL)</Text>
                    <TextInput
                        style={styles.input}
                        value={value}
                        onChangeText={setValue}
                        keyboardType="number-pad"
                        placeholder="Ex: 110"
                        placeholderTextColor="#ccc"
                    />
                </View>

                {/* Campo Data e Hora */}
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Data e Hora</Text>
                    <TouchableOpacity
                        style={styles.inputDate}
                        onPress={() => {
                            setMode('date');
                            setShowPicker(true);
                        }}
                    >
                        <Text style={styles.inputDateText}>{formatDate(date)}</Text>
                        <FontAwesome name="calendar" size={20} color="#46A376" />
                    </TouchableOpacity>

                    {showPicker && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            display="default"
                            onChange={onDateTimeChange}
                        />
                    )}
                </View>

                {/* Campo Contexto */}
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Momento</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={type}
                            onValueChange={(itemValue) => setType(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Em Jejum" value="JEJUM" />
                            <Picker.Item label="Pré-Refeição" value="ANTES_REFEICAO" />
                            <Picker.Item label="Pós-Refeição" value="POS_REFEICAO" />
                            <Picker.Item label="Antes de Dormir" value="ANTES_DORMIR" />
                            <Picker.Item label="Madrugada" value="MADRUGADA" />
                            <Picker.Item label="Outro" value="OUTRO" />
                        </Picker>
                    </View>
                </View>

                {/* Campo Observação */}
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Observação (Opcional)</Text>
                    <TextInput
                        style={styles.inputNotes}
                        value={notes}
                        onChangeText={setNotes}
                        placeholder="O que você comeu? Como se sente?"
                        placeholderTextColor="#ccc"
                        multiline={true}
                        numberOfLines={3}
                    />
                </View>

                {/* Botão Salvar */}
                <View style={styles.saveButtonContainer}>
                    <Button
                        texto="Salvar Registro"
                        onPress={handleSave}
                        buttonStyle={{ backgroundColor: '#46A376', width: '100%' }} 
                    />
                </View>

                {/* Botão Cancelar */}
                <TouchableOpacity onPress={() => navigation.goBack()} style={{marginTop: 15}}>
                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>

            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}