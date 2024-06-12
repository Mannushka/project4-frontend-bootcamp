import {
  Card,
  CardBody,
  Stack,
  Text,
  Heading,
  Link,
  Box,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { formatPriceCategory } from "../../utils/formatPriceCategory";
import RestaurantRating from "./RestaurantRating";

interface RestaurantCardProps {
  restaurant: Restaurant;
}
const RestaurantCard = ({ restaurant }: RestaurantCardProps): JSX.Element => {
  const displayRating = (): number[] => {
    if (restaurant.reviews) {
      const rating = restaurant.reviews;
      const array = rating.map((ratingElement) => ratingElement.rating_value);
      return array;
    }
    return [];
  };
  const ratingArray = displayRating();

  const restaurantCard = (
    <Card
      direction="column"
      overflow="hidden"
      variant="unstyled"
      width="30rem"
      marginBottom={4}
    >
      <Stack alignItems="center">
        <CardBody>
          <Heading className="restaurant-details" size="md">
            Details
          </Heading>
          <Box marginTop={4} marginBottom={4}>
            <RestaurantRating ratingArray={ratingArray} />
          </Box>
          <Text>
            <b>
              {restaurant.food_category
                ? restaurant.food_category.category_name
                : ""}
              , {formatPriceCategory(restaurant.price_category)}
            </b>
          </Text>

          <Link href={restaurant.website} isExternal>
            <b>
              Website <ExternalLinkIcon mx="2px" />
            </b>
          </Link>
          <Heading className="restaurant-details" size="md" marginTop={4}>
            Contact info
          </Heading>

          {restaurant.phone_number && (
            <Stack>
              <Text>
                <b>Phone number:</b> +
                <Link href={`tel:${restaurant.phone_number}`}>
                  {restaurant.phone_number}
                </Link>
              </Text>
            </Stack>
          )}

          {restaurant.email && (
            <>
              <Text>
                <b>Email:</b>{" "}
                <Link href={`mailto:${restaurant.email}`}>
                  {restaurant.email}
                </Link>
              </Text>
            </>
          )}
        </CardBody>
      </Stack>
    </Card>
  );

  return <div>{restaurantCard}</div>;
};

export default RestaurantCard;
