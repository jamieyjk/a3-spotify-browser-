import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  name:string = null;
  profile_pic:string = "../../../assets/unknown.jpg";
  profile_link:string = null;

  //TODO: inject the Spotify service
  constructor(private spotifyService:SpotifyService, private http:HttpClient) { }

  ngOnInit() {
  }

  /*TODO: create a function which gets the "about me" information from Spotify when the button in the view is clicked.
  In that function, update the name, profile_pic, and profile_link fields */
  async getAbout() {

    // aboutInfo is of type Promise<ProfileData> instead of ProfileData, which means that it is a Promise that will eventually resolve to the ProfileData object.; therefore need to use async/await function to wait for the promise to resolve
    const aboutInfo = await this.spotifyService.aboutMe();
    // console.log(aboutInfo);

    // destructure the object to assign class values to the destructured values
    const { imageURL, name, spotifyProfile } = aboutInfo;

    // can use these directly in .html file to update values
    this.profile_pic = imageURL;
    this.name = name;
    this.profile_link = spotifyProfile;

  }
}
