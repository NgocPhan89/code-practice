/* Refactoring Explanations:
 * 1. Memoizing Sorting and Formatting Together:
 * The filtering, formatting, and sorting logic is combined into a single useMemo hook.
 * This prevents redundant computations.
 *
 * 2. Reusing the priority Value
 * Instead of calling getPriority multiple times, the priority is calculated once
 * and used directly for sorting.
 *
 * 3. Removing Unnecessary children as it was unused
 *
 * 4. Using More Appropriate key Prop - key={balance.currency}
 */

import { useMemo } from "react";

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
  priority: number;
  usdValue: number;
}

const WalletPage = (props: any) => {
  const { ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: string): number => {
    const priorities: Record<string, number> = {
      Osmosis: 100,
      Ethereum: 50,
      Arbitrum: 30,
      Zilliqa: 20,
      Neo: 20,
    };
    return priorities[blockchain] ?? -99;
  };

  const sortedAndFormattedBalances = useMemo(() => {
    const validBalances = balances.filter((balance: WalletBalance) => {
      const balancePriority = getPriority(balance.blockchain);
      return balancePriority > -99 && balance.amount > 0;
    });

    return validBalances
      .map((balance: WalletBalance) => ({
        ...balance,
        formatted: balance.amount.toFixed(),
        usdValue: prices[balance.currency] * balance.amount,
        priority: getPriority(balance.blockchain),
      }))
      .sort(
        (lhs: FormattedWalletBalance, rhs: FormattedWalletBalance) =>
          rhs.priority - lhs.priority
      );
  }, [balances, prices]);

  return (
    <div {...rest}>
      {sortedAndFormattedBalances.map((balance: FormattedWalletBalance) => (
        <WalletRow
          key={balance.currency}
          className={classes.row}
          amount={balance.amount}
          usdValue={balance.usdValue}
          formattedAmount={balance.formatted}
        />
      ))}
    </div>
  );
};

export default WalletPage;
