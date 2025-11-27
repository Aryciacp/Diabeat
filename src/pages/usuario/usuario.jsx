import React, { useState, useEffect } from "react";
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    ActivityIndicator,
    StyleSheet,
    Dimensions,
    Modal, 
    Pressable,
    Image,
    Platform,
    Linking,
    Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"; 
import { styles } from "./usuario.style.js"; 
import { FontAwesome } from "@expo/vector-icons";
import api from "../../services/api"; 
import { Picker } from '@react-native-picker/picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TextBox from "../../components/textbox/textbox.jsx"; 
import Button from "../../components/button/button.jsx"; 
import * as ImagePicker from 'expo-image-picker'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import do Alerta Customizado
import CustomAlert from "../../components/customAlert/CustomAlert.jsx";

const { width } = Dimensions.get("window");

// URL DO BACKEND (IMPORTANTE PARA O FETCH)
const BASE_URL = "https://diabeat-api.onrender.com";

export default function UserProfile({ navigation }) {
    
    // --- Estados ---
    const [isEditing, setIsEditing] = useState(false);
    const [nome, setNome] = useState("");
    const [diabetes, setDiabetes] = useState("");
    const [idade, setIdade] = useState("");
    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState(null); 
    const [isLoading, setIsLoading] = useState(true); 
    const [originalData, setOriginalData] = useState(null); 

    // --- Controle ---
    const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
    const [currentPasswordInput, setCurrentPasswordInput] = useState("");
    const [payloadToSave, setPayloadToSave] = useState({}); 
    const [isDeleteFlow, setIsDeleteFlow] = useState(false);

    const [alertVisible, setAlertVisible] = useState(false);
    const [alertConfig, setAlertConfig] = useState({ title: "", message: "", type: "info" });

    const showAlert = (title, message, type = "info", showCancel = false, onConfirm = null, confirmText = "OK") => {
        setAlertConfig({ title, message, type, showCancel, onConfirm, confirmText });
        setAlertVisible(true);
    };

    // --- 1. Carregar Dados ---
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
                setAvatar(user.avatar || null);

                setOriginalData(user); 
            } catch (error) {
                showAlert("Erro", "Não foi possível carregar seus dados.", "error");
            } finally {
                setIsLoading(false); 
            }
        };
        fetchUserData();
    }, []); 

    // --- 2. Logout ---
    const handleLogout = async () => {
        showAlert(
            "Sair",
            "Deseja realmente sair da sua conta?",
            "info",
            true, 
            async () => {
                await AsyncStorage.removeItem('@diabeat:token'); 
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }], 
                });
            },
            "Sair"
        );
    };

    // --- 3. Escolher Foto (CORRIGIDO) ---
    const handlePickImage = async () => {
        const { status, canAskAgain } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            if (!canAskAgain) {
                Alert.alert(
                    "Permissão Necessária",
                    "O acesso à galeria está bloqueado. Vá nas configurações e permita o acesso.",
                    [
                        { text: "Cancelar", style: "cancel" },
                        { text: "Abrir Configurações", onPress: () => Linking.openSettings() }
                    ]
                );
            } else {
                showAlert("Permissão Negada", "Precisamos de acesso à galeria.", "error");
            }
            return;
        }

        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                // Usa a versão compatível com seu projeto (evita crash)
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                
                // Tenta ativar edição com corte quadrado
                allowsEditing: true, 
                aspect: [1, 1], 
                
                quality: 0.8,
            });

            if (!result.canceled) {
                setAvatar(result.assets[0].uri);
                setIsEditing(true); // Já entra em modo de edição
            }
        } catch (error) {
            // Fallback se o editor falhar
            Alert.alert("Erro na Galeria", "Não foi possível abrir o editor de imagens.");
        }
    };

    // --- 4. Salvar (Prepara) ---
    const handleSaveClick = async () => {
        if (!originalData) return;
        
        const payload = {};
        if (nome !== (originalData.name || "")) payload.name = nome;
        if (parseInt(idade || 0) !== (originalData.age || 0)) payload.age = parseInt(idade || 0);
        if (telefone !== (originalData.phone || "")) payload.phone = telefone;
        if (email !== (originalData.email || "")) payload.email = email;
        if (diabetes !== (originalData.diabetesType || "")) payload.diabetesType = diabetes;

        if (avatar !== (originalData.avatar || null)) {
            payload.avatar = avatar; 
        }

        if (Object.keys(payload).length === 0) {
            showAlert("Atenção", "Nenhuma alteração detectada.", "info");
            setIsEditing(false); 
            return;
        }

        setIsDeleteFlow(false); 
        setPayloadToSave(payload);
        setCurrentPasswordInput(""); 
        setIsPasswordModalVisible(true); 
    };

    // --- 5. Deletar ---
    const handleDeleteClick = () => {
        setIsDeleteFlow(true);
        setCurrentPasswordInput("");
        setIsPasswordModalVisible(true);
    }

    // --- 6. ENVIO (CORRIGIDO COM FETCH) ---
    const handleConfirmModal = async () => {
        if (!currentPasswordInput) {
            showAlert("Erro", "Digite sua senha atual.", "error");
            return;
        }

        // Pega token
        const token = await AsyncStorage.getItem('@diabeat:token');

        try {
            if (isDeleteFlow) {
                // Exclusão
                const response = await fetch(`${BASE_URL}/users/delete-account`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({ password: currentPasswordInput })
                });

                const responseData = await response.json();

                if (!response.ok) {
                    throw new Error(responseData.error || "Falha ao solicitar exclusão.");
                }

                setIsPasswordModalVisible(false);
                
                // MANDA PARA A TELA DE EXCLUSÃO
                showAlert(
                    "E-mail Enviado", 
                    "Verifique seu e-mail para confirmar a exclusão.", 
                    "success",
                    false, 
                    () => navigation.navigate('DeletarConta'), 
                    "Inserir Código"
                );

            } else {
                // Atualização (Upload)
                console.log("--- [DEBUG] Iniciando Upload (Fetch) ---");

                const formData = new FormData();
                formData.append('currentPassword', currentPasswordInput);

                if (payloadToSave.name) formData.append('name', String(payloadToSave.name));
                if (payloadToSave.email) formData.append('email', String(payloadToSave.email));
                if (payloadToSave.phone) formData.append('phone', String(payloadToSave.phone));
                if (payloadToSave.age) formData.append('age', String(payloadToSave.age));
                if (payloadToSave.diabetesType) formData.append('diabetesType', String(payloadToSave.diabetesType));

                if (payloadToSave.avatar) {
                    let uri = payloadToSave.avatar;
                    if (Platform.OS === 'android' && !uri.startsWith('file://') && !uri.startsWith('content://')) {
                        uri = 'file://' + uri;
                    }
                    formData.append('avatar', {
                        uri: uri, 
                        name: 'profile.jpg', 
                        type: 'image/jpeg', 
                    });
                }

                const response = await fetch(`${BASE_URL}/users/me`, {
                    method: 'PATCH',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        // Sem Content-Type (FormData)
                    },
                    body: formData
                });

                const responseText = await response.text();
                let responseData;
                try {
                    responseData = JSON.parse(responseText);
                } catch (e) {
                    console.log("HTML Error:", responseText);
                    throw new Error("Erro no servidor. Verifique se as credenciais AWS estão configuradas.");
                }

                if (!response.ok) {
                    throw new Error(responseData.error || "Falha ao atualizar.");
                }
                
                setOriginalData(responseData); 
                setIsEditing(false); 
                setIsPasswordModalVisible(false); 
                showAlert("Sucesso!", "Perfil atualizado!", "success");
            }

        } catch (error) {
            console.log("ERRO:", error);
            const msg = error.message || "Erro de conexão.";
            showAlert("Erro", msg, "error");
        }
    };

    const handleToggleEdit = () => {
        if (isEditing) {
            if (originalData) {
                setNome(originalData.name || "");
                setEmail(originalData.email || "");
                setTelefone(originalData.phone || "");
                setIdade(originalData.age ? String(originalData.age) : "");
                setDiabetes(originalData.diabetesType || "");
                setAvatar(originalData.avatar || null);
            }
            setIsEditing(false); 
        } else {
            setIsEditing(true);
        }
    };

    if (isLoading) {
        return (
            <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#46A376' }]}>
                <ActivityIndicator size="large" color="#fff" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            
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

            <View style={styles.header}>
                <View style={{flex: 1}} /> 
                <TouchableOpacity onPress={handleLogout} style={localStyles.logoutButton}>
                    <FontAwesome name="sign-out" size={20} color="#fff" />
                </TouchableOpacity>
            </View>

            <KeyboardAwareScrollView 
                style={styles.scrollContainer} 
                contentContainerStyle={styles.infoContainer}
                showsVerticalScrollIndicator={false}
            >
                <View style={localStyles.profileCard}>
                    <TouchableOpacity style={localStyles.avatarContainer} onPress={handlePickImage}>
                        {avatar ? (
                            <Image source={{ uri: avatar }} style={localStyles.avatarImage} />
                        ) : (
                            <View style={localStyles.avatarPlaceholder}>
                                <FontAwesome name="user" size={40} color="#ccc" />
                            </View>
                        )}
                        <View style={localStyles.cameraIcon}>
                            <FontAwesome name="camera" size={12} color="#fff" />
                        </View>
                    </TouchableOpacity>

                    <Text style={localStyles.profileName}>{isEditing ? nome : (originalData?.name || nome)}</Text>
                    <Text style={localStyles.profileEmail}>{originalData?.email}</Text>

                    <TouchableOpacity onPress={handleToggleEdit} style={localStyles.editButtonInline}>
                        <FontAwesome name={isEditing ? "times" : "edit"} size={16} color="#46A376" />
                        <Text style={localStyles.editButtonText}>{isEditing ? "Cancelar" : "Editar Dados"}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Nome Completo</Text>
                    <TextInput style={[styles.input, !isEditing && localStyles.disabledInput]} value={nome} onChangeText={setNome} editable={isEditing} />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Diabetes</Text>
                    <View style={[styles.pickerContainer, !isEditing && localStyles.disabledInput]}> 
                        <Picker selectedValue={diabetes} onValueChange={setDiabetes} style={{ width: '100%', color: isEditing ? '#333' : '#999' }} dropdownIconColor={isEditing ? "#333" : "#999"} enabled={isEditing}>
                            <Picker.Item label="Selecione..." value="" />
                            <Picker.Item label="Tipo 1" value="TIPO_1" />
                            <Picker.Item label="Tipo 2" value="TIPO_2" />
                            <Picker.Item label="Gestacional" value="GESTACIONAL" /> 
                            <Picker.Item label="Não se aplica" value="NAO_SE_APLICA" />
                        </Picker>
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={[styles.formGroup, {flex:1, marginRight: 10}]}>
                        <Text style={styles.label}>Idade</Text>
                        <TextInput style={[styles.input, !isEditing && localStyles.disabledInput]} value={idade} onChangeText={setIdade} editable={isEditing} keyboardType="numeric" />
                    </View>
                    <View style={[styles.formGroup, {flex:1}]}>
                        <Text style={styles.label}>Telefone</Text>
                        <TextInput style={[styles.input, !isEditing && localStyles.disabledInput]} value={telefone} onChangeText={setTelefone} editable={isEditing} keyboardType="phone-pad" />
                    </View>
                </View>
                
                {isEditing && (
                    <TouchableOpacity style={styles.saveButton} onPress={handleSaveClick}>
                        <Text style={styles.saveButtonText}>Salvar Alterações</Text>
                    </TouchableOpacity>
                )}

                <TouchableOpacity style={[styles.saveButton, localStyles.passwordButton]} onPress={() => navigation.navigate('MudarSenha')}>
                    <Text style={styles.saveButtonText}>Alterar Senha</Text>
                </TouchableOpacity>

                <TouchableOpacity style={localStyles.deleteLink} onPress={handleDeleteClick}>
                    <Text style={localStyles.deleteLinkText}>Excluir minha conta</Text>
                </TouchableOpacity>
                
            </KeyboardAwareScrollView> 

            <Modal transparent={true} animationType="fade" visible={isPasswordModalVisible} onRequestClose={() => setIsPasswordModalVisible(false)}>
                <Pressable style={localStyles.modalBackdrop} onPress={() => setIsPasswordModalVisible(false)}>
                    <Pressable style={localStyles.modalContainer} onPress={() => {}}>
                        <Text style={[localStyles.modalTitle, isDeleteFlow && {color: '#D32F2F'}]}>
                            {isDeleteFlow ? "Excluir Conta?" : "Confirmar"}
                        </Text>
                        <Text style={localStyles.modalSubtitle}>
                            Digite sua senha atual para continuar.
                        </Text>
                        <TextBox 
                            label="" value={currentPasswordInput} onChangeText={setCurrentPasswordInput} isPassword={true}
                            inputStyle={{ backgroundColor: '#F0F0F0', borderColor: '#DDD' }} 
                            textInputStyle={{ color: '#000' }} 
                            placeholder="Senha atual" placeholderColor="#888"
                        />
                        <View style={localStyles.modalButtonContainer}>
                            <Button texto="Cancelar" onPress={() => setIsPasswordModalVisible(false)} buttonStyle={{backgroundColor: '#ccc', width: '48%'}} />
                            <Button 
                                texto={isDeleteFlow ? "Excluir" : "Confirmar"} 
                                onPress={handleConfirmModal} 
                                buttonStyle={{backgroundColor: isDeleteFlow ? '#D32F2F' : '#46A376', width: '48%'}} 
                            />
                        </View>
                    </Pressable>
                </Pressable>
            </Modal>
        </SafeAreaView>
    );
}

