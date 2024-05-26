import { Card, CardBody, Stack, Text, Heading } from "@chakra-ui/react";
import GoogleMap from "../map/GoogleMap";

interface LocationCardProps {
  address: string;
}

const LocationCard = ({ address }: LocationCardProps) => {
  const card = (
    <Card variant="unstyled">
      <CardBody>
        <Stack>
          <Text>
            <Heading size="md">Address</Heading>
            {address}
          </Text>
          <GoogleMap address={address} />
        </Stack>
      </CardBody>
    </Card>
  );
  return <div>{card}</div>;
};

export default LocationCard;
