import React from "react";
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    TouchableWithoutFeedback
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type MainContainerProps = {
    children: React.ReactNode;
};

const styles = StyleSheet.create({
    keyboardAvoidingView: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
        padding: 32, 
        backgroundColor: "#fff",
    },
});

const MainContainer: React.FC<MainContainerProps> = ({ children }) => {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardAvoidingView}
            >
                <SafeAreaView style={styles.safeArea}>{children}</SafeAreaView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

export default MainContainer;
