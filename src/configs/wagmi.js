import { configureChains, createClient } from "wagmi"
import { InjectedConnector } from "wagmi/connectors/injected"
import { WalletConnectConnector } from "wagmi/connectors/walletConnect"
import { jsonRpcProvider } from "wagmi/providers/jsonRpc"
import { bsc, bscTestnet } from "wagmi/chains"

const defaultProvider = jsonRpcProvider({
    rpc: (chain) => ({
        http: chain.rpcUrls.default.http[0],
    }),
})

export const chains = [bsc, bscTestnet]

export const { provider, webSocketProvider } = configureChains(
    chains,
    [defaultProvider]
)

export const connectorInstances = {
    injected: new InjectedConnector({
        chains: chains,
        options: {
            shimChainChangedDisconnect: true,
        },
    }),
}

const config = {
    autoConnect: true,
    provider,
    webSocketProvider,
    connectors: [
        connectorInstances["injected"],
    ],
}

export const client = createClient(config)
