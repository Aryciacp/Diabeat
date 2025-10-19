import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { styles } from "./userProfile.style.js";
import { FontAwesome } from "@expo/vector-icons";

export default function UserProfile() {
    const [diabetes, setDiabetes] = useState("");
    const [idade, setIdade] = useState("");
    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");
    const [senhaAtual, setSenhaAtual] = useState("");
    const [novaSenha, setNovaSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [mostrarSenha, setMostrarSenha] = useState(false);

    const handleSave = () => {
        if (!diabetes && !idade && !telefone && !email && !novaSenha) {
            Alert.alert("Nada para salvar", "Preencha algum campo 😅");
            return;
        }

        if (novaSenha || confirmarSenha) {
            if (novaSenha !== confirmarSenha) {
                Alert.alert("Erro", "As senhas não coincidem ❌");
                return;
            }
        }

        Alert.alert("Sucesso!", "Suas alterações foram salvas ✅");
        console.log({
            diabetes,
            idade,
            telefone,
            email,
            senhaAtual,
            novaSenha,
        });
    };

    return (
        <View style={styles.container}>
            {/* Cabeçalho verde */}
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

            {/* Campos de informações */}
            <View style={styles.infoContainer}>
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
            </View>
        </View>
    );
}
