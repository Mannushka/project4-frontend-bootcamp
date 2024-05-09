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

interface SingleRestaurantCardProps {
  restaurant: Restaurant;
}

const SingleRestaurantCard = (props: SingleRestaurantCardProps) => {
  const navigate = useNavigate();
  const restaurant = props.restaurant;
  console.log(restaurant.food_category);
  console.log(restaurant);

  const card = (
    <Card maxW="md">
      <CardBody>
        <Image src={restaurant.img_url} alt="Image" />
        <Stack mt="6" spacing="3">
          <Heading size="md">{restaurant.name}</Heading>
          <Text color="blue.400" fontSize="md">
            Rating:
          </Text>
          <Text>
            <ul>
              <li> {restaurant.food_category.category_name}</li>
              <li>{formatPriceCategory(restaurant.price_category)}</li>
              <li>{restaurant.address}</li>
            </ul>
          </Text>
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
            <MdBookmarks size="25px" />
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
