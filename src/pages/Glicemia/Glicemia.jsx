// Em: src/pages/Glicemia/Glicemia.jsx (COMPLETO E DINÂMICO)

import React, { useState, useEffect } from 'react'; // 1. Importe useState e useEffect
import { 
    View, 
    Text, 
    TouchableOpacity, 
    ScrollView, 
    Dimensions, 
    ActivityIndicator, // 2. Importe o ActivityIndicator
    Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './glicemia.style';
import { LineChart } from 'react-native-chart-kit';
import { FontAwesome } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native'; // 3. Importe o 'useIsFocused'
import api from '../../services/api'; // 4. Importe sua API

const { width } = Dimensions.get('window');

// 5. Dados VAZIOS para o gráfico (estado inicial)
const emptyChartData = {
    labels: ['-'],
    datasets: [
        { 
            data: [0],
            color: (opacity = 1) => `rgba(70, 163, 118, ${opacity})`,
            strokeWidth: 3,
        }
    ],
};

// Configuração do Gráfico (Sem mudanças)
const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(100, 100, 100, ${opacity})`,
    style: {
        borderRadius: 16,
    },
    propsForDots: {
        r: '6',
        strokeWidth: '2',
        stroke: '#46A376',
    },
    withShadow: false,
    withInnerLines: false,
    withOuterLines: false,
};

export default function Glicemia({ navigation }) {
    
    // 6. ESTADOS para os dados dinâmicos
    const [isLoading, setIsLoading] = useState(true);
    const [chartData, setChartData] = useState(emptyChartData);
    const [ultimoRegistro, setUltimoRegistro] = useState("Nenhum registro encontrado.");
    const [mediaGeral, setMediaGeral] = useState("N/A"); // (Média de todos os registros)

    // 7. Hook para saber se a aba está em foco
    const isFocused = useIsFocused();

    // 8. Função para formatar a data (do seu schema 'recordedAt')
    const formatRecordDate = (dateString) => {
        const date = new Date(dateString);
        const time = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        const day = date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
        return `${day} às ${time}`;
    };

    // 9. Função que BUSCA os dados do backend
    const fetchData = async () => {
        try {
            // Chama a rota que criamos no backend
            const response = await api.get('/users/glicemia');
            const records = response.data; // Array de { value, context, recordedAt }

            if (!records || records.length === 0) {
                // Se não houver dados, define os estados padrão
                setChartData(emptyChartData);
                setUltimoRegistro("Nenhum registro encontrado.");
                setMediaGeral("N/A");
                return; 
            }

            // --- Processa os dados para o GRÁFICO ---
            // Pega os 7 registros mais recentes e inverte (para o gráfico ler da esquerda p/ direita)
            const recentRecords = records.slice(0, 7).reverse(); 

            const newChartData = {
                // Formata os labels (ex: "09:20")
                labels: recentRecords.map(r => 
                    new Date(r.recordedAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
                ),
                datasets: [{
                    data: recentRecords.map(r => r.value), // Pega os valores
                    color: (opacity = 1) => `rgba(70, 163, 118, ${opacity})`,
                    strokeWidth: 3,
                }]
            };
            setChartData(newChartData);

            // --- Processa os dados para o TEXTO DE RESUMO ---
            
            // "Último registro:"
            const lastRecord = records[0]; // O backend já ordenou por 'desc'
            setUltimoRegistro(
                `${lastRecord.value} mg/dl em ${formatRecordDate(lastRecord.recordedAt)} (${lastRecord.context})`
            );

            // "Glicemia média:" (Calcula a média de TODOS os registros)
            const media = records.reduce((acc, r) => acc + r.value, 0) / records.length;
            setMediaGeral(`${media.toFixed(0)} mg/dl`); // Arredonda a média

        } catch (error) {
            console.error("Erro ao buscar dados de glicemia:", error);
            Alert.alert("Erro", "Não foi possível carregar seus dados de glicemia.");
        } finally {
            setIsLoading(false);
        }
    };

    // 10. O 'useEffect' que roda a função 'fetchData'
    // Ele roda toda vez que 'isFocused' mudar para 'true' (quando você entra na aba)
    useEffect(() => {
        if (isFocused) {
            setIsLoading(true); // Mostra "Carregando..."
            fetchData(); // Busca os dados
        }
    }, [isFocused]);

    // 11. Tela de Carregamento
    if (isLoading) {
        return (
            <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="#46A376" />
                <Text style={{marginTop: 10, color: '#333'}}>Carregando dados...</Text>
            </SafeAreaView>
        );
    }

    // 12. O JSX (Renderização)
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                style={styles.scrollContainer}
                contentContainerStyle={styles.infoContainer}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.headerTitle}>Glicemia de hoje</Text>

                <View style={styles.chartContainer}>
                    <LineChart
                        data={chartData} // <-- USA O ESTADO (DADOS REAIS)
                        width={width * 0.9}
                        height={220}
                        chartConfig={chartConfig}
                        bezier
                        style={styles.chart}
                    />
                </View>

                {/* Textos de Informação (agora usam o estado) */}
                <Text style={styles.infoText}>
                    <Text style={styles.infoBold}>Último registro:</Text> {ultimoRegistro}
                </Text>
                <Text style={styles.infoText}>
                    <Text style={styles.infoBold}>Glicemia média:</Text> {mediaGeral}
                </Text>

                {/* Botões de Ação (com o onPress corrigido) */}
                <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => navigation.navigate('RegistroGlicemico')}
                >
                    <FontAwesome name="plus" size={20} color="#fff" />
                    <Text style={styles.actionButtonText}>Registro glicêmico</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                    <FontAwesome name="history" size={20} color="#fff" />
                    <Text style={styles.actionButtonText}>Ver Histórico</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                    <FontAwesome name="file-text" size={20} color="#fff" />
                    <Text style={styles.actionButtonText}>Visualizar Exames</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}