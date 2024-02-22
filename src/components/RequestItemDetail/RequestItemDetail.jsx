import React, { useState } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import TrashIcon from '../../SVG/TrashIcon'
import Counter from '../Counter/Counter'


const RequestItemDetail = ({imageSrc}) => {
    const [count, setCount] = useState(0);
    const handleIncrement = () => {

        setCount(count + 1);
    }
    const handleDecrement = () => {

        setCount(count - 1);
    }


    return (
        //react native code
        <View style={styles.container}>
            <View>
                <Image
                    source={imageSrc}
                    style={{ width: 75, height: 75 }}
                    resizeMode="contain"
                />
            </View>
            <View>
                <View style={styles.topHeader}>
                    <Text>Item Name</Text>
                    <TrashIcon />
                </View>
                <View>
                    <Counter count={count} handleIncrement={handleIncrement} handleDecrement={handleDecrement} containerStyle={styles.Counter} />
                </View>
            </View>
        </View>

    )
}

export default RequestItemDetail

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    topHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    Counter: {
        flexDirection: 'row',
        gap: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});


// to use this component use the below reference code
//      <RequestItemDetail imageSrc={require("imageUrl")} />



