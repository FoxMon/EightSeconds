import styled from "styled-components";
import GlobalTheme from "@/styles/theme";
interface ButtonProps {
  width?: string;
}

export const BigTitle = styled.h1`
  margin-left: 2rem;

  font-size: ${GlobalTheme.fontSize.moreBig};
`;
export const ModalTitle = styled.h1`
  margin-top: 2rem;

  font-size: ${GlobalTheme.fontSize.big};
`;

export const MediumTitle = styled.div`
  margin-left: 3.5rem;
  font-weight: bold;
  line-height: 1.4;
  font-size: ${GlobalTheme.fontSize.littleBig};
`;

export const MediumSubTitle = styled.div`
  margin-left: 3.5rem;
  font-size: ${GlobalTheme.fontSize.littleBig};
  color: ${GlobalTheme.colors.gray};
  display: flex;
  gap: 1rem;
`;

export const TextOne = styled.p`
  font-weight: bold;
  overflow: hidden;
  font-size: ${GlobalTheme.fontSize.medium};
  line-height: 1.4;
  margin: 0;
`;

export const TextTwo = styled.p`
  text-align: ${(props) => props.itemProp};
  font-size: ${GlobalTheme.fontSize.default};
  line-height: 1.7;
  margin: 0;
`;

export const TitleContainer = styled.div`
  padding: 2rem;
  height: 12%;
  width: 100%;
  border-bottom: solid 1px ${GlobalTheme.colors.lightTwoGray};
  margin-bottom: 2rem;
`;

export const EditButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

export const EditButton = styled.button<ButtonProps>`
  ${GlobalTheme.buttons}
  background-color:${GlobalTheme.colors.theme};
  color: ${GlobalTheme.colors.white};
  width: ${(props) => props.width};
  font-size: ${GlobalTheme.fontSize.littleBig};
  padding: 1rem 2rem;

  &:hover {
    transform: translateY(-0.3rem);
  }
  &::after {
    transform: scale(1.5);
    opacity: 0;
  }
  &:active {
    transform: translateY(-0.1rem);
  }
`;

export const BigButton = styled.button`
  ${GlobalTheme.buttons}
  background-color:${GlobalTheme.colors.theme};
  color: ${GlobalTheme.colors.white};
  width: ${(props) => props.itemProp};
  font-size: ${GlobalTheme.fontSize.big};
  cursor: pointer;
  padding: 1rem 2rem;

  &:hover {
    transform: translateY(-0.3rem);
  }
  &::after {
    transform: scale(1.5);
    opacity: 0;
  }
  &:active {
    transform: translateY(-0.1rem);
  }
`;

export const SmallButton = styled.button`
  ${GlobalTheme.buttons}
  background-color:${GlobalTheme.colors.theme};
  color: ${GlobalTheme.colors.white};
  width: ${(props) => props.itemProp};
  font-size: ${GlobalTheme.fontSize.medium};
  cursor: pointer;
  padding: 1rem 1rem;

  &:hover {
    transform: translateY(-0.3rem);
  }
  &::after {
    transform: scale(1.5);
    opacity: 0;
  }
  &:active {
    transform: translateY(-0.1rem);
  }
`;

export const MoreSmallButton = styled.button`
  ${GlobalTheme.buttons}
  background-color: ${GlobalTheme.colors.theme};
  color: ${GlobalTheme.colors.white};
  width: ${(props) => props.itemProp};
  font-size: ${GlobalTheme.fontSize.default};
  cursor: pointer;
  padding: 0.5rem 0.5rem;

  &:hover {
    transform: translateY(-0.3rem);
  }
  &::after {
    transform: scale(1.5);
    opacity: 0;
  }
  &:active {
    transform: translateY(-0.1rem);
  }
`;
