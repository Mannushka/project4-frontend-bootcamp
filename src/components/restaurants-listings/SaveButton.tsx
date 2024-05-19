import { MdBookmarks } from "react-icons/md";
import { useUserInfo } from "../../context/UserInfoContext";
import { BACKEND_URL } from "../../constants";
import axios from "axios";

interface SaveButtonProps {
  restaurantId: number;
}
const SaveButton = ({ restaurantId }: SaveButtonProps): JSX.Element => {
  const { userId } = useUserInfo();
  console.log(userId);
  // console.log(restaurantId);

  const saveRestaurant = async (): Promise<void> => {
    try {
      if (!userId || isNaN(userId)) {
        throw new Error("Invalid user ID");
      }
      if (!restaurantId || isNaN(restaurantId)) {
        throw new Error("Invalid restaurant ID");
      }

      const response = await axios.post(
        `${BACKEND_URL}/users/${userId}/my-restaurants`,
        {
          restaurantId: restaurantId,
        }
      );

      if (response.status === 201) {
        console.log("Saved!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveClick = () => {
    saveRestaurant();
  };

  return (
    <div>
      {!!userId && <MdBookmarks size="25px" onClick={handleSaveClick} />}
    </div>
  );
};

export default SaveButton;
