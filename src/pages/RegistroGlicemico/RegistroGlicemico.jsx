// Em: src/pages/RegistroGlicemico/RegistroGlicemico.jsx

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, TextInput, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// 1. CORRIGIDO: Importação correta do arquivo de estilo
import { styles } from './RegistroGlicemico'; 
import { Picker } from '@react-native-picker/picker';
import Button from '../../components/button/button.jsx'; 
import api from '../../services/api';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// 2. Importe o DatePicker e o FontAwesome
import DateTimePicker from '@react-native-community/datetimepicker'; 
import { FontAwesome } from '@expo/vector-icons'; 

export default function RegistroGlicemico({ navigation }) {
    const [value, setValue] = useState("");
    const [type, setType] = useState("JEJUM");
    const [notes, setNotes] = useState("");
    
    // 3. Estados para Data e Hora
    const [date, setDate] = useState(new Date()); // Começa com a data/hora atual
    const [showPicker, setShowPicker] = useState(false); // Controla data E hora
    const [mode, setMode] = useState('date'); // Controla se é 'date' ou 'time'

    // 4. Função chamada pelo DateTimePicker
    const onDateTimeChange = (event, selectedDate) => {
        setShowPicker(false); // Fecha o picker
        if (selectedDate) {
            // Se o usuário selecionou uma data,
            // e o modo era 'date', abre o seletor de 'time'
            if (mode === 'date') {
                setDate(selectedDate);
                setMode('time'); // Prepara para abrir o de hora
                setShowPicker(true); // Abre o de hora
            } else {
                // Se o modo era 'time', salva a hora
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
            await api.post('/users/glicemia', {
                value: parseInt(value),
                type: type, // 'context' no backend
                notes: notes,
                recordedAt: date.toISOString(), // 5. Envia a data e hora selecionadas
            });

            Alert.alert("Sucesso!", "Registro salvo.", [
                { text: "OK", onPress: () => navigation.goBack() }
            ]);

        } catch (error) {
            Alert.alert("Erro", "Não foi possível salvar o registro.");
            console.error(error);
        }
    };

    // 6. Formata a data e hora para mostrar no "botão"
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
                <Text style={styles.headerTitle}>Registro glicemia</Text>
            </View>

            {/* 7. O KeyboardAwareScrollView agora engloba SÓ a área branca */}
            <KeyboardAwareScrollView 
                style={styles.formArea} // <-- A mágica do card branco
                contentContainerStyle={{paddingBottom: 40}} // Padding no final
            >
                {/* Campo de Valor */}
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Valor</Text>
                    <TextInput
                        style={styles.input}
                        value={value}
                        onChangeText={setValue}
                        keyboardType="number-pad"
                        placeholder="110 mg/dl"
                        placeholderTextColor="#888"
                    />
                </View>

                {/* 8. Campo de Data e Hora (Novo) */}
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Data e hora</Text>
                    <TouchableOpacity
                        style={styles.inputDate}
                        onPress={() => {
                            setMode('date'); // Começa pela data
                            setShowPicker(true);
                        }}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={styles.inputDateText}>{formatDate(date)}</Text>
                            <FontAwesome name="calendar" size={20} color="#666" />
                        </View>
                    </TouchableOpacity>

                    {/* O componente de Picker (invisível até ser ativado) */}
                    {showPicker && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={mode} // 'date' ou 'time'
                            is24Hour={true}
                            display="default"
                            onChange={onDateTimeChange}
                        />
                    )}
                </View>

                {/* Campo de Contexto */}
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Contexto</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={type}
                            onValueChange={(itemValue) => setType(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Em Jejum" value="JEJUM" />
                            <Picker.Item label="Pré-Refeição" value="ANTES_REFEICAO" />
                            <Picker.Item label="Pós-Refeição" value="POS_REFEICAO" />
                            <Picker.Item label="Outro" value="OUTRO" />
                        </Picker>
                    </View>
                </View>

                {/* Campo de Observação */}
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Observação:</Text>
                    <TextInput
                        style={styles.inputNotes}
                        value={notes}
                        onChangeText={setNotes}
                        placeholder="Detalhes ou anotações adicionais..."
                        placeholderTextColor="#888"
                        multiline={true}
                        numberOfLines={4}
                    />
                </View>

                {/* Botão Salvar */}
                <View style={styles.saveButtonContainer}>
                    <Button
                        texto="Salvar"
                        onPress={handleSave}
                        buttonStyle={{ backgroundColor: '#46A376' }} // Botão verde
                    />
                </View>

                {/* Botão Cancelar */}
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>

            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}