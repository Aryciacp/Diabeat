// CÓDIGO CORRIGIDO PARA O SEU `textbox.jsx`

import { TextInput, Text, View } from "react-native";
import { styles } from "./textbox.style.js";

// 1. Adicionamos "value", "onChangeText" e outras props úteis
function TextBox({ label, isPassword, value, onChangeText, keyboardType }) {
    return (
        <View>
            <Text style={styles.label}>{label}</Text>
            <TextInput 
                style={styles.input} 
                secureTextEntry={isPassword}
                value={value} // 2. Mostra o valor do estado
                onChangeText={onChangeText} // 3. Comunica a mudança para o estado
                keyboardType={keyboardType || 'default'} // Permite definir o tipo de teclado
            />
        </View>
    );
}

export default TextBox;