# Guide to CIVAM Map
## Overview
This document is to provide a clear explanation of the map on the CIVAM website. 

## Data Flow Diagram
![Data Flow Diagram](Map_Data_Flow_Diagram.jpeg?raw=true)

## Why Google Maps
* Angular Google Maps is the most popular map module used with Angular. It is stable because it uses
  Google servers and is easy to modify.

## Getting the Map Up and Running
* The map is served using [Angular Google Maps](https://angular-maps.com). 
* It is critical that the API Key be present in `app.module.ts`. More information about the Google
  Maps API Key can be found
  [here](https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#key). **The
  map on CIVAM will not function if there is not a valid API key.** 

## Running the Map on the Local Environment
To keep our website secure, the API key used on the CIVAM website only accepts requests from CIVAM's domain. If you want to see the
map on the local environment for testing, you will need to create a temporary API key.
1. Log into the CIVAM google account (login info is found on the CIVAM Google Drive's Account Credentials document).
2. Go to the Google Developers Console (https://console.cloud.google.com).
3. Navigate to APIs & Services window.
4. Open the Credentials tab. 
    - You should see an existing key called 'Website API', this is the API key used on the CIVAM website.
5. Click the Create Credentials button, and then select API key.
6. On your local environment, go to the CIVAM/angular-frontend/src/app directory and open the file `app.module.ts`.
7. Go down to imports and change the apiKey field under `AgmCoreModule.forRoot` to your new API key. 
    - **Before you push any changes on to the repository, make sure to change the apiKey field back to the 'Website API' key.**
8. When you are finished, delete the temporary API key.

## Changing Default View of Map
* To change where the map is centered, we use the `lat`, `lng`, and `zoom` variables found in
  `map.component.ts`. 
* The map takes these parameters and centers itself on the given latitude and longitude coordinates.

## Django Interaction
* Immediately on initialization, the map calls `MapSupportService#getMapData`. 
* `GetMapData` creates an array of type `CrowMapMarker` and calls `ApiService#getAllMapData`.
  * This is where the actual API call occurs.
* For each piece of map data that the API call receives, a new object of type `CrowMapMarker` is
  created and placed in the array.
* This updates an array of `BehaviorSubject` with all of the markers received.
  * The type `BehaviorSubject` is so that any subscription would get the complete set of marker
    data.
* The last thing that `getMapData` does is call `MapSupportService#updateSiteFacingData` with the
  loaded array of marker data. This updates and notifies all components that depend on the map data.
* The constructor of `map.component.ts` subscribes to the `mapElements` array found in
  `map-support.service.ts` and receives all of the populated data.
* The mapMarkers array found in the Typescript file is what `map.component.html` uses to iterate and
  finally populate the map with the markers.

## Fields in Administration
* "Digital Collection" and "Crow Material" are to denote whether:
  * There is Crow tribe material at the institution
  * The institution physically has said material, or there is only pictures (CIVAM is a Digital
    Collection)

