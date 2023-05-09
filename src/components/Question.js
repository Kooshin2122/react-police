import React, { useState, createRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import {
  Button,
  withTheme,
  Surface,
  Card,
  Title,
  Divider,
  Paragraph,
  Subheading,
  RadioButton,
} from "react-native-paper";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import * as quizActions from "../actions/QuizActions";

import { baseEndpoint } from "../api/endpoints";
import { endpointforadmin } from "../api/endpoints";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function Question(props) {
  const { theme, question, currentIndex } = props;
  const dispatch = useDispatch();

  const [checked, setChecked] = React.useState("");
  React.useEffect(() => {
    if (checked !== question.submitOption) {
      setChecked(question.submitOption);
    }
  }, [question.questionid]);

  let imageQuestion = "";
  if (question.qtype === "I") {
    const questionParts = question.qoriginal.split("_");
    //imageQuestion = `${baseEndpoint}adminPanel/qbankImages/${questionParts[0]}/${questionParts[1]}/${questionParts[2]}/${question.question}`;
    imageQuestion = `${endpointforadmin}qbankImages/${questionParts[0]}/${questionParts[1]}/${questionParts[2]}/${question.question}`;
  }

  function changeAnswer(newAnswer) {
    setChecked(newAnswer);
    dispatch(
      quizActions.updateQuizQuestions({
        testId: question.TestId,
        stdId: question.stdId,
        questionId: question.questionid,
        submitValue: newAnswer,
      })
    );
  }

  function RenderOptions() {
    if (question.questionType == "M") {
      return (
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Text style={{ alignSelf: "center" }}>a )</Text>
            <RadioButton
              value="first"
              status={checked === "A" ? "checked" : "unchecked"}
              onPress={() => changeAnswer("A")}
            />
            <Text style={{ alignSelf: "center", fontWeight: "bold" }}>
              {question.Option1}
            </Text>
          </View>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Text style={{ alignSelf: "center" }}>b )</Text>
            <RadioButton
              value="first"
              status={checked === "B" ? "checked" : "unchecked"}
              onPress={() => changeAnswer("B")}
            />
            <Text style={{ alignSelf: "center", fontWeight: "bold" }}>
              {question.Option2}
            </Text>
          </View>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Text style={{ alignSelf: "center" }}>c )</Text>
            <RadioButton
              value="first"
              status={checked === "C" ? "checked" : "unchecked"}
              onPress={() => changeAnswer("C")}
            />
            <Text style={{ alignSelf: "center", fontWeight: "bold" }}>
              {question.Option3}
            </Text>
          </View>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Text style={{ alignSelf: "center" }}>d )</Text>
            <RadioButton
              value="first"
              status={checked === "D" ? "checked" : "unchecked"}
              onPress={() => changeAnswer("D")}
            />
            <Text style={{ alignSelf: "center", fontWeight: "bold" }}>
              {question.Option4}
            </Text>
          </View>
        </View>
      );
    }
    if (question.questionType == "T") {
      return (
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Text style={{ alignSelf: "center" }}>a )</Text>
            <RadioButton
              value="first"
              status={checked === "T" ? "checked" : "unchecked"}
              onPress={() => changeAnswer("T")}
            />
            <Text style={{ alignSelf: "center", fontWeight: "bold" }}>
              {question.Option1}
            </Text>
          </View>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Text style={{ alignSelf: "center" }}>b )</Text>
            <RadioButton
              value="first"
              status={checked === "F" ? "checked" : "unchecked"}
              onPress={() => changeAnswer("F")}
            />
            <Text style={{ alignSelf: "center", fontWeight: "bold" }}>
              {question.Option2}
            </Text>
          </View>
        </View>
      );
    }

    return <View />;
  }
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <Text>{`Q${currentIndex}  `}</Text>
        <View style={{ flex: 1 }}>
          {question.qtype === "I" ? (
            <Image
              style={{
                flex: 1,
                width: windowWidth - 40,
                height: 100,
                alignContent: "flex-start",
              }}
              source={{
                uri: imageQuestion,
              }}
              resizeMode="contain"
            />
          ) : (
            <Text>{question.question}</Text>
          )}
        </View>
      </View>
      <RenderOptions />
    </View>
  );
}

export default withTheme(Question);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
