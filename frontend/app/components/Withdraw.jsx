import { useState, useEffect } from "react";
import { Heading, Box, Flex, Button, Input, useToast } from "@chakra-ui/react";
import { contractAddress, contractAbi } from "../constants/index";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";
import TransacAlert from "./tx-alert";

const Withdraw = ({ refetch, getEvents }) => {
	const [withdrawETH, setWithdrawETH] = useState('');

	const toast = useToast();

	const {
		data: hash,
		error,
		isPending: setIsPending,
		writeContract,
	} = useWriteContract({
		mutation: {
			onSuccess: () => {
				toast({
					title: "Withdraw pending",
					status: "success",
					duration: 3000,
					isClosable: true,
				});
			},
			onError: (error) => {
				toast({
					title: error.message,
					status: "error",
					duration: 3000,
					isClosable: true,
				});
			},
		},
	});

	const setTheWithdraw = async () => {
		if (!isNaN(withdrawETH)) {
			writeContract({
				address: contractAddress,
				abi: contractAbi,
				functionName: "withdraw",
				args: [parseEther(withdrawETH?.toString())],
			});
		} else {
			toast({
				title: "You need to write a number",
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		}
	};

	const { isLoading: isConfirming, isSuccess: isConfirmed } =
		useWaitForTransactionReceipt({
			hash,
		});

	useEffect(() => {
		if (isConfirmed) {
			refetch();
			getEvents();
			toast({
				title: "Withdraw successful",
				status: "success",
				duration: 3000,
				isClosable: true,
			});
			setWithdrawETH("");
		}
		if (error) {
			toast({
				title: error.message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		}
	}, [isConfirmed]);

	return (
		<Box mb="1rem">
			<Heading as='h2' size='xl' mt='2rem' p='2rem'>Withdraw</Heading>
			<TransacAlert
				hash={hash}
				isConfirming={isConfirming}
				isConfirmed={isConfirmed}
				error={error}
			/>
			<Flex>
				<Input
					placeholder="Amount in ETH"
					type="number"
					value={withdrawETH || ''}
					onChange={(e) => setWithdrawETH(e.target.value)}
				/>
				<Button 
				colorScheme='purple'
				disabled={setIsPending} 
				onClick={setTheWithdraw}
				>
					{setIsPending ? "Confirming..." : "Withdraw"}{" "}
				</Button>
			</Flex>
		</Box>
	);
};

export default Withdraw;
