import React, { useState } from "react";
// 1. IMPORTAMOS ScrollView
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    Alert, 
    ScrollView 
} from "react-native";
import { styles } from "./userProfile.style.js";
import { FontAwesome } from "@expo/vector-icons";
import api from "../../services/api"; // 2. IMPORTAMOS A API

export default function UserProfile() {
    // Seus states (perfeitos!)
    const [diabetes, setDiabetes] = useState("");
    const [idade, setIdade] = useState("");
    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");
    const [senhaAtual, setSenhaAtual] = useState("");
    const [novaSenha, setNovaSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [mostrarSenha, setMostrarSenha] = useState(false);

    // --- 3. LÓGICA DE SALVAR CONECTADA AO BACKEND ---
    const handleSave = async () => {
        // Validação de senhas (pré-envio)
        if (novaSenha && (novaSenha !== confirmarSenha)) {
            Alert.alert("Erro", "As novas senhas não coincidem ❌");
            return;
        }

        // 1. Monta um objeto SÓ com os dados que o usuário quer alterar
        const payload = {};
        if (diabetes) payload.diabetesType = diabetes;
        if (idade) payload.age = parseInt(idade);
        if (telefone) payload.phone = telefone;
        if (email) payload.email = email;

        // 2. Lógica para só enviar a senha se o usuário preencheu os campos
        if (novaSenha && senhaAtual) {
            payload.currentPassword = senhaAtual;
            payload.newPassword = novaSenha;
        } else if (novaSenha || senhaAtual) {
            // Se o usuário preencheu um mas não o outro
            Alert.alert("Erro", "Para alterar a senha, preencha a senha atual e a nova senha.");
            return;
        }

        // 3. Verifica se há algo para salvar
        if (Object.keys(payload).length === 0) {
            Alert.alert("Nada para salvar", "Nenhum campo foi alterado 😅");
            return;
        }
        
        // 4. Chama a nova rota do backend (que ainda vamos criar)
        try {
            // Usamos api.patch para enviar SÓ os campos alterados
            // Precisamos do 'authMiddleware' no backend, então o token será enviado
            // automaticamente pelo nosso 'api.ts' (que configuraremos)
            const response = await api.patch('/users/me', payload);

            Alert.alert("Sucesso!", "Seus dados foram salvos ✅");
            console.log("Resposta do servidor:", response.data);

            // Opcional: Limpar campos de senha após salvar
            setSenhaAtual("");
            setNovaSenha("");
            setConfirmarSenha("");

        } catch (error) {
            console.error("Erro ao salvar perfil:", error);
            // O back-end pode retornar um erro (ex: "Senha atual incorreta")
            const errorMessage = error.response?.data?.error || "Não foi possível salvar as alterações.";
            Alert.alert("Erro", errorMessage);
        }
    };

    return (
        // 4. ESTRUTURA JSX CORRIGIDA COM SCROLLVIEW
        <View style={styles.container}>
            {/* Cabeçalho verde (fixo) */}
            <View style={styles.header}>
                <View style={styles.profileContainer}>
                    <View style={styles.avatarPlaceholder}>
                        <FontAwesome name="user" size={40} color="#ccc" />
                    </View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.userName}>Arycia Antonio</Text>
                        <TouchableOpacity>
                            <FontAwesome name="edit" size={18} color="#fff" style={styles.editIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* O conteúdo rolável começa aqui */}
            <ScrollView 
                style={styles.scrollContainer} 
                contentContainerStyle={styles.infoContainer}
                keyboardShouldPersistTaps="handled"
            >
                <TextInput
                    style={styles.input}
                    placeholder="Digite o tipo de diabetes"
                    placeholderTextColor="#666"
                    value={diabetes}
                    onChangeText={setDiabetes}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Digite sua idade"
                    placeholderTextColor="#666"
                    keyboardType="numeric"
                    value={idade}
                    onChangeText={setIdade}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu telefone"
                    placeholderTextColor="#666"
                    keyboardType="phone-pad"
                    value={telefone}
                    onChangeText={setTelefone}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu email"
                    placeholderTextColor="#666"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />

                {/* Campos de senha */}
                <Text style={styles.sectionTitle}>Alterar senha</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Senha atual"
                    placeholderTextColor="#666"
                    secureTextEntry={!mostrarSenha}
                    value={senhaAtual}
                    onChangeText={setSenhaAtual}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Nova senha"
                    placeholderTextColor="#666"
                    secureTextEntry={!mostrarSenha}
                    value={novaSenha}
                    onChangeText={setNovaSenha}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirmar nova senha"
                    placeholderTextColor="#666"
                    secureTextEntry={!mostrarSenha}
                    value={confirmarSenha}
                    onChangeText={setConfirmarSenha}
                />

                {/* Mostrar senha */}
                <TouchableOpacity
                    style={styles.showPasswordButton}
                    onPress={() => setMostrarSenha(!mostrarSenha)}
                >
                    <FontAwesome
                        name={mostrarSenha ? "eye-slash" : "eye"}
                        size={18}
                        color="#2E9E53"
                    />
                    <Text style={styles.showPasswordText}>
                        {mostrarSenha ? "Ocultar senhas" : "Mostrar senhas"}
                    </Text>
                </TouchableOpacity>

                {/* Botão salvar */}
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Salvar alterações</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}