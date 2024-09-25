import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    boxview: {
        height: 65,
        width: '85%',
        backgroundColor: '#FFFFFF',
        alignSelf: 'center',
        borderRadius: 8,
        justifyContent: 'center',
    },
    margineview: {
        margin: '5%'
    },
    cricleview: {
        height: 30,
        width: 30,
        borderRadius: 30,
        borderColor: '#E3E5E5',
        borderWidth: 2,
        justifyContent: 'center',
        marginLeft: '5%'

    },
    resultstext: {
        fontSize: 18,
        fontWeight: '900',
        // marginLeft: '9%',
        color: '#454647',
        textAlign:'center'
    },
    trxtstyle: {
        color: '#28328C',
        textAlign: 'center', fontSize: 15, fontWeight: '900'
    },
    flexrow: {
        flexDirection: "row",
        // justifyContent:'center'
    },
    trxtstyle2: {
        color: '#000',
        marginLeft: '10%'
    },
    buildarrow: {
        height: 20,
        width: 20,
        position: 'absolute',
        right: 15,
        //  alignSelf:'center'
    }


})