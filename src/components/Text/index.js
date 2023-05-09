import * as React from "react";

import {
  Text as RNPText,
  Title as RNPTitle,
  Subheading as RNPSubheading,
  Headline as RNPHeadline,
  Paragraph as RNPParagraph,
  Caption as RNPCaption,
} from "react-native-paper";
import { useSelector } from "react-redux";

export function Text(props) {
  const fontSize = useSelector((state) => state.common.fontSize);

  return (
    <RNPText {...props} style={[props.style, { fontSize: 16 + fontSize }]}>
      {props.children}
    </RNPText>
  );
}

export function Title(props) {
  const fontSize = useSelector((state) => state.common.fontSize);

  return (
    <RNPTitle {...props} style={[props.style, { fontSize: 20 + fontSize }]}>
      {props.children}
    </RNPTitle>
  );
}

export function Subheading(props) {
  const fontSize = useSelector((state) => state.common.fontSize);

  return (
    <RNPSubheading
      {...props}
      style={[props.style, { fontSize: 16 + fontSize }]}
    >
      {props.children}
    </RNPSubheading>
  );
}

export function Headline(props) {
  const fontSize = useSelector((state) => state.common.fontSize);

  return (
    <RNPHeadline {...props} style={[props.style, { fontSize: 24 + fontSize }]}>
      {props.children}
    </RNPHeadline>
  );
}

export function Paragraph(props) {
  const fontSize = useSelector((state) => state.common.fontSize);

  return (
    <RNPParagraph {...props} style={[props.style, { fontSize: 14 + fontSize }]}>
      {props.children}
    </RNPParagraph>
  );
}

export function Caption(props) {
  const fontSize = useSelector((state) => state.common.fontSize);

  return (
    <RNPCaption {...props} style={[props.style, { fontSize: 12 + fontSize }]}>
      {props.children}
    </RNPCaption>
  );
}
