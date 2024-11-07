import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function AddBookScreen({ navigation }) {
  const [titre, setTitre] = useState('');
  const [domaine, setDomaine] = useState('');
  const [resume, setResume] = useState('');
  const [image, setImage] = useState('');

  // Fonction pour ajouter un livre
  const handleAddBook = () => {
    if (!titre || !domaine || !resume || !image) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs !");
      return;
    }

    const newBook = {
      titre,
      domaine,
      resume,
      image,
      date: new Date(),
    };

    // Remplacez l'adresse IP locale de votre machine
    const apiUrl = 'http://10.0.2.2:5000/livres'; // Si vous utilisez un émulateur Android, utilisez 10.0.2.2

    // Effectuer la requête POST pour ajouter un livre
    axios.post(apiUrl, newBook)
      .then((response) => {
        console.log(response.data); // Log de la réponse pour vérifier
        Alert.alert("Succès", "Livre ajouté avec succès !");
        // Redirige vers la liste des livres après l'ajout
        navigation.navigate('BookList'); // Assurez-vous que 'BookList' est le nom correct de la route
      })
      .catch((error) => {
        if (error.response) {
          // Si la réponse du serveur a échoué
          console.error("Erreur lors de l'ajout du livre:", error.response.data);
          Alert.alert("Erreur", "Erreur serveur, veuillez réessayer.");
        } else if (error.request) {
          // Si la requête n'a pas reçu de réponse du serveur
          console.error("Aucune réponse du serveur:", error.request);
          Alert.alert("Erreur", "Aucune réponse du serveur, vérifiez votre connexion.");
        } else {
          // Si erreur dans la configuration de la requête
          console.error("Erreur dans la configuration de la requête:", error.message);
          Alert.alert("Erreur", "Une erreur inconnue s'est produite.");
        }
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Ajouter un Nouveau Livre</Text>

      <TextInput
        style={styles.input}
        placeholder="Titre"
        value={titre}
        onChangeText={setTitre}
      />
      <TextInput
        style={styles.input}
        placeholder="Domaine"
        value={domaine}
        onChangeText={setDomaine}
      />
      <TextInput
        style={styles.input}
        placeholder="Résumé"
        value={resume}
        onChangeText={setResume}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="URL de l'image"
        value={image}
        onChangeText={setImage}
      />

      <Button title="Ajouter Livre" onPress={handleAddBook} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
});
