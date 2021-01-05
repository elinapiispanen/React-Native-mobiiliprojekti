import React, { useEffect, useState } from 'react';
import { Image, Text, View, FlatList, SafeAreaView } from 'react-native';
import * as rssParser from 'react-native-rss-parser';
import styles from '../styles/index'
import { ButtonGroup, Button } from 'react-native-elements';

export default function NewsFeed() {

    const [news, setNews] = useState([])
    const buttons = ['Kotimaa', 'Ulkomaat', 'Urheilu', 'Viihde', 'Hyvä olo'];
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [showAllNews, setShowAllNews] = useState(true)
    const kaikki = `https://www.is.fi/rss/tuoreimmat.xml`
    const kotimaa = `https://www.is.fi/rss/kotimaa.xml`
    const ulkomaat = `https://www.is.fi/rss/ulkomaat.xml`
    const urheilu = `https://www.is.fi/rss/urheilu.xml`
    const viihde = `https://www.is.fi/rss/viihde.xml`
    const hyvaolo = `https://www.is.fi/rss/hyvaolo.xml`
    const [sourceInfo, setSourceInfo] = useState({
        description: '',
        url: '',
    })

    useEffect(() => {
        getNews()
    }, [selectedIndex, showAllNews]);

    const getNews = () => {
        let index = selectedIndex
        let url = ''
        if (showAllNews) {
            url = kaikki
        } else if (index == 0) {
            url = kotimaa
        } else if (index == 1) {
            url = ulkomaat
        } else if (index == 2) {
            url = urheilu
        } else if (index == 3) {
            url = viihde
        } else if (index == 4) {
            url = hyvaolo
        }

        fetch(url)
            .then((response) => response.text())
            .then((responseData) => rssParser.parse(responseData))
            .then((rss) => {
                setNews(rss.items)
                setSourceInfo({
                    description: rss.description,
                    url: rss.image.url
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
                   
                        <Text style={styles.header}>{sourceInfo.description}</Text>
                        <Image source={{ uri: sourceInfo.url }} style={styles.logoImage}></Image>
                   
                    <View>
                        {showAllNews ? (
                            <Button
                                title='Näytä uutisia aiheittain'
                                onPress={() => setShowAllNews(!showAllNews)}
                                buttonStyle={styles.button}
                                titleStyle={styles.buttonTextStyle}
                            />
                        ) : (
                                <View>
                                    <Button
                                        title='Näytä kaikki uutiset'
                                        onPress={() => setShowAllNews(!showAllNews)}
                                        buttonStyle={styles.button}
                                        titleStyle={styles.buttonTextStyle} />
                                    <ButtonGroup
                                        onPress={(value) => setSelectedIndex(value)}
                                        selectedIndex={selectedIndex}
                                        selectMultiple={false}
                                        buttons={buttons}
                                        buttonStyle={styles.button}
                                        containerStyle={styles.buttonGroupContainer}
                                        textStyle={styles.buttonTextStyle}
                                        innerBorderStyle={styles.buttonGroupInnerlineColor}
                                        selectedTextStyle={styles.buttonTitleColor}
                                        selectedButtonStyle={styles.selectedButton}
                                    />
                                </View>
                            )}
                    </View>

                    <FlatList
                        ItemSeparatorComponent={listSeparator}
                        keyExtractor={((item, index) => index.toString())}
                        renderItem={({ item }) =>
                            <View style={styles.container}>
                                {item.enclosures && item.enclosures[0] && item.enclosures[0].url ?
                                    <View>
                                        <Image source={{ uri: item.enclosures[0].url }} style={styles.image} />
                                    </View>
                                    :
                                    <Text>Ei kuvaa saatavilla</Text>
                                }
                                <View style={styles.flatlistContainer}>
                                    <Text style={styles.title}>{item.title}</Text>
                                    <Text style={styles.paragraph}>{item.description}</Text>
                                </View>
                            </View>}
                        data={news}
                    />
                </SafeAreaView>

            </View>
        </View>
    );
}