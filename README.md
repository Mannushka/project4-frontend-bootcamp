# Food harbour app: front-end

Food Harbour is a comprehensive online platform that serves as a catalogue of local restaurants in Hong Kong. It is designed to help customers find the best dining option based on their budget, preferred location, specific food preferences and restairant's rating. The app also provides its users with an opportunity to rate restaurants and leave a feedback for a particular restaurant as well as view the reviews written by others.

## Setup

1. Clone the repository to your local machine.
2. Open the terminal and run npm install to install dependencies.
3. Create a .env file in the root directory of the project.
4. Set the following environmental variables in the .env file:
   VITE_AUTH0_DOMAIN=your_auth0_domain
   VITE_AUTH0_CLIENT_ID=your_auth0_client_id
   VITE_AUTH0_AUDIENCE=your_auth0_audience
   VITE_GOOGLE_API_KEY=your_google_api_key
   VITE_MAP_ID=your_map_id
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id

Replace your*auth0_domain, your_auth0_client_id, your_auth0_audience with the corresponding values from your Auth0 configuration. Similarly, replace the variables starting with your_google* and your*firebase* with the respective API keys and IDs from your Google and Firebase configurations.

### Auth0 Configuration:

1.  Set up an Auth0 account and create a new application at https://auth0.com .
2.  Configure the application with the appropriate domain, client ID, and audience.
3.  Update the VITE_AUTH0_DOMAIN, VITE_AUTH0_CLIENT_ID, and VITE_AUTH0_AUDIENCE variables in the .env file with the corresponding values from your Auth0 configuration.

### Google Configuration:

1.  Obtain a Google API key by creating a project in the Google Cloud Console and enabling the necessary APIs at https://developers.google.com/maps/documentation/javascript/cloud-setup .
2.  Replace your_google_api_key and your_map_id in the .env file with your Google API key and the desired map ID.

### Firebase Configuration:

1.  Set up a Firebase account at https://console.firebase.google.com .
2.  Create a Firebase project in the Firebase Console.
3.  Obtain the Firebase configuration values (API key, auth domain, project ID, etc.) from the Firebase project settings.
4.  Update the VITE_FIREBASE variables in the .env file with the corresponding values from your Firebase configuration.

5.  Once the dependencies and environmental variables are set, start the development server using the following command: npm run dev.
    This will start the app in development mode. Open http://localhost:5173 in your web browser to view the app.

## Usage

1. Guest users can browse the restaurants catalog, view any restaurant's info, read the previosly written reviews. However they are not able to write their own reviews or add a restaurant to their saved list.

2. To unlock full functionality of the app, including the ability to leave reviews and add restaurants to their saved list, users must create an account / log in by clicking the "Log in" button on the navbar and filling out the required information, such as email and password.

3. On the home page, the recent activity on the platform is displayed, showing the most recent reviews. When users click on a restaurant's name in the review card, they will be redirected to the restaurant's page, which provides more information, such as phone number and address.

4. On the restaurants page, accessible by clicking "Restaurants" on the navbar, users can view a list of all restaurants. By default, the list is sorted by highest rating, meaning the best-rated restaurants appear at the top. If the user wishes to sort the restaurants by price or most recent review, they may do so by clicking "sort by" button and selecting the desired option.

5. To learn more about a specific restaurant, user can click "View details" on the restaurant card. They will be redirected to the restaurant's page, which contains such information as the restaurant's phone, email, precise address, location on the map, rating as well as all reviews for the restaurant left by previous users.

6. To leave a review, user can click "Leave a review" button on the restaurant's page. A form will show up, where user can rate ther restaurant from 1 to 5 stars, write a paragraph describing their dining experience, and upload pictures of the menu, food, restaurant's interior etc. Users are able to submit a review only if they have rated the restaurant and the review text is at least 80 characters long. The review can also be deleted by clicking "Delete review".

7. Users can view a list of all their reviews by clicking on their name on the navbar and selecting "My reviews".

8. To add a restaurant to saved list, users can click "Save restaurant" button. The saved list is accessible by clicking on the current user's name on the navbar and selecting "Saved restaurants".

## ERD:

https://drawsql.app/teams/dream-team-107/diagrams/foodharbour

## Wireframes:

https://whimsical.com/food-harbour-FsXEiGE3pGqCbdQJKdFkhg

## Built with

## Built with

![Static Badge](https://img.shields.io/badge/React-61DBFB?style=for-the-badge&logo=React&labelColor=black) ![Static Badge](https://img.shields.io/badge/vite-%237c73e6?style=for-the-badge&logo=vite&labelColor=black) ![Static Badge](https://img.shields.io/badge/typescript-%239fd3c7?style=for-the-badge&logo=typescript&logoColor=%239fd3c7&labelColor=black&color=%239fd3c7)
![Static Badge](https://img.shields.io/badge/auth0-%20%23f95959?style=for-the-badge&logo=auth0&labelColor=black) ![Static Badge](https://img.shields.io/badge/firebase-%23afc5ff?style=for-the-badge&logo=firebase&logoColor=%20%23afc5ff&labelColor=black&color=%20%23afc5ff)
![Static Badge](https://img.shields.io/badge/Axios-FAFAF9?style=for-the-badge&logo=Axios&labelColor=black) ![Static Badge](https://img.shields.io/badge/chakra%20UI-%23ff9a3c?style=for-the-badge&logo=chakra%20ui&logoColor=%23ff9a3c&labelColor=black&color=%23ff9a3c)
![Static Badge](https://img.shields.io/badge/.env-4AE97A?style=for-the-badge&logo=dotenv&logoColor=4AE97A&labelColor=black)
