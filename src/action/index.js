const { APIKey } = window.__conf__;

export const getUserIpAddress = (history) => async (dispatch) => {
  try {
    dispatch({ type: "USER_IP_STARTED_FETCHING" });

    const request = await fetch("http://ip-api.com/json");

    if (!request.ok) {
      throw new Error("Unable to fetch the data at the moment");
    }

    const response = await request.json();
    const userData = {
      ipAddress: response?.query,
      location: response?.regionName,
      timeZone: response?.timezone,
      ISP: response?.isp,
      lat: response?.lat,
      lng: response?.lon,
    };
    dispatch({ type: "USER_IP_FETCHED_SUCESS", payload: userData });
  } catch (err) {
    dispatch({ type: "USER_IP_FETCH_FAILURE", err: err.message });
  }
};

export const fetchIpAddressDetails = (payload, history) => async (dispatch) => {
  const getUserDetails = `https://geo.ipify.org/api/v2/country,city?apiKey=${APIKey}&ipAddress=${payload}`;
  try {
    dispatch({ type: "USER_IP_STARTED_FETCHING" });

    const request = await fetch(getUserDetails);
    const response = await request.json();

    if (!response.ip) {
      throw new Error(
        "You have entered wrong Ip address try again with different Ip Address"
      );
    }

    const simpleResponse = {
      ipAddress: response?.ip,
      location: response?.location?.country,
      timeZone: response?.location?.timezone,
      ISP: response?.isp,
      lat: response?.location?.lat,
      lng: response?.location?.lng,
    };

    dispatch({ type: "USER_IP_FETCHED_SUCESS", payload: simpleResponse });
  } catch (err) {
    console.log(err.message);
    dispatch({ type: "USER_IP_FETCH_FAILURE", err: err.message });
  }
};
