import NavBar from "../components/navbar/NavBar";
import {
  Text,
  Box,
  Card,
  CardBody,
  Flex,
  Stack,
  Image,
} from "@chakra-ui/react";

const AboutUs = () => {
  const text = `Welcome to Food Harbour, the go-to online platform for discovering and exploring the vibrant restaurant scene in Hong Kong. Our mission is to provide a comprehensive catalogue of local restaurants, making it effortless for users to find their perfect dining destination. With our user-friendly app, you can easily navigate through an array of dining options and make informed decisions based on ratings, reviews, and personalized preferences.

Whether you're in the mood for a quick bite or seeking an exquisite fine dining experience, Food Harbour has you covered. Our platform allows you to filter restaurants based on your budget, preferred location, specific food preferences, and the quality of service provided. We understand that everyone has unique tastes and requirements, and our goal is to ensure you find the ideal spot that meets all your criteria.

At Food Harbour, we take pride in curating a diverse range of culinary delights, showcasing the rich and diverse restaurant landscape of Hong Kong. From traditional local cuisines to international flavors, our platform encompasses a wide variety of dining options to satisfy every palate.

Join us on this culinary journey as we strive to connect food enthusiasts with the best restaurants that Hong Kong has to offer. With Food Harbour, finding your next memorable dining experience has never been more convenient.`;
  const paragraphs = text
    .split("\n")
    .map((paragraph, index) => <p key={index}>{paragraph}</p>);
  return (
    <div>
      <NavBar />
      <Stack justifyContent="center" align="center">
        <Text className="page-header">About us</Text>
        <Flex gap={5} flexWrap="wrap" justifyContent="center">
          <Box alignContent="center">
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/food-harbour.appspot.com/o/about-us-img%2FScreenshot%202024-05-26%20at%2010.36.38%20PM.png?alt=media&token=b4a5f4ad-53bf-40ae-861d-461c6ebecde3"
              alt="image"
              style={{ objectFit: "cover" }}
            />
          </Box>
          <Box marginLeft={4} marginRight={4} marginTop={10}>
            <Card maxWidth={900} variant="unstyled">
              <CardBody>
                <Text fontSize={18}>{paragraphs}</Text>
              </CardBody>
            </Card>
          </Box>
        </Flex>
      </Stack>
    </div>
  );
};

export default AboutUs;
