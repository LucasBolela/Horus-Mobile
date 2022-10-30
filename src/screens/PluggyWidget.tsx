import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { StatusBar } from 'expo-status-bar';
import { PluggyConnect } from 'react-native-pluggy-connect';

/**
 * TODO: replace this URL with your own API, that would return an { accessToken } object
 *  with your Pluggy connect token
 */
// const MY_CONNECT_TOKEN_API_URL = 'https://pluggy-connect.vercel.app/api/token';
const MY_CONNECT_TOKEN_API_URL = "https://api.pluggy.ai/connect_token";

export default function PluggyWidget({navigation}) {
  const [token, setToken] = useState<string>();
  const [error, setError] = useState<Record<string, unknown>>();

  useEffect(() => {
    async function fetchToken(apiKey) {
      try {
        console.log('fetchToken')

        const response = await fetch(MY_CONNECT_TOKEN_API_URL, {
          method: 'POST',
          headers: {
            "accept": "application/json",
            "content-type": "application/json",
            "X-API-KEY": `${apiKey}`,
            // "X-API-KEY": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNGI5YzgyMDE5N2FiYzdiZjZhZDRlOGMzN2FjN2IwMTc6M2NhMDBlNmI0NTYyYzVjNzZmMTZlOTA3MzhkMzQxYzY3YzI0ZWQyZmUwYzYzZDk2OGEwMmI0ZjUyNTU5MDQ0OTZlMDQzNzdkMjk4ZmYxNGRkMzRlYzZmNzA4Yzc3M2ExZmI4ZjEyNjcxMGI1ZDllZDdhNDNhZTZiY2ZjNDY1MDdkZjQ1Mjc0MWZmODdmZDliNzRkYTU1NWNiOWI3ODljOCIsImlhdCI6MTY2Njk3MjM1NCwiZXhwIjoxNjY2OTc5NTU0fQ.cZcLI5gKPbCridaLHnzQEppbc-uVetMkbsq79gZ-McDyTb2CF7p8zXOGY7MwY_t5GrHG--CHw3cY2NuYPMt1RATnMFEK8Rt4RGQ6ERaLmdgOcnkelPVUQrU5nxFRCVI9ME4C5v1UZO3HWHw5OizP9oJr2_OZ6oAFooDXe_7wSi9yJIGcas73umLQchg3MFaxi3BcOIGq7PTvoVoM9HO3DUTgY2oEMrrCMfEWEGyNoWDdehGiINENN90N6kh7tMdOqOtcTla6v1mN-obejYXCMxtYoglgN4xQNQ1Bj699hIT9_vPJ3Ei8xVCLcVBOMNuv5KrnaVt-OvEmnz4cdD4bww"
          },
          body: JSON.stringify({
            options: {
              // clientUserId: '11f35b78-1807-42a2-8865-970817eef7f0',
              webhookUrl: "https://still-meadow-57659.herokuapp.com/api/pluggy/item/webhook/"
            },
          }),
        });

        const responseJson = await response.json();

        if (response.ok) {
          const { accessToken } = responseJson;
          setToken(accessToken);
        } else {
          setError(responseJson);
        }
      } catch (error) {
        setError({ message: error.message });
      }
    }
    getApiKey().then(apiKey => fetchToken(apiKey));
  }, []);

  const handleOnOpen = useCallback(() => {
    console.log('open');
  }, []);

  const handleOnSuccess = useCallback((itemData) => {
    console.log('success', itemData);
  }, []);

  const handleOnError = useCallback((error) => {
    console.log('error', error);
  }, []);

  const handleOnClose = useCallback(() => {
    setToken('');
    navigation.navigate('Tabs');
  }, []);

  if (error) {
    // error screen
    return (
      <View style={styles.container}>
        <Text>There was an error</Text>
        <Text>{JSON.stringify(error, null, 2)}</Text>
        <StatusBar style="auto" />
      </View>
    );
  }

  if (!token) {
    // loading screen
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
        <StatusBar style="auto" />
      </View>
    )
  }

  // authenticated! -> render PluggyConnect screen
  return (
    <PluggyConnect
      connectToken={token}
      includeSandbox={true}
      onOpen={handleOnOpen}
      onClose={handleOnClose}
      onSuccess={handleOnSuccess}
      onError={handleOnError}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

async function getApiKey() {
  try {
    const key = await fetch('https://api.pluggy.ai/auth', {
      method: 'POST',
      headers: {
        "accept": "application/json",
        "content-type": "application/json",
        // "X-API-KEY": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNGI5YzgyMDE5N2FiYzdiZjZhZDRlOGMzN2FjN2IwMTc6M2NhMDBlNmI0NTYyYzVjNzZmMTZlOTA3MzhkMzQxYzY3YzI0ZWQyZmUwYzYzZDk2OGEwMmI0ZjUyNTU5MDQ0OTZlMDQzNzdkMjk4ZmYxNGRkMzRlYzZmNzA4Yzc3M2ExZmI4ZjEyNjcxMGI1ZDllZDdhNDNhZTZiY2ZjNDY1MDdkZjQ1Mjc0MWZmODdmZDliNzRkYTU1NWNiOWI3ODljOCIsImlhdCI6MTY2Njk3MjM1NCwiZXhwIjoxNjY2OTc5NTU0fQ.cZcLI5gKPbCridaLHnzQEppbc-uVetMkbsq79gZ-McDyTb2CF7p8zXOGY7MwY_t5GrHG--CHw3cY2NuYPMt1RATnMFEK8Rt4RGQ6ERaLmdgOcnkelPVUQrU5nxFRCVI9ME4C5v1UZO3HWHw5OizP9oJr2_OZ6oAFooDXe_7wSi9yJIGcas73umLQchg3MFaxi3BcOIGq7PTvoVoM9HO3DUTgY2oEMrrCMfEWEGyNoWDdehGiINENN90N6kh7tMdOqOtcTla6v1mN-obejYXCMxtYoglgN4xQNQ1Bj699hIT9_vPJ3Ei8xVCLcVBOMNuv5KrnaVt-OvEmnz4cdD4bww"
      },
      body: JSON.stringify({
        // connectToken: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6IjM5M2Y3YjE4LWU1ODYtNDg5Mi1iNzM0LWM0NzRiMmRjNDA0YiIsImRhdGEiOiJkNzJmNDI2MGM1Y2E4N2MzNjU0ZmVlM2E0MDZkNjhiZjpjZDMzYTUwN2RkOTRmYjViOGJmYjFiMmY5ZTg4NmQyMWZiNDg5Yzk3NjA5NjBlYzdlNWI1ZDQ5ODM2YzhkZjk3NTY0MzgzOGRhMDliYmZjMGQ3NWEzODMyMjFlNzI1MzFlN2Y1NmRiMGQ5MTc1OThiNzgzMzFiYjQ5MTBlYjJlYTA3MjUzNzIwZGFlY2JlYzM3MzY0MGNhNjRlMjI1MTc2NTUwZjc2ZDYwYzZhYTFhMzUyYWM5NjEwZTljMWQ4ODhiY2MwMGRlNDQzMWVkNmMyYzY4ZmYxYjEyYzllYmE5MjZhMGUwNDQ3NDQ2OGZmYTdjMzIyYjk0NjE4ODViODY2IiwiaWF0IjoxNjY2OTA2NTg5LCJleHAiOjE2NjY5MDgzODl9.LZReFGgGvy-M6gT583-OsDb0UrrEjk_mB8J5MC7q1Y-HoOWhMo34VAZaJ1fvyJB4ESvF7HDLqYSHvvwiqfuvUlQf3-mcmfzGEDDHidNGwJGwTiK9mPgMSRA4LGCC8adLFF_9IWwUybjGFElGYsPq3gAbQbASrP8YoJgafycFfI7CDVa2kAeVO9xbyK30HXRT7oLmpElgbhjXgtNlew0IBq1iYQU52PiGTC9Bdd6zwgunEiJ6OPH7d8-OklG_6_0SV5AjFYaV1hPAci2mrNs78DrG7ac5r4e4avPziavrEXDpnH76mFI35rfuuEqzZZIGrbVMWfmznbU5I_Ei_rJueQ',
        clientId: '407b0d09-a699-4b44-b2b2-9551012b43c2',
        clientSecret: 'c8db454f-216e-4f9b-b68b-508c0a4bcfb7'
      }),
    })
  
    const responseKeyJson = await key.json();
    
    console.log('X-API-KEY generated!')

    // console.log(responseJson.apiKey)
    return responseKeyJson.apiKey;
  }
  catch (error) {
    return({ message: error.message });
  }
}