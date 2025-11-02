// Arquivo: UserProfile.jsx (COMPLETO com Modal de Senha)

import React, { useState, useEffect } from "react";
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    Alert, 
    ActivityIndicator,
    StyleSheet,
    Dimensions,
    Modal, // Importado para o popup
    Pressable // Importado para o popup
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"; 
import { styles } from "./usuario.style.js"; // Seus estilos RESPONSIVOS
import { FontAwesome } from "@expo/vector-icons";
import api from "../../services/api";
import { Picker } from '@react-native-picker/picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// Reutiliza seus componentes
import TextBox from "../../components/textbox/textbox.jsx"; 
import Button from "../../components/button/button.jsx"; 

export default function UserProfile({ navigation }) {
    
    const { width } = Dimensions.get("window");

    // --- Estados ---
    const [isEditing, setIsEditing] = useState(false);
    const [nome, setNome] = useState("");
    const [diabetes, setDiabetes] = useState("");
    const [idade, setIdade] = useState("");
    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(true); 
    const [originalData, setOriginalData] = useState(null); 

    // --- Estados para o Modal de Senha ---
    const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
    const [currentPasswordInput, setCurrentPasswordInput] = useState("");
    const [payloadToSave, setPayloadToSave] = useState({}); 

    // --- Carregar Dados (useEffect) ---
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await api.get('/users/me'); 
                const user = response.data;
                setNome(user.name || "");
                setEmail(user.email || "");
                setTelefone(user.phone || "");
                setIdade(user.age ? String(user.age) : "");
                setDiabetes(user.diabetesType || ""); 
                setOriginalData(user); 
            } catch (error) {
                console.error("Erro ao carregar dados do usuário:", error);
                Alert.alert("Erro", "Não foi possível carregar seus dados.");
            } finally {
                setIsLoading(false); 
            }
        };
        fetchUserData();
    }, []); 

    // --- Função 'handleSave' (Abre o Modal) ---
    const handleSave = async () => {
        if (!originalData) {
            Alert.alert("Erro", "Os dados originais não foram carregados.");
            return;
        }
        
        const payload = {};
        if (nome !== (originalData.name || "")) payload.name = nome;
        if (parseInt(idade || 0) !== (originalData.age || 0)) payload.age = parseInt(idade || 0);
        if (telefone !== (originalData.phone || "")) payload.phone = telefone;
        if (email !== (originalData.email || "")) payload.email = email;
        if (diabetes !== (originalData.diabetesType || "")) payload.diabetesType = diabetes;

        if (Object.keys(payload).length === 0) {
            Alert.alert("Nada para salvar", "Nenhum campo foi alterado.");
            setIsEditing(false); 
            return;
        }

        // Salva o payload e abre o modal
        setPayloadToSave(payload);
        setCurrentPasswordInput(""); // Limpa o campo de senha
        setIsPasswordModalVisible(true); // ABRE O POPUP
    };

    // --- Função 'handleConfirmSave' (Chamada pelo Modal) ---
    const handleConfirmSave = async () => {
        if (!currentPasswordInput) {
            Alert.alert("Erro", "Por favor, digite sua senha atual.");
            return;
        }

        const finalPayload = {
            ...payloadToSave,
            currentPassword: currentPasswordInput 
        };

        try {
            const response = await api.patch('/users/me', finalPayload);
            
            Alert.alert("Sucesso!", "Seus dados foram salvos ✅");
            setOriginalData(response.data); // Atualiza os dados originais
            setIsEditing(false); // Sai do modo de edição
            setIsPasswordModalVisible(false); // Fecha o popup

        } catch (error) {
            // Se a senha estiver errada, o backend vai avisar
            const errorMessage = error.response?.data?.error || "Não foi possível salvar.";
            Alert.alert("Erro ao Salvar", errorMessage);
        }
    };

    // --- Função 'handleToggleEdit' (Para Cancelar) ---
    const handleToggleEdit = () => {
        if (isEditing) {
            // Se o usuário está CANCELANDO (clicando no 'X')
            // Reverta todos os estados para os dados originais
            if (originalData) {
                setNome(originalData.name || "");
                setEmail(originalData.email || "");
                setTelefone(originalData.phone || "");
                setIdade(originalData.age ? String(originalData.age) : "");
                setDiabetes(originalData.diabetesType || "");
            }
            setIsEditing(false); // Sai do modo de edição
        } else {
            // Se o usuário está LIGANDO o modo de edição (clicando no 'lápis')
            setIsEditing(true);
        }
    };

    // --- Tela de Carregamento (isLoading) ---
    if (isLoading) {
        return (
            <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#46A376' }]}>
                <ActivityIndicator size="large" color="#fff" />
                <Text style={{ color: '#fff', marginTop: 10 }}>Carregando perfil...</Text>
            </SafeAreaView>
        );
    }

    // --- Tela Principal (JSX) ---
    return (
        <SafeAreaView style={styles.container}>
            
            {/* Cabeçalho */}
            <View style={styles.header}>
              <View style={styles.profileContainer}>
                <View style={styles.avatarPlaceholder}>
                    <FontAwesome name="user" size={width * 0.08} color="#ccc" />
                </View>
                <View style={styles.nameContainer}>
                    <Text style={styles.userName}>{isEditing ? nome : (originalData?.name || nome)}</Text> 
                    <TouchableOpacity onPress={handleToggleEdit}> 
                        <FontAwesome 
                            name={isEditing ? "times" : "edit"} 
                            size={isEditing ? 22 : 18} 
                            color="#fff" 
                            style={styles.editIcon} 
                        />
                    </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Scroll Automático */}
            <KeyboardAwareScrollView 
                style={styles.scrollContainer} 
                contentContainerStyle={styles.infoContainer}
                keyboardShouldPersistTaps="handled"
                enableOnAndroid={true}
                extraScrollHeight={75} 
                showsVerticalScrollIndicator={false}
            >
                
                {/* --- CAMPO NOME --- */}
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Nome</Text>
                    <TextInput
                        style={[styles.input, !isEditing && localStyles.disabledInput]}
                        placeholder="Nome"
                        placeholderTextColor="#666"
                        value={nome}
                        onChangeText={setNome}
                        editable={isEditing} 
                    />
                </View>

                {/* --- CAMPO DIABETES (PICKER) --- */}
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Diabetes</Text>
                    <View style={[
                        styles.pickerContainer, 
                        !isEditing && localStyles.disabledInput
                    ]}> 
                        <Picker
                            selectedValue={diabetes}
                            onValueChange={(itemValue) => setDiabetes(itemValue)} // Corrigido
                            style={{ width: '100%', color: isEditing ? '#333' : '#999' }}
                            dropdownIconColor={isEditing ? "#333" : "#999"}
                            enabled={isEditing} 
                        >
                            <Picker.Item label="Diabetes tipo:" value="" style={{color: '#666'}} />
                            <Picker.Item label="Diabetes tipo: 1" value="TIPO_1" />
                            <Picker.Item label="Diabetes tipo: 2" value="TIPO_2" />
                            <Picker.Item label="Gestacional" value="GESTACIONAL" /> 
                            <Picker.Item label="Não se aplica" value="NAO_SE_APLICA" />
                        </Picker>
                    </View>
                </View>

                {/* --- CAMPO IDADE --- */}
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Idade</Text>
                    <TextInput
                        style={[styles.input, !isEditing && localStyles.disabledInput]}
                        placeholder="Idade"
                        placeholderTextColor="#666"
                        keyboardType="numeric"
                        value={idade}
                        onChangeText={setIdade}
                        editable={isEditing}
                    />
                </View>

                {/* --- CAMPO TELEFONE --- */}
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Telefone</Text>
                    <TextInput
                        style={[styles.input, !isEditing && localStyles.disabledInput]}
                        placeholder="Telefone"
                        placeholderTextColor="#666"
                        keyboardType="phone-pad"
                        value={telefone}
                        onChangeText={setTelefone}
                        editable={isEditing}
                    />
                </View>
                
                {/* --- CAMPO EMAIL --- */}
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={[styles.input, !isEditing && localStyles.disabledInput]}
                        placeholder="Email"
                        placeholderTextColor="#666"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                        editable={isEditing}
                    />
                </View>

                {/* --- BOTÃO SALVAR (SÓ APARECE EM MODO DE EDIÇÃO) --- */}
                {isEditing && (
                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Text style={styles.saveButtonText}>Salvar Alterações</Text>
                    </TouchableOpacity>
                )}

                {/* --- BOTÃO ALTERAR SENHA (NOVO) --- */}
                <TouchableOpacity 
                    style={[styles.saveButton, localStyles.passwordButton]} 
                    onPress={() => navigation.navigate('MudarSenha')}
                >
                    <Text style={styles.saveButtonText}>Alterar Senha</Text>
                </TouchableOpacity>
                
            </KeyboardAwareScrollView> 

            {/* --- O "POPUPZINHO BONITO" (MODAL) --- */}
            <Modal
                transparent={true}
                animationType="fade"
                visible={isPasswordModalVisible}
                onRequestClose={() => setIsPasswordModalVisible(false)}
            >
                {/* O Fundo escuro clicável */}
                <Pressable 
                    style={localStyles.modalBackdrop} 
                    onPress={() => setIsPasswordModalVisible(false)}
                >
                    {/* O Container do popup (para o teclado não cobrir) */}
                    <KeyboardAwareScrollView
                        contentContainerStyle={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
                        keyboardShouldPersistTaps="handled"
                    >
                        {/* A caixa branca do popup (use 'onPress' para evitar fechar) */}
                        <Pressable style={localStyles.modalContainer} onPress={() => {}}>
                            <Text style={localStyles.modalTitle}>Confirmação Necessária</Text>
                            <Text style={localStyles.modalSubtitle}>
                                Para salvar suas alterações, digite sua senha atual.
                            </Text>
                            
                            {/* Reutilizamos seu componente TextBox! */}
                            <TextBox 
                                label="" // Sem label em cima
                                value={currentPasswordInput}
                                onChangeText={setCurrentPasswordInput}
                                isPassword={true}
                                // Estilos para o input dentro do modal
                                inputStyle={{ backgroundColor: '#F0F0F0', borderColor: '#DDD' }} 
                                textInputStyle={{ color: '#000' }} 
                                placeholder="Digite sua senha aqui..."
                                placeholderColor="#888"
                            />

                            {/* Botões do Modal */}
                            <View style={localStyles.modalButtonContainer}>
                                <Button
                                    texto="Cancelar"
                                    onPress={() => setIsPasswordModalVisible(false)}
                                    buttonStyle={{backgroundColor: '#6c757d', width: '48%'}} // Botão cinza
                                />
                                <Button
                                    texto="Confirmar"
                                    onPress={handleConfirmSave} // Chama a função que salva
                                    buttonStyle={{backgroundColor: '#2E7D5A', width: '48%'}} // Botão verde
                                />
                            </View>
                        </Pressable>
                    </KeyboardAwareScrollView>
                </Pressable>
            </Modal>
            {/* --- FIM DO MODAL --- */}

        </SafeAreaView>
    );
}

// Estilos locais (para o Modal e campos desabilitados)
// (Precisa do StyleSheet importado)
const localStyles = StyleSheet.create({
    disabledInput: {
        backgroundColor: '#F0F0F0', // Fundo cinza quando desabilitado
        color: '#999',
    },
    passwordButton: {
        backgroundColor: '#6c757d', // Cor cinza para o botão de senha
        marginTop: 10,
    },

    // --- ESTILOS DO NOVO MODAL ---
    modalBackdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo escuro
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContainer: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 20,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 8,
    },
    modalSubtitle: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    }
});