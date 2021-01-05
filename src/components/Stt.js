import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, SafeAreaView } from 'react-native';
import * as rssParser from 'react-native-rss-parser';
import styles from '../styles/index'

export default function Stt() {

    const [info, setInfo] = useState([])
    const [sourceInfo, setSourceInfo] = useState({
        title: '',
    })

    useEffect(() => {
        getInfo()
    }, []);

    const getInfo = () => {
        fetch(`https://www.sttinfo.fi/rss/releases/latest?publisherId=69818103`)
            .then((response) => response.text())
            .then((responseData) => rssParser.parse(responseData))
            .then((rss) => {
                setInfo(rss.items)
                setSourceInfo({
                    title: rss.title,
                })
            });
    }

    const listSeparator = () => {
        return (
            <View
                style={styles.listSeparator}
            />
        );
    };


    return (
        <View>
            <View style={styles.container}>
                <SafeAreaView style={styles.container}>
                    <View>
                        <Text style={styles.header}>{sourceInfo.title}</Text>
                    </View>

                    <FlatList
                        ItemSeparatorComponent={listSeparator}
                        keyExtractor={((item, index) => index.toString())}
                        renderItem={({ item }) =>
                            <View style={styles.container}>
                                <View style={styles.flatlistContainer}>
                                    <Text style={styles.title}>{item.title}</Text>
                                    <Text style={styles.paragraph}>{item.description}</Text>
                                </View>
                            </View>}
                        data={info}
                    />
                </SafeAreaView>

            </View>
        </View>
    );
}