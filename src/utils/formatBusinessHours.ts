export function formatBusinessHours(businessHours: BusinessHours) {
  const restaurantBusinessHours = [];
  for (const day in businessHours) {
    const capitalizedDay = day.charAt(0).toUpperCase() + day.slice(1);
    restaurantBusinessHours.push(
      `${capitalizedDay}: ${businessHours[day].join(", ")}`
    );
  }
  return restaurantBusinessHours;
}
