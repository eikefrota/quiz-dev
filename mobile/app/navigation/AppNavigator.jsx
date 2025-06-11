import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import CadastroScreen from "../screens/CadastroScreen";
import HomeScreen from "../screens/HomeScreen";
import UsuariosScreen from "../screens/UsuariosScreen";
import ListagemScreen from "../screens/ListagemScreen";
import SuccessScreen from "../screens/SuccessScreen";
import ErrorScreen from "../screens/ErrorScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigation(){
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
                <Stack.Screen nome="Home" component={HomeScreen}></Stack.Screen>
                <Stack.Screen nome="Login" component={LoginScreen}></Stack.Screen>
                <Stack.Screen nome="Cadastro" component={CadastroScreen}></Stack.Screen>
                <Stack.Screen nome="Listagem" component={ListagemScreen}></Stack.Screen>
                <Stack.Screen nome="Usuarios" component={UsuariosScreen}></Stack.Screen>
                <Stack.Screen nome="Success" component={SuccessScreen}></Stack.Screen>
                <Stack.Screen nome="Error" component={ErrorScreen}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}