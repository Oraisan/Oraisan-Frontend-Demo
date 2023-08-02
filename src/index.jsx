import { useSelector } from "react-redux";
import AccountPopper from "src/components/WalletButton/AccountPopper";
import ConnectWalletButton from "src/components/WalletButton/ConnectWalletButton";

function WalletButton() {
  const accountAddress = useSelector((state) => state.accountSlice.address);
  return accountAddress ? <AccountPopper /> : <ConnectWalletButton />;
}

export default WalletButton;
