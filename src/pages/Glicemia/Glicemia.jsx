// Arquivo: src/pages/Glicemia/Glicemia.jsx

import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    ScrollView, 
    Dimensions, 
    ActivityIndicator, 
    Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './glicemia.style';
import { LineChart } from 'react-native-chart-kit';
import { FontAwesome } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native'; 
import api from '../../services/api'; 

const { width } = Dimensions.get('window');

// --- MUDANÇA DE COR AQUI ---
// Antes era #44c486ff (pastel). Agora é #00E676 (Vibrante/Neon)
// Outras opções vibrantes se quiser testar: 
// #27bb71ff (Verde Spotify) ou #10E575 (Verde Tech)
const PRIMARY_COLOR_HEX = '#44c486ff'; 

// Dados iniciais (placeholder)
const emptyChartData = {
    labels: ['-'],
    datasets: [
        { 
            data: [0],
            // Garante cor sólida e vibrante
            color: (opacity = 1) => PRIMARY_COLOR_HEX,
            strokeWidth: 3,
        }
    ],
};

const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    
    // Cor base usada para os cálculos. 
    // Usamos o HEX direto para garantir a vibração máxima.
    color: (opacity = 1) => PRIMARY_COLOR_HEX,
    
    // Cor dos textos (labels) - Mantive cinza para não brigar com o verde
    labelColor: (opacity = 1) => `rgba(130, 130, 130, ${opacity})`,
    
    strokeWidth: 3, 
    
    // Configura o preenchimento abaixo da linha
    fillShadowGradient: PRIMARY_COLOR_HEX,
    // Aumentei levemente a opacidade do fundo para 0.4 para acompanhar a vibração da linha
    fillShadowGradientOpacity: 0.4, 
    fillShadowGradientFrom: PRIMARY_COLOR_HEX,
    fillShadowGradientTo: '#ffffff',
    useShadowColorFromDataset: false,

    decimalPlaces: 0,
    
    // Linhas de grade
    propsForBackgroundLines: {
        strokeDasharray: "", 
        stroke: "#f0f0f0", 
        strokeWidth: 1,
    },
    
    propsForDots: {
        r: "0",
        strokeWidth: "0",
    },
};

export default function Glicemia({ navigation }) {
    
    const [isLoading, setIsLoading] = useState(true);
    const [chartData, setChartData] = useState(emptyChartData);
    const [ultimoRegistro, setUltimoRegistro] = useState("Nenhum registro encontrado.");
    const [mediaGeral, setMediaGeral] = useState("N/A"); 
    const [tituloMes, setTituloMes] = useState("Glicemia do Mês");

    const isFocused = useIsFocused();

    const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

    const formatRecordDate = (dateString) => {
        const date = new Date(dateString);
        const time = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        const day = date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
        return `${day} às ${time}`;
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
                return; 
            }

            const registrosDoMes = records.filter(item => {
                const dataItem = new Date(item.recordedAt);
                return dataItem.getMonth() === mesAtual && dataItem.getFullYear() === anoAtual;
            });

            if (registrosDoMes.length === 0) {
                setChartData(emptyChartData);
            } else {
                registrosDoMes.sort((a, b) => new Date(a.recordedAt) - new Date(b.recordedAt));

                const newChartData = {
                    labels: registrosDoMes.map(r => 
                        new Date(r.recordedAt).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
                    ),
                    datasets: [{
                        data: registrosDoMes.map(r => r.value),
                        // Força a cor vibrante na linha
                        color: (opacity = 1) => PRIMARY_COLOR_HEX, 
                        strokeWidth: 3,
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
            console.error("Erro ao buscar dados de glicemia:", error);
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

    if (isLoading) {
        return (
            <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                {/* Usei a cor vibrante aqui também no loading */}
                <ActivityIndicator size="large" color={PRIMARY_COLOR_HEX} />
                <Text style={{marginTop: 10, color: '#333'}}>Carregando dados...</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
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
                        withDots={false}
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