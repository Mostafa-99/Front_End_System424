import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Track.css";
import Share from "./../AlbumWebPlayer/Share/Share.js"
import { Link } from "react-router-dom";
import AddToPlaylist from "./AddToPlaylist/AddToPlaylist";

/**
 * Track class
 * @extends Component
 */
export class Track extends Component {
  state = {
    /**
     * Artist of the track
     * @memberof Track
     * @type {Array<Object>}
     */
    artists: [],
    /**
     * Audio url of the track
     * @memberof Track
     * @type {String}
     */
    preview_url: "",
    /**
     * ID of the track
     * @memberof Track
     * @type {String}
     */
    id: "",
    /**
     * link of the track
     * @memberof Track
     * @type {Link}
     */
    href: "",
    /**
     * Name of the track
     * @memberof Track
     * @type {String}
     */
    name: "",
    /**
     * Duration of the track in milliseconds
     * @memberof Track
     * @type {Number}
     */
    duration_ms: Number,
    /**
     * Number of complete minutes of the track
     * @memberof Track
     * @type {Number}
     */
    minutes: 0,
    /**
     * Number of remaining seconds of the track
     * @memberof Track
     * @type {Number}
     */
    seconds: 0,
    track_number: Number,
  };

  componentDidMount() {
    console.log(this.props);
    this.props.track.artists.map((artist) =>
      this.setState({ artists: artist.name })
    );
    this.setState({
      duration_ms: this.props.track.durationMs,
      preview_url: this.props.track.preview_url,
      id: this.props.track._id,
      name: this.props.track.name,
      track_number: this.props.track.trackNumber,
      href: this.props.track.href,
    });
    this.millisToMinutesAndSeconds(this.props.track.durationMs);
  }

  /**
   * Converts duration of the song from milliseconds to minutes and seconds
   * @memberof Track
   * @param {Number} millis
   * @returns {void}
   */
  millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    this.setState({
      minutes: minutes,
      seconds: seconds,
    });
  }

  render() {
    //console.log("id is:" ,this.state.id)
    return (
      <div id="track-row-div" className="container-fluid">
        <Share url={this.state.href} />
        <AddToPlaylist trackId={this.state.id} />
        <div
          className={
            this.props.playing_song_id === this.props.track._id
              ? "row w-100 playing-song"
              : "row w-100 not-playing-song"
          }
        >
          <div className="track-symbol-div">
            <i
              className={
                this.props.playing_song_id === this.props.track._id &&
                this.props.is_playing
                  ? "track-icon-playing"
                  : "track-icon"
              }
              onClick={this.props.setPlayingSondId.bind(
                this,
                this.state.id,
                this.state.preview_url,
                this.state.name,
                this.state.artists,
                this.state.minutes,
                this.state.seconds,
                this.state.track_number
              )}
            ></i>
          </div>
          <div className="track-name-div">
            <p className="track-name">{this.state.name}</p>
            <p className="track-artist">{this.state.artists}</p>
          </div>

          {this.props.myAlbumArtist ? (
            <Link
              to={{
                pathname: "/artist/edit-track",
                state: { trackId: this.state.id, albumId: this.props.albumId },
              }}
              className="mt-2 mr-2"
            >
              <i className="fa fa-edit text-danger"></i>
            </Link>
          ) : null}

          {this.props.myAlbumArtist ? (
            <Link
              className="mt-2 mr-2 ml-2"
              to={{
                pathname: "/artist/overview",
                state: { trackId: this.state.id, albumId: this.props.albumId },
              }}
            >
              <i
                className="fa fa-bar-chart text-primary"
                aria-hidden="true"
              ></i>
            </Link>
          ) : null}

          <div className="track-options-div dropdown show">
            <strong
              className="track-options"
              id="trackdropdownMenuButton"
              data-toggle="dropdown"
            ></strong>
            <div
              className="dropdown-menu"
              aria-labelledby="albumdropdownMenuLink"
            >
              <li className="dropdown-item ">
                <button
                  type="button"
                  id="create-playlist"
                  data-toggle="modal"
                  data-target="#AddSongToPlaylist"
                >
                  <span className="list-item-text">Add to Playlist</span>
                </button>
              </li>

              <li className="dropdown-item ">
                <button
                  type="button"
                  id="create-playlist"
                  data-toggle="modal"
                  data-target="#share-static-back-drop"
                >
                  <span className="list-item-text">Share Track</span>
                </button>
              </li>
            </div>
          </div>
          <div className="track-duration-div">
            <p>
              {this.state.minutes}:{this.state.seconds < 10 ? "0" : ""}
              {this.state.seconds}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

Track.propTypes = {
  track: PropTypes.object.isRequired,
};

export default Track;
