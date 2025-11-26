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

    Modal,

    Pressable

} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { styles } from "./usuario.style.js";

import { FontAwesome } from "@expo/vector-icons";

import api from "../../services/api";

import { Picker } from '@react-native-picker/picker';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import TextBox from "../../components/textbox/textbox.jsx";

import Button from "../../components/button/button.jsx";



export default function UserProfile({ navigation }) {

   

    const { width } = Dimensions.get("window");



    // --- Estados de Dados ---

    const [isEditing, setIsEditing] = useState(false);

    const [nome, setNome] = useState("");

    const [diabetes, setDiabetes] = useState("");

    const [idade, setIdade] = useState("");

    const [telefone, setTelefone] = useState("");

    const [email, setEmail] = useState("");

    const [isLoading, setIsLoading] = useState(true);

    const [originalData, setOriginalData] = useState(null);



    // --- Estados do Modal ---

    const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);

    const [currentPasswordInput, setCurrentPasswordInput] = useState("");

    const [payloadToSave, setPayloadToSave] = useState({});

    const [isDeleteFlow, setIsDeleteFlow] = useState(false);



    // --- Carregar Dados ---

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

                console.error("Erro ao carregar:", error);

                Alert.alert("Erro", "Não foi possível carregar seus dados.");

            } finally {

                setIsLoading(false);

            }

        };

        fetchUserData();

    }, []);



    // --- 1. Lógica de SALVAR (Abre Modal) ---

    const handleSaveClick = async () => {

        if (!originalData) {

            Alert.alert("Erro", "Dados originais não carregados.");

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



        setIsDeleteFlow(false);

        setPayloadToSave(payload);

        setCurrentPasswordInput("");

        setIsPasswordModalVisible(true);

    };



    // --- 2. Lógica de DELETAR (Abre Modal) ---

    const handleDeleteClick = () => {

        setIsDeleteFlow(true);

        setCurrentPasswordInput("");

        setIsPasswordModalVisible(true);

    }



    // --- 3. CONFIRMAÇÃO DO MODAL (COM DEBUG ADICIONADO) ---

    const handleConfirmModal = async () => {

        if (!currentPasswordInput) {

            Alert.alert("Erro", "Por favor, digite sua senha atual.");

            return;

        }



        try {

            // DEBUG: Mostra o que estamos enviando

            const finalPayload = { ...payloadToSave, currentPassword: currentPasswordInput };

            console.log("--- [DEBUG] Enviando Payload: ---", JSON.stringify(finalPayload, null, 2));



            if (isDeleteFlow) {

                // === FLUXO DE EXCLUSÃO ===

                console.log("--- [DEBUG] Iniciando Exclusão ---");

                await api.post('/users/request-deletion', { password: currentPasswordInput });

               

                setIsPasswordModalVisible(false);

                Alert.alert("E-mail Enviado", "Verifique seu e-mail para confirmar a exclusão definitiva da conta.");

            } else {

                // === FLUXO DE SALVAR ===

                console.log("--- [DEBUG] Iniciando Atualização (PATCH) ---");

                const response = await api.patch('/users/me', finalPayload);

               

                console.log("--- [DEBUG] Sucesso! Resposta do Backend: ---", response.data);

               

                Alert.alert("Sucesso!", "Seus dados foram salvos ✅");

                setOriginalData(response.data);

                setIsEditing(false);

                setIsPasswordModalVisible(false);

            }



        } catch (error) {

            // --- DEBUG DE ERRO ---

            console.log("--- [DEBUG] ERRO DETALHADO ---");

            if (error.response) {

                console.log("STATUS:", error.response.status);

                console.log("DATA:", error.response.data);

            } else if (error.request) {

                console.log("ERRO DE REDE (Sem resposta):", error.request);

            } else {

                console.log("ERRO GERAL:", error.message);

            }



            const errorMessage = error.response?.data?.error || "Erro na operação. Olhe o terminal.";

            Alert.alert("Erro", errorMessage);

        }

    };



    // --- Função para Cancelar Edição ---

    const handleToggleEdit = () => {

        if (isEditing) {

            if (originalData) {

                setNome(originalData.name || "");

                setEmail(originalData.email || "");

                setTelefone(originalData.phone || "");

                setIdade(originalData.age ? String(originalData.age) : "");

                setDiabetes(originalData.diabetesType || "");

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

                <Text style={{ color: '#fff', marginTop: 10 }}>Carregando perfil...</Text>

            </SafeAreaView>

        );

    }



    return (

        <SafeAreaView style={styles.container}>

            <View style={styles.header}>

              <View style={styles.profileContainer}>

                <View style={styles.avatarPlaceholder}>

                    <FontAwesome name="user" size={width * 0.08} color="#ccc" />

                </View>

                <View style={styles.nameContainer}>

                    <Text style={styles.userName}>{isEditing ? nome : (originalData?.name || nome)}</Text>

                    <TouchableOpacity onPress={handleToggleEdit}>

                        <FontAwesome name={isEditing ? "times" : "edit"} size={22} color="#fff" style={styles.editIcon} />

                    </TouchableOpacity>

                </View>

              </View>

            </View>



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

                    <TextInput style={[styles.input, !isEditing && localStyles.disabledInput]} value={nome} onChangeText={setNome} editable={isEditing} placeholder="Nome" placeholderTextColor="#666" />

                </View>



                {/* --- CAMPO DIABETES --- */}

                <View style={styles.formGroup}>

                    <Text style={styles.label}>Diabetes</Text>

                    <View style={[styles.pickerContainer, !isEditing && localStyles.disabledInput]}>

                        <Picker selectedValue={diabetes} onValueChange={setDiabetes} style={{ width: '100%', color: isEditing ? '#333' : '#999' }} dropdownIconColor={isEditing ? "#333" : "#999"} enabled={isEditing}>

                            <Picker.Item label="Diabetes tipo:" value="" style={{color: '#666'}} />

                            <Picker.Item label="Diabetes tipo 1" value="TIPO_1" />

                            <Picker.Item label="Diabetes tipo 2" value="TIPO_2" />

                            <Picker.Item label="Gestacional" value="GESTACIONAL" />

                            <Picker.Item label="Não se aplica" value="NAO_SE_APLICA" />

                        </Picker>

                    </View>

                </View>



                {/* --- CAMPO IDADE --- */}

                <View style={styles.formGroup}>

                    <Text style={styles.label}>Idade</Text>

                    <TextInput style={[styles.input, !isEditing && localStyles.disabledInput]} value={idade} onChangeText={setIdade} editable={isEditing} keyboardType="numeric" placeholder="Idade" placeholderTextColor="#666" />

                </View>



                {/* --- CAMPO TELEFONE --- */}

                <View style={styles.formGroup}>

                    <Text style={styles.label}>Telefone</Text>

                    <TextInput style={[styles.input, !isEditing && localStyles.disabledInput]} value={telefone} onChangeText={setTelefone} editable={isEditing} keyboardType="phone-pad" placeholder="Telefone" placeholderTextColor="#666" />

                </View>

               

                {/* --- CAMPO EMAIL --- */}

                <View style={styles.formGroup}>

                    <Text style={styles.label}>Email</Text>

                    <TextInput style={[styles.input, !isEditing && localStyles.disabledInput]} value={email} onChangeText={setEmail} editable={isEditing} keyboardType="email-address" placeholder="Email" placeholderTextColor="#666" />

                </View>



                {/* --- BOTÃO SALVAR --- */}

                {isEditing && (

                    <TouchableOpacity style={styles.saveButton} onPress={handleSaveClick}>

                        <Text style={styles.saveButtonText}>Salvar Alterações</Text>

                    </TouchableOpacity>

                )}



                {/* --- BOTÃO ALTERAR SENHA --- */}

                <TouchableOpacity style={[styles.saveButton, localStyles.passwordButton]} onPress={() => navigation.navigate('MudarSenha')}>

                    <Text style={styles.saveButtonText}>Alterar Senha</Text>

                </TouchableOpacity>



                {/* --- BOTÃO EXCLUIR CONTA --- */}

                <TouchableOpacity style={[styles.saveButton, localStyles.deleteButton]} onPress={handleDeleteClick}>

                    <Text style={localStyles.deleteButtonText}>Excluir Minha Conta</Text>

                </TouchableOpacity>

               

            </KeyboardAwareScrollView>



            {/* --- MODAL --- */}

            <Modal transparent={true} animationType="fade" visible={isPasswordModalVisible} onRequestClose={() => setIsPasswordModalVisible(false)}>

                <Pressable style={localStyles.modalBackdrop} onPress={() => setIsPasswordModalVisible(false)}>

                    <KeyboardAwareScrollView contentContainerStyle={{flex: 1, justifyContent: 'center', alignItems: 'center'}} keyboardShouldPersistTaps="handled">

                        <Pressable style={localStyles.modalContainer} onPress={() => {}}>

                            <Text style={[localStyles.modalTitle, isDeleteFlow && {color: '#D32F2F'}]}>

                                {isDeleteFlow ? "Excluir Conta?" : "Confirmação Necessária"}

                            </Text>

                            <Text style={localStyles.modalSubtitle}>

                                {isDeleteFlow ? "Para sua segurança, digite sua senha para solicitar a exclusão definitiva." : "Para salvar suas alterações, digite sua senha atual."}

                            </Text>

                           

                            <TextBox

                                label="" value={currentPasswordInput} onChangeText={setCurrentPasswordInput} isPassword={true}

                                inputStyle={{ backgroundColor: '#F0F0F0', borderColor: '#DDD' }}

                                textInputStyle={{ color: '#000' }}

                                placeholder="Digite sua senha aqui..." placeholderColor="#888"

                            />



                            <View style={localStyles.modalButtonContainer}>

                                <Button texto="Cancelar" onPress={() => setIsPasswordModalVisible(false)} buttonStyle={{backgroundColor: '#6c757d', width: '48%'}} />

                                <Button

                                    texto={isDeleteFlow ? "Excluir" : "Confirmar"}

                                    onPress={handleConfirmModal}

                                    buttonStyle={{backgroundColor: isDeleteFlow ? '#D32F2F' : '#2E7D5A', width: '48%'}}

                                />

                            </View>

                        </Pressable>

                    </KeyboardAwareScrollView>

                </Pressable>

            </Modal>



        </SafeAreaView>

    );

}



// Estilos locais

const localStyles = StyleSheet.create({

    disabledInput: { backgroundColor: '#F0F0F0', color: '#999' },

    passwordButton: { backgroundColor: '#6c757d', marginTop: 10 },

    deleteButton: { backgroundColor: '#FFEBEE', borderWidth: 1, borderColor: '#FFCDD2', marginTop: 30, marginBottom: 20 },

    deleteButtonText: { color: '#D32F2F', fontSize: 16, fontWeight: "bold" },

    modalBackdrop: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center', padding: 20 },

    modalContainer: { width: '100%', backgroundColor: '#FFFFFF', borderRadius: 15, padding: 20, elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4 },

    modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', textAlign: 'center', marginBottom: 8 },

    modalSubtitle: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 20 },

    modalButtonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }

});