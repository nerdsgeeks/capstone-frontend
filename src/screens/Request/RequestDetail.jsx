import React from "react";
import { View, StyleSheet } from "react-native";
import Typography from "../../components/Typography/Typography";
import { Image } from "react-native";
import { colors } from "../../../themes/themes";
import Button from "../../components/Button/Button";
const RequestDetail = ({ request }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("./../../../assets/request-help-modal-image.png")}
          style={styles.image}
        />
        <Typography variant="small-regular">itemName</Typography>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <View style={styles.detail}>
            <Typography variant="small-regular" style={{flex:1}}>Date:</Typography>
            <Typography variant="small-regular" style={{flex:1}}>{request.date}</Typography>
          </View>
          <View style={styles.detail}>
            <Typography variant="small-regular" style={{flex:1}}>Item Type:</Typography>
            <Typography variant="small-regular" style={{flex:1}}>{request.itemType}</Typography>
          </View>
          <View style={styles.detail}>
            <Typography variant="small-regular" style={{flex:1}}>Room Number:</Typography>
            <Typography variant="small-regular" style={{flex:1}}>{request.roomNumber}</Typography>
          </View>
          <View style={styles.detail}>
            <Typography variant="small-regular" style={{flex:1}}>Requester:</Typography>
            <Typography variant="small-regular" style={{flex:1}}>{request.requester}</Typography>
          </View>
          <View style={styles.detail}>
            <Typography variant="small-regular" style={{flex:1}}>Requester ID:</Typography>
            <Typography variant="small-regular" style={{flex:1}}>{request.requesterId}</Typography>
          </View>
          <View style={styles.detail}>
            <Typography variant="small-regular" style={{flex:1}}>Comments:</Typography>
          </View>
          <View style={styles.commentContainer}>
          <Typography variant="small-regular"> {request.comments}</Typography>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button name="Decline" type="secondary"/>
        <Button name="Approve" type="primary" />

        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap:20
  },
  imageContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    minWidth:116,
    minHeight:115,
    flexShrink:0,
    maxWidth:"100%",
    maxHeight:"100%"
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width:"80%"
  },
  detailItem: {
    flex: 1,
   
  },
  detail: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  commentContainer: {
    minHeight:117,
    backgroundColor:colors.pale_teal2,
    borderRadius:6,
    borderWidth:1,
    borderColor:colors.pale_teal2,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width:"80%"
  },
});

export default RequestDetail;
