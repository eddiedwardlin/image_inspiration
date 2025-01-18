import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from "axios";
import TinderCard from 'react-tinder-card';
import "../styles/Home.css"

function Home () {
    const [images, setImages] = useState<any[]>([]);
    const [id, setId] = useState("");
    const [query, setQuery] = useState("");
    const [likes, setLikes] = useState<string[]>([]);
    const [dislikes, setDislikes] = useState<string[]>([]);
    const [imageQueries, setImageQueries] = useState<any[]>([]);

    useEffect(() => {
        getImageQueries();
    }, []);

    // Retrieve previous queries to display a history
    const getImageQueries = () => {
        api
            .get("images/image-query/")
            .then((res) => res.data)
            .then((data) => { setImageQueries(data)})
            .catch((err) => console.log(err));
    }

    // Make a new query
    const makeQuery = async (e: React.FormEvent<HTMLFormElement>) => {
        setImages([]);
        setLikes([]);
        setDislikes([]);
        e.preventDefault();

        try {
            const res = await api.post("/images/image-query/", {
                query: query,
                likes: likes,
                dislikes: dislikes,
            });
            
            // Id used for patch requests when swiping
            setId(res.data.id);
            getImages();
            getImageQueries();
        } catch (err) {
            console.log(err);
        }
    }

    // External API call to retrieve images based on query
    const getImages = async () => {
        try {
            const res = await axios.get("https://api.unsplash.com/search/photos", {
                params: {query: query, per_page: 2}, // Limit to 5 due to free API tier
                headers: {
                    Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
                },
            });
            setImages(res.data.results);
        } catch (err) {
            console.log(err);
        }
    }

    // Update liked/disliked photos for current query
    const addLikeDislike = (url: string, method: string) => {
        const body = method === "like" ? { likes: [...likes, url] } : { dislikes: [...dislikes, url] };

        api
            .patch(`images/image-query/update/${id}/`, body)
            .then(() => getImageQueries())
            .catch((err) => console.log(err));
    }

    // Record like or dislike after swipe
    const onSwipe = (direction: string, url: string) => {
        if (direction == "right") {
            addLikeDislike(url, "like");
            setLikes(prevLikes => [...prevLikes, url])
        } else if (direction == "left") {
            addLikeDislike(url, "dislike");
            setDislikes(prevDislikes => [...prevDislikes, url])
        }
    }

    return <>
        <div className="home-container">
            <div className="query-list-container">
                <h4>History</h4>
                <ListGroup variant="flush">
                    {imageQueries.map((query) => (
                        <ListGroup.Item key={query.id}>
                            <Link className="link-item" to="/history" state={{data: query}}>{query.query.slice(0, 30)}{query.query.length > 30 && '...'}</Link>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </div>
            <div className="image-search-container">
                <div className="search-bar">
                    <Form onSubmit={(e) => {
                            e.preventDefault();
                            makeQuery(e);
                        }}>
                        <Form.Group controlId="formQuery">
                            <Form.Control type="text" placeholder="Find your inspiration..." value={query} onChange={(e) => setQuery(e.target.value)} />
                        </Form.Group>
                    </Form>
                </div>
                <div className='card-container'>
                    {images.map((image) => (
                        <TinderCard className='swipe' key={image.id} onSwipe={(dir) => onSwipe(dir, image.urls.regular)} preventSwipe={['up', 'down']}>
                            <div className='card' style={{ backgroundImage: `url(${image.urls.regular})` }}></div>
                        </TinderCard>
                    ))}
                </div>
            </div>
        </div>
    </>
}

export default Home;