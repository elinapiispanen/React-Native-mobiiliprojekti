import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { firebase } from '../firebase/config.js'
import { Card, Input, Button } from 'react-native-elements';
import styles from '../styles/index'

export default function ThingsToDo() {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [thingsToDoList, setThingsToDoList] = useState([])
    const [randomnum, setRandomnum] = useState(-1)

    firebase.database().ref('thingstodo/')

    useEffect(() => {
        firebase.database().ref('thingstodo/').on('value', snapshot => {
            const data = snapshot.val()
            const things = Object.values(data)
            setThingsToDoList(things)

        })
    }, []);

    const saveItem = () => {
        firebase.database().ref('thingstodo/').push(
            { 'title': title, 'description': description, 'imageUrl': 'https://cdn.pixabay.com/photo/2018/09/20/06/51/thank-you-3690116_1280.jpg' }
        );
        setTitle('')
        setDescription('')
    }

    const GenerateThingsToDo = () => {
        setRandomnum(Math.floor(Math.random() * thingsToDoList.length));
        return randomnum
    }

    return (
        <View style={styles.container} >
            <Text style={styles.header}>Tekemisgeneraattori</Text>
            <Text style={styles.title}>Tekemistä vailla? Klikkaa painiketta ja löydä puuhaa!</Text>
            <Button
                title='Anna minulle tekemistä'
                buttonStyle={styles.button}
                onPress={GenerateThingsToDo}
                titleStyle={styles.buttonTextStyle}
            />
            <View>
                {randomnum >= 0 ? (
                    <Card>
                        <Card.Title style={styles.title}>{thingsToDoList[randomnum].title}</Card.Title>
                        <View>
                            <Text style={styles.paragraph}>{thingsToDoList[randomnum].description}</Text>
                            <Image source={{ uri: thingsToDoList[randomnum].imageUrl }} style={styles.image}></Image>
                        </View>
                    </Card>) : (
                        <Image source={{ uri: 'https://cdn.pixabay.com/photo/2017/06/24/09/13/dog-2437110_1280.jpg' }} style={styles.image}></Image>
                    )}

            </View>
            <Text style={styles.paragraph}>Psst... Voit lisätä listaan omia juttujasi:</Text>
            <View style={{ flexDirection: 'column', width: 350 }}>
                <Input style={styles.paragraph} placeholder="Otsikko" label='Otsikko' onChangeText={title => setTitle(title)} value={title} ></Input>
                <Input style={styles.paragraph} placeholder="Kuvaus" label='Kuvaus' onChangeText={description => setDescription(description)} value={description} ></Input>
            </View>
            <Button buttonStyle={styles.button} titleStyle={styles.buttonTextStyle} onPress={saveItem} title="Tallenna"></Button>
        </View >
    );
}


