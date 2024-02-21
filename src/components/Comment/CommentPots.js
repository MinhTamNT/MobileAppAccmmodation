import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import { styleComment } from "./CommentStyle";
import { StyleDefault } from "../StyleDeafult/StyleDeafult";
import { COLOR } from "../../contants";
import moment from "moment";
const CommentPosts = ({ comment, setComments }) => {
  const [replyText, setReplyText] = useState("");
  const [isReplying, setIsReplying] = useState(false);
  console.log("Comment Post", comment);

  return (
    <>
      {comment?.map((commentItem) => (
        <View key={commentItem.id} style={styleComment.container}>
          <View style={styleComment.userComment}>
            <Image
              source={{ uri: commentItem?.user_comment?.avatar_user }}
              style={styleComment.avatar_user}
            />
            <View style={{ marginLeft: 10 }}>
              <Text>{commentItem?.user_comment?.username}</Text>
              <Text>{commentItem.text}</Text>
              <View style={[StyleDefault.flexBoxRow, { marginTop: 5 }]}>
                <Text style={{ color: COLOR.text_weak_color, fontSize: 14 }}>
                  {moment(commentItem.created_at).fromNow()}
                </Text>
                <TouchableOpacity>
                  <Text style={{ color: COLOR.text_weak_color, fontSize: 14 }}>
                    Reply
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {isReplying && (
            <View style={styleComment.replyContainer}>
              <TextInput
                placeholder="Type your reply..."
                value={replyText}
                onChangeText={(text) => setReplyText(text)}
                style={styleComment.replyInput}
                placeholderTextColor={"#333"}
              />
              <TouchableOpacity>
                <Text style={styleComment.sendReplyButton}>Send</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ))}
    </>
  );
};

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};

export default CommentPosts;
