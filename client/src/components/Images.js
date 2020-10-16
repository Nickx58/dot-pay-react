import React, { Component } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "./Image";

export class Images extends Component {
  state = {
    images: [],
    count: 30,
    start: 1,
    isOffline: false,
  };

  componentDidMount() {
    if (!window.navigator.onLine) {
      alert("Please check your network connection");
      this.setState({ isOffline: true });
      return;
    }
    const getImages = JSON.parse(localStorage.getItem("images"));
    if (getImages && getImages.length > 0) {
      this.setState({ images: getImages, isOffline: true });
      return;
    }
    const { count, start } = this.state;
    axios.get(`/api/photos?count=${count}&start=${start}`).then((res) => {
      this.setState(
        { images: res.data },
        localStorage.setItem("images", JSON.stringify(res.data))
      );
    });
  }

  appendDataToLocal = () => {
    const { images } = this.state;
    const getImages = JSON.parse(localStorage.getItem("images"));
    const setImages = [...getImages, ...images];
    localStorage.setItem("images", JSON.stringify(setImages));
  };

  fetchImages = () => {
    const { count, start } = this.state;
    this.setState({ start: this.state.start + count });
    axios
      .get(`/api/photos?count=${count}&start=${start}`)
      .then((res) =>
        this.setState(
          { images: this.state.images.concat(res.data) },
          this.appendDataToLocal
        )
      );
  };

  render() {
    const { isOffline } = this.state;
    return (
      <div className="images">
        <InfiniteScroll
          dataLength={this.state.images.length}
          next={this.fetchImages}
          hasMore={true}
          loader={isOffline ? " " : <h4>Loading...</h4>}
        >
          {this.state.images.map((image) => (
            <Image key={image.id} image={image} />
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}

export default Images;
