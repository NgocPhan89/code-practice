import React from "react";
import { Box, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Token } from "./SwapForm";

interface TokenSelectorProps {
  amount: number;
  tokens: Token[];
  selected: Token;
  onChangeAmount: (v: number) => void;
  onChangeToken: (token: Token) => void;
  label: string;
  isAmountDisabled?: boolean;
}

const TokenSelector: React.FC<TokenSelectorProps> = ({
  amount,
  tokens,
  selected,
  onChangeAmount,
  onChangeToken,
  isAmountDisabled,
  label,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        border: "2px solid #f0f0f0",
        borderRadius: "28px",
        padding: "8px 10px",
        columnGap: "32px",
      }}
    >
      <Box sx={{ margin: "auto 16px" }}>
        {isAmountDisabled ? (
          <Typography
            sx={{
              color: "lightslategray",
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            {amount}
          </Typography>
        ) : (
          <TextField
            type="number"
            value={amount}
            onChange={(e) => onChangeAmount(Number(e.target.value))}
            fullWidth
            sx={{
              "& .MuiInputBase-input": {
                fontSize: "24px",
                fontWeight: "bold",
                padding: "0",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
            disabled={isAmountDisabled}
          />
        )}
      </Box>

      <Select
        labelId={label}
        id={label}
        name={label}
        value={selected?.symbol || ""}
        onChange={(e) => {
          const selectedOption = tokens.find(
            (token) => token.symbol === e.target.value
          );
          if (selectedOption) onChangeToken(selectedOption);
        }}
        sx={{
          borderRadius: "20px",
          fontSize: "14px",
          height: "fit-content",
          width: "fit-content",
          "& .MuiSelect-select": {
            display: "flex",
            columnGap: "8px",
            padding: "8px 12px",
          },
        }}
      >
        {tokens?.map((token) => {
          return (
            <MenuItem
              key={`${label}.${token.symbol}`}
              value={token.symbol}
              sx={{
                width: "100%",
                display: "flex",
                columnGap: "8px",
              }}
            >
              <img
                src={token.image}
                alt={token.symbol}
                style={{ width: 20, height: 20 }}
              />
              <Typography sx={{ fontSize: "14px" }}>{token.symbol}</Typography>
            </MenuItem>
          );
        })}
      </Select>
    </Box>
  );
};

export default TokenSelector;
