// Comment.js
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import { useSelector } from "react-redux";
import { styleComment } from "./CommentStyle";
import InputField from "../InputFields/InputField";
import { styleFields } from "../InputFields/InputFieldStyle";
import { StyleDefault } from "../StyleDeafult/StyleDeafult";
import { COLOR } from "../../contants";

const Comment = ({ comment, setComments }) => {
  const user = useSelector((state) => state.user.user.currentUser);
  const [replyText, setReplyText] = useState("");
  const [isReplying, setIsReplying] = useState(false);

  const handleReply = () => {
    setIsReplying(!isReplying);
  };

  const handleSendReply = () => {
    if (!comment || !comment.replies) {
      return;
    }

    const newReply = {
      id: comment.replies.length + 1,
      userId: user.id,
      text: replyText,
      timestamp: Date.now(),
      replies: [], // Initialize an empty array for replies to the reply
    };

    const updatedReplies = [...comment.replies, newReply];

    setComments((prevComments) => {
      if (!prevComments) {
        return;
      }

      const updatedComments = prevComments.map((c) => {
        if (c.id === comment.id) {
          // Update the replies for the current comment
          return { ...c, replies: updatedReplies };
        }

        // If this comment has replies, update them recursively
        if (c.replies && c.replies.length > 0) {
          return {
            ...c,
            replies: updateReplies(c.replies, comment.id, updatedReplies),
          };
        }

        return c;
      });

      return updatedComments;
    });

    setReplyText("");
    setIsReplying(false);
  };

  // Helper function to update replies recursively
  const updateReplies = (replies, targetCommentId, newReply) => {
    return replies.map((reply) => {
      if (reply.id === targetCommentId) {
        return { ...reply, replies: [...reply.replies, newReply] };
      }

      // If this reply has more replies, update them recursively
      if (reply.replies && reply.replies.length > 0) {
        return {
          ...reply,
          replies: updateReplies(reply.replies, targetCommentId, newReply),
        };
      }

      return reply;
    });
  };

  return (
    <View key={comment.id} style={styleComment.container}>
      <View style={styleComment.userComment}>
        <Image
          source={{ uri: user.avatar_user }}
          style={styleComment.avatar_user}
        />
        <View style={{ marginLeft: 10 }}>
          <Text>{user.first_name}</Text>
          <Text>{comment.text}</Text>
          <View style={[StyleDefault.flexBoxRow, { marginTop: 5 }]}>
            <Text style={{ color: COLOR.text_weak_color, fontSize: 14 }}>
              Vừa gửi
            </Text>
            <TouchableOpacity onPress={handleReply}>
              <Text style={{ color: COLOR.text_weak_color, fontSize: 14 }}>
                Reply
              </Text>
            </TouchableOpacity>
          </View>
          {comment.replies &&
            comment.replies.map((reply, index) => (
              <Comment key={index} comment={reply} setComments={setComments} />
            ))}
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
          <TouchableOpacity onPress={handleSendReply}>
            <Text style={styleComment.sendReplyButton}>Send</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};

export default Comment;
