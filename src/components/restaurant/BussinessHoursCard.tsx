import { Card, CardBody, Stack, Heading } from "@chakra-ui/react";
import { formatBusinessHours } from "../../utils/formatBusinessHours";

interface BussinessHoursCardProps {
  restaurant: Restaurant;
}

const BussinessHoursCard = ({
  restaurant,
}: BussinessHoursCardProps): JSX.Element => {
  const bussinessHours = formatBusinessHours(restaurant.business_hours);
  const newBussinessHours = bussinessHours.map((day, index) => (
    <div key={index} style={{ fontSize: 15 }}>
      {day} <br />
    </div>
  ));
  const card = (
    <Card variant="unstyled">
      <CardBody>
        <Stack>
          <Heading size="md">Business hours </Heading>
          {newBussinessHours}
        </Stack>
      </CardBody>
    </Card>
  );
  return <div>{card}</div>;
};

export default BussinessHoursCard;
