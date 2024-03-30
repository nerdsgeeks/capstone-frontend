import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  FlatList,
  Image,
  Modal,
} from "react-native";
import Typography from "../Typography/Typography";
import SearchIcon from "../../SVG/SearchIcon";
import ImageDisplay from "../ImageDisplay/ImageDisplay";
import {
  useRequestCartRoomSuppliesStore,
  useRequestCartStore,
} from "../../store/requestStore";
import CloseIcon from "../../SVG/CloseIcon";
import PlusIcon from "../../SVG/PlusIcon";
import MinusIcon from "../../SVG/MinusIcon";
import RequestedItemsList from "../RequestedItemsList/RequestedItemsList";
import useBaseUrl from "../../hooks/useBaseUrl";
import axios from "axios";
import { SelectList } from "react-native-dropdown-select-list";
import { colors } from "../../../themes/themes";
import {
  useAccessTokenStore,
  useEmployeeDetailsStore,
} from "../../store/employeeStore";
import { useWindowDimensions } from "react-native";
import Button from "../Button/Button";
import Counter from "../Counter/Counter";

const RequestItemSearchRoomSupplies = ({
  headerText,
  roomDetails,
  items,
  navigation,
}) => {
  const { width } = useWindowDimensions();
  const imageWidth = (width - 2 * 26 - 16) / 3;
  const requestedItemsCartRoomSuppliesStore = useRequestCartRoomSuppliesStore(
    (state) => state.requestedItemsCartRoomSuppliesStore,
  );
  const updateRequestedItemsCartRoomSuppliesStore =
    useRequestCartRoomSuppliesStore(
      (state) => state.updateRequestedItemsCartRoomSuppliesStore,
    );
  const [selectedItem, setSelectedItem] = useState({});
  const [requestedItemsCart, setRequestedItemsCart] = useState(
    requestedItemsCartRoomSuppliesStore,
  );
  // console.log("items:");
  // console.log(items);

  const [isRequestAddToCartModalOpen, setIsRequestAddToCartModalOpen] =
    useState(false);
  const [isRequestHelpModalTextFocused, setIsRequestHelpModalTextFocused] =
    useState(false);
  const [showItemsList, setShowItemsList] = useState(true);
  const [count, setCount] = useState(0);
  const [modalNoteText, setModalNoteText] = useState("");
  const baseUrl = useBaseUrl();
  const [assignedRooms, setAssignedRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("");

  const accessTokenStore = useAccessTokenStore(
    (state) => state.accessTokenStore,
  );
  const updateAccessTokenStore = useAccessTokenStore(
    (state) => state.updateAccessTokenStore,
  );

  const employeeDetailsStore = useEmployeeDetailsStore(
    (state) => state.employeeDetailsStore,
  );
  const updateEmployeeDetailsStore = useEmployeeDetailsStore(
    (state) => state.updateEmployeeDetailsStore,
  );

  const handlemodalNoteTextChange = (text) => {
    setModalNoteText(text);
  };

  const updateSelectedItemWithNote = () => {
    const updatedSelectedItem = { ...selectedItem, note: modalNoteText };
    setSelectedItem(updatedSelectedItem);
  };

  const handleIncrement = () => {
    console.log("handleIncrement");
    setCount(count + 1);
  };
  const handleDecrement = () => {
    console.log("handleDecrement");
    setCount(count - 1);
  };

  const toggleRequestAddToCartModal = () => {
    console.log(isRequestAddToCartModalOpen);
    setIsRequestAddToCartModalOpen(!isRequestAddToCartModalOpen);
  };

  const onPressItem = (item) => {
    setSelectedItem(item);
    setCount(0);
    toggleRequestAddToCartModal();
  };

  const onFocusSearchInput = () => {
    setIsRequestHelpModalTextFocused(true);
    setShowItemsList(true);
  };

  const onBlurSearchInput = () => {
    setIsRequestHelpModalTextFocused(false);
    setShowItemsList(false);
  };

  const onOrderPressed = () => {
    console.log("onOrderPressed");
    updateRequestedItemsCartRoomSuppliesStore(requestedItemsCart);
    // navigation.navigate("RoomDetail", { roomDetails: roomDetails });
    navigation.goBack();
  };

  const onRequestAddToCartModalSubmitPressed = () => {
    // console.log("selectedItem");
    // console.log(selectedItem);
    // console.log("roomDetails");
    // console.log(roomDetails);
    const requestedItem = {
      RequestedItemID: selectedItem.ID,
      ImageUrl: selectedItem.ImageUrl,
      ItemName: selectedItem.ItemName,
      count: count,
      assignedRoomID: selectedRoom,
      Note: modalNoteText,
    };

    console.log("RequestItemSearch");
    console.log(requestedItem);
    console.log(requestedItemsCart);

    setRequestedItemsCart((currentItems) => {
      const itemIndex = currentItems.findIndex(
        (item) => item.ItemName === requestedItem.ItemName,
      );

      if (itemIndex !== -1) {
        return currentItems.map((item, index) =>
          index === itemIndex ? { ...item, ...requestedItem } : item,
        );
      } else {
        return [...currentItems, requestedItem];
      }
    });

    let tempRequestedItemsCart = requestedItemsCart;

    tempRequestedItemsCart = checkForSameItems(
      tempRequestedItemsCart,
      requestedItem,
    );

    console.log("requestedItemsCart");
    console.log(requestedItemsCart);
    console.log(tempRequestedItemsCart);
    updateRequestedItemsCartRoomSuppliesStore(tempRequestedItemsCart);
    toggleRequestAddToCartModal();
    setShowItemsList(false);
    setModalNoteText("");
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.itemContainer, { width: imageWidth }]}
      onPress={() => onPressItem(item)}
    >
      <Image
        source={{ uri: item.ImageUrl }}
        style={[styles.image, { width: imageWidth }]}
      />
      <View style={styles.itemTextContainer}>
        <Typography variant="xs-medium" style={{ textAlign: "center" }}>
          {item.ItemName}
        </Typography>
      </View>
    </TouchableOpacity>
  );

  const checkForSameItems = (currentItems, requestedItem) => {
    const itemIndex = currentItems.findIndex(
      (item) => item.ItemName === requestedItem.ItemName,
    );

    if (itemIndex !== -1) {
      return currentItems.map((item, index) =>
        index === itemIndex ? { ...item, ...requestedItem } : item,
      );
    } else {
      return [...currentItems, requestedItem];
    }
  };

  useEffect(() => {
    const apiUrl = baseUrl + "/api/assignedRooms/all";
    const config = {
      headers: {
        Authorization: `Bearer ${accessTokenStore}`,
      },
    };
    const onFetchAssignedRooms = () =>
      axios
        .get(apiUrl, config)
        .then((response) => {
          const data = response.data;

          if (data.length > 0) {
            const today = new Date().toISOString().split("T")[0];
            const filteredRooms = data.filter(
              (room) =>
                room.cleaningStatus.toUpperCase() !== "CLEANED" &&
                room.assignedDateTime &&
                room.assignedDateTime.startsWith(today),
            );

            const tempAssignedRooms = filteredRooms.map((assignedRoom) => ({
              key: assignedRoom.ID,
              value: `${assignedRoom.RoomName}`,
            }));

            setAssignedRooms(tempAssignedRooms);
            console.log("filteredRooms");
            console.log(filteredRooms);
          }
        })
        .catch((error) => {
          console.error("Error fetching assigned rooms:", error);
        });
    onFetchAssignedRooms();
  }, []);

  return (
    <View style={styles.container}>
      {/* <Button
        title="test"
        onPress={() => {
          console.log(requestedItems);
        }}
      ></Button> */}
      {/* <View style={styles.searchBoxContainer}>
        <Typography variant="xs-regular">Search</Typography>
        <View>
          <View
            style={{
              position: "absolute",
              top: 18,
              left: 10,
            }}
          >
            <SearchIcon />
          </View>

          <TextInput
            style={[styles.requestItemSearchInput]}
            placeholder="Search"
            onFocus={() => onFocusSearchInput()}
            // onBlur={() =>  onBlurSearchInput()}
          />
        </View>
      </View> */}

      <Modal
        visible={isRequestAddToCartModalOpen}
        onRequestClose={toggleRequestAddToCartModal}
        animationType="fade"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <View style={{ gap: 16, width: "100%", alignItems: "center" }}>
              <CloseIcon onPress={toggleRequestAddToCartModal} />

              <Typography variant="h4-medium">Request Items</Typography>
              <View style={styles.requestAddToCartModalImageContainer}>
                <ImageDisplay
                  type="large"
                  source={selectedItem.ImageUrl}
                  text={selectedItem.ItemName}
                />
              </View>
              <View style={styles.modalForm}>
                <Typography variant="body-medium">Room Number</Typography>
                {/* <TextInput
                    editable={false}
                    style={[
                      {
                        borderWidth: 1,
                        borderColor: "grey",
                        borderRadius: 5,
                        marginTop: 5,
                        padding: 10,
                        paddingLeft: 20,
                        height: 40,
                      },
                    ]}
                    value={roomDetails.RoomName}
                  /> */}
                <SelectList
                  setSelected={(key) => setSelectedRoom(key)}
                  data={assignedRooms}
                  save="key"
                  boxStyles={{
                    borderColor: colors.n30,
                    borderRadius: 12,
                    alignItems: "center",
                    width: "100%",
                  }}
                  dropdownStyles={{ borderRadius: 12 }}
                />
              </View>
              <View style={styles.modalForm}>
                <Typography variant="body-medium">Add Note</Typography>
                <View>
                  {!isRequestHelpModalTextFocused && (
                    <View style={{ position: "absolute", top: 12, left: 10 }}>
                      <PlusIcon fill={colors.n50} />
                    </View>
                  )}
                  <TextInput
                    style={[
                      styles.requestAddToCartModalInput,
                      {
                        padding: isRequestHelpModalTextFocused ? 2 : 10,
                        paddingLeft: isRequestHelpModalTextFocused ? 20 : 36,
                        height: 44,
                      },
                    ]}
                    placeholder="Note"
                    onFocus={() => setIsRequestHelpModalTextFocused(true)}
                    onBlur={() => {
                      setIsRequestHelpModalTextFocused(false);
                      updateSelectedItemWithNote();
                    }}
                    onChangeText={handlemodalNoteTextChange} // Update state on text change
                    value={modalNoteText}
                  />
                </View>
              </View>
              <View style={styles.requestAddToCartModalQuantityCounter}>
                <Counter
                  handleIncrement={handleIncrement}
                  handleDecrement={handleDecrement}
                  count={count}
                />
              </View>
              <Button
                name="Add to Cart"
                type="primary"
                onPress={onRequestAddToCartModalSubmitPressed}
                style={{ marginTop: 30,}}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* {showItemsList ? ( */}
      <View style={styles.listItemsContainer}>
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.ID}
          numColumns={3}
          contentContainerStyle={styles.list}
          columnWrapperStyle={styles.columnWrapper}
        />
        {/* </ScrollView> */}
      </View>
      {/* ) : (
        <View style={styles.requestedItemsCartContainer}>
          <RequestedItemsList items={requestedItemsCart}></RequestedItemsList>

          <TouchableOpacity
            style={styles.requestAddToCartModalButton}
            onPress={onOrderPressed}
          >
            <Text style={styles.requestAddToCartModalButtonText}>Order</Text>
          </TouchableOpacity>
        </View>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    width: "90%",
    paddingVertical: 24,
  },
  itemTextContainer: {
    height: 36,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 8,
  },
  itemContainer: {
    gap: 6,
    alignItems: "center",
    // margin: 10,
    // height: 100,
  },
  image: {
    flex: 1,
    aspectRatio: 1,
    resizeMode: "cover",
    borderRadius: 6,
  },
  listItemsContainer: {
    marginBottom: 60,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    paddingHorizontal: 26,
  },
  modalView: {
    backgroundColor: "white",
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 50,
    paddingVertical: 24,
    borderRadius: 20,
  },
  modalForm: {
    width: "100%",
    gap: 6,
    paddingTop: 10,
  },
  // requestAddToCartModalContainer: {
  //   width: 240,
  //   backgroundColor: "white",
  //   padding: 20,
  //   borderRadius: 10,
  //   alignItems: "center",
  //   rowGap: 32,
  //   paddingTop: 0,
  //   top: -26,
  // },
  requestAddToCartModalHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  requestAddToCartModalSubHeaderText: {
    fontSize: 16,
    color: "grey",
  },
  requestAddToCartModalImageContainer: { rowGap: 10 },
  requestAddToCartModalInput: {
    borderWidth: 1,
    borderColor: colors.n30,
    borderRadius: 12,
  },
  requestAddToCartModalButton: {
    backgroundColor: "#8FDEDE",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  requestAddToCartModalButtonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  requestAddToCartModalQuantityCounter: {
    rowGap: 6,
  },
  counterContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },

  requestedItemsCartContainer: {},
});

export default RequestItemSearchRoomSupplies;
