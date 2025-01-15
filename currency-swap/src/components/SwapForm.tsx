import { Box, Button, Typography, CircularProgress } from "@mui/material";
import { mockTokens } from "../mockData";
import { useState, useEffect } from "react";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import TokenSelector from "./TokenSelector";

export interface Token {
  symbol: string;
  price: number;
  image: string;
}

const SwapForm = () => {
  const [fromToken, setFromToken] = useState<Token>(mockTokens[0]);
  const [toToken, setToToken] = useState<Token>(mockTokens[1]);
  const [amount, setAmount] = useState<number>(0);
  const [exchangeRate, setExchangeRate] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  // Calculate the exchange rate
  const calculateExchangeRate = () => {
    if (fromToken && toToken) {
      const rate = fromToken.price / toToken.price;
      setExchangeRate(rate);
    }
  };

  useEffect(() => {
    calculateExchangeRate();
  }, [fromToken, toToken]);

  // Generic handler for token change
  const handleTokenChange = (selectedSymbol: string, isFrom: boolean): void => {
    const selectedToken = mockTokens.find(
      (token) => token.symbol === selectedSymbol
    );

    if (isFrom) {
      setFromToken(selectedToken!);
      if (selectedToken?.symbol === toToken.symbol) {
        console.log(
          mockTokens.find((token) => token.symbol !== selectedToken.symbol),
          mockTokens.find((token) => token.symbol !== selectedToken.symbol)!
        );
        setToToken(
          mockTokens.find((token) => token.symbol !== selectedToken.symbol)!
        );
      }
    } else {
      setToToken(selectedToken!);
      if (selectedToken?.symbol === fromToken.symbol) {
        setFromToken(
          mockTokens.find((token) => token.symbol !== selectedToken.symbol)!
        );
      }
    }
  };

  const handleSwap = () => {
    if (!fromToken || !toToken || !amount) return;

    setLoading(true);

    // Simulate a mock backend interaction with a delay
    setTimeout(() => {
      alert(
        `Successfully swapped ${amount} ${fromToken.symbol} for ${(
          amount * exchangeRate!
        ).toFixed(4)} ${toToken.symbol}.`
      );
      setLoading(false);
    }, 1500);
  };

  return (
    <Box
      sx={{
        display: "flex",
        rowGap: "16px",
        flexDirection: "column",
        width: "100%",
        maxWidth: 480,
        margin: "auto",
        padding: 3,
        background: "white",
        borderRadius: 6,
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        position: "relative",
      }}
    >
      <Typography
        variant="h5"
        textAlign="center"
        sx={{ fontWeight: "bold", mb: 2 }}
      >
        Currency Swap
      </Typography>
      <SwapVertIcon
        sx={{
          backgroundColor: "white",
          border: "2px solid #f0f0f0",
          padding: "4px",
          fontSize: "32px",
          borderRadius: "16px",
          position: "absolute",
          left: "calc(50% - 16px)",
          top: "134px",
        }}
      />
      <TokenSelector
        amount={amount}
        tokens={mockTokens}
        selected={fromToken}
        onChangeAmount={setAmount}
        onChangeToken={(token) => handleTokenChange(token.symbol, true)}
        label="From"
      />

      <TokenSelector
        amount={Number((amount * exchangeRate).toFixed(4))}
        tokens={mockTokens.filter((t) => t.symbol !== fromToken?.symbol)}
        selected={toToken}
        onChangeAmount={setAmount}
        onChangeToken={(token) => handleTokenChange(token.symbol, false)}
        label="To"
        isAmountDisabled
      />

      {exchangeRate && fromToken && toToken && (
        <Box sx={{ display: "flex", columnGap: "4px", mx: "auto", my: 2 }}>
          <Typography
            textAlign="center"
            sx={{ color: "gray", fontSize: "14px", fontWeight: "bold" }}
          >
            Exchange Rate
          </Typography>
          <Typography
            textAlign="center"
            sx={{ color: "gray", fontSize: "14px" }}
          >
            1 {fromToken.symbol} = {exchangeRate.toFixed(6)} {toToken.symbol}
          </Typography>
        </Box>
      )}

      <Button
        variant="contained"
        color="primary"
        fullWidth
        disabled={!fromToken || !toToken || !amount || loading}
        onClick={handleSwap}
        sx={{
          border: "1px solid #111315",
          borderRadius: "18px",
          boxShadow: "none",
          lineHeight: "24px",
          "&:disabled": {
            border: "1px solid #e0e0e0",
          },
        }}
      >
        {loading ? <CircularProgress size={24} /> : "Swap"}
      </Button>
    </Box>
  );
};

export default SwapForm;
