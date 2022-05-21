import styled, { css } from "styled-components";

export const Container = styled.div`
  margin: 0px auto;
  max-width: 500px;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 95%;
  height: 100%;
  gap: 5px;
`;

export const BarChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding-left: 9.5px;
`;

export const Chart = css`
  width: 40px;
  &:hover {
    opacity: 0.8;
  }
  @media (max-width: 420px) {
    width: 34px;
  }
`;

export const Number = styled.span`
  font-size: 0.7em;
  text-align: center;
  color: ${(props) => props.color};
`;

export const MakeBar = styled.div`
  border-radius: 3px;
  height: ${(props) => props.height * 15}%;
  background-image: linear-gradient(
    to bottom,
    ${(props) => props.colors[0]},
    ${(props) => props.colors[1]}
  );
  ${Chart};
`;

export const BlackLine = styled.div`
  width: 100%;
  height: 5px;
  background-color: grey;
`;
