export const getAddressFromCoordinates = async (lat: number, lng: number): Promise<string> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );
    const data = await response.json();
    return data.display_name || 'Address not found';
  } catch (error) {
    console.error('Geocoding error:', error);
    return 'Error getting address';
  }
};