
let cachedCookies: string[] | null = null;
let cookieExpiration: Date | null = null;

export async function GetCookie() {

  if (shouldUseCachedCookies()) {
    return cachedCookies;
  }

  console.log("GetCookie function called");
        const headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Content-Type": "application/json"
       }

       const sitecoreUsername = process.env.SITECORE_USERNAME;
       const sitecorePassword = process.env.SITECORE_PASSWORD;
       const sitecoreBaseUrl = process.env.SITECORE_BASE_URL;
       const sitecoreLoginEndpoint = process.env.SITECORE_LOGIN_ENDPOINT;
       const sitecoreLoginUrl = sitecoreBaseUrl! + sitecoreLoginEndpoint!;

       if (!sitecoreUsername || !sitecorePassword || !sitecoreBaseUrl || !sitecoreLoginEndpoint) {  
        return null;
       }
       
       const bodyContent = JSON.stringify({
         "domain":"sitecore",
         "username":sitecoreUsername,
         "password":sitecorePassword
       });
       
       const response = await fetch(sitecoreLoginUrl, { 
         method: "POST",
         body: bodyContent,
         headers: headersList
       });
       
       
       const cookies = response.headers.getSetCookie();

       cachedCookies = cookies;
      cookieExpiration = new Date(new Date().getTime() + 10 * 60 * 1000);

       
       return cookies;
    };

function shouldUseCachedCookies() {
  return cachedCookies && cookieExpiration && new Date() < cookieExpiration;
}

export async function LoginSitecore() {
  const cookie = GetCookie();
  return (cookie);
}