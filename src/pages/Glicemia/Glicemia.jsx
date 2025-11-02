// Em: src/pages/Glicemia/Glicemia.jsx

import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './glicemia.style';
import { LineChart } from 'react-native-chart-kit';
import { FontAwesome } from '@expo/vector-icons';

// Pega a largura da tela para o gráfico
const { width } = Dimensions.get('window');

// Dados FALSOS (mock) para o gráfico (só para mostrar)
const chartData = {
    labels: ['00', '06', '12', '18', '24'],
    datasets: [
        {
            data: [110, 100, 105, 150, 105], // Seus dados do gráfico
            color: (opacity = 1) => `rgba(70, 163, 118, ${opacity})`, // Seu verde
            strokeWidth: 3,
        },
    ],
};

// Configuração do Gráfico
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
        stroke: '#46A376', // Seu verde
    },
    withShadow: false,
    withInnerLines: false,
    withOuterLines: false,
};

export default function Glicemia({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                style={styles.scrollContainer}
                contentContainerStyle={styles.infoContainer}
                showsVerticalScrollIndicator={false}
            >
                {/* 1. Cabeçalho */}
                <Text style={styles.headerTitle}>Glicemia de hoje</Text>

                {/* 2. O Gráfico */}
                <View style={styles.chartContainer}>
                    <LineChart
                        data={chartData}
                        width={width * 0.9} // 90% da largura da tela
                        height={220}
                        chartConfig={chartConfig}
                        bezier // Deixa a linha curvada
                        style={styles.chart}
                    />
                </View>

                {/* 3. Texto de Informação */}
                <Text style={styles.infoText}>
                    <Text style={styles.infoBold}>Último registro:</Text> 110 mg/dl às 09:20 (jejum)
                </Text>
                <Text style={styles.infoText}>
                    <Text style={styles.infoBold}>Glicemia média da semana:</Text> 104 mg/dl
                </Text>

                {/* 4. Botões de Ação */}
                <TouchableOpacity style={styles.actionButton}>
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