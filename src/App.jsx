import { WagmiConfig } from "wagmi";
import { client as wagmiClient } from "./configs/wagmi";

import ImportNFT from "./components/ImportNFT";

import ConnectWalletBtn from "./components/ConnectWalletBtn";
import SelectChain from "./components/SelectChain";

function App() {
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <div className="preview container mx-auto py-4 flex flex-col align-middle gap-4 w-[600px]">
          <ConnectWalletBtn />
          <ImportNFT />
          <SelectChain />
        </div>
      </WagmiConfig>
    </>
  );
}

export default App;
