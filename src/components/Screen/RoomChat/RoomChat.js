import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { ArrowLeft2 } from "iconsax-react-native";
import { StyleDefault } from "../../StyleDeafult/StyleDeafult";
import InputField from "../../InputFields/InputField";
import { styleFields } from "../../InputFields/InputFieldStyle";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  addDoc,
  collection,
  query,
  orderBy,
  serverTimestamp,
  onSnapshot,
  QuerySnapshot,
  doc,
} from "firebase/firestore";
import { FIRESTORE_DB } from "../../../Services/firebaseConfig";
import { styleRoomChat } from "./RoomChatStyle";
const RoomChat = ({ route }) => {
  const { userId } = route?.params;
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [chat, setChats] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const chatRef = collection(FIRESTORE_DB, "chat");
    const orderedChatRef = query(chatRef, orderBy("_id", "desc"));

    const unsubscribe = onSnapshot(orderedChatRef, (querySnapshot) => {
      const chatRooms = querySnapshot.docs.map((doc) => doc.data());
      setChats(chatRooms);
    });

    return () => {
      unsubscribe();
    };
  }, [userId.id]);

  const sendMessage = async () => {
    const timestamp = serverTimestamp();
    const id = `${Date.now()}`;

    // Replace `room` and `room_.id` with the correct variables from your data
    const _doc = {
      _id: id,
      roomId: userId.id, // Replace with the correct roomId from your data
      timestamp: timestamp,
      message: messageInput,
      user: userId,
    };

    setMessageInput("");

    try {
      // Replace with the correct collection path
      const chatCollectionRef = collection(FIRESTORE_DB, "chat");

      // Add a new message to the Firestore collection
      await addDoc(chatCollectionRef, _doc);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <View style={styleRoomChat.wrapper}>
      <View style={styleRoomChat.header}>
        <View style={styleRoomChat.header_content}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft2 size="24" color="#d9e3f0" />
          </TouchableOpacity>
          <Image
            source={{ uri: userId.avatar_user || "" }}
            style={StyleDefault.imageUserPost}
          />
        </View>
      </View>
      <View style={styleRoomChat.wrapper_content}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={160}
        >
          <ScrollView>
            {isLoading ? (
              <View
                style={{
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ActivityIndicator size={"large"} color={"#43C651"} />
              </View>
            ) : (
              <>{/* message */}</>
            )}
          </ScrollView>
          <View style={styleRoomChat.contentAction}>
            <InputField
              placeholder={"Type here ....."}
              style={styleFields.message}
            />
            <TouchableOpacity
              onPress={sendMessage}
              style={{ position: "absolute", right: 12, top: 36 }}
            >
              <FontAwesome name="send" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default RoomChat;
