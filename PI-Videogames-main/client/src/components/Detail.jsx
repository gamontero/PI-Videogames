import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions/index";
import NavBar from "./NavBar";
import styles from "./Detail.module.css"


export default function Detail(props) {
  
  const dispatch = useDispatch();
  const { id } = props.match.params;

  useEffect(() => {
    dispatch(getDetail(id));
  }, [id, dispatch]);
  var detail = useSelector((state) => state.detail);
  

const defaultImage = "https://cdnb.artstation.com/p/assets/images/images/036/628/681/4k/ivanov-alvarado-arcade-stylized-video-game-asset-1.jpg?1618196293"

 
  return (
    <div>
      {detail.length === 0 ? (
        <div>
        <div><NavBar/></div>
          <p>...Loading</p>
        </div>
    
      ) : (
        <div >
        <div>
          <NavBar/>
        </div>

        <div className={styles.detailContainer}>
          <img src={detail.background_image || defaultImage} className={styles.imgDetail}  alt="img not found"
                />
          <div>
            <p>
              <strong>Title: </strong> {detail.name}
            </p>

            <p>
              <strong>Released date: </strong>
              {detail.releaseDate}
            </p>

            <p>
              <strong>Platforms: </strong>

              {detail.id?.length > 7
                ? detail.platforms?.map((p) => p).join(" - ")
                : detail.platforms?.map((p) => p.platform.name).join(" - ")}
            </p>

            <p>
              <strong>Genres: </strong>
              {detail.genres?.map((g) => g.name).join(" - ")}
            </p>

            <p>
              <strong>Rating: </strong>
              {detail.rating}
            </p>

            <p className={styles.descriptionS}>
              <strong>Description: </strong>
              {detail.description_raw || detail.description.replace(/<[^>]*>?/g,"")}
            </p>

        </div>
        </div>
        </div>
      )}
    </div>
    
  );
}