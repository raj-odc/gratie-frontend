import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import Button from '@mui/material/Button';


const CustomWalletView = () => {
    const { setVisible } = useWalletModal();
    
    const connect = () => {
        setVisible(true)
    }
    
    return (
        <Button
                  onClick={connect}
                  sx={{ my: 2, color: 'white', display: 'block', paddingX:2, fontSize:'20px' }}
                >
                 Connect Wallet
                </Button>
    );
};

export default CustomWalletView