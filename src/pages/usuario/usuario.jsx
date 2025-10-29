// Arquivo: UserProfile.jsx (CORRIGIDO com KeyboardAwareScrollView)

import React, { useState, useEffect } from "react";
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    Alert, 
    // ScrollView, // <--- REMOVIDO
    ActivityIndicator 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"; 
import { styles } from "./usuario.style.js"; // Seus estilos
import { FontAwesome } from "@expo/vector-icons";
import api from "../../services/api";
import { Picker } from '@react-native-picker/picker';

// 1. IMPORTE A BIBLIOTECA DO TECLADO
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function UserProfile() {
    
    // (Seus 'useState' e 'useEffect' estão 100% corretos)
    const [nome, setNome] = useState("");
    const [diabetes, setDiabetes] = useState("");
    const [idade, setIdade] = useState("");
    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(true); 
    const [originalData, setOriginalData] = useState(null); 

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

    // (Sua função 'handleSave' com a correção de crash está 100% correta)
    const handleSave = async () => {
        if (!originalData) { // <--- Correção de crash
            Alert.alert("Erro", "Os dados originais não foram carregados.");
            return;
        }
        
        const payload = {};
        if (diabetes !== (originalData.diabetesType || "")) payload.diabetesType = diabetes;
        if (parseInt(idade || 0) !== (originalData.age || 0)) payload.age = parseInt(idade || 0);
        if (telefone !== (originalData.phone || "")) payload.phone = telefone;
        if (email !== (originalData.email || "")) payload.email = email;

        if (Object.keys(payload).length === 0) {
            Alert.alert("Nada para salvar", "Nenhum campo foi alterado.");
            return;
        }
        
        try {
            const response = await api.patch('/users/me', payload);
            Alert.alert("Sucesso!", "Seus dados foram salvos ✅");
            setOriginalData(response.data); 
        } catch (error) {
            console.error("Erro ao salvar perfil:", error);
            const errorMessage = error.response?.data?.error || "Não foi possível salvar as alterações.";
            Alert.alert("Erro", errorMessage);
        }
    };

    // (Seu 'isLoading' está 100% correto)
    if (isLoading) {
        return (
            <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="#fff" />
                <Text style={{ color: '#fff', marginTop: 10 }}>Carregando perfil...</Text>
            </SafeAreaView>
        );
    }

    // --- Tela principal ---
    return (
        <SafeAreaView style={styles.container}>
            
            {/* Seu Cabeçalho (Header) - (Correto) */}
            <View style={styles.header}>
                <View style={styles.profileContainer}>
                    <View style={styles.avatarPlaceholder}>
                        <FontAwesome name="user" size={40} color="#ccc" />
                    </View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.userName}>{nome}</Text> 
                        <TouchableOpacity>
                            <FontAwesome name="edit" size={18} color="#fff" style={styles.editIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* 2. SUBSTITUA O <ScrollView> POR <KeyboardAwareScrollView> */}
            <KeyboardAwareScrollView 
                style={styles.scrollContainer} 
                contentContainerStyle={styles.infoContainer}
                keyboardShouldPersistTaps="handled"
                enableOnAndroid={true}
                extraScrollHeight={20} // Espacinho extra
                enableAutomaticScroll={true}
            >
                
                {/* (Seu <Picker> de Diabetes está correto) */}
                <View style={{
                    width: "100%",
                    backgroundColor: "#fff",
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 10,
                    marginBottom: 15,
                    height: 50, 
                    justifyContent: 'center' 
                }}> 
                    <Picker
                        selectedValue={diabetes}
                        onValueChange={(itemValue) => setDiabetes(itemValue)}
                        style={{ width: '100%', color: '#333' }}
                        dropdownIconColor="#333"
                    >
                        <Picker.Item label="Diabetes tipo:" value="" style={{color: '#666'}} />
                        <Picker.Item label="Diabetes tipo: 1" value="TIPO_1" />
                        <Picker.Item label="Diabetes tipo: 2" value="TIPO_2" />
                        <Picker.Item label="Diabetes Gestacional" value="GESTACIONAL" />
                        <Picker.Item label="Não se aplica" value="NAO_SE_APLICA" />
                    </Picker>
                </View>

                {/* (Seus <TextInput> estão corretos, com os placeholders certos) */}
                <TextInput
                    style={styles.input}
                    placeholder="Idade:"
                    placeholderTextColor="#666"
                    keyboardType="numeric"
                    value={idade}
                    onChangeText={setIdade}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Telefone:"
                    placeholderTextColor="#666"
                    keyboardType="phone-pad"
                    value={telefone}
                    onChangeText={setTelefone}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email:"
                    placeholderTextColor="#666"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />

                {/* (Seu Botão Salvar está correto) */}
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Salvar alterações</Text>
                </TouchableOpacity>
                
            </KeyboardAwareScrollView> 
            {/* 3. FIM DO <KeyboardAwareScrollView> */}

        </SafeAreaView>
    );
}