import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Typography from '../Typography/Typography';
import CalendarIcon from '../../SVG/CalendarIcon';
import DueOutIcon from '../../SVG/DueOutIcon';
import CheckIcon from '../../SVG/CheckIcon';
import DueInIcon from '../../SVG/DueInIcon';
import CheckedOutIcon from '../../SVG/CheckedOutIcon';
import TierGoldIcon from '../../SVG/TierGoldIcon';
import TierSilverIcon from '../../SVG/TierSilverIcon';
import TierDiamondIcon from '../../SVG/TierDiamondIcon';
const AssignedRoomListItem = ({ room }) => {
   

    const roomType = () => {
        switch (room.type) {
            case 'gold':
                return <TierGoldIcon />
             case 'silver':
                return <TierSilverIcon /> 
            case 'diamond':
                return <TierDiamondIcon />
              default:
                return <Text>Checked In</Text>
        }   
    }  


    const StatusSvg = () => {
        switch (room.status) {
            case 'dueOut':
                return <DueOutIcon />
            case 'dueIn':
                return <DueInIcon />
            case 'checkedOut':
                return <CheckedOutIcon />
            case 'checkedIn':
                return <CheckIcon stroke='green'/>
            case 'dueOutdueIn':
                return <><DueOutIcon /> <DueInIcon /></>
            case 'checkedOutcheckedIn':
                return <><CheckedOutIcon />  <CheckIcon /> </>    
            default:
                return <Text>Checked In</Text>
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Typography variant="h5-regular" style={styles.text}>{room.roomNumber}</Typography>
                <View style={styles.dateContainer}>
                    <CalendarIcon />
                    <Text style={styles.text}>{room.date}</Text>
                </View>
            </View>
            <View style={styles.bodyContainer}>
                <Text style={styles.svg}>{StatusSvg()}</Text>
                <Text style={styles.text}>{roomType()}</Text>
            </View>
        </View>
    );


}

export default AssignedRoomListItem;

const styles = StyleSheet.create({

    container: {

        flexDirection: 'column',
        justifyContent: 'center',
        gap: 10,
        borderWidth: 1,
        maxWidth:268,
        maxHeight: 84,
        borderRadius:20,
        padding: 10,
        margin: 10,

    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bodyContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5
    
    },
    text: {
        textAlign: 'center',
    },
   
});

// to use this component, import it into the file where you want to use it like below
//     <AssignedRoomListItem room={room} /> 

