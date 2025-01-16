    
    
let cachedToken: string | null = null;
let tokenExpiration: Date | null = null;
    
 export async function GetToken() {   
        
  if (shouldUseCachedToken()) {
    return cachedToken;
  
  }
  console.log("GetToken function called");

  const headersList = {
    "Accept": "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/x-www-form-urlencoded"
  };
   
  const menoPassword = process.env.MENO_PASSWORD;
  const menoUsername = process.env.MENO_USERNAME;
  const menoLoginEndpoint = process.env.MENO_LOGIN_ENDPOINT;

  
  if (hasMissingCredentials(menoPassword, menoUsername, menoLoginEndpoint)) {
    return null;
  }
  
  const bodyContent = `client_id=sitecore-meno&grant_type=password&username=${menoUsername}&password=${menoPassword}`;
   
  const response = await fetch(menoLoginEndpoint!, { 
    method: "POST",
    body: bodyContent,
    headers: headersList
  });
   
  const data = await response.json();
  const accessToken = data.access_token || null;

  cachedToken = accessToken;
  tokenExpiration = new Date(new Date().getTime() + 10 * 60 * 1000);

  return accessToken;
}

function hasMissingCredentials(menoPassword: string | undefined, menoUsername: string | undefined, menoLoginEndpoint: string | undefined): boolean {
  return !menoPassword || !menoUsername || !menoLoginEndpoint;
}

function shouldUseCachedToken() {
  return cachedToken && tokenExpiration && new Date() < tokenExpiration;
}

export async function GetMenoToken() {
  const token = GetToken();
  return (token);
}