import React from "react";
import { Card, CardBody, Stack, Text, Heading, Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { formatPriceCategory } from "../../utils/formatPriceCategory";
import { formatBusinessHours } from "../../utils/formatBusinessHours";

interface RestaurantCardProps {
  restaurant: Restaurant;
}
const RestaurantCard = (props: RestaurantCardProps) => {
  const restaurant = props.restaurant;
  const restaurantCard = (
    <Card direction="column" overflow="hidden" variant="outline" width={450}>
      <Stack>
        <CardBody>
          <Heading className="restaurant-details" size="md">
            Details
          </Heading>
          <Text>
            Cuisine:
            {restaurant.food_category
              ? restaurant.food_category.category_name
              : ""}
          </Text>
          <Text>{formatPriceCategory(restaurant.price_category)}</Text>
          <Text>Rating:</Text>

          <Link href={restaurant.website} isExternal>
            Website <ExternalLinkIcon mx="2px" />
            <Heading size="md">Business hours</Heading>
            <Text>{formatBusinessHours(restaurant.business_hours)}</Text>
          </Link>
        </CardBody>
      </Stack>
    </Card>
  );

  return <div>{restaurantCard}</div>;
};

export default RestaurantCard;
