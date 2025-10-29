// Em: components/textbox/textbox.jsx

import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS, FONT_SIZE } from '../../constants/theme'; 
import { styles as defaultStyles } from './textbox.style.js';

const TextBox = ({ 
    label, 
    value, 
    onChangeText, 
    keyboardType, 
    isPassword, 
    labelStyle, 
    inputStyle, // Estilo para o Wrapper
    textInputStyle, // Estilo para o Texto
    placeholderColor 
}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View>
            {/* 1. O Label (agora vai aceitar o labelStyle) */}
            <Text style={[defaultStyles.label, labelStyle]}>{label}</Text> 

            {/* 2. O Wrapper do Input 
                NÃO usamos defaultStyles.input aqui para evitar o padding: 10
                Usamos localStyles.inputWrapper como base + o inputStyle
            */}
            <View style={[localStyles.inputWrapper, inputStyle]}> 
                <TextInput
                    style={[localStyles.textInput, textInputStyle]} // Estilo do texto
                    value={value}
                    onChangeText={onChangeText}
                    keyboardType={keyboardType}
                    secureTextEntry={isPassword && !showPassword}
                    placeholder={label} // O placeholder é o próprio label
                    placeholderTextColor={placeholderColor || "#888"}
                />
                {isPassword && (
                    <TouchableOpacity 
                        style={localStyles.eyeIcon} 
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <FontAwesome 
                            name={showPassword ? "eye" : "eye-slash"} 
                            size={20} 
                            color="#888" 
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

// Estilos "locais"
const localStyles = StyleSheet.create({
    // 3. Este é o NOVO estilo base do Wrapper
    inputWrapper: {
        width: "100%",
        backgroundColor: COLORS.white,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: COLORS.light_gray,
        
        // Correção principal:
        flexDirection: 'row',
        alignItems: 'center',
        height: 55, // <-- Altura fixa! (Ajuste se 55 for muito/pouco)
        // Sem padding aqui!
    },
    textInput: {
        flex: 1,
        paddingHorizontal: 10, // Padding *dentro* do campo de texto
        color: '#000', 
        fontSize: FONT_SIZE.md,
    },
    eyeIcon: {
        paddingHorizontal: 10,
    }
});

export default TextBox;