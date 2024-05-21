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
  CardFooter,
} from "@chakra-ui/react";

import { formatPriceCategory } from "../../utils/formatPriceCategory";
import { useNavigate } from "react-router-dom";
import RestaurantRating from "../restaurant/RestaurantRating";
import SaveButton from "./SaveButton";
import "./SingleRestaurant.css";

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
    <Card marginBottom={4} className="single-restaurant-card">
      <CardBody className="single-card-body">
        <Image src={restaurant.img_url} alt="Image" height={200} width="100%" />
        <Stack mt="6" spacing="3">
          <Heading size="md">{restaurant.name}</Heading>

          <RestaurantRating ratingArray={ratingArray} />

          <div className="card-info">
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
