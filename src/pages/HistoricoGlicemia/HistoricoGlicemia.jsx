// Arquivo: src/pages/HistoricoGlicemia/HistoricoGlicemia.jsx

import React, { useState, useCallback } from 'react';
import { 
    View, Text, TouchableOpacity, ScrollView, Dimensions, 
    ActivityIndicator, Modal, TextInput, Pressable 
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
import CustomAlert from '../../components/customAlert/CustomAlert';

const { width } = Dimensions.get('window');

export default function HistoricoGlicemia({ navigation, route }) {
    
    const [isLoading, setIsLoading] = useState(true);
    const [allRecords, setAllRecords] = useState([]); 
    const [filteredRecords, setFilteredRecords] = useState([]); 
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);
    const [editValue, setEditValue] = useState("");
    const [editType, setEditType] = useState("");
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertConfig, setAlertConfig] = useState({ title: "", message: "", type: "info" });

    const { highlightId } = route.params || {};

    const showAlert = (title, message, type = "info") => {
        setAlertConfig({ title, message, type });
        setAlertVisible(true);
    };

    const fetchRecords = async () => {
        setIsLoading(true);
        try {
            const response = await api.get('/users/glucose');
            const data = response.data;
            setAllRecords(data);

            if (highlightId) {
                const targetRecord = data.find(r => r.id === highlightId);
                if (targetRecord) {
                    const targetDate = new Date(targetRecord.recordedAt);
                    setSelectedDate(targetDate);
                    filterByDate(data, targetDate);
                } else {
                    filterByDate(data, selectedDate);
                }
            } else {
                filterByDate(data, selectedDate);
            }
        } catch (error) {
            showAlert("Erro", "Não foi possível carregar o histórico.", "error");
        } finally {
            setIsLoading(false);
        }
    };

    useFocusEffect(useCallback(() => { fetchRecords(); }, [highlightId])); 

    const filterByDate = (records, date) => {
        const filtered = records.filter(item => {
            const itemDate = new Date(item.recordedAt);
            return (
                itemDate.getDate() === date.getDate() &&
                itemDate.getMonth() === date.getMonth() &&
                itemDate.getFullYear() === date.getFullYear()
            );
        });
        setFilteredRecords(filtered.sort((a,b) => new Date(b.recordedAt) - new Date(a.recordedAt)));
    };

    const onDateChange = (event, date) => {
        setShowDatePicker(false);
        if (date) {
            setSelectedDate(date);
            navigation.setParams({ highlightId: null });
            filterByDate(allRecords, date);
        }
    };

    const getChartData = () => {
        if (filteredRecords.length === 0) return null;
        const dataSlice = filteredRecords.slice(0, 6).reverse();
        return {
            labels: dataSlice.map(r => new Date(r.recordedAt).toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'})),
            datasets: [{ data: dataSlice.map(r => r.value) }]
        };
    };

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
                recordedAt: editingRecord.recordedAt 
            });
            setEditModalVisible(false);
            showAlert("Sucesso", "Registro atualizado!", "success");
            fetchRecords(); 
        } catch (error) {
            showAlert("Erro", "Falha ao atualizar o registro.", "error");
        }
    };

    const handleDownload = async () => {
        try {
            const htmlContent = `
                <html>
                  <body>
                    <h1 style="text-align: center; color: #46A376;">Relatório de Glicemia</h1>
                    <h3 style="text-align: center;">Data: ${selectedDate.toLocaleDateString('pt-BR')}</h3>
                    <table style="width: 100%; border-collapse: collapse; border: 1px solid #ddd;">
                      <tr style="background-color: #46A376; color: white;">
                        <th style="padding: 8px; border: 1px solid #ddd;">Hora</th>
                        <th style="padding: 8px; border: 1px solid #ddd;">Valor (mg/dL)</th>
                        <th style="padding: 8px; border: 1px solid #ddd;">Contexto</th>
                      </tr>
                      ${filteredRecords.map(r => `
                        <tr>
                          <td style="padding: 8px; border: 1px solid #ddd;">${new Date(r.recordedAt).toLocaleTimeString('pt-BR')}</td>
                          <td style="padding: 8px; border: 1px solid #ddd;"><b>${r.value}</b></td>
                          <td style="padding: 8px; border: 1px solid #ddd;">${r.context}</td>
                        </tr>
                      `).join('')}
                    </table>
                  </body>
                </html>
            `;
            const { uri } = await Print.printToFileAsync({ html: htmlContent });
            await Sharing.shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
        } catch (error) {
            showAlert("Erro", "Não foi possível gerar o PDF.", "error");
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
            
            <CustomAlert 
                visible={alertVisible}
                title={alertConfig.title}
                message={alertConfig.message}
                type={alertConfig.type}
                onClose={() => setAlertVisible(false)}
            />

            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                
                {/* --- HEADER COM SETA DE VOLTAR --- */}
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <FontAwesome name="arrow-left" size={24} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Histórico</Text>
                </View>

                {/* --- Filtros --- */}
                <View style={styles.filterContainer}>
                    <TouchableOpacity style={[styles.filterButton, styles.filterButtonActive]} onPress={() => setShowDatePicker(true)}>
                        <FontAwesome name="calendar" size={16} color="#FFF" />
                        <Text style={[styles.filterText, styles.filterTextActive]}>
                            {selectedDate.toLocaleDateString('pt-BR')}
                        </Text>
                        <FontAwesome name="chevron-down" size={12} color="#FFF" style={{marginLeft: 5}} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.filterButton} onPress={() => showAlert("Info", "Filtro de hora em breve", "info")}>
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

                {/* --- Gráfico --- */}
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
                                color: (opacity = 1) => `rgba(70, 163, 118, ${opacity})`,
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
                    filteredRecords.map((item) => {
                        const isHighlighted = item.id === highlightId;
                        return (
                            <View 
                                key={item.id} 
                                style={[
                                    styles.historyItem,
                                    isHighlighted && {
                                        borderColor: '#00E676',
                                        borderWidth: 2,
                                        backgroundColor: '#E8F5E9',
                                        transform: [{ scale: 1.02 }],
                                        elevation: 5,
                                        shadowColor: "#00E676"
                                    }
                                ]}
                            >
                                <View style={styles.timeContainer}>
                                    <Text style={[styles.timeText, isHighlighted && {fontWeight:'bold', color: '#2E7D5A'}]}>
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
                        );
                    })
                )}

                <Button 
                    texto="Baixar Gráfico (PDF)"
                    onPress={handleDownload}
                    buttonStyle={{marginTop: 20, backgroundColor: '#46A376'}}
                />

            </ScrollView>

            {/* --- Modal --- */}
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
                            <Picker selectedValue={editType} onValueChange={setEditType} style={{width: '100%'}}>
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