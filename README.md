## Innovative Software Solutions 

### Smart Retail

To connect to firebase create a config.h in the smart_retail directory and add the following
```
#define myWifiSSID "your-wifi-ssid"
#define myWifiPwD "your-wifi-pwd"
#define databaseURL "firebase-db-url"
#define api_key_fb "your-private-api-key"
```

To run the frontend, create a new .env in the frontend directory add the following configuration
```
REACT_APP_APIKEY="your_app_apikey"
REACT_APP_DOMAIN="your_domain"
REACT_APP_DATABASE="link_to_datbase"
REACT_APP_PROJECTID="project_id"
REACT_APP_STORAGEBUCKET="storage_bucket"
REACT_APP_SENDERID="sender_id"
REACT_APP_APPID="app_id"
REACT_APP_MEASUREMENTID="measurement_id"
```

Next, open a terminal and run
```
npm install
```
If the install is successful, open `localhost:3000` in development mode
```
npm start
```
