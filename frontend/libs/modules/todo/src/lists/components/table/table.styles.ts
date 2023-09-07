import styled from "styled-components"

type CompletedProps = {
  status?: boolean
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

export const Header = styled.div<CompletedProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid white;
  color: ${({ status }) => (status ? '#00B37E' : '#F75A68')};
`;

export const Content = styled.div`
  .title {
    color: #f1f1f1;
    font-weight: 700;
  }
  
  .description {
    font-size: 12px;
  }

  .responsible {
    font-size: 14px;
    padding-top: 1rem;
    font-weight: 300;
  };
`;

export const IconGroup = styled.div`
  display: flex;
  gap: 0.75rem;

  .completed {
    fill: #00B37E;
  }

  .uncompleted {
    path {
      stroke: #f7bc5a;
    }
  }

  .edit {
      fill: #6F7BE7;
  }

  .delete {
      fill: #F75A68;
  }

  svg {
    width: 1.15rem;
    height: 1.15rem;
    cursor: pointer;
  }
`
