// Arquivo: src/pages/HistoricoGlicemia/HistoricoGlicemia.jsx

import React, { useState, useCallback } from 'react';
import { 
    View, Text, TouchableOpacity, ScrollView, Dimensions, 
    Alert, ActivityIndicator, Modal, TextInput, Pressable 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './HistoricoGlicemia.style';
import { FontAwesome } from '@expo/vector-icons';
import Button from '../../components/button/button';
import api from '../../services/api';
import { useFocusEffect } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { BarChart } from 'react-native-chart-kit';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

const { width } = Dimensions.get('window');

export default function HistoricoGlicemia({ navigation }) {
    
    const [isLoading, setIsLoading] = useState(true);
    const [allRecords, setAllRecords] = useState([]); // Todos os dados
    const [filteredRecords, setFilteredRecords] = useState([]); // Dados filtrados (ex: hoje)
    
    // Estados de Filtro
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    // Estados de Edição
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);
    const [editValue, setEditValue] = useState("");
    const [editType, setEditType] = useState("");

    // --- 1. BUSCAR DADOS ---
    const fetchRecords = async () => {
        setIsLoading(true);
        try {
            const response = await api.get('/users/glucose');
            setAllRecords(response.data);
            filterByDate(response.data, selectedDate); // Já aplica o filtro na data atual
        } catch (error) {
            Alert.alert("Erro", "Não foi possível carregar o histórico.");
        } finally {
            setIsLoading(false);
        }
    };

    useFocusEffect(useCallback(() => { fetchRecords(); }, []));

    // --- 2. FILTRAR POR DATA ---
    const filterByDate = (records, date) => {
        const filtered = records.filter(item => {
            const itemDate = new Date(item.recordedAt);
            return (
                itemDate.getDate() === date.getDate() &&
                itemDate.getMonth() === date.getMonth() &&
                itemDate.getFullYear() === date.getFullYear()
            );
        });
        // Ordena: mais recente no topo
        setFilteredRecords(filtered.sort((a,b) => new Date(b.recordedAt) - new Date(a.recordedAt)));
    };

    const onDateChange = (event, date) => {
        setShowDatePicker(false);
        if (date) {
            setSelectedDate(date);
            filterByDate(allRecords, date);
        }
    };

    // --- 3. GERAR DADOS PARA O GRÁFICO (Barras) ---
    const getChartData = () => {
        if (filteredRecords.length === 0) return null;

        // Pega os últimos 6 registros do dia para o gráfico não quebrar
        const dataSlice = filteredRecords.slice(0, 6).reverse();
        
        return {
            labels: dataSlice.map(r => new Date(r.recordedAt).toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'})),
            datasets: [{ data: dataSlice.map(r => r.value) }]
        };
    };

    // --- 4. EDITAR REGISTRO ---
    const handleEditPress = (item) => {
        setEditingRecord(item);
        setEditValue(String(item.value));
        setEditType(item.context);
        setEditModalVisible(true);
    };

    const saveEdit = async () => {
        try {
            await api.put(`/users/glucose/${editingRecord.id}`, {
                value: editValue,
                type: editType,
                recordedAt: editingRecord.recordedAt // Mantém a data original
            });
            setEditModalVisible(false);
            Alert.alert("Sucesso", "Registro atualizado!");
            fetchRecords(); // Recarrega tudo
        } catch (error) {
            Alert.alert("Erro", "Falha ao atualizar.");
        }
    };

    // --- 5. BAIXAR RELATÓRIO (PDF) ---
    const handleDownload = async () => {
        try {
            // Cria um HTML simples para o PDF
            const htmlContent = `
                <html>
                  <head>
                    <style>
                      body { font-family: Helvetica; padding: 20px; }
                      h1 { color: #46A376; text-align: center; }
                      table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                      th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                      th { background-color: #46A376; color: white; }
                    </style>
                  </head>
                  <body>
                    <h1>Relatório de Glicemia - Diabeat</h1>
                    <h3>Data: ${selectedDate.toLocaleDateString('pt-BR')}</h3>
                    <table>
                      <tr>
                        <th>Hora</th>
                        <th>Valor (mg/dL)</th>
                        <th>Contexto</th>
                      </tr>
                      ${filteredRecords.map(r => `
                        <tr>
                          <td>${new Date(r.recordedAt).toLocaleTimeString('pt-BR')}</td>
                          <td><b>${r.value}</b></td>
                          <td>${r.context}</td>
                        </tr>
                      `).join('')}
                    </table>
                  </body>
                </html>
            `;

            const { uri } = await Print.printToFileAsync({ html: htmlContent });
            await Sharing.shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });

        } catch (error) {
            Alert.alert("Erro", "Não foi possível gerar o PDF.");
        }
    };


    if (isLoading) {
        return (
            <SafeAreaView style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <ActivityIndicator size="large" color="#46A376" />
            </SafeAreaView>
        );
    }

    const chartData = getChartData();

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                
                <Text style={styles.headerTitle}>Histórico</Text>

                {/* --- Filtros --- */}
                <View style={styles.filterContainer}>
                    <TouchableOpacity style={[styles.filterButton, styles.filterButtonActive]} onPress={() => setShowDatePicker(true)}>
                        <FontAwesome name="calendar" size={16} color="#FFF" />
                        <Text style={[styles.filterText, styles.filterTextActive]}>
                            {selectedDate.toLocaleDateString('pt-BR')}
                        </Text>
                        <FontAwesome name="chevron-down" size={12} color="#FFF" style={{marginLeft: 5}} />
                    </TouchableOpacity>
                    {/* Botão auxiliar apenas visual para parecer com a imagem */}
                    <TouchableOpacity style={styles.filterButton} onPress={() => Alert.alert("Info", "Filtro de hora em breve")}>
                        <FontAwesome name="clock-o" size={16} color="#46A376" />
                        <Text style={styles.filterText}>Hora</Text>
                    </TouchableOpacity>
                </View>

                {showDatePicker && (
                    <DateTimePicker
                        value={selectedDate}
                        mode="date"
                        display="default"
                        onChange={onDateChange}
                    />
                )}

                {/* --- Gráfico de Barras --- */}
                <Text style={styles.chartTitle}>Glicemia do dia</Text>
                <View style={styles.chartContainer}>
                    {chartData ? (
                        <BarChart
                            data={chartData}
                            width={width - 60}
                            height={180}
                            yAxisLabel=""
                            yAxisSuffix=""
                            chartConfig={{
                                backgroundColor: "#fff",
                                backgroundGradientFrom: "#fff",
                                backgroundGradientTo: "#fff",
                                decimalPlaces: 0,
                                color: (opacity = 1) => `rgba(70, 163, 118, ${opacity})`, // #46A376
                                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                barPercentage: 0.6,
                            }}
                            verticalLabelRotation={0}
                            fromZero={true}
                            showValuesOnTopOfBars={true}
                        />
                    ) : (
                        <View style={{padding: 30, alignItems: 'center'}}>
                            <Text style={{color: '#999'}}>Sem dados para este dia</Text>
                        </View>
                    )}
                </View>

                {/* --- Lista --- */}
                <Text style={styles.sectionTitle}>Registros</Text>
                {filteredRecords.length === 0 ? (
                    <Text style={{textAlign:'center', color:'#999', marginTop: 20}}>Nenhum registro encontrado.</Text>
                ) : (
                    filteredRecords.map((item) => (
                        <View key={item.id} style={styles.historyItem}>
                            <View style={styles.timeContainer}>
                                <Text style={styles.timeText}>
                                    {new Date(item.recordedAt).toLocaleTimeString('pt-BR', {hour:'2-digit', minute:'2-digit'})}
                                </Text>
                            </View>
                            <View style={styles.dataContainer}>
                                <Text style={styles.valueText}>{item.value} mg/dL</Text>
                                <Text style={styles.contextText}>{item.context}</Text>
                            </View>
                            <TouchableOpacity style={styles.editButton} onPress={() => handleEditPress(item)}>
                                <Text style={styles.editButtonText}>Editar</Text>
                            </TouchableOpacity>
                        </View>
                    ))
                )}

                <Button 
                    texto="Baixar Gráfico (PDF)"
                    onPress={handleDownload}
                    buttonStyle={{marginTop: 20, backgroundColor: '#46A376'}}
                />

            </ScrollView>

            {/* --- Modal de Edição --- */}
            <Modal visible={editModalVisible} transparent={true} animationType="slide" onRequestClose={() => setEditModalVisible(false)}>
                <Pressable style={styles.modalBackdrop} onPress={() => setEditModalVisible(false)}>
                    <Pressable style={styles.modalContainer} onPress={() => {}}>
                        <Text style={styles.modalTitle}>Editar Registro</Text>
                        
                        <Text style={styles.label}>Valor (mg/dL)</Text>
                        <TextInput 
                            style={styles.input} 
                            keyboardType="number-pad"
                            value={editValue} 
                            onChangeText={setEditValue} 
                        />

                        <Text style={styles.label}>Contexto</Text>
                        <View style={[styles.input, {padding:0, justifyContent:'center'}]}>
                            <Picker
                                selectedValue={editType}
                                onValueChange={setEditType}
                                style={{width: '100%'}}
                            >
                                <Picker.Item label="Em Jejum" value="JEJUM" />
                                <Picker.Item label="Pré-Refeição" value="ANTES_REFEICAO" />
                                <Picker.Item label="Pós-Refeição" value="POS_REFEICAO" />
                                <Picker.Item label="Outro" value="OUTRO" />
                            </Picker>
                        </View>

                        <View style={styles.modalActions}>
                            <Button texto="Cancelar" onPress={() => setEditModalVisible(false)} buttonStyle={{backgroundColor:'#999', width:'48%'}} />
                            <Button texto="Salvar" onPress={saveEdit} buttonStyle={{backgroundColor:'#46A376', width:'48%'}} />
                        </View>
                    </Pressable>
                </Pressable>
            </Modal>

        </SafeAreaView>
    );
}