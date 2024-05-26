import { Card, CardBody, Stack, Text, Heading, Flex } from "@chakra-ui/react";
import GoogleMap from "../map/GoogleMap";

interface LocationCardProps {
  address: string;
}

const LocationCard = ({ address }: LocationCardProps) => {
  const card = (
    <Card variant="unstyled">
      <CardBody>
        <Stack>
          <Flex>
            <Heading size="md" marginRight={2}>
              Address:
            </Heading>
            <Text> {address}</Text>
          </Flex>
          <GoogleMap address={address} />
        </Stack>
      </CardBody>
    </Card>
  );
  return <div>{card}</div>;
};

export default LocationCard;