const localStyles = StyleSheet.create({
    logoutButton: { padding: 8, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 8 },
    profileCard: { backgroundColor: '#fff', borderRadius: 16, padding: 20, alignItems: 'center', marginBottom: 20, elevation: 4, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 } },
    avatarContainer: { marginBottom: 10, position: 'relative' },
    avatarImage: { width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: '#f0f0f0' },
    avatarPlaceholder: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#F0F0F0', justifyContent: 'center', alignItems: 'center' },
    cameraIcon: { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#46A376', padding: 6, borderRadius: 12, borderWidth: 2, borderColor: '#fff' },
    profileName: { fontSize: 20, fontWeight: 'bold', color: '#333' },
    profileEmail: { fontSize: 14, color: '#666', marginBottom: 10 },
    editButtonInline: { flexDirection: 'row', alignItems: 'center', padding: 8, marginTop: 5, backgroundColor: '#F5F5F5', borderRadius: 20, paddingHorizontal: 15 },
    editButtonText: { color: '#46A376', fontWeight: 'bold', marginLeft: 6, fontSize: 12 },
    disabledInput: { backgroundColor: '#F9F9F9', color: '#888' },
    passwordButton: { backgroundColor: '#555', marginTop: 10 },
    deleteLink: { marginTop: 30, marginBottom: 20, alignItems: 'center' },
    deleteLinkText: { color: '#D32F2F', fontSize: 14, textDecorationLine: 'underline' },
    modalBackdrop: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center', padding: 20 },
    modalContainer: { width: '100%', backgroundColor: '#FFFFFF', borderRadius: 15, padding: 20, elevation: 10 },
    modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', textAlign: 'center', marginBottom: 8 },
    modalSubtitle: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 20 },
    modalButtonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }
});