import React from "react";
import {
  Card,
  CardBody,
  Stack,
  Text,
  Heading,
  Link,
  CardFooter,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { formatPriceCategory } from "../../utils/formatPriceCategory";
import { formatBusinessHours } from "../../utils/formatBusinessHours";

interface RestaurantCardProps {
  restaurant: Restaurant;
}
const RestaurantCard = ({ restaurant }: RestaurantCardProps): JSX.Element => {
  // console.log(restaurant);
  const restaurantCard = (
    <Card
      direction="column"
      overflow="hidden"
      variant="outline"
      width="35rem"
      height="32rem"
    >
      <Stack>
        <CardBody>
          <Heading className="restaurant-details" size="md">
            Details
          </Heading>
          <Text>
            {restaurant.food_category
              ? restaurant.food_category.category_name
              : ""}
            , {formatPriceCategory(restaurant.price_category)}
          </Text>
          {/* <Text>{formatPriceCategory(restaurant.price_category)}</Text> */}
          <Text>Rating:</Text>

          <Link href={restaurant.website} isExternal>
            Website <ExternalLinkIcon mx="2px" />
          </Link>
        </CardBody>
      </Stack>
      <CardFooter>
        <Stack>
          <Heading size="md">Business hours: </Heading>
          <Text>{formatBusinessHours(restaurant.business_hours)}</Text>
        </Stack>
      </CardFooter>
    </Card>
  );

  return <div>{restaurantCard}</div>;
};

export default RestaurantCard;
