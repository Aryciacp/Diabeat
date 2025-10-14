import { Image, Text, View } from "react-native";
import { styles } from "./header.style.js";
import icons from "../../constants/icons.js"

// Usar { texto } aqui é uma boa prática e não causa o erro.
function Header({ texto }) {
    return <View style={styles.header}>
        <Image style={styles.logo} source={icons.logo} />
        <Text style={styles.titulo}>{texto}</Text>
    </View>
}

// ESTA É A LINHA MAIS IMPORTANTE E A CAUSA PROVÁVEL DO ERRO
export default Header;