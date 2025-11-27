// ARQUIVO: src/pages/RegistroGlicemico/RegistroGlicemico.jsx

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from '@react-native-community/datetimepicker'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { Picker } from '@react-native-picker/picker';

import Button from '../../components/button/button.jsx'; 
import api from '../../services/api';
import { styles } from './RegistroGlicemico.js'; 

// --- IMPORT DO ALERTA CUSTOMIZADO ---
import CustomAlert from '../../components/customAlert/CustomAlert';

export default function RegistroGlicemico({ navigation }) {
    const [value, setValue] = useState("");
    const [type, setType] = useState("JEJUM");
    const [notes, setNotes] = useState("");
    const [date, setDate] = useState(new Date()); 
    const [showPicker, setShowPicker] = useState(false); 
    const [mode, setMode] = useState('date'); 

    // --- ESTADOS DO ALERTA ---
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertConfig, setAlertConfig] = useState({
        title: "", message: "", type: "info", 
        onConfirm: null // Para navegar ao fechar o sucesso
    });

    const showAlert = (title, message, type = "info", onConfirm = null) => {
        setAlertConfig({ title, message, type, onConfirm });
        setAlertVisible(true);
    };

    const onDateTimeChange = (event, selectedDate) => {
        setShowPicker(false); 
        if (selectedDate) {
            if (mode === 'date') {
                setDate(selectedDate);
                setMode('time'); 
                setTimeout(() => setShowPicker(true), 100); 
            } else {
                setDate(selectedDate);
            }
        }
    };

    const handleSave = async () => {
        // 1. Validação de Campo Vazio
        if (!value) {
            showAlert("Campo Obrigatório", "Por favor, insira o valor da glicemia.", "error");
            return;
        }

        // 2. Validação de Valor Lógico (Impossível)
        const glucoseValue = parseInt(value);
        
        if (isNaN(glucoseValue)) {
            showAlert("Valor Inválido", "Digite apenas números.", "error");
            return;
        }

        if (glucoseValue < 20) {
            showAlert("Valor Muito Baixo", "Glicemia abaixo de 20 mg/dL é extremamente perigosa. Verifique se digitou corretamente.", "error");
            return;
        }

        if (glucoseValue > 900) {
            showAlert("Valor Muito Alto", "Glicemia acima de 900 mg/dL é improvável. Verifique se digitou corretamente.", "error");
            return;
        }

        try {
            await api.post('/users/glucose', {
                value: glucoseValue,
                type: type, 
                notes: notes,
                recordedAt: date.toISOString(), 
            });

            // 3. Sucesso com Navegação
            showAlert(
                "Sucesso!", 
                "Registro de glicemia salvo.", 
                "success", 
                () => navigation.goBack() // Volta para a tela anterior ao clicar OK
            );

        } catch (error) {
            console.error(error);
            showAlert("Erro", "Não foi possível salvar o registro. Tente novamente.", "error");
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
            
            {/* --- COMPONENTE DE ALERTA --- */}
            <CustomAlert 
                visible={alertVisible}
                title={alertConfig.title}
                message={alertConfig.message}
                type={alertConfig.type}
                onConfirm={alertConfig.onConfirm} // Passa a função de navegar
                onClose={() => {
                    setAlertVisible(false);
                    // Se tiver onConfirm (sucesso), executa ele ao fechar
                    if (alertConfig.onConfirm) alertConfig.onConfirm();
                }}
            />

            {/* Cabeçalho Verde */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <FontAwesome name="arrow-left" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Novo Registro</Text>
            </View>

            {/* Container Branco */}
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
                        maxLength={4} // Limita a 4 dígitos (ex: 1999)
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