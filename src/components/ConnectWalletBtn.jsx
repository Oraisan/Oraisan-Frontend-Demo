import { useAccount, useConnect, useDisconnect } from "wagmi";
import { chains, connectorInstances } from "../configs/wagmi";

export default function ConnectWalletBtn() {
  const { isConnected, address } = useAccount();
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();

  const handleConnectClick = () => {
    connectAsync({
      connector: connectorInstances.injected,
      chainId: chains[0],
    });
  };

  const handleDisconnectClick = () => {
    disconnectAsync()
  }

  return isConnected ? (
    <div className="flex justify-center align-middle">
      <p>{address}</p>
      <button className="btn btn-sm" onClick={handleDisconnectClick}>
        Disconnect
      </button>
    </div>
  ) : (
    <button
      className="btn btn-lg btn-outline btn-success"
      onClick={handleConnectClick}
    >
      Connect Wallet
    </button>
  );
}
