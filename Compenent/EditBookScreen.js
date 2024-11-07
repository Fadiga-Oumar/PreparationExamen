export default function EditBookScreen({ route, navigation }) {
    const { book, updateBook } = route.params;
  
    const [titre, setTitre] = useState(book.titre);
    const [domaine, setDomaine] = useState(book.domaine);
    const [resume, setResume] = useState(book.resume);
    const [image, setImage] = useState(book.image);
    const [isLoading, setIsLoading] = useState(false);
  
    const handleEditBook = async () => {
      if (!book.id) {
        console.error("L'ID du livre est invalide");
        return;
      }
  
      const updatedBook = { titre, domaine, resume, image };
      setIsLoading(true);
  
      try {
        const response = await axios.put(`http://10.0.2.2:5000/livres/${book.id}`, updatedBook);
        updateBook(updatedBook, book.id);
        navigation.goBack();
      } catch (error) {
        console.error("Erreur lors de la mise à jour du livre:", error);
        Alert.alert("Erreur", "Une erreur est survenue lors de la mise à jour du livre.");
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Modifier le Livre</Text>
  
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
  
        <Button
          title={isLoading ? 'Mise à jour...' : 'Enregistrer les modifications'}
          onPress={handleEditBook}
          disabled={isLoading}
        />
      </View>
    );
  }
  