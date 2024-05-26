import { Card, CardBody, Stack, Text, Heading } from "@chakra-ui/react";
import { formatBusinessHours } from "../../utils/formatBusinessHours";

interface BussinessHoursCardProps {
  restaurant: Restaurant;
}

const BussinessHoursCard = ({ restaurant }: BussinessHoursCardProps) => {
  const card = (
    <Card variant="unstyled">
      <CardBody>
        <Stack>
          <Heading size="md">Business hours </Heading>
          <Text style={{ fontSize: 15 }}>
            {formatBusinessHours(restaurant.business_hours)}
          </Text>
        </Stack>
      </CardBody>
    </Card>
  );
  return <div>{card}</div>;
};

export default BussinessHoursCard;