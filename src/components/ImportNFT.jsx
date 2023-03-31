import { useEffect, useState } from "react";

import { Listbox } from "@headlessui/react";

import { useNetwork, useAccount, useConnect, useSwitchNetwork } from "wagmi";

import { chains, connectorInstances } from "../configs/wagmi";
import Card from "./Card";

function ImportNFT() {
  const { chain } = useNetwork();
  const { isConnected } = useAccount();
  const { connectAsync } = useConnect();
  const { switchNetworkAsync } = useSwitchNetwork();

  const [selectedNetwork, setSelectedNetwork] = useState(chain || null);

  useEffect(() => {
    if (!isConnected && selectedNetwork) {
      connectAsync({
        connector: connectorInstances.injected,
        chainId: selectedNetwork.id,
      });
    }
    if (isConnected && chain.id != selectedNetwork.id) {
      switchNetworkAsync(selectedNetwork.id);
    }
  }, [chain, selectedNetwork]);

  return (
    <Card title="Import your NFT" active>
      <p>Import your NFT on the sender blockchain.</p>
      <br />
      <p>Sender Blockchain</p>
      <Listbox value={selectedNetwork} onChange={setSelectedNetwork}>
        <Listbox.Button className="bg-neutral-800 p-4 text-left text-white rounded-xl border-2 border-neutral-700">
          {selectedNetwork ? (
            <div className="flex gap-2">
              <img
                src={"https://polyhedra.network/assets/binance-f89f61cf.png"}
                className="w-6 h-6"
              />
              {selectedNetwork.name}
            </div>
          ) : (
            "Select your chain"
          )}
        </Listbox.Button>
        <Listbox.Options className="bg-neutral-800 rounded-xl fixed">
          {chains.map((network) => (
            <Listbox.Option
              key={network.id}
              value={network}
              disabled={network.unavailable}
              className="p-4 hover:bg-neutral-900 cursor-pointer"
            >
              <div className="flex gap-2">
                <img
                  src={"https://polyhedra.network/assets/binance-f89f61cf.png"}
                  className="w-6 h-6"
                />
                {network.name}
              </div>
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <div className="form-control w-full max-w-xs mb-2">
            <label className="label">Contract Address</label>
            <input
              type="text"
              placeholder="Enter contract address"
              className="input input-bordered bg-neutral-800 rounded-xl border-2 border-neutral-700 w-full"
            />
          </div>
          <div className="flex gap-4">
            <button className="btn btn-outline btn-sm hover:btn-success">
              Add NFTs
            </button>
            <button className="btn btn-outline btn-sm hover:btn-success text-success">
              My NFTs
            </button>
          </div>
        </div>
        <div>
          <div className="form-control w-full max-w-xs mb-2">
            <label className="label">Token ID</label>
            <input
              type="text"
              placeholder="Enter the token ID"
              className="input input-bordered bg-neutral-800 rounded-xl border-2 border-neutral-700 w-full"
            />
          </div>
          <div className="flex justify-end">
            <button className="btn btn-outline btn-sm hover:btn-success text-success">
              Create NFT
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button className="btn btn-success btn-disabled">Start Import</button>
      </div>
    </Card>
  );
}

export default ImportNFT;
