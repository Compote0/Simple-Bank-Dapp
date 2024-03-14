import { formatEther } from 'viem';
import { Spinner, Text, Box } from '@chakra-ui/react';

const Balance = ({ isPending, balance }) => {
    const safeBalance = balance ?? '0';

    return (
        <Box mb="1rem">
            {isPending ? (
                <Spinner />
            ) : (
                <Text>
                    You have <Text as="b">{formatEther(safeBalance.toString())}</Text> Eth in the bank.
                </Text>
            )}
        </Box>
    );
};

export default Balance;
