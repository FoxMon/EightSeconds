import React from "react";
import styled from "styled-components";
import GlobalTheme from "@/styles/theme";
import usePaginate from "@/hooks/usePaginate";

interface PaginateButtonProps {
  page: number;
  totalPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const PaginateButton = ({ page, totalPages, setPage }: PaginateButtonProps) => {
  const {
    isFirst,
    isLast,
    pages,
    handleNextButtonClick,
    handlePrevButtonClick,
    handlePageButtonClick,
  } = usePaginate(page, setPage, totalPages, 12);

  return (
    <PaginateContainer>
      <PaginateNav>
        <PaginateButtonStyle disabled={isFirst} onClick={handlePrevButtonClick}>
          &lt;
        </PaginateButtonStyle>
        {pages.map((p) => (
          <PaginateButtonStyle
            key={p}
            onClick={handlePageButtonClick(p === null ? 1 : p)}
          >
            {p}
          </PaginateButtonStyle>
        ))}
        <PaginateButtonStyle disabled={isLast} onClick={handleNextButtonClick}>
          &gt;
        </PaginateButtonStyle>
      </PaginateNav>
    </PaginateContainer>
  );
};

const PaginateContainer = styled.div`
  width: 100%;
  display: flex;
  margin-top: 3rem;
  justify-content: center;
`;

const PaginateNav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 16px;
`;

const PaginateButtonStyle = styled.button`
  background: ${GlobalTheme.colors.theme};
  border: none;
  border-radius: 8px;
  padding: 8px;
  margin: 0;
  color: ${GlobalTheme.colors.white};
  font-size: 1rem;
  &:hover {
    background: ${GlobalTheme.colors.white};
    color: ${GlobalTheme.colors.theme};
    font-weight: bold;
    border: 1px solid ${GlobalTheme.colors.theme};
    cursor: pointer;
    transition: 0.3s;
  }
`;

export default PaginateButton;
