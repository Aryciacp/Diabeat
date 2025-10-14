// CÓDIGO CORRIGIDO PARA O SEU `button.jsx`

import { TouchableOpacity, Text } from "react-native";
import { styles } from "./button.style.js";

// 1. Adicionamos "onPress" na lista de propriedades que o componente recebe
function Button({ texto, onPress }) { 
    return (
        // 2. Passamos a propriedade "onPress" para o TouchableOpacity
        <TouchableOpacity style={styles.btn} onPress={onPress}>
            <Text style={styles.btnText}>{texto}</Text>
        </TouchableOpacity>
    );
}

export default Button;