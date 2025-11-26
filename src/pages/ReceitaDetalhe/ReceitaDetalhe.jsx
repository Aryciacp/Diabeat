// ARQUIVO: src/pages/Receitas/ReceitaDetalhe.jsx

import React, { useEffect, useState } from 'react';
import { 
    View, Text, Image, ScrollView, 
    TouchableOpacity, ActivityIndicator, Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';

// Importa os estilos
import { styles } from './ReceitaDetalhe.style.js';

import api from '../../services/api'; 

export default function ReceitaDetalhe({ route, navigation }) {
    const { recipeId } = route.params;

    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadDetails() {
            try {
                // Chama seu backend que traduz tudo
                const response = await api.get(`/recipes/${recipeId}`);
                setDetails(response.data);
            } catch (error) {
                console.error("Erro ao carregar detalhes:", error);
                Alert.alert("Erro", "Não foi possível carregar a receita.");
                navigation.goBack();
            } finally {
                setLoading(false);
            }
        }
        loadDetails();
    }, [recipeId]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#fff" />
            </View>
        );
    }

    if (!details) return null;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <FontAwesome name="arrow-left" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            <View style={styles.contentContainer}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 40}}>
                    
                    <View style={styles.imageWrapper}>
                        <Image 
                            source={{ uri: details.image }} 
                            style={styles.bigImage} 
                            resizeMode="cover"
                        />
                    </View>
                    
                    <Text style={styles.title}>{details.title}</Text>

                    {/* Badges Informativos */}
                    <View style={styles.badgesContainer}>
                        <View style={styles.badge}>
                            <FontAwesome name="check" size={14} color="#46A376" />
                            <Text style={styles.badgeText}>Zero Açúcar</Text>
                        </View>
                        {details.readyInMinutes && (
                            <View style={styles.badge}>
                                <FontAwesome name="clock-o" size={14} color="#46A376" />
                                <Text style={styles.badgeText}>{details.readyInMinutes} min</Text>
                            </View>
                        )}
                        {details.servings && (
                            <View style={styles.badge}>
                                <FontAwesome name="users" size={14} color="#46A376" />
                                <Text style={styles.badgeText}>{details.servings} porções</Text>
                            </View>
                        )}
                    </View>

                    {/* Ingredientes */}
                    <Text style={styles.sectionTitle}>Ingredientes:</Text>
                    
                    {/* CORREÇÃO DE CHAVE: Usando index */}
                    {details.extendedIngredients?.map((ing, index) => (
                        <Text key={index} style={styles.textItem}>• {ing.original}</Text>
                    ))}

                    <View style={styles.divider} />

                    {/* Modo de Preparo */}
                    <Text style={styles.sectionTitle}>Modo de preparo:</Text>
                    
                    {details.analyzedInstructions?.length > 0 ? (
                        // CORREÇÃO DE CHAVE: Usando index no map
                        details.analyzedInstructions[0].steps.map((step, index) => (
                            <View key={index} style={styles.instructionRow}>
                                <Text style={styles.stepNumber}>{step.number}.</Text>
                                <Text style={[styles.textItem, {flex: 1}]}>{step.step}</Text>
                            </View>
                        ))
                    ) : (
                        <Text style={styles.textItem}>
                            {details.instructions || "Instruções detalhadas indisponíveis."}
                        </Text>
                    )}

                </ScrollView>
            </View>
        </SafeAreaView>
    );
}