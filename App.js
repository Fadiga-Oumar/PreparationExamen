import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Assurez-vous que les chemins vers les composants sont corrects
import BookListScreen from './Compenent/BookListScreen'; 
import BookDetailScreen from './Compenent/BookDetailScreen'; 
import AddBookScreen from './Compenent/AddBookScreen';
import EditBookScreen from './Compenent/EditBookScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BookList">
        {/* Définir les routes de navigation */}
        <Stack.Screen 
          name="BookList" 
          component={BookListScreen} 
          options={{ title: 'Liste des livres' }} // Ajouter un titre à l'écran si nécessaire
        />
        <Stack.Screen 
          name="BookDetail" 
          component={BookDetailScreen} 
          options={{ title: 'Détails du livre' }} // Titre pour l'écran des détails
        />
        <Stack.Screen name="AddBook" component={AddBookScreen} />
        <Stack.Screen name="EditBook" component={EditBookScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
