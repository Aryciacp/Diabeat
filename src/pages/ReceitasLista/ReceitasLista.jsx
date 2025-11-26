// ARQUIVO: src/pages/Receitas/ReceitasLista.jsx

import React, { useState, useEffect } from 'react';
import { 
    View, Text, FlatList, Image, 
    TextInput, TouchableOpacity, ActivityIndicator, Alert, ScrollView 
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

// Importa os estilos (que já criamos anteriormente)
import { styles } from './ReceitasLista.style.js';

// Importa a API (que conecta ao seu Backend no Render)
import api from '../../services/api'; 

// Categorias Disponíveis (IDs em Português para o Backend traduzir)
const CATEGORIAS = [
    { id: 'todos', label: 'Todos' },
    { id: 'sobremesa', label: 'Sobremesas' },
    { id: 'almoco', label: 'Almoço/Jantar' },
    { id: 'lanche', label: 'Lanches' },
    { id: 'cafe', label: 'Café da Manhã' },
];

export default function ReceitasLista({ navigation }) {
    const [searchText, setSearchText] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    
    // Estado da Categoria Selecionada
    const [selectedCategory, setSelectedCategory] = useState('todos');

    // --- FUNÇÃO DE BUSCA CORRIGIDA ---
    async function fetchRecipes(textQuery = '', category = 'todos') {
        setLoading(true);
        try {
            // CORREÇÃO CRÍTICA:
            // Não enviamos mais frases em inglês aqui. 
            // Se o usuário não digitou nada, mandamos vazio ('').
            // O seu Backend vai detectar o vazio e aplicar o filtro de segurança automaticamente.
            const term = textQuery ? textQuery : ''; 
            
            const response = await api.get('/recipes', {
                params: { 
                    query: term,
                    type: category // Envia a categoria (ex: 'sobremesa')
                } 
            });
            setRecipes(response.data);
        } catch (error) {
            console.error("Erro ao buscar receitas:", error);
            Alert.alert("Erro", "Não foi possível carregar as receitas.");
        } finally {
            setLoading(false);
        }
    }

    // Busca inicial ao abrir a tela
    useEffect(() => {
        fetchRecipes('', 'todos'); 
    }, []);

    // Handler: Clicou numa categoria (Chip)
    const handleCategorySelect = (categoryId) => {
        setSelectedCategory(categoryId);
        setSearchText(''); // Limpa a busca de texto para focar na categoria
        fetchRecipes('', categoryId);
    };

    // Handler: Digitou e deu Enter
    const handleTextSearch = () => {
        // Mantém a categoria selecionada e adiciona o texto
        fetchRecipes(searchText, selectedCategory);
    };

    // Renderização de cada Card
    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Image 
                source={{ uri: item.image }} 
                style={styles.cardImage} 
                resizeMode="cover" 
            />
            
            <View style={styles.textContainer}>
                <Text style={styles.cardTitle} numberOfLines={2}>
                    {item.title}
                </Text>
                
                {/* Badge Visual de Segurança */}
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 4}}>
                    <FontAwesome name="check-circle" size={12} color="#46A376" />
                    <Text style={{color: '#46A376', fontSize: 12, marginLeft: 4, fontWeight: 'bold'}}>
                        Baixo Índice Glicêmico
                    </Text>
                </View>
            </View>

            <TouchableOpacity 
                style={styles.arrowButton}
                onPress={() => navigation.navigate('ReceitaDetalhe', { recipeId: item.id })}
            >
                <FontAwesome name="share" size={16} color="#fff" />
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            
            {/* Barra de Pesquisa (Texto) */}
            <View style={styles.searchContainer}>
                <FontAwesome name="search" size={18} color="#999" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar ingrediente (ex: Morango)..."
                    value={searchText}
                    onChangeText={setSearchText}
                    onSubmitEditing={handleTextSearch}
                    returnKeyType="search"
                />
            </View>

            {/* Filtros de Categoria (Carrossel Horizontal) */}
            <View>
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false} 
                    contentContainerStyle={styles.filterContainer} // Usa o estilo que definimos no arquivo .style.js
                >
                    {CATEGORIAS.map((cat) => (
                        <TouchableOpacity
                            key={cat.id}
                            style={[
                                styles.filterChip,
                                // Estilo condicional: Se estiver selecionado, muda a cor
                                selectedCategory === cat.id && styles.filterChipSelected
                            ]}
                            onPress={() => handleCategorySelect(cat.id)}
                        >
                            <Text style={[
                                styles.filterText,
                                selectedCategory === cat.id && styles.filterTextSelected
                            ]}>
                                {cat.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Lista de Resultados */}
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#fff" />
                    <Text style={{color: '#fff', marginTop: 10}}>Buscando receitas...</Text>
                </View>
            ) : (
                <FlatList
                    data={recipes}
                    // CORREÇÃO DE CHAVE: Usa ID + Index para garantir que não repita
                    keyExtractor={(item, index) => `${item.id}-${index}`}
                    renderItem={renderItem}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>
                            Nenhuma receita encontrada nesta categoria.
                        </Text>
                    }
                />
            )}
        </SafeAreaView>
    );
}