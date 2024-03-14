import { defineChain } from "viem";

const SEPOLIA_RPC_URL = process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL || "";

export const sepolia = defineChain({
	id: 11_155_111,
	name: "Sepolia",
	nativeCurrency: { name: "Sepolia Ether", symbol: "SEP", decimals: 18 },
	rpcUrls: {
		default: {
			http: [SEPOLIA_RPC_URL],
		},
	},
	blockExplorers: {
		default: {
			name: "Etherscan",
			url: "https://sepolia.etherscan.io",
			apiUrl: "https://api-sepolia.etherscan.io/api",
		},
	},
	contracts: {
		multicall3: {
			address: "0x4935CaE6F1D544d3d403BDCf3F7Bb21731FEb92a",
			blockCreated: 5483544,
		},
		ensRegistry: { address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e" },
		ensUniversalResolver: {
			address: "0xc8Af999e38273D658BE1b921b88A9Ddf005769cC",
			blockCreated: 5_317_080,
		},
	},
	testnet: true,
});
