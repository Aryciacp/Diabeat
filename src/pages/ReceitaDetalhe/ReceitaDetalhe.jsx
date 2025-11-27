// ARQUIVO: src/pages/ReceitaDetalhe/ReceitaDetalhe.jsx

import React, { useEffect, useState } from 'react';
import { 
    View, Text, Image, ScrollView, 
    TouchableOpacity, ActivityIndicator, Alert, StatusBar 
} from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'; // Adicionei MaterialIcons para ícones mais bonitos
import { LinearGradient } from 'expo-linear-gradient'; // <--- IMPORTANTE
import { styles } from './ReceitaDetalhe.style.js';
import api from '../../services/api'; 

export default function ReceitaDetalhe({ route, navigation }) {
    const { recipeId } = route.params;

    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadDetails() {
            try {
                const response = await api.get(`/recipes/${recipeId}`);
                setDetails(response.data);
            } catch (error) {
                console.error("Erro ao carregar:", error);
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
                <ActivityIndicator size="large" color="#46A376" />
            </View>
        );
    }

    if (!details) return null;

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

            {/* 1. CAMADA DE FUNDO (IMAGEM + DEGRADÊ) */}
            <View style={styles.imageContainer}>
                <Image 
                    source={{ uri: details.image }} 
                    style={styles.recipeImage} 
                    resizeMode="cover"
                />
                {/* Degradê suave para escurecer o topo (onde fica o botão voltar) */}
                <LinearGradient
                    colors={['rgba(0,0,0,0.6)', 'transparent']}
                    style={styles.topGradient}
                />
            </View>

            {/* 2. CAMADA DE MEIO (CONTEÚDO) */}
            <ScrollView 
                showsVerticalScrollIndicator={false} 
                contentContainerStyle={styles.scrollContent}
                style={styles.scrollView}
            >
                {/* Espaço transparente para ver a imagem */}
                <View style={{ height: 300 }} /> 

                <View style={styles.contentBody}>
                    {/* "Puxador" visual */}
                    <View style={styles.handleBarContainer}>
                        <View style={styles.handleBar} />
                    </View>

                    <Text style={styles.title}>{details.title}</Text>

                    {/* Badges Informativos */}
                    <View style={styles.badgesContainer}>
                        {/* Exemplo de badge fixo se quiser */}
                        {/* <View style={styles.badge}>
                            <MaterialIcons name="verified" size={16} color="#46A376" />
                            <Text style={styles.badgeText}>Verificada</Text>
                        </View> */}
                        
                        {details.readyInMinutes && (
                            <View style={styles.badge}>
                                <MaterialIcons name="timer" size={16} color="#46A376" />
                                <Text style={styles.badgeText}>{details.readyInMinutes} min</Text>
                            </View>
                        )}
                        
                        {details.servings && (
                            <View style={styles.badge}>
                                <MaterialIcons name="restaurant-menu" size={16} color="#46A376" />
                                <Text style={styles.badgeText}>{details.servings} porções</Text>
                            </View>
                        )}
                        
                        {details.healthScore > 70 && (
                             <View style={styles.badge}>
                             <MaterialIcons name="favorite" size={16} color="#46A376" />
                             <Text style={styles.badgeText}>Saudável</Text>
                         </View>
                        )}
                    </View>

                    <View style={styles.divider} />

                    {/* Seção de Ingredientes */}
                    <View style={styles.sectionHeader}>
                        <MaterialIcons name="shopping-cart" size={22} color="#46A376" />
                        <Text style={styles.sectionTitle}>Ingredientes</Text>
                    </View>
                    <Text style={styles.sectionSubtitle}>O que você vai precisar:</Text>
                    
                    <View style={styles.ingredientsList}>
                        {details.extendedIngredients?.map((ing, index) => (
                            <View key={index} style={styles.ingredientItem}>
                                {/* Ícone de check em vez de bolinha */}
                                <View style={styles.checkIconContainer}>
                                     <FontAwesome name="check" size={12} color="#fff" />
                                </View>
                                <Text style={styles.textItem}>{ing.original}</Text>
                            </View>
                        ))}
                    </View>

                    <View style={styles.divider} />

                    {/* Seção de Modo de Preparo */}
                    <View style={styles.sectionHeader}>
                        <MaterialIcons name="menu-book" size={22} color="#46A376" />
                        <Text style={styles.sectionTitle}>Modo de Preparo</Text>
                    </View>
                    <Text style={styles.sectionSubtitle}>Passo a passo detalhado:</Text>
                    
                    <View style={styles.instructionsList}>
                        {details.analyzedInstructions?.length > 0 ? (
                            details.analyzedInstructions[0].steps.map((step, index) => (
                                <View key={index} style={styles.instructionRow}>
                                    <View style={styles.stepNumberContainer}>
                                        <Text style={styles.stepNumber}>{step.number}</Text>
                                    </View>
                                    <View style={styles.stepTextContainer}>
                                        <Text style={styles.stepText}>{step.step}</Text>
                                    </View>
                                </View>
                            ))
                        ) : (
                            <Text style={styles.textItem}>
                                {details.instructions || "Siga as instruções padrão da receita."}
                            </Text>
                        )}
                    </View>

                    {/* Espaço extra no final para não cortar o último item */}
                    <View style={{height: 60}} />
                </View>
            </ScrollView>

            {/* 3. CAMADA DE TOPO (BOTÃO VOLTAR) */}
            <TouchableOpacity 
                onPress={() => navigation.goBack()} 
                style={styles.backButton}
                activeOpacity={0.7}
            >
                {/* Usei um ícone ligeiramente mais grosso */}
                <FontAwesome name="chevron-left" size={18} color="#fff" />
            </TouchableOpacity>

        </View>
    );
}