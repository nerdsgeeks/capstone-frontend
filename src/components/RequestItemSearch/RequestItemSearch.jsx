import React, { useState } from "react";
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
  Button,
} from "react-native";
import Typography from "../Typography/Typography";
import SearchIcon from "../../SVG/SearchIcon";
import ImageDisplay from "../ImageDisplay/ImageDisplay";
import { useRequestCartStore } from "../../store/requestStore";
import CloseIcon from "../../SVG/CloseIcon";
import PlusIcon from "../../SVG/PlusIcon";
import MinusIcon from "../../SVG/MinusIcon";
import RequestedItemsList from "../RequestedItemsList/RequestedItemsList";

const RequestItemSearch = ({ headerText, roomDetails, items, navigation }) => {
  const requestedItemsCartStore = useRequestCartStore(
    (state) => state.requestedItemsCartStore,
  );
  const updateRequestedItemsCartStore = useRequestCartStore(
    (state) => state.updateRequestedItemsCartStore,
  );
  const [selectedItem, setSelectedItem] = useState({});
  const [requestedItemsCart, setRequestedItemsCart] = useState(
    requestedItemsCartStore,
  );
  // console.log("items:");
  // console.log(items);

  const [isRequestAddToCartModalOpen, setIsRequestAddToCartModalOpen] =
    useState(false);
  const [isRequestHelpModalTextFocused, setIsRequestHelpModalTextFocused] =
    useState(false);
  const [showItemsList, setShowItemsList] = useState(true);
  const [count, setCount] = useState(0);
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
    updateRequestedItemsCartStore(requestedItemsCart);
    // navigation.navigate("RoomDetail", { roomDetails: roomDetails });
    navigation.goBack();
  };

  const onRequestAddToCartModalSubmitPressed = () => {
    console.log("selectedItem");
    console.log(selectedItem);
    console.log("roomDetails");
    console.log(roomDetails);
    const requestedItem = {
      ImageUrl: selectedItem.ImageUrl,
      ItemName: selectedItem.ItemName,
      count: count,
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
    updateRequestedItemsCartStore(tempRequestedItemsCart);
    toggleRequestAddToCartModal();
    setShowItemsList(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => onPressItem(item)}
    >
      <Image source={{ uri: item.ImageUrl }} style={styles.image} />
      <Typography variant="xs-medium">{item.ItemName}</Typography>
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

  return (
    <View style={styles.container}>
      {/* <Button
        title="test"
        onPress={() => {
          console.log(requestedItems);
        }}
      ></Button> */}
      <View style={styles.searchBoxContainer}>
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
      </View>

      <Modal
        visible={isRequestAddToCartModalOpen}
        onRequestClose={toggleRequestAddToCartModal}
        animationType="fade"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <CloseIcon onPress={toggleRequestAddToCartModal} />
            <View style={styles.requestAddToCartModalContainer}>
              <Typography variant="h5-black">Request Items</Typography>

              <View style={styles.requestAddToCartModalImageContainer}>
                <ImageDisplay type="large" source={selectedItem.ImageUrl} />
                <Typography variant="body-regular">
                  {selectedItem.ItemName}
                </Typography>
              </View>
              <View style={styles.requestAddToCartModalNoteSection}>
                <Text style={styles.requestAddToCartModalNoteLabel}>
                  Add Note
                </Text>
                <View>
                  {!isRequestHelpModalTextFocused && (
                    <View style={{ position: "absolute", top: 15, left: 10 }}>
                      <PlusIcon />
                    </View>
                  )}

                  <TextInput
                    multiline
                    style={[
                      styles.requestAddToCartModalInput,
                      {
                        padding: isRequestHelpModalTextFocused ? 2 : 10,
                        paddingLeft: isRequestHelpModalTextFocused ? 20 : 36,
                        height: isRequestHelpModalTextFocused ? 80 : 40,
                      },
                    ]}
                    placeholder="Note"
                    onFocus={() => setIsRequestHelpModalTextFocused(true)}
                    onBlur={() => setIsRequestHelpModalTextFocused(false)}
                  />
                </View>
              </View>

              <View style={styles.requestAddToCartModalQuantityCounter}>
                <Typography variant="body-medium">Quantity</Typography>

                <View style={styles.counterContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={handleDecrement}
                  >
                    <MinusIcon></MinusIcon>
                  </TouchableOpacity>

                  <Typography variant="body-medium">{count}</Typography>

                  <TouchableOpacity
                    style={styles.button}
                    onPress={handleIncrement}
                  >
                    <PlusIcon></PlusIcon>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                style={styles.requestAddToCartModalButton}
                onPress={onRequestAddToCartModalSubmitPressed}
              >
                <Text style={styles.requestAddToCartModalButtonText}>
                  Add to Cart
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* {showItemsList ? ( */}
      <View style={styles.listItemsContainer}>
        {/* <Typography variant="h6-black">{headerText}</Typography> */}
        {/* <ScrollView style={styles.listItems}> */}
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.ID}
          numColumns={3}
          contentContainerStyle={styles.list}
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
    rowGap: 16,
  },
  searchBoxContainer: {
    width: "90%",
    alignSelf: "center",
  },
  requestHelpModalNoteLabel: {
    fontSize: 14,
  },
  requestItemSearchInput: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 10,
    marginTop: 5,
    padding: 10,
    paddingLeft: 36,
    height: 40,
  },
  listItemsContainer: {
    rowGap: 16,
    marginBottom: 180,
  },
  listItems: {
    rowGap: 16,
  },
  list: {
    paddingHorizontal: 10,
  },
  itemContainer: {
    flex: 1,
    flexDirection: "column",
    margin: 10,
    height: 100,
  },
  image: {
    flex: 1,
    aspectRatio: 1,
    resizeMode: "cover",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
    justifyContent: "center",
    alignItems: "center",
    height: 600,
  },
  modalView: {
    height: 540,
    width: 290,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 35,
    paddingHorizontal: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  requestAddToCartModalContainer: {
    width: 240,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    rowGap: 10,
    paddingTop: 0,
    top: -26,
  },
  requestAddToCartModalHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  requestAddToCartModalSubHeaderText: {
    fontSize: 16,
    color: "grey",
  },
  requestAddToCartModalImageContainer: {},
  requestAddToCartModalImage: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
  requestAddToCartModalNoteSection: {
    width: "100%",
  },
  requestAddToCartModalNoteLabel: {
    fontSize: 14,
  },
  requestAddToCartModalInput: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5,
    marginTop: 5,
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

export default RequestItemSearch;
