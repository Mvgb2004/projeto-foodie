import { Text, TextInput, StyleSheet, View } from "react-native";

type InputProps = {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
  blocked?: boolean;
};

const Input: React.FC<InputProps> = ({
  value,
  onChangeText,
  placeholder,
  error,
  keyboardType = "default",
  blocked = false,
}) => {
  return (
    <View style={styles.wrapper}>
      <TextInput
        placeholder={placeholder}
        keyboardType={keyboardType}
        style={[
          styles.input,
          error && styles.inputError,
          blocked && styles.inputBlocked,
        ]}
        onChangeText={onChangeText}
        value={value}
        editable={!blocked}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    marginBottom: 16,
  },
  input: {
    width: "100%",
    borderColor: "#CCCCCC",
    borderWidth: 1,
    borderRadius: 9999,
    paddingHorizontal: 16,
    paddingVertical: 12,
    textAlign: "center",
    fontSize: 18,
    backgroundColor: "#ffffff",
  },
  inputError: {
    borderColor: "#ef4444",
  },
  inputBlocked: {
    backgroundColor: "#d3d3d3",
  },
  errorText: {
    color: "#ef4444",
    fontSize: 14,
    marginTop: 4,
    marginLeft: 8,
  },
});
