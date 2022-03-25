import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, TextInputComponent, View } from 'react-native';

export default function App() {
  const handleLogIn = () => {

  }
  return (
    <View style={styles.container}>
      <Text style = {styles.heading}>Uloguj se</Text>
      <TextInput style={styles.input}>Korisničko Ime</TextInput>
      <TextInput style={styles.input}>Lozinka</TextInput>
      <Button title='Uloguj Se' onPress={handleLogIn}></Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 35,
  },
  input: {
    fontSize: 20,
    marginTop: 20,
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 2,
    opacity: 2,
    paddingHorizontal: 10,
    width: 200,
    paddingVertical: 5,
  },
  button: {
    fontSize: 20,
    backgroundColor: 'red',
  }
});
