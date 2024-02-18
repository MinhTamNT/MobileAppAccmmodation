import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import PostApproved from "../../SuggestPost/PostApproved/PostApproved";

const TabViewPostAccept = () => {
  return (
    <ScrollView style={styles.container}>
      <PostApproved />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default TabViewPostAccept;
