"use client"
import { Flex, Text } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'

const Header = () => {
  return (
    <Flex
        justifyContent="space-between"
        alignItems="center"
        p="2rem"
    >
        <Text as="h1" color="red" fontSize="large" >Simple Bank Dapp</Text>
        <ConnectButton />
    </Flex>
  )
}

export default Header