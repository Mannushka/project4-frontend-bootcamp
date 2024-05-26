import {
  Card,
  CardBody,
  Stack,
  Text,
  Heading,
  Link,
  CardFooter,
  Box,
  Flex,
} from "@chakra-ui/react";
import { formatBusinessHours } from "../../utils/formatBusinessHours";

interface BussinessHoursCardProps {
  restaurant: Restaurant;
}

const BussinessHoursCard = ({ restaurant }: BussinessHoursCardProps) => {
  const card = (
    <Card marginTop="20px">
      <CardBody>
        <Stack>
          <Heading size="md">Business hours </Heading>
          <Text style={{ fontSize: 14 }}>
            {formatBusinessHours(restaurant.business_hours)}
          </Text>
        </Stack>
      </CardBody>
    </Card>
  );
  return <div>{card}</div>;
};

export default BussinessHoursCard;
