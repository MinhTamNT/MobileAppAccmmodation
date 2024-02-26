import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import { styleComment } from "./CommentStyle";
import { StyleDefault } from "../StyleDeafult/StyleDeafult";
import { COLOR } from "../../contants";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";

const Comment = ({ comment, currentUserId, onDeleteComment, onSendReply }) => {
  const [replyText, setReplyText] = useState("");
  const dispatch = useDispatch();
  const [isReplying, setIsReplying] = useState(null);
  console.log("Componets comment", comment);
  const handleSendReply = async (commentId, replyId) => {
    const form = new FormData();
    const relyComment = {
      text: replyText,
    };
    form.append("text", relyComment.text);

    try {
      await onSendReply(commentId, replyId, form);
      setReplyText("");
      setIsReplying(false);
    } catch (error) {
      console.error("Error replying to comment:", error);
    }
  };

  useEffect(() => {}, [comment]);

  const handleDeleteComment = async (commentID) => {
    await onDeleteComment(commentID);
    Toast.show({
      type: "success",
      text1: "Success Comment",
      position: "top",
    });
  };

  const renderReplyComments = (replyComments, parentCommentId) => {
    return replyComments.map((reply, index) => (
      <View
        key={reply.id}
        style={[
          styleComment.replyContainer,
          index !== replyComments.length - 1 && { marginBottom: 8 },
        ]}
      >
        <View style={StyleDefault.flexBoxRow}>
          <Image
            source={{ uri: reply.user_comment.avatar_user }}
            style={styleComment.avatar_user}
          />

          <View>
            <View>
              <Text>{reply.user_comment.username}</Text>
              <Text>{reply.text}</Text>

              <View style={StyleDefault.flexBoxRow}>
                <Text style={{ color: COLOR.text_weak_color, fontSize: 14 }}>
                  {moment(reply.created_at).fromNow()}
                </Text>
                <TouchableOpacity onPress={() => setIsReplying(reply.id)}>
                  <Text style={{ color: COLOR.text_weak_color, fontSize: 14 }}>
                    Reply
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {currentUserId === reply.user_comment.id  && (
              <TouchableOpacity
                style={{ position: "absolute", right: -160 }}
                onPress={() => handleDeleteComment(reply.id)}
              >
                <Text style={{ color: "red" }}>Delete</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        {isReplying === reply.id && (
          <View style={StyleDefault.flexBoxRow}>
            <TextInput
              placeholder={`Reply to ${reply.user_comment.username}...`}
              value={replyText}
              onChangeText={(text) => setReplyText(text)}
              style={styleComment.replyInput}
              placeholderTextColor={"#333"}
            />
            <TouchableOpacity
              onPress={() => handleSendReply(parentCommentId, reply.id)}
            >
              <Text style={styleComment.sendReplyButton}>Send</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    ));
  };

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
                <TouchableOpacity onPress={() => setIsReplying(commentItem.id)}>
                  <Text style={{ color: COLOR.text_weak_color, fontSize: 14 }}>
                    Reply
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {isReplying === commentItem.id && (
            <View style={styleComment.replyContainers}>
              <TextInput
                placeholder="Type your reply..."
                value={replyText}
                onChangeText={(text) => setReplyText(text)}
                style={styleComment.replyInput}
                placeholderTextColor={"#333"}
              />
              <TouchableOpacity
                style={styleComment.btnAction}
                onPress={() => handleSendReply(commentItem.id)}
              >
                <Text style={styleComment.sendReplyButton}>Send</Text>
              </TouchableOpacity>
            </View>
          )}
          {commentItem.reply_comment.length > 0 && (
            <View style={styleComment.replySection}>
              {renderReplyComments(commentItem.reply_comment, commentItem.id)}
            </View>
          )}
        </View>
      ))}
    </>
  );
};

export default Comment;
