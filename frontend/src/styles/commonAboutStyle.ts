import styled from "styled-components";
import GlobalTheme from "@/styles/theme";

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${(props) => props.itemProp};
  gap: 2rem;
`;

export const AboutTitle = styled.div`
  font-size: ${GlobalTheme.fontSize.titleSize};
  font-family: ${GlobalTheme.fontStyle.bold};
`;

export const TitleHighlight = styled.span`
  color: ${GlobalTheme.colors.theme};
`;

export const AboutTitleContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  font-size: ${GlobalTheme.fontSize.big2};
`;

export const AboutImage = styled.img`
  width: 40rem;
`;

export const BoldStyle = styled.span`
  font-family: ${GlobalTheme.fontStyle.bold};
`;

export const TextOne = styled.p`
  font-weight: bold;
  font-size: ${GlobalTheme.fontSize.big};
  line-height: 1.4;
`;

export const TextTwo = styled.p`
  text-align: ${(props) => props.itemProp};
  font-size: ${GlobalTheme.fontSize.littleBig2};
  margin-top: 2.4rem;
  line-height: 1.7;
`;
