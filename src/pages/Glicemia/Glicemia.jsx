// Arquivo: src/pages/Glicemia/Glicemia.jsx

import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    ScrollView, 
    Dimensions, 
    ActivityIndicator 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './glicemia.style';
import { LineChart } from 'react-native-chart-kit';
import { FontAwesome } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native'; 
import api from '../../services/api'; 

// Import do Alerta Bonito
import CustomAlert from '../../components/customAlert/CustomAlert';

const { width } = Dimensions.get('window');

const COLOR_DANGER = '#FF5252'; 
const COLOR_OK = '#00E676';     

const emptyChartData = {
    labels: ['-'],
    datasets: [{ 
        data: [0],
        color: (opacity = 1) => COLOR_OK,
        strokeWidth: 3,
    }],
};

const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(0, 150, 100, ${opacity})`, 
    labelColor: (opacity = 1) => `rgba(130, 130, 130, ${opacity})`,
    strokeWidth: 2, 
    fillShadowGradientFrom: COLOR_DANGER,
    fillShadowGradientFromOpacity: 0.2,
    fillShadowGradientTo: COLOR_OK,
    fillShadowGradientToOpacity: 0.05,
    useShadowColorFromDataset: false,
    decimalPlaces: 0,
    propsForBackgroundLines: {
        strokeDasharray: "", 
        stroke: "#f5f5f5", 
        strokeWidth: 1,
    },
    propsForDots: {
        r: "5", 
        strokeWidth: "2",
        stroke: "#fff", 
    },
};

export default function Glicemia({ navigation }) {
    const [isLoading, setIsLoading] = useState(true);
    const [chartData, setChartData] = useState(emptyChartData);
    const [ultimoRegistro, setUltimoRegistro] = useState("Nenhum registro encontrado.");
    const [mediaGeral, setMediaGeral] = useState("N/A"); 
    const [tituloMes, setTituloMes] = useState("Glicemia do Mês");
    const [mesRecords, setMesRecords] = useState([]); 

    // --- ESTADOS DO ALERTA ---
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertConfig, setAlertConfig] = useState({
        title: "",
        message: "",
        type: "info",
        showCancel: false,
        onConfirm: null,
        confirmText: "OK"
    });

    const isFocused = useIsFocused();

    const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

    const formatRecordDate = (dateString) => {
        const date = new Date(dateString);
        const time = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        const day = date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
        return `${day} às ${time}`;
    };

    const getGlucoseColor = (value) => {
        if (value > 180) return COLOR_DANGER; 
        if (value < 70) return COLOR_DANGER;  
        return COLOR_OK; 
    };

    // --- Helper para mostrar alerta ---
    const showAlert = (title, message, type = "info", showCancel = false, onConfirm = null, confirmText = "OK") => {
        setAlertConfig({ title, message, type, showCancel, onConfirm, confirmText });
        setAlertVisible(true);
    };

    const fetchData = async () => {
        try {
            const response = await api.get('/users/glucose');
            const records = response.data; 

            const agora = new Date();
            const mesAtual = agora.getMonth();
            const anoAtual = agora.getFullYear();
            
            const nomeMes = agora.toLocaleString('pt-BR', { month: 'long' });
            setTituloMes(`Glicemia de ${capitalize(nomeMes)}`);

            if (!records || records.length === 0) {
                setChartData(emptyChartData);
                setUltimoRegistro("Nenhum registro encontrado.");
                setMediaGeral("N/A");
                setMesRecords([]); 
                return; 
            }

            const registrosDoMes = records.filter(item => {
                const dataItem = new Date(item.recordedAt);
                return dataItem.getMonth() === mesAtual && dataItem.getFullYear() === anoAtual;
            });

            if (registrosDoMes.length === 0) {
                setChartData(emptyChartData);
                setMesRecords([]);
            } else {
                registrosDoMes.sort((a, b) => new Date(a.recordedAt) - new Date(b.recordedAt));
                setMesRecords(registrosDoMes);

                const newChartData = {
                    labels: registrosDoMes.map(r => 
                        new Date(r.recordedAt).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
                    ),
                    datasets: [{
                        data: registrosDoMes.map(r => r.value),
                        color: (opacity = 1) => COLOR_OK, 
                    }]
                };
                setChartData(newChartData);
            }

            const lastRecord = records[0];
            if (lastRecord) {
                setUltimoRegistro(
                    `${lastRecord.value} mg/dl em ${formatRecordDate(lastRecord.recordedAt)}`
                );
            }

            if (registrosDoMes.length > 0) {
                const media = registrosDoMes.reduce((acc, r) => acc + r.value, 0) / registrosDoMes.length;
                setMediaGeral(`${media.toFixed(0)} mg/dl`);
            } else {
                setMediaGeral("N/A");
            }

        } catch (error) {
            console.error(error);
            showAlert("Erro", "Não foi possível buscar os dados.", "error");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isFocused) {
            setIsLoading(true);
            fetchData();
        }
    }, [isFocused]);

    // --- CLIQUE NO GRÁFICO (COM ALERTA BONITO) ---
    const handlePointClick = (data) => {
        const clickedIndex = data.index;
        const registroClicado = mesRecords[clickedIndex];

        if (registroClicado) {
            // Mostra o alerta Customizado com opção de editar
            showAlert(
                "Detalhes do Registro",
                `Glicemia: ${registroClicado.value} mg/dL\nData: ${formatRecordDate(registroClicado.recordedAt)}\n\nDeseja ver ou editar este registro?`,
                "info",
                true, // Mostra botão Cancelar
                () => {
                    // Ação ao confirmar
                    navigation.navigate('HistoricoGlicemia', { 
                        highlightId: registroClicado.id 
                    });
                },
                "Ver/Editar" // Texto do botão de confirmar
            );
        }
    };

    if (isLoading) {
        return (
            <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color={COLOR_OK} />
                <Text style={{marginTop: 10, color: '#333'}}>Carregando dados...</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            
            {/* --- COMPONENTE DE ALERTA --- */}
            <CustomAlert 
                visible={alertVisible}
                title={alertConfig.title}
                message={alertConfig.message}
                type={alertConfig.type}
                showCancel={alertConfig.showCancel}
                onConfirm={alertConfig.onConfirm}
                confirmText={alertConfig.confirmText}
                onClose={() => setAlertVisible(false)}
            />

            <ScrollView
                style={styles.scrollContainer}
                contentContainerStyle={styles.infoContainer}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.headerTitle}>{tituloMes}</Text>

                <View style={styles.chartContainer}>
                    <LineChart
                        data={chartData}
                        width={width * 0.9}
                        height={220}
                        chartConfig={chartConfig}
                        bezier
                        withDots={true}
                        
                        onDataPointClick={handlePointClick}

                        getDotColor={(dataPoint, index) => {
                            return getGlucoseColor(dataPoint);
                        }}

                        withInnerLines={true}
                        withOuterLines={false}
                        withVerticalLines={false}
                        withHorizontalLines={true}
                        style={{
                            ...styles.chart,
                            paddingRight: 20,
                        }}
                    />
                </View>

                {/* Legenda */}
                <View style={{flexDirection: 'row', justifyContent: 'center', marginBottom: 20, gap: 15}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{width: 10, height: 10, borderRadius: 5, backgroundColor: COLOR_OK, marginRight: 5}} />
                        <Text style={{fontSize: 12, color: '#666'}}>Normal</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{width: 10, height: 10, borderRadius: 5, backgroundColor: COLOR_DANGER, marginRight: 5}} />
                        <Text style={{fontSize: 12, color: '#666'}}>Perigo</Text>
                    </View>
                </View>

                <Text style={styles.infoText}>
                    <Text style={styles.infoBold}>Último registro:</Text> {ultimoRegistro}
                </Text>
                <Text style={styles.infoText}>
                    <Text style={styles.infoBold}>Média deste mês:</Text> {mediaGeral}
                </Text>

                <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => navigation.navigate('RegistroGlicemico')}
                >
                    <FontAwesome name="plus" size={20} color="#fff" />
                    <Text style={styles.actionButtonText}>Registro glicêmico</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => navigation.navigate('HistoricoGlicemia')}
                >
                    <FontAwesome name="history" size={20} color="#fff" />
                    <Text style={styles.actionButtonText}>Ver Histórico</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => navigation.navigate('Exames')}
                >
                    <FontAwesome name="file-text" size={20} color="#fff" />
                    <Text style={styles.actionButtonText}>Visualizar Exames</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}