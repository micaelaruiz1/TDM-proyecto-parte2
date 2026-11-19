import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet,Image } from 'react-native';
import { db } from '../firebase/config';
import Post from '../components/Post';

function Home(props) {
  const [posteos, setPosteos] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    db.collection('posts')
      .orderBy('createdAt', 'desc')
      .onSnapshot(docs => {
        let posts = [];

        docs.forEach(doc => {
          posts.push({
            id: doc.id,
            data: doc.data()
          });
        });

        setPosteos(posts);
        setLoading(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../assets/logo.png')}
        resizeMode='contain'
      />
      {loading ?
        <ActivityIndicator size='large' color='#E50914' /> :
        <View>
        <Text style={styles.subtitulo}>Que opina la gente?</Text>
        <FlatList
          data={posteos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Post post={item} navigation={props.navigation} />}
        />
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
   container: {
    flex: 1,
    backgroundColor: '#141414',
    padding: 20,
  },
  logo: {
  height: 90,
  borderRadius: 20,
  marginBottom: 30,
  alignSelf: 'center',
},
  subtitulo: {
    color: '#b3b3b3',
    fontSize: 14,
    marginTop: 6,
    marginBottom: 20,
  },
});
export default Home;