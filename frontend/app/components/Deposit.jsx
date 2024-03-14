'use client';
import { useState, useEffect } from "react";
import { Box, Heading, Flex, Button, Input, useToast } from "@chakra-ui/react";
import { Alert, AlertIcon } from '@chakra-ui/react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from "viem";
import { contractAddress, contractAbi } from "../constants/index";
import TransacAlert from './tx-alert';

const Deposit = ({ refetch, getEvents }) => {

    const { address } = useAccount();
    const toast = useToast();
    const [error, setError] = useState(null);

    const [depositValue, setDepositValue] = useState('');

    const { data: hash, isPending, writeContract } = useWriteContract({
        mutation: {
            onSuccess: () => {
                toast({
                    title: "Deposit pending",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
            },
            onError: (error) => {
                setError(error); 
                toast({
                    title: error.shortMessage,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            },
        }
    }) 

    const deposit = async() => {
        if(!isNaN(depositValue)) {
            writeContract({
                address: contractAddress,
                abi: contractAbi,
                functionName: 'deposit',
                value: parseEther(depositValue),
                account: address
            })
        }
        else {
            toast({
                title: "Input must be a positive number",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    }

    const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ 
      hash, 
    }) 

    useEffect(() => {
        if(isConfirmed) {
            refetch()
            getEvents();
            setDepositValue('');
            toast({
                title: "Deposit successful",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        }
    }, [isConfirmed])

    return (
        <Box mb="1rem">
            <Heading as='h2' size='xl' mt='2rem' p='2rem'>Deposit</Heading>
                <Flex>
                    <Input
                        placeholder="Amount in ETH"
                        type="number"
                        value={depositValue || ''} 
                        onChange={(e) => setDepositValue(e.target.value)}
                    />

                    <Button 
                        colorScheme='purple' 
                        disabled={isPending} 
                        onClick={deposit}
                    >
                        {isPending ? "Confirming..." : "Deposit"}
                    </Button>
                </Flex>
                <TransacAlert 
                    hash={hash} 
                    isConfirming={isPending} 
                    isConfirmed={isConfirmed}
                    error={error} 
                />
        </Box>
    );
};

export default Deposit;
