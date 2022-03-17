import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [contacts, setContacts] = useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    setHasPermission(status === 'granted');

    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers]
      })
      setContacts(data);
      console.log(data);
      console.log("Nimi: "+data[0].name+" numero: "+data[0].phoneNumbers[0].number)
    }
  }

  function TulostaNumero(props) {
    const kontakti = props.kontakti;
    let numero="no number";
    try {
      numero = kontakti.phoneNumbers[0].number;
    } catch (error) {
     //console.error(error);
    }
    console.log("Nimi:"+kontakti.name);
    console.log("Numero:"+numero);
    return (
      <Text>
        {numero}
      </Text>
    );
  }

  return (
    <View style={styles.container} >
      <StatusBar style="auto" />
      {
        hasPermission ? (
          <View>
            <Text>Contacts: {contacts.length}</Text>
            <FlatList style={styles.lista}
              data={contacts}
              keyExtractor={item => item.id}
              renderItem={({ item }) =>
            <Text>{item.firstName} <TulostaNumero kontakti={item}></TulostaNumero></Text>
            }/>
          </View>
        ) : (
            <Text>No permission to use Contacts</Text>
          )
      }
      <Button title="Get contacts" onPress={getContacts} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 75
  },

});