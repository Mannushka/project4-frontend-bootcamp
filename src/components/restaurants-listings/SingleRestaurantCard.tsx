import React from "react";
import {
  Container,
  Card,
  CardBody,
  Image,
  Heading,
  Stack,
  Text,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";
import { MdBookmarks } from "react-icons/md";
import { formatPriceCategory } from "../../utils/formatPriceCategory";
import { useNavigate } from "react-router-dom";
import RestaurantRating from "../restaurant/RestaurantRating";
import SaveButton from "./SaveButton";

interface SingleRestaurantCardProps {
  restaurant: Restaurant;
}

const SingleRestaurantCard = ({
  restaurant,
}: SingleRestaurantCardProps): JSX.Element => {
  const navigate = useNavigate();

  const rating = restaurant.reviews;
  const ratingArray = rating.map((ratingElement) => ratingElement.rating_value);

  const card = (
    <Card maxW="md" marginBottom={4} className="restaurant-card">
      <CardBody>
        <Image src={restaurant.img_url} alt="Image" />
        <Stack mt="6" spacing="3">
          <Heading size="md">{restaurant.name}</Heading>

          {/* <Text color="blue.400" fontSize="md">
              Rating:
            </Text> */}
          <RestaurantRating ratingArray={ratingArray} />

          <div>
            <ul>
              <li> {restaurant.food_category.category_name}</li>
              <li>{formatPriceCategory(restaurant.price_category)}</li>
              <li>{restaurant.address}</li>
            </ul>
          </div>
          <ButtonGroup justifyContent="space-between" alignItems="center">
            <Button
              variant="ghost"
              onClick={() => {
                navigate(`/restaurants/${restaurant.id}`);
              }}
            >
              View details
            </Button>
            {/* <Button variant="ghost" colorScheme="blue">
              Save
            </Button> */}
            {/* <MdBookmarks size="25px" /> */}
            <SaveButton restaurantId={restaurant.id} />
          </ButtonGroup>
        </Stack>
      </CardBody>
    </Card>
  );
  return (
    <div>
      <Container justifyContent="center">{card}</Container>
    </div>
  );
};

export default SingleRestaurantCard;
