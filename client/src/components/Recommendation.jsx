import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components"
import { API } from "../config/client";
import Card from "./Card";

const Container = styled.div`
flex: 2;
`

const Recommendation = ({ tags }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await API.get(`/videos/tags?tags=${tags}`);
      setVideos(res.data);
    };
    fetchVideos();
  }, [tags])

  return (
    <Container>
      {videos.map((video) => (
        <Card type="sm" key={video._id} video={video} />
      ))}
    </Container>
  )
}

export default Recommendation