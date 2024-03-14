import { Heading, Badge, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box, Center, Stack, Skeleton } from "@chakra-ui/react";

const Events = ({ events }) => {
  return (
    <Box>
      <Center pb="5">
        <Heading as='h2' size='xl'>
          Events
        </Heading>
      </Center>
      {events.length > 0 ? (
        <TableContainer>
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th>Event name</Th>
                <Th>From Account</Th>
                <Th isNumeric>Amount</Th>
              </Tr>
            </Thead>
            <Tbody>
            {events.map((event) => (
              <Tr key={crypto.randomUUID()}>
                <Td>
                  <Badge colorScheme={event.type === 'Deposit' ? 'green' : 'red'}>
                    {event.type} {/* Correction: était event.name */}
                  </Badge>
                </Td>
                <Td>{event.address} {/* Correction: était event.account */}</Td>
                <Td isNumeric>{event.amount} Eth</Td>
              </Tr>
            ))}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <Stack>
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
        </Stack>
      )}
    </Box>
  );
};

export default Events;
