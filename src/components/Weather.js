import React, { useEffect, useState } from 'react';
import { Image, Text, View, FlatList, Alert, SafeAreaView } from 'react-native';
import styles from '../styles/index'
import * as Location from 'expo-location';
import { format } from 'date-fns'
import { fi } from 'date-fns/locale'

export default function Weather() {

    const [location, setLocation] = useState(null);
    const [place, setPlace] = useState('')
    const parseISO = require('date-fns/parseISO')
    const [weatherData, setWeatherData] = useState([])
    const API_key = '47c90937e7068f116650fc171c811013'

    const [region, setRegion] = useState({
        latitude: 60.200692,
        longitude: 24.934302,
    })

    useEffect(() => {
        getLocation();
        fetchWeather();
    }, []);

    const getLocation = async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('No permission to access location');
        }
        else {
            let location = await Location.getCurrentPositionAsync({});
            setLocation(JSON.stringify(location));
            setRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            })
        }
    };

    const fetchWeather = () => {
        fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${region.latitude}&lon=${region.longitude}&appid=${API_key}&units=metric&cnt=5`)
            .then(res => res.json())
            .then(json => {
                setWeatherData(json.list)
                setPlace(json.city.name)
            })
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
            <View>
                <SafeAreaView style={styles.container} >
                    <Text style={styles.header}>Sää</Text>
                    <Text style={styles.title}>{place}</Text>
                    <FlatList
                        ItemSeparatorComponent={listSeparator}
                        keyExtractor={((item, index) => index.toString())}
                        renderItem={({ item }) =>
                            <View style={styles.weatherContainer}>
                                <Text style={styles.paragraph}>{format(parseISO(item.dt_txt), 'iiii', { locale: fi })} {item.dt_txt.slice(11, 16)} </Text>
                                <Image style={styles.icon} source={{ uri: 'http://openweathermap.org/img/wn/' + item.weather[0].icon + '@2x.png' }}></Image>
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={styles.paragraph}>Lämpötila: {item.main.temp.toFixed(0)} &#8451; </Text>
                                    <Text style={styles.paragraph}>Tuntuu kuin: {item.main.feels_like.toFixed(0)} &#8451;</Text>
                                </View>
                            </View>}
                        data={weatherData}
                    />

                </SafeAreaView>

            </View>
        </View>
    );
}
