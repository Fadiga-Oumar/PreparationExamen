import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import axios from 'axios';
import moment from 'moment'; // Importation de moment.js

export default function BookListScreen({ navigation }) {
  const [books, setBooks] = useState([]);
  const [sortedByDate, setSortedByDate] = useState('');
  const [sortedByTitle, setSortedByTitle] = useState('');

  useEffect(() => {
    // Charger la liste des livres depuis l'API
    axios.get('http://localhost:5000/livres')
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error("Erreur de chargement des livres:", error);
      });
  }, []);

  // Fonction pour trier par titre, directement lors de la saisie
  const sortBooksByTitle = (title) => {
    setSortedByTitle(title);
    const sortedBooks = [...books].sort((a, b) => {
      if (title === 'asc') {
        return a.titre.localeCompare(b.titre);
      } else if (title === 'desc') {
        return b.titre.localeCompare(a.titre);
      }
      return 0;
    });
    setBooks(sortedBooks);
  };

  // Fonction pour trier par date, directement lors de la saisie
  const sortBooksByDate = (date) => {
    setSortedByDate(date);
    const sortedBooks = [...books].sort((a, b) => {
      if (date === 'asc') {
        return moment(a.date).isBefore(moment(b.date)) ? -1 : 1;
      } else if (date === 'desc') {
        return moment(b.date).isBefore(moment(a.date)) ? -1 : 1;
      }
      return 0;
    });
    setBooks(sortedBooks);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Bouton "Nouveau" */}
      <TouchableOpacity
        style={styles.newButton}
        onPress={() => navigation.navigate('AddBook')}
      >
        <Text style={styles.newButtonText}>Nouveau Livre</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Ma Bibliothèque</Text>

      {/* Champs de saisie pour trier par titre */}
      <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>Trier par Titre:</Text>
        <TextInput
          style={styles.sortInput}
          placeholder="Entrez 'asc' ou 'desc'"
          value={sortedByTitle}
          onChangeText={sortBooksByTitle} // Applique directement le tri par titre
        />
      </View>

      {/* Champs de saisie pour trier par date */}
      <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>Trier par Date:</Text>
        <TextInput
          style={styles.sortInput}
          placeholder="Entrez 'asc' ou 'desc'"
          value={sortedByDate}
          onChangeText={sortBooksByDate} // Applique directement le tri par date
        />
      </View>

      <FlatList
        data={books}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* Vérifier que l'URL de l'image est valide */}
            <Image source={{ uri: item.image }} style={styles.bookImage} />
            <View style={styles.bookInfo}>
              <Text style={styles.title}>{item.titre}</Text>
              <Text style={styles.domain}>{item.domaine}</Text>
              {/* Afficher la date avec moment.js */}
              <Text style={styles.date}>{moment(item.date).format('DD MMMM YYYY')}</Text>
              <Text style={styles.resume}>{item.resume.substring(0, 100)}...</Text>
              <TouchableOpacity 
                style={styles.detailsButton} 
                onPress={() => navigation.navigate('BookDetail', { book: item })}
              >
                <Text style={styles.detailsButtonText}>Voir Détails</Text>
              </TouchableOpacity>

              {/* Bouton "Modifier" */}
              <TouchableOpacity
                style={styles.modifyButton}
                onPress={() => navigation.navigate('EditBook', { book: item })}
              >
                <Text style={styles.modifyButtonText}>Modifier</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Assure que le parent occupe tout l'espace
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  newButton: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  newButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  sortContainer: {
    marginBottom: 15,
  },
  sortLabel: {
    fontSize: 16,
    color: '#333',
  },
  sortInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    fontSize: 14,
    marginTop: 5,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  bookImage: {
    width: 100,
    height: 150,
    borderRadius: 8,
    marginRight: 15,
  },
  bookInfo: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  domain: {
    fontSize: 14,
    color: '#777',
    marginVertical: 5,
  },
  date: {
    fontSize: 12,
    color: '#555',
    marginVertical: 5,
  },
  resume: {
    fontSize: 12,
    color: '#444',
    marginBottom: 10,
  },
  detailsButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  detailsButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  modifyButton: {
    backgroundColor: '#ffc107',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  modifyButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});
