// Em: src/components/button/button.jsx

import { TouchableOpacity, Text } from "react-native";
import { styles } from "./button.style.js";

// 1. Adicionamos "onPress" aqui para que o componente o receba
function Button({ texto, onPress }) { 
    return (
        // 2. Passamos o "onPress" para o TouchableOpacity
        <TouchableOpacity style={styles.btn} onPress={onPress}>
            <Text style={styles.btnText}>{texto}</Text>
        </TouchableOpacity>
    );
}

export default Button;