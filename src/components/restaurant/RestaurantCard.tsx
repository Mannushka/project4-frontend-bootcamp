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
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { formatPriceCategory } from "../../utils/formatPriceCategory";
import { formatBusinessHours } from "../../utils/formatBusinessHours";
import RestaurantRating from "./RestaurantRating";
import { IoCall } from "react-icons/io5";
import { BiSolidMessage } from "react-icons/bi";

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

      // height="32rem"
      // style={{ border: "none" }}
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
          {/* <Text>{formatPriceCategory(restaurant.price_category)}</Text> */}

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
              {/* <Flex gap={4}>
                <Link href={`tel:${restaurant.phone_number}`}>
                  <IoCall />
                </Link>
                <Link href={`sms:${restaurant.phone_number}`}>
                  <BiSolidMessage />
                </Link>
              </Flex> */}
            </Stack>
          )}

          {restaurant.email && (
            <>
              <Text>
                <b>Email:</b>{" "}
                <Link href={`tel:${restaurant.email}`}>{restaurant.email}</Link>
              </Text>
              {/* <Link href={`tel:${restaurant.email}`}>
                <b> Write an email</b>
              </Link> */}
            </>
          )}
        </CardBody>
      </Stack>
      {/* <CardFooter>
        <Stack>
          <Heading size="md">Business hours: </Heading>
          <Text>{formatBusinessHours(restaurant.business_hours)}</Text>
        </Stack>
      </CardFooter> */}
    </Card>
  );

  return <div>{restaurantCard}</div>;
};

export default RestaurantCard;
