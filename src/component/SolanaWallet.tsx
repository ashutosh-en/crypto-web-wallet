import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair,PublicKey,Connection } from "@solana/web3.js";
import nacl from "tweetnacl";
import { useState } from "react";
interface MnemonicProps {
    mnemonic: string;
}

async function fetchSolBalance(publicKey:PublicKey) {
    try {
        const connection = new Connection("https://solana-mainnet.g.alchemy.com/v2/58yGu9jNzNmUBMf5HFr6p-6MT1dFy43K");
        const balance = await connection.getBalance(publicKey);
        return balance / 1e9; // Convert lamports to SOL
    } catch (error) {
        console.error("Failed to fetch balance:", error);
        throw new Error("Could not fetch balance. Please try again later.");
    }
  }
function SolanaWallet({ mnemonic}: MnemonicProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [account, setAccount] = useState<{ publicKey: PublicKey; balance: number }[]>([]);

    const addWallet = async() => {
        const seed = mnemonicToSeed(mnemonic);
        const path = `m/44'/501'/${currentIndex}'/0'`;
        const derivedSeed = derivePath(path, seed.toString("hex")).key;
        const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
        const keypair = Keypair.fromSecretKey(secret);
        const balance = await fetchSolBalance(keypair.publicKey);
        setCurrentIndex(currentIndex + 1);
        setAccount([...account,{ publicKey: keypair.publicKey, balance }]);
    };

    return (
        <div className="p-4">
            <button
                onClick={addWallet}
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
            >
                Add Wallet Sol
            </button>
            <div className="mt-4">
                {account.map((account, index) => (
                    <div key={index} className="text-gray-700">
                        <div>Public Key: {account.publicKey.toBase58()}</div>
                        <div>SOL Balance: {account.balance.toFixed(2)} SOL</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SolanaWallet;
