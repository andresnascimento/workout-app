const spreadsheetId = "1vl8j8trlq4WvrlbA2ilAS8-aJ_JWDoiggMN9PB_i71g";
const apiKey = import.meta.env.VITE_API_KEY;
const range = "workout!A1:H";
export const workoutURL = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;
