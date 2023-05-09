import * as React from 'react';
import { View, StyleSheet, ScrollView } from "react-native";
import { Button, withTheme, Surface, Text , Card, Title, Divider} from "react-native-paper";
import { FontAwesome } from '@expo/vector-icons';
const optionsPerPage = [2, 3, 4];
const number = 0;

const DTestComponent = (props) => {

    var data = [{ Subject: 'English',Chapter: 'Chapter1', Date: '2021-06-04'},
    { Subject: 'Maths',Chapter: 'Chapter3', Date: '2021-06-07'}]
    var data1 = [{Class: '9', Subject: 'Telugu', Date: '2021-06-05', Time: '9:30 AM'},
    {Class: '9', Subject: 'English', Date: '2021-06-05', Time: '9:30 AM'}]
    return (
         <Surface style={styles.container}>
        {/* <View style={[styles.container]}> */}
                    {
                        data && data.length > 0 ?
                            data.map((item, index) => {
                                return (
                                    <Card style = {{marginBottom:5}}>
                                    {/* <Card.Title title="Card Title" subtitle="Card Subtitle"  /> */}
                                    <Card.Content>
                                      {/* <Title>Test</Title> */}
                                      
                                    <View style={styles.row}>
                                        <View>
                                            <Text style={[styles.label, { fontWeight: 'bold' }]}>Subject</Text>
                                        </View>
                                        <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
                                            <Text style={styles.label}>{item.Subject}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.row}>
                                        <View>
                                            <Text style={[styles.label, { fontWeight: 'bold' }]}> Date</Text>
                                        </View>
                                        <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
                                            <Text style={styles.label}>{item.Date}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.row}>
                                        <View>
                                            <Text style={[styles.label, { fontWeight: 'bold' }]}>Chapter</Text>
                                        </View>
                                        <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
                                            <Text style={styles.label}>{item.Chapter} </Text>
                                        </View>
                                    </View>
                                   
                                    <View style={styles.row}>
                                        <View>
                                            <Text style={[styles.label, { fontWeight: 'bold' }]}>Action</Text>
                                        </View>
                                        <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
                                        {/* <Button raised theme={{ roundness: 3 }} onPress={() => navigation.navigate("HomeSettings")} >Show</Button> */}
                                        <FontAwesome name="file-pdf-o" size={24} color="black" />
                                        </View>
                                    </View>
                                     </Card.Content>
                                    </Card>
                                );
                            })
                            :
                            false
                    }
                    {
                       data1 && data1.length > 0 ?
                            data1.map((item, index) => {
                                return (
                                    <Card style = {{marginBottom:5}}>
                                    {/* <Card.Title title="Card Title" subtitle="Card Subtitle"  /> */}
                                    <Card.Content>
                                      {/* <Title>Test</Title> */}
                                      
                                    <View style={styles.row}>
                                        <View>
                                            <Text style={[styles.label, { fontWeight: 'bold' }]}>Class</Text>
                                        </View>
                                        <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
                                            <Text style={styles.label}>{item.Class}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.row}>
                                        <View>
                                            <Text style={[styles.label, { fontWeight: 'bold' }]}>Subject</Text>
                                        </View>
                                        <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
                                            <Text style={styles.label}>{item.Subject}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.row}>
                                        <View>
                                            <Text style={[styles.label, { fontWeight: 'bold' }]}>Date</Text>
                                        </View>
                                        <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
                                            <Text style={styles.label}>{item.Date} </Text>
                                        </View>
                                    </View>
                                    <View style={styles.row}>
                                        <View>
                                            <Text style={[styles.label, { fontWeight: 'bold' }]}>Time</Text>
                                        </View>
                                        <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
                                            <Text style={styles.label}>{item.Time} </Text>
                                        </View>
                                    </View>
                                   
                                    <View style={styles.row}>
                                        <View>
                                            <Text style={[styles.label, { fontWeight: 'bold' }]}>Action</Text>
                                        </View>
                                        <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
                                        {/* <Button raised theme={{ roundness: 3 }} onPress={() => navigation.navigate("HomeSettings")} >Show</Button>
                                         */}
                                         <FontAwesome name="file-pdf-o" size={24} color="black" />
                                        </View>
                                    </View>
                                     </Card.Content>
                                    </Card>
                                );
                            })
                            :
                            false
                    }
      
        </Surface>
    );
}

export default withTheme(DTestComponent);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor :'#ecf0f1',
    },
    th: {
        fontWeight: 'bold',
        fontSize: 14
    },
    label_left: {

        fontSize: 14,
    },
    label: {
        fontSize: 15,
        padding: 10,
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        //flex: 1,
    },
});
