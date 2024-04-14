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
  KeyboardAvoidingView,
} from "react-native";
import Typography from "../Typography/Typography";
import SearchIcon from "../../SVG/SearchIcon";
import ImageDisplay from "../ImageDisplay/ImageDisplay";
import { useRequestCartStore } from "../../store/requestStore";
import CloseIcon from "../../SVG/CloseIcon";
import PlusIcon from "../../SVG/PlusIcon";
import MinusIcon from "../../SVG/MinusIcon";
import RequestedItemsList from "../RequestedItemsList/RequestedItemsList";
import Button from "../Button/Button";
import Close from "../../SVG/Close";
import { useWindowDimensions } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import SupervisorRoomHeader from "../../components/SupervisorRoomHeader/SupervisorRoomHeader";
import BackIcon from "../../SVG/BackIcon";
import { colors } from "../../../themes/themes";

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
  const [modalNoteText, setModalNoteText] = useState("");
  const [itemsFiltered, setItemsFiltered] = useState(items);
  const [searchQuery, setSearchQuery] = useState("");
  const { width } = useWindowDimensions();
  const imageWidth = (width - 2 * 26 - 30) / 3;

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
    updateRequestedItemsCartStore(requestedItemsCart);
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
      assignedRoomID: roomDetails.ID,
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
    updateRequestedItemsCartStore(tempRequestedItemsCart);
    toggleRequestAddToCartModal();
    setShowItemsList(false);
    setModalNoteText("");
  };

  // const renderItem = ({ item }) => (
  //   <TouchableOpacity
  //     style={styles.itemContainer}
  //     onPress={() => onPressItem(item)}
  //   >
  //     <Image source={{ uri: item.ImageUrl }} style={styles.image} />
  //     <Typography variant="xs-medium">{item.ItemName}</Typography>
  //   </TouchableOpacity>
  // );
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
  const clearSearch = () => {
    console.log("clearSearch");
    setSearchQuery("");
  };

  useEffect(() => {
    const filtered = items.filter((item) =>
      item.ItemName.toUpperCase().includes(searchQuery.toUpperCase()),
    );
    setItemsFiltered(filtered);
  }, [searchQuery, items]);

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaProvider style={{ flexDirection: "row" }}>
      <View style={styles.container}>
        {/* <LinearGradient
          colors={["#F89C7B", "#FFD9A5", "#FEDEB3", "#F9F9F9"]}
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 1.0, y: 1.0 }}
          locations={[0.01, 0.7, 0.92, 1.0]}
          style={styles.headerContainer}
        >
          <SafeAreaView>
            <SupervisorRoomHeader
              title={
                <View
                  style={{ flexDirection: "row", gap: 6, alignItems: "center" }}
                >
                  <TouchableOpacity onPress={goBack}>
                    <BackIcon />
                  </TouchableOpacity>
                  <Typography variant="h4-medium">Request Item</Typography>
                </View>
              }
            />
          </SafeAreaView>
        </LinearGradient> */}
        <View style={styles.searchBoxContainer}>
          <Typography variant="body-regular">Search</Typography>
          <View>
            <View
              style={{
                position: "absolute",
                top: 16,
                left: 10,
              }}
            >
              <SearchIcon w="24" h="24" fill={colors.n30} />
            </View>
            {searchQuery.length > 0 && (
              <TouchableOpacity
                style={{ position: "absolute", top: 16, right: 10, zIndex: 10 }}
                onPress={clearSearch}
              >
                <Close stroke={colors.n30}></Close>
              </TouchableOpacity>
            )}
            <TextInput
              style={[styles.requestItemSearchInput]}
              placeholder="Search"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onFocus={onFocusSearchInput}
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
              <View style={{ gap: 16, width: "100%", alignItems: "center" }}>
                <CloseIcon onPress={toggleRequestAddToCartModal} />
                <Typography variant="h4-medium">Request Items</Typography>
                <View style={styles.requestAddToCartModalImageContainer}>
                  <ImageDisplay
                    type="large"
                    source={selectedItem.ImageUrl}
                    text={selectedItem.ItemName}
                  />
                  {/* <Typography
                      variant="body-regular"
                      style={{ textAlign: "center" }}
                    >
                      {selectedItem.ItemName}
                    </Typography> */}
                </View>
                <View style={styles.requestAddToCartModalRoomNumberSection}>
                  {/* <Text style={styles.requestAddToCartModalNoteLabel}>
                      Room Number
                    </Text> */}
                  <Typography variant="body-medium"> Room Number</Typography>
                  <TextInput
                    editable={false}
                    style={[
                      {
                        borderWidth: 1,
                        borderColor: colors.n30,
                        borderRadius: 12,
                        marginTop: 6,
                        // padding: 10,
                        paddingLeft: 20,
                        height: 44,
                      },
                    ]}
                    value={roomDetails.RoomName}
                  />
                </View>
                <View style={styles.requestAddToCartModalNoteSection}>
                  {/* <Text style={styles.requestAddToCartModalNoteLabel}>
                      Add Note
                    </Text> */}
                  <Typography variant="body-medium">Add Note</Typography>
                  <View>
                    {!isRequestHelpModalTextFocused && (
                      <View style={{ position: "absolute", top: 17, left: 10 }}>
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

                  {/* <View>
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
                </View> */}
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
                {/* <TouchableOpacity
                    style={styles.requestAddToCartModalButton}
                    onPress={onRequestAddToCartModalSubmitPressed}
                  >
                    <Text style={styles.requestAddToCartModalButtonText}>
                      Add to Cart
                    </Text>
                  </TouchableOpacity> */}
                <Button
                  name="Add to Cart"
                  type="primary"
                  onPress={onRequestAddToCartModalSubmitPressed}
                  style={{ marginTop: 30 }}
                />
              </View>
            </View>
          </View>
        </Modal>
        {/* {showItemsList ? ( */}
        <View style={styles.listItemsContainer}>
          {/* <Typography variant="h6-black">{headerText}</Typography> */}
          {/* <ScrollView style={styles.listItems}> */}
          <FlatList
            data={itemsFiltered}
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
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: colors.n0,
    rowGap: 16,
  },
  headerContainer: {
    width: "100%",
    borderBottomLeftRadius: 60,
    paddingHorizontal: 26,
    paddingVertical: 22,
    paddingTop: 7,
  },
  searchBoxContainer: {
    paddingHorizontal: 26,
    width: "100%",
  },
  requestHelpModalNoteLabel: {
    fontSize: 14,
  },
  requestItemSearchInput: {
    borderWidth: 1,
    borderColor: colors.n30,
    borderRadius: 12,
    marginTop: 6,
    padding: 10,
    paddingLeft: 36,
    height: 44,
  },
  listItemsContainer: {
    rowGap: 16,
    paddingBottom: 80,
    marginBottom: 32,
  },
  listItems: {
    rowGap: 16,
  },
  // list: {
  //   paddingHorizontal: 10,
  // },
  itemTextContainer: {
    height: 36,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 8,
    columnGap: 12,
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
  // listItemsContainer: {
  //   marginBottom: 60,
  // },
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
  requestAddToCartModalContainer: {
    width: 240,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    rowGap: 28,
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
  requestAddToCartModalImageContainer: { rowGap: 10 },
  requestAddToCartModalImage: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
  requestAddToCartModalNoteSection: {
    width: "100%",
  },
  requestAddToCartModalRoomNumberSection: {
    paddingTop: 14,
    width: "100%",
  },
  requestAddToCartModalNoteLabel: {
    fontSize: 14,
  },
  requestAddToCartModalInput: {
    borderWidth: 1,
    borderColor: colors.n30,
    borderRadius: 12,
    marginTop: 6,
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
    rowGap: 16,
    alignItems: "center",
    paddingTop: 14,
  },
  counterContainer: {
    flexDirection: "row",
    gap: 30,
    alignItems: "center",
    justifyContent: "space-between",
  },

  requestedItemsCartContainer: {},
});

export default RequestItemSearch;
