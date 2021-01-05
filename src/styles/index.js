import { StyleSheet } from 'react-native';

const colors = {
    background: '#fff', //valkoinen
    dark: '#335d2d', //
    primary: '#eeeded', //harmaa
    light: "#bedbbb", //vaaleanvihreä
    button: '#ffdd93', //vaaleankeltainen
    buttonTextDark: '#707070', // harmaa
    weather: '#bedcfa' //vaaleansininen
}

global.myTheme = {
    colors: {
        primary: colors.light, // NavIconin alapuolella oleva viiva
        card: colors.primary, //NavIconien ympärillä oleva tausta
    }
};

global.navIconColor = (focused) => (focused ? colors.dark : colors.buttonTextDark); //NavBar iconien aktiivi ja passiivi värit
global.navBarTintColor = colors.primary;

export default StyleSheet.create({

    //containers
    container: {
        backgroundColor: colors.background,
        alignItems: 'center',
        marginTop: 10,
        width: '100%',
        justifyContent: 'space-between'
    },
    weatherContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.weather,
        width: 350,
        padding: 5
    },
    flatlistContainer: {
        width: 350,
        backgroundColor: colors.primary,
        padding: 5,
    },

    //tabbar
    tabBar: {
        paddingTop: 40,
    },

    //flatlist
    listSeparator: {
        height: 30,
        width: "100%",
    },

    //images
    logoImage: {
        height: 50,
        width: 300,
    },
    image: {
        width: 350,
        height: 210,
    },
    icon: {
        width: 100,
        height: 100
    },

    //text
    header: {
        fontSize: 20,
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    paragraph: {
        fontSize: 14,
        fontFamily: 'sans-serif-condensed'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'sans-serif-condensed'
    },

    //buttons
    buttonGroupBorderColor: {
        borderColor: colors.background
    },
    buttonGroupInnerlineColor: {
        color: colors.primary
    },
    buttonTitleColor: {
        color: colors.buttonTextDark
    },
    buttonGroupContainer: {
        width: 400,
        height: 100,
    },
    selectedButton: {
        backgroundColor: colors.light,
    },
    buttonTextStyle: {
        color: colors.buttonTextDark,
        fontFamily: 'sans-serif-condensed',
        fontSize: 16,
    },
    button: {
        backgroundColor: colors.button,
        tintColor: colors.buttonTextDark,
        color: colors.buttonTextDark,
    },
})