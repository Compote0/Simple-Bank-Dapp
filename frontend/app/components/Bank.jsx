import { useState, useEffect } from 'react';

import Deposit from './Deposit';
import Withdraw from './Withdraw';
import Balance from './Balance';
import Events from './Events';

import { useAccount, useReadContract } from 'wagmi';
import { contractAbi, contractAddress } from '../constants/index';
import { publicClient } from '../utils/client';
import { parseAbiItem, formatEther } from 'viem';

const Bank = () => {
  const { address } = useAccount();

  const { data: balanceOfConnectedAddress, error, isPending, refetch } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'getBalanceOfUser',
    account: address,
  });

  const [events, setEvents] = useState([]);


  const getEvents = async () => {
    console.log('Fetching events...');
    
    const depositEvents = await publicClient.getLogs({
        address: contractAddress,
        event: parseAbiItem("event etherDeposited(address indexed account, uint amount)"),      
        fromBlock: 5483544n, 
        toBlock: 'latest',
    });

    console.log('Deposit Events:', depositEvents);

    const withdrawEvents = await publicClient.getLogs({
        address: contractAddress,
        event: parseAbiItem('event etherWithdrawed(address indexed account, uint amount)'),
        fromBlock: 5483544n, 
        toBlock: 'latest',
    });

    console.log('Withdraw Events:', withdrawEvents);

    const combinedEvents = depositEvents.map((event) => ({
      type: 'Deposit', 
      address: event.args.account.toString(), 
      amount: formatEther(event.args.amount.toString()),
      blockNumber: Number(event.blockNumber)
})).concat(withdrawEvents.map((event) => ({
      type: 'Withdraw', 
      address: event.args.account.toString(), 
      amount: formatEther(event.args.amount.toString()),
      blockNumber: Number(event.blockNumber)
})));

    combinedEvents.sort(function (a, b) {
      return b.blockNumber - a.blockNumber;
    });

    setEvents(combinedEvents)
  }


  useEffect(() => {
    const getAllEvents = async() => {
      if(address !== 'undefined') {
        await getEvents();
      }
    }
    getAllEvents();
  }, [address])

  return (
    <>
      <Balance isPending={isPending} balance={balanceOfConnectedAddress} />
      <Deposit refetch={refetch} getEvents={getEvents} />
      <Withdraw refetch={refetch} getEvents={getEvents} />
      <Events events={events} />
    </>
  );
};

export default Bank;