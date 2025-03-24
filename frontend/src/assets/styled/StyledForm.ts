import exp from "constants";
import styled from "styled-components";

interface CardBgColor {
  bgColor?: string;
}

interface ButtonColor {
  buttonColor?: string;
}

export const MainWrap = styled.div`
  display: grid;
  place-items: center;
  /* height: calc(100vh - 100px); */
`;

export const FormCard = styled.div<CardBgColor>`
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  padding: 10px;
  background-color: ${(props) => props.bgColor || "#9fc5e8"};
  border: 2px solid #2d2d2d;
  width: 100%;
  max-width: 360px;
  margin: 0 auto;
  margin-top: -100px;
  color: #191919;
  font-family: "Prompt", "sans-serif";
  @media screen and (max-width: 900px) {
    margin-top: 0;
  }
`;

export const Form = styled.form<CardBgColor>`
  display: flex;
  flex-direction: column;
  border: 2px solid #2d2d2d;
  padding: 30px 20px;
  background-color: ${(props) => props.bgColor || "#f8bd39"};
`;

export const LabelWrap = styled.div`
  margin-bottom: 20px;
`;

export const Label = styled.label`
  margin-bottom: 6px;
  margin-top: 16px;
  display: block;
  span {
    font-size: 12px;
    display: block;
  }
`;

export const Input = styled.input`
  font-size: 14px;
  padding: 8px;
  width: 100%;
  border: 2px solid #2d2d2d;
  margin-top: 8px;
  font-family: "Prompt", "sans-serif";
`;

export const Button = styled.button<ButtonColor>`
  font-weight: bold;
  background-color: ${(props) => props.buttonColor || "#3ba175"};
  color: #fff;
  border: 2px solid #2d2d2d;
  place-self: end;
  padding: 8px 16px;
`;

export const ReviewButton = styled.button<ButtonColor>`
  font-weight: bold;
  background-color: ${(props) => props.buttonColor || "#3ba175"};
  color: #fff;
  border: 2px solid #2d2d2d;
  padding: 4px 6px;
  font-size: 12px;
`;

export const LinkButton = styled.span<ButtonColor>`
  display: inline-block;
  font-weight: bold;
  background-color: ${(props) => props.buttonColor || "#3ba175"};
  color: #fff;
  border: 2px solid #2d2d2d;
  padding: 8px 16px;
  font-size: 14px;
`;

export const Select = styled.select`
  margin-top: 8px;
  width: 100%;
  padding: 8px;
  border: 2px solid #2d2d2d;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  background-image: linear-gradient(45deg, transparent 50%, gray 50%),
    linear-gradient(135deg, gray 50%, transparent 50%),
    linear-gradient(to right, #ccc, #ccc);
  background-position: calc(100% - 20px) calc(1em + 2px),
    calc(100% - 15px) calc(1em + 2px), calc(100% - 2.5em) 0.5em;
  background-size: 5px 5px, 5px 5px, 1px 1.5em;
  background-repeat: no-repeat;
`;

export const ErrorMessage = styled.p`
  font-size: 13px;
  color: tomato;
  height: 16px;
`;
