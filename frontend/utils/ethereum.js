import { ethers } from 'ethers';

const getProvider = () => {
    if (typeof window.ethereum !== 'undefined') {
        // solicta usuario que habilite MetaMask ?
        window.ethereum.request({ method: 'eth_requestAccounts' });
        return new ethers.providers.Web3Provider(window.ethereum);
    } else {
        console.log("MetaMask no está disponible. Asegúrate de tener MetaMask instalado.");
        return null;
    }
};

export const connectWallet = async () => {
    const provider = getProvider();
    if (!provider) {
        return null;
    }

    try {
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        console.log(`Conectado con la dirección: ${address}`);
        return address;
    } catch (err) {
        console.error("Error al obtener la dirección: ", err);
        return null;
    }
};
