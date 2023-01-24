import { Card, Text } from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";
import { AppContext } from "../context/AppContext";
export default function DashboardPage(props){
    const properties = React.useContext(AppContext);
    return(
        <>
        <Card style={stylus.card_1} status="success">
            <Text>Selamat Datang di aplikasi {properties.appProperties.application_name}, Aplikasi ini merupakan aplikasi test untuk Lead Developer pada PT. Unggul Mitra Solusi</Text>
        </Card>
        </>
    );
}
const stylus = StyleSheet.create({
    card_1: {
        marginTop: 30,
        marginHorizontal: 15
    }
})