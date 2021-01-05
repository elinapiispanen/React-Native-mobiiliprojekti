import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, SafeAreaView } from 'react-native';
import * as rssParser from 'react-native-rss-parser';
import styles from '../styles/index'

export default function Emergency() {

    const [info, setInfo] = React.useState([])
    const [sourceInfo, setSourceInfo] = useState({
        title: '',
        description: '',
    })

    useEffect(() => {
        getInfo()
    }, []);

    const getInfo = () => {
        fetch(`http://www.peto-media.fi/tiedotteet/rss.xml`)
            .then((response) => response.text())
            .then((responseData) => rssParser.parse(responseData))
            .then((rss) => {
                setInfo(rss.items)
                setSourceInfo({
                    title: rss.title,
                    description: rss.description
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
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <Text style={styles.header}>{sourceInfo.title}</Text>
                <Text style={styles.title}>{sourceInfo.description}</Text>
            </View>
            <View>
                <FlatList
                    ItemSeparatorComponent={listSeparator}
                    keyExtractor={((item, index) => index.toString())}
                    renderItem={({ item }) =>
                        <View>
                            <View style={styles.flatlistContainer}>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.paragraph}>{item.description}</Text>
                            </View>
                        </View>}
                    data={info}
                />
            </View>
        </SafeAreaView>
    );
}
