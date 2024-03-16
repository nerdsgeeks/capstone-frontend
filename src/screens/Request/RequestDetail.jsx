import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Typography from "../../components/Typography/Typography";
import { Image } from "react-native";
import { colors } from "../../../themes/themes";
import Button from "../../components/Button/Button";
import useBaseUrl from "../../hooks/useBaseUrl";
const RequestDetail = ({ route }) => {

  const request = route.params.request;
  const baseUrl = useBaseUrl();

  const [requestItems, setRequestItems] = useState({
    RequestItemDateTime: request.RequestedDateTime,
    RoomId: request.RoomId,
    RequesterId: request.requesterId,
    Quantity: request.Quantity,
    IsCompleted: request.isCompleted,
    ApprovedBySupervisorId: 1
  });
    

  const handleDecline = () => {
    requestItems.ApprovedBySupervisorId= null
    updateRequest(requestItems);
  };

  const handleApproved = () => {
    requestItems.ApprovedBySupervisorId= 1
    requestItems.RoomId=1
    console.log(requestItems)
    updateRequest(requestItems);
  };
    const updateRequest = async (request) => {
    try {
      const response = await fetch(`${baseUrl}/api/updateAssignedSupervisorId/${request.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };





  const fullName = request.FirstName + " " + request.LastName;
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("./../../../assets/request-help-modal-image.png")}
          style={styles.image}
        />
        <Typography variant="small-regular">{request.itemName}</Typography>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <View style={styles.detail}>
            <Typography variant="small-regular" style={{flex:1}}>Date:</Typography>
            <Typography variant="small-regular" style={{flex:1}}>{request.RequestedDateTime}</Typography>
          </View>
          <View style={styles.detail}>
            <Typography variant="small-regular" style={{flex:1}}>Item Type:</Typography>
            <Typography variant="small-regular" style={{flex:1}}>{request.ItemType}</Typography>
          </View>
          <View style={styles.detail}>
            <Typography variant="small-regular" style={{flex:1}}>Room Number:</Typography>
            <Typography variant="small-regular" style={{flex:1}}>{request.RoomName}</Typography>
          </View>
          <View style={styles.detail}>
            <Typography variant="small-regular" style={{flex:1}}>Requester:</Typography>
            <Typography variant="small-regular" style={{flex:1}}>{fullName}</Typography>
          </View>
          <View style={styles.detail}>
            <Typography variant="small-regular" style={{flex:1}}>Requester ID:</Typography>
            <Typography variant="small-regular" style={{flex:1}}>{request.requesterId}</Typography>
          </View>
          <View style={styles.detail}>
            <Typography variant="small-regular" style={{flex:1}}>Comments:</Typography>
          </View>
          <View style={styles.commentContainer}>
          <Typography variant="small-regular"> {request.Note}</Typography>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button name="Decline" type="secondary" onPress={handleDecline}/>
        <Button name="Approve" type="primary" onPress={handleApproved} />

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
