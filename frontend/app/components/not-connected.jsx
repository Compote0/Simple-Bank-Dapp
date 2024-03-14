// Ensure you're using client environment for React components
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  VStack,
} from '@chakra-ui/react';

import { ConnectButton } from '@rainbow-me/rainbowkit';

const NotConnected = () => {
  return (
    <VStack spacing={4} align="stretch">
      <Box>
        <Alert
          status='info'
          variant='subtle'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          textAlign='center'
          height='200px'
          borderRadius="lg"
          backgroundColor="blue.50"
        >
          <AlertIcon boxSize='40px' mr={0} />
          <AlertTitle mt={4} mb={1} fontSize='lg'>
            Welcome to the best bank on Sepolia.
          </AlertTitle>
          <AlertDescription maxWidth='sm'>
            To continue, please connect your wallet.
          </AlertDescription>
        </Alert>
      </Box>
      <Box display="flex" justifyContent="center">
        <ConnectButton />
      </Box>
    </VStack>
  )
}

export default NotConnected;
