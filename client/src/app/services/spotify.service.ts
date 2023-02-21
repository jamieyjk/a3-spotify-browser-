import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArtistData } from '../data/artist-data';
import { AlbumData } from '../data/album-data';
import { TrackData } from '../data/track-data';
import { ResourceData } from '../data/resource-data';
import { ProfileData } from '../data/profile-data';
import { TrackFeature } from '../data/track-feature';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
	expressBaseUrl:string = 'http://localhost:8888';

  constructor(private http:HttpClient) { }

  private sendRequestToExpress(endpoint:string):Promise<any> {
    //TODO: use the injected http Service to make a get request to the Express endpoint and return the response.
    //the http service works similarly to fetch(). It may be useful to call .toPromise() on any responses.
    //update the return to instead return a Promise with the data from the Express server
    //Note: toPromise() is a deprecated function that will be removed in the future.
    //It's possible to do the assignment using lastValueFrom, but we recommend using toPromise() for now as we haven't
    //yet talked about Observables. https://indepth.dev/posts/1287/rxjs-heads-up-topromise-is-being-deprecated
    return lastValueFrom(this.http.get(this.expressBaseUrl + endpoint)).then((response) => {
      return response;
    }, (err) => {
      return err;
    });
  }

  // ProfileData = object or class
  aboutMe():Promise<ProfileData> {
    //This line is sending a request to express, which returns a promise with some data. We're then parsing the data 
    return this.sendRequestToExpress('/me').then((data) => {
      //console.log("data", data);
      return new ProfileData(data);
    });
  }

  searchFor(category:string, resource:string):Promise<ResourceData[]> {
    //TODO: identify the search endpoint in the express webserver (routes/index.js) and send the request to express.
    //Make sure you're encoding the resource with encodeURIComponent().
    //Depending on the category (artist, track, album), return an array of that type of data.
    //JavaScript's "map" function might be useful for this, but there are other ways of building the array.
    
    let results = [];

    return this.sendRequestToExpress(`/search/${encodeURIComponent(category)}/${encodeURIComponent(resource)}`).then((data) => {
      
      if (category === 'artist') {
        results = data.artists.items.map((item: any) => new ArtistData(item));
      } else if (category === 'track') {
        results = data.tracks.items.map((item: any) => new TrackData(item));
      } else if (category === 'album') {
        results = data.albums.items.map((item: any) => new AlbumData(item));
      }

      return results;
    });

  }

  getArtist(artistId:string):Promise<ArtistData> {
    //TODO: use the artist endpoint to make a request to express.
    //Again, you may need to encode the artistId.
    return this.sendRequestToExpress(`/artist/${encodeURIComponent(artistId)}`).then((data) => {
      return new ArtistData(data);
    });
  }

  getRelatedArtists(artistId:string):Promise<ArtistData[]> {
    let results = [];
    //TODO: use the related artist endpoint to make a request to express and return an array of artist data.
    return this.sendRequestToExpress(`/artist-related-artists/${encodeURIComponent(artistId)}`).then((data) => {
      results = data.artists.map((artist: any) => new ArtistData(artist));
      return results;
    });
  }

  getTopTracksForArtist(artistId:string):Promise<TrackData[]> {
    let results = [];
    //TODO: use the top tracks endpoint to make a request to express.
    return this.sendRequestToExpress(`/artist-top-tracks/${encodeURIComponent(artistId)}`).then((data) => {
      results = data.tracks.map((track: any) => new TrackData(track));
      return results;
    });
  }

  getAlbumsForArtist(artistId:string):Promise<AlbumData[]> {
    let results = [];
    //TODO: use the albums for an artist endpoint to make a request to express.
    return this.sendRequestToExpress(`/artist-albums/${encodeURIComponent(artistId)}`).then((data) => {
      results = data.items.map((item: any) => new AlbumData(item));
      return results;
    });
  }

  getAlbum(albumId:string):Promise<AlbumData> {
    //TODO: use the album endpoint to make a request to express.
    return this.sendRequestToExpress(`/album/${encodeURIComponent(albumId)}`).then((data) => {
      return new AlbumData(data);
    });
  }

  getTracksForAlbum(albumId:string):Promise<TrackData[]> {
    let results = [];
    //TODO: use the tracks for album endpoint to make a request to express.
    return this.sendRequestToExpress(`/album-tracks/${encodeURIComponent(albumId)}`).then((data) => {
      results = data.items.map((item: any) => new TrackData(item));
      return results;
    });
  }

  getTrack(trackId:string):Promise<TrackData> {
    //TODO: use the track endpoint to make a request to express.
    return this.sendRequestToExpress(`/track/${encodeURIComponent(trackId)}`).then((data) => {
      return new TrackData(data);
    });
  }

  getAudioFeaturesForTrack(trackId:string):Promise<TrackFeature[]> {
    let results = [];
    //TODO: use the audio features for track endpoint to make a request to express.
    return this.sendRequestToExpress(`/track-audio-features/${encodeURIComponent(trackId)}`).then((data) => {
      results.push(new TrackFeature('danceability', data.danceability))
      results.push(new TrackFeature('energy', data.danceability))
      results.push(new TrackFeature('speechiness', data.speechiness))
      results.push(new TrackFeature('acousticness', data.acousticness))
      results.push(new TrackFeature('instrumentalness', data.liveness))
      results.push(new TrackFeature('liveness', data.danceability))
      results.push(new TrackFeature('valence', data.valence))
      return results;
    });
  }
}
