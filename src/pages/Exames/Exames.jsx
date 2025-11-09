// Em: src/pages/Exames/Exames.jsx (COMPLETO com Correção do 'isImagePreview')

import React, { useState, useEffect, useCallback } from 'react';
import { 
    View, Text, TouchableOpacity, FlatList, 
    Alert, ActivityIndicator, Modal, Image, Pressable 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './exames.style';
import api, { S3_BUCKET_NAME, S3_REGION } from '../../services/api'; 
import { useFocusEffect, useIsFocused } from '@react-navigation/native'; 
import { FontAwesome } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
// Importa a API legacy (correta)
import { downloadAsync, documentDirectory } from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';

// (Função getS3FileUrl - Sem mudanças)
const getS3FileUrl = (fileKey) => {
    return `https://${S3_BUCKET_NAME}.s3.${S3_REGION}.amazonaws.com/${fileKey}`;
};

// (Componente ExamItem - Sem mudanças)
const ExamItem = ({ item, onPress }) => {
    const examDate = new Date(item.examDate).toLocaleDateString('pt-BR', {
        day: '2-digit', month: 'long', year: 'numeric'
    });

    return (
        <TouchableOpacity style={styles.itemContainer} onPress={() => onPress(item)}>
            <View style={styles.itemIcon}>
                <FontAwesome name="file-text-o" size={24} color="#46A376" />
            </View>
            <View style={styles.itemContent}>
                <Text style={styles.itemTitle}>{item.examName}</Text>
                <Text style={styles.itemSubtitle}>{item.examType} - {examDate}</Text>
            </View>
            <FontAwesome name="chevron-right" size={16} color="#BDBDBD" />
        </TouchableOpacity>
    );
};


// --- Componente Principal da Tela ---
export default function Exames({ navigation }) {
    const [isLoading, setIsLoading] = useState(true);
    const [isDownloading, setIsDownloading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false); 
    const [exams, setExams] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedExam, setSelectedExam] = useState(null);
    const isFocused = useIsFocused(); 

    // (fetchExams - Sem mudanças)
    const fetchExams = async () => {
        setIsLoading(true);
        try {
            const response = await api.get('/users/exams');
            setExams(response.data);
        } catch (error) {
            console.error("Erro ao buscar exames:", error);
            Alert.alert("Erro", "Não foi possível carregar seus exames.");
        } finally {
            setIsLoading(false);
        }
    };
    useFocusEffect(useCallback(() => { fetchExams(); }, []));

    // (handleExamPress, handlePreview, handleShare - Sem mudanças)
    const handleExamPress = (exam) => {
        setSelectedExam(exam);
        setModalVisible(true);
    };
    const handlePreview = async () => {
        if (!selectedExam) return;
        const url = getS3FileUrl(selectedExam.fileKey);
        await WebBrowser.openBrowserAsync(url);
    };
    const handleShare = async () => {
        if (!selectedExam || isDownloading) return; 
        setIsDownloading(true);
        const url = getS3FileUrl(selectedExam.fileKey);
        const fileUri = documentDirectory + selectedExam.fileKey;

        try {
            const { uri } = await downloadAsync(url, fileUri);
            await Sharing.shareAsync(uri);
        } catch (error) {
            console.error("Erro ao compartilhar:", error);
            Alert.alert("Erro", "Não foi possível compartilhar o arquivo.");
        } finally {
            setIsDownloading(false);
        }
    };

    // (handleDelete - Sem mudanças)
    const handleDelete = () => {
        if (!selectedExam || isDeleting) return;
        Alert.alert(
            "Deletar Exame",
            `Tem certeza que deseja deletar "${selectedExam.examName}"?`,
            [
                { text: "Cancelar", style: "cancel" },
                { 
                    text: "Deletar", 
                    style: "destructive", 
                    onPress: async () => {
                        setIsDeleting(true);
                        try {
                            await api.delete(`/users/exams/${selectedExam.id}`);
                            setModalVisible(false);
                            Alert.alert("Sucesso", "Exame deletado.");
                            setExams(prevExams => 
                                prevExams.filter(exam => exam.id !== selectedExam.id)
                            );
                        } catch (error) {
                            console.error("Erro ao deletar:", error);
                            Alert.alert("Erro", "Não foi possível deletar o exame.");
                        } finally {
                            setIsDeleting(false);
                        }
                    }
                }
            ]
        );
    };

    // --- A LINHA CORRIGIDA ESTÁ AQUI ---
    const isImagePreview = selectedExam?.fileKey && 
                           (selectedExam.fileKey.endsWith('.jpg') || 
                            selectedExam.fileKey.endsWith('.png') || 
                            selectedExam.fileKey.endsWith('.jpeg'));

    // (isLoading check - Sem mudanças)
    if (isLoading && !isFocused) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <FontAwesome name="chevron-left" size={24} color="#46A376" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Meus Exames</Text>
                    <View style={{ width: 24 }} /> 
                </View>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#46A376" />
                </View>
            </SafeAreaView>
        );
     }

    // --- JSX (Renderização) ---
    return (
        <SafeAreaView style={styles.container}>
            {/* (Header, FlatList, FloatingButton - Sem mudanças) */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <FontAwesome name="chevron-left" size={24} color="#46A376" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Meus Exames</Text>
                <View style={{ width: 24 }} /> 
            </View>

            <FlatList
                data={exams}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <ExamItem item={item} onPress={handleExamPress} />}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>Nenhum exame registrado.</Text>
                        <Text style={styles.emptySubtitle}>Clique no '+' para adicionar seu primeiro exame.</Text>
                    </View>
                }
                onRefresh={fetchExams}
                refreshing={isLoading}
            />

            <TouchableOpacity 
                style={styles.floatingButton}
                onPress={() => navigation.navigate('UploadExame')}
            >
                <FontAwesome name="plus" size={24} color="#FFF" />
            </TouchableOpacity>

            {/* --- O MODAL DE VISUALIZAÇÃO --- */}
            {selectedExam && (
                <Modal
                    transparent={true}
                    animationType="fade"
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <Pressable style={styles.modalBackdrop} onPress={() => setModalVisible(false)}>
                        <Pressable style={styles.modalContainer} onPress={() => {}}>
                            
                            {/* (Preview da Imagem/PDF) */}
                            <View style={styles.previewContainer}>
                                {isImagePreview ? (
                                    <Image source={{ uri: getS3FileUrl(selectedExam.fileKey) }} style={styles.previewImage} resizeMode="contain" />
                                ) : (
                                    <FontAwesome name="file-pdf-o" size={100} color="#DB4437" />
                                )}
                            </View>

                            <Text style={styles.modalTitle}>{selectedExam.examName}</Text>
                            
                            {/* Botão "Visualizar" */}
                            <TouchableOpacity style={styles.modalButton} onPress={handlePreview}>
                                <Text style={styles.modalButtonText}>Visualizar Arquivo</Text>
                            </TouchableOpacity>

                            {/* Botão "Compartilhar/Baixar" */}
                            <TouchableOpacity 
                                style={[styles.modalButton, {backgroundColor: '#6c757d'}]} 
                                onPress={handleShare}
                                disabled={isDownloading}
                            >
                                <Text style={styles.modalButtonText}>
                                    {isDownloading ? "Baixando..." : "Compartilhar / Baixar"}
                                </Text>
                            </TouchableOpacity>

                            {/* NOVO BOTÃO "DELETAR" */}
                            <TouchableOpacity 
                                style={[styles.modalButton, {backgroundColor: '#DC3545', marginTop: 10}]} // Vermelho
                                onPress={handleDelete}
                                disabled={isDeleting}
                            >
                                <Text style={styles.modalButtonText}>
                                    {isDeleting ? "Deletando..." : "Deletar Exame"}
                                </Text>
                            </TouchableOpacity>
                            
                        </Pressable>
                    </Pressable>
                </Modal>
            )}
            
        </SafeAreaView>
    );
}