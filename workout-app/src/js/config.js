const spreadsheetId = "1vl8j8trlq4WvrlbA2ilAS8-aJ_JWDoiggMN9PB_i71g";
const apiKey = "AIzaSyBmXc6unLgEKRSoyaI4BoVhCsjsb43PAKI";
const range = "workout!A1:G";
export const workoutURL = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;
